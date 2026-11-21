/**
 * Aces Adventure Club - Image Upload & Python AVIF Optimization Pipeline
 * 
 * Automatically sends newly picked/uploaded images to the Python Image Optimizer Service
 * (Pillow + pillow-heif) running on http://127.0.0.1:5001.
 * 
 * The Python service resizes and converts images directly into modern .avif format
 * (or high-efficiency WebP fallback), dramatically minimizing payload size and boosting
 * site loading speeds while preserving crisp visual quality.
 */

const PYTHON_OPTIMIZER_API = 'http://127.0.0.1:5001/api/optimize-image';

/**
 * Optimizes an image (raw base64 / dataUrl or File) through the Python Pillow + pillow-heif pipeline.
 * Returns converted .avif data URL and compression details.
 */
export const optimizeImageWithPython = async (imageInput, options = {}) => {
  const { maxDimension = 1200, quality = 70 } = options;

  try {
    let payload;
    let headers = {};

    if (typeof imageInput === 'string') {
      // Base64 or Data URL
      payload = JSON.stringify({
        image: imageInput,
        maxDimension,
        quality,
      });
      headers['Content-Type'] = 'application/json';
    } else if (imageInput instanceof Blob || (typeof File !== 'undefined' && imageInput instanceof File)) {
      const formData = new FormData();
      formData.append('file', imageInput);
      formData.append('maxDimension', String(maxDimension));
      formData.append('quality', String(quality));
      payload = formData;
    } else {
      throw new Error('Unsupported image input format');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(PYTHON_OPTIMIZER_API, {
      method: 'POST',
      headers,
      body: payload,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.dataUrl) {
        console.log(
          `[PYTHON_AVIF_OPTIMIZER] Converted to ${result.format} successfully! ` +
          `Original: ${result.originalSizeFormatted} -> Optimized: ${result.optimizedSizeFormatted} ` +
          `(-${result.savedPercent}% bandwidth saved)`
        );
        return result;
      }
    }
  } catch (err) {
    console.info(
      '[PYTHON_AVIF_OPTIMIZER] Python service unavailable or timed out; activating seamless client fallback.',
      err?.message || err
    );
  }

  return null;
};

/**
 * Utility to pick an image from the user's device in web/mobile browsers,
 * automatically processes it through the Python AVIF optimization pipeline,
 * and returns the optimized Data URL with compression stats.
 */
export const pickImageFromDevice = (options = {}) => {
  const { maxDimension = 1200, quality = 70 } = options;

  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Browser environment not available'));
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg, image/jpg, image/webp, image/avif, image/heic';
    input.style.display = 'none';

    input.onchange = async (e) => {
      const file = e.target?.files?.[0];
      if (!file) {
        return;
      }

      // Step 1: Attempt Python AVIF Optimization Pipeline first
      try {
        const pythonResult = await optimizeImageWithPython(file, { maxDimension, quality });
        if (pythonResult && pythonResult.dataUrl) {
          resolve({
            dataUrl: pythonResult.dataUrl,
            fileName: file.name,
            fileSize: `${pythonResult.optimizedSizeFormatted} (${pythonResult.format}, -${pythonResult.savedPercent}%)`,
            rawSize: pythonResult.optimizedSizeBytes,
            format: pythonResult.format,
            mimeType: pythonResult.mimeType,
            width: pythonResult.width,
            height: pythonResult.height,
            isAvif: pythonResult.format === 'AVIF',
          });
          return;
        }
      } catch (pythonErr) {
        console.warn('[PYTHON_AVIF_OPTIMIZER] Fallback triggered:', pythonErr);
      }

      // Step 2: Fallback to Client-Side Canvas WebP/JPEG Compression if Python service isn't reachable
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.onload = (event) => {
        const rawResult = event.target?.result;
        if (!rawResult || typeof rawResult !== 'string') {
          reject(new Error('Invalid file data'));
          return;
        }

        const img = new Image();
        img.onerror = () => {
          resolve({
            dataUrl: rawResult,
            fileName: file.name,
            fileSize: `${Math.round(file.size / 1024)} KB`,
            width: 800,
            height: 600,
            format: 'ORIGINAL',
          });
        };

        img.onload = () => {
          try {
            let width = img.width || 800;
            let height = img.height || 600;

            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              // Use modern WebP if canvas supports it, otherwise JPEG
              let compressedDataUrl = canvas.toDataURL('image/webp', quality / 100);
              let mimeType = 'image/webp';
              if (!compressedDataUrl.startsWith('data:image/webp')) {
                compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
                mimeType = 'image/jpeg';
              }

              const estimatedBytes = Math.round(compressedDataUrl.length * 0.75);
              const savedPct = Math.round((1 - estimatedBytes / file.size) * 100);

              resolve({
                dataUrl: compressedDataUrl,
                fileName: file.name,
                fileSize: `${Math.round(estimatedBytes / 1024)} KB (${mimeType.split('/')[1].toUpperCase()}${savedPct > 0 ? `, -${savedPct}%` : ''})`,
                rawSize: estimatedBytes,
                format: mimeType.split('/')[1].toUpperCase(),
                mimeType,
                width,
                height,
              });
            } else {
              resolve({
                dataUrl: rawResult,
                fileName: file.name,
                fileSize: `${Math.round(file.size / 1024)} KB`,
                width: img.width,
                height: img.height,
                format: 'ORIGINAL',
              });
            }
          } catch (_err) {
            resolve({
              dataUrl: rawResult,
              fileName: file.name,
              fileSize: `${Math.round(file.size / 1024)} KB`,
              width: img.width,
              height: img.height,
              format: 'ORIGINAL',
            });
          }
        };

        img.src = rawResult;
      };

      reader.readAsDataURL(file);
    };

    document.body.appendChild(input);
    input.click();
    setTimeout(() => {
      if (document.body.contains(input)) {
        document.body.removeChild(input);
      }
    }, 1000);
  });
};
