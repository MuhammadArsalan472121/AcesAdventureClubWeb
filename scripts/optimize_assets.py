import os
import sys
from PIL import Image

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

def optimize_directory(dir_path):
    print(f"Fine-tuning optimization for: {dir_path}", flush=True)
    if not os.path.exists(dir_path):
        return

    files = [f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))]
    image_files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
    
    total_orig = 0
    total_new = 0

    for f in sorted(image_files):
        fp = os.path.join(dir_path, f)
        orig_size = os.path.getsize(fp)
        total_orig += orig_size
        
        try:
            with Image.open(fp) as im:
                w, h = im.size
                is_png = f.lower().endswith('.png')
                f_lower = f.lower()
                
                if any(k in f_lower for k in ['logo', 'splash-icon']):
                    max_dim = 400
                    q = 85
                elif any(k in f_lower for k in ['icon']):
                    max_dim = 400
                    q = 78
                elif any(k in f_lower for k in ['hero', 'bg', 'onboarding', 'banner', 'mission', 'map']):
                    max_dim = 1200
                    q = 74
                else: # cards, guides, gallery, thumbs, hub
                    max_dim = 800
                    q = 72

                ratio = min(1.0, max_dim / max(w, h))
                new_w = max(1, int(w * ratio))
                new_h = max(1, int(h * ratio))

                temp_path = fp + ".opt2.tmp"

                if is_png:
                    resized = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
                    if f_lower == 'map.png':
                        # Convert to RGB JPEG format or palette PNG
                        if resized.mode == 'RGBA':
                            # check if alpha is used
                            alpha = resized.split()[-1]
                            if alpha.getextrema() == (255, 255):
                                resized = resized.convert('RGB')
                                resized.save(temp_path, format="PNG", optimize=True, compress_level=9)
                            else:
                                resized.save(temp_path, format="PNG", optimize=True, compress_level=9)
                        else:
                            resized.save(temp_path, format="PNG", optimize=True, compress_level=9)
                    else:
                        if resized.mode not in ('RGBA', 'RGB', 'P', 'L'):
                            resized = resized.convert('RGBA')
                        resized.save(temp_path, format="PNG", optimize=True, compress_level=9)
                else:
                    if im.mode != "RGB":
                        im_rgb = im.convert("RGB")
                    else:
                        im_rgb = im
                    resized = im_rgb.resize((new_w, new_h), Image.Resampling.LANCZOS)
                    resized.save(temp_path, format="JPEG", quality=q, progressive=True, optimize=True)

                new_size = os.path.getsize(temp_path)
                
                if new_size < orig_size:
                    os.replace(temp_path, fp)
                    total_new += new_size
                    pct = (1 - (new_size / orig_size)) * 100
                    print(f"[OPTIMIZED] {f:22} | {orig_size/1024:6.1f}KB -> {new_size/1024:6.1f}KB [-{pct:4.1f}%] | {w}x{h}->{new_w}x{new_h}", flush=True)
                else:
                    if os.path.exists(temp_path):
                        os.remove(temp_path)
                    total_new += orig_size
                    print(f"[KEPT]      {f:22} | {orig_size/1024:6.1f}KB", flush=True)

        except Exception as e:
            print(f"[ERROR] processing {f}: {e}", flush=True)
            total_new += orig_size

    print("-" * 75, flush=True)
    if total_orig > 0:
        saved = total_orig - total_new
        print(f"Summary for {dir_path}:", flush=True)
        print(f"Original Total : {total_orig / (1024*1024):.2f} MB", flush=True)
        print(f"Optimized Total: {total_new / (1024*1024):.2f} MB", flush=True)
        print(f"Total Saved    : {saved / (1024*1024):.2f} MB ({(saved/total_orig)*100:.1f}% reduction)", flush=True)
    print("=" * 75, flush=True)

if __name__ == "__main__":
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    optimize_directory(os.path.join(base_dir, "assets"))
