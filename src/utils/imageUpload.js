/**
 * Utility to pick an image from the user's device in web/mobile browsers,
 * automatically compress/resize it to avoid Firestore document limits,
 * and return the Data URL for immediate rendering.
 */
export const pickImageFromDevice = () => {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Browser environment not available'));
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg, image/jpg, image/webp';
    input.style.display = 'none';

    input.onchange = (e) => {
      const file = e.target?.files?.[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.onload = (event) => {
        const rawResult = event.target?.result;
        if (!rawResult || typeof rawResult !== 'string') {
          reject(new Error('Invalid file data'));
          return;
        }

        // Optimize/compress via HTML5 canvas
        const img = new Image();
        img.onerror = () => {
          resolve({
            dataUrl: rawResult,
            fileName: file.name,
            fileSize: `${Math.round(file.size / 1024)} KB`,
            width: 800,
            height: 600,
          });
        };

        img.onload = () => {
          try {
            const maxDimension = 1200;
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
              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
              resolve({
                dataUrl: compressedDataUrl,
                fileName: file.name,
                fileSize: `${Math.round((compressedDataUrl.length * 0.75) / 1024)} KB`,
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
              });
            }
          } catch (err) {
            resolve({
              dataUrl: rawResult,
              fileName: file.name,
              fileSize: `${Math.round(file.size / 1024)} KB`,
              width: img.width,
              height: img.height,
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
