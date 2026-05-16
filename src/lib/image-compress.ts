/**
 * Client-side image compression before upload
 * Resizes large images and compresses quality to speed up uploads
 */

interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-1, default 0.8
  maxSizeKB?: number; // target max size in KB
}

export async function compressImage(file: File, options: CompressOptions = {}): Promise<File> {
  const { maxWidth = 1200, maxHeight = 1200, quality = 0.8, maxSizeKB = 500 } = options;

  // If file is already small enough, return as-is
  if (file.size <= maxSizeKB * 1024) {
    return file;
  }

  // Only compress image files
  if (!file.type.startsWith('image/')) {
    return file;
  }

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // Scale down if exceeds max dimensions
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
      }

      canvas.toBlob(
        (blob) => {
          if (blob) {
            // If still too large, reduce quality further
            if (blob.size > maxSizeKB * 1024 && quality > 0.3) {
              canvas.toBlob(
                (blob2) => {
                  if (blob2) {
                    resolve(new File([blob2], file.name, { type: 'image/jpeg' }));
                  } else {
                    resolve(file);
                  }
                },
                'image/jpeg',
                quality * 0.6
              );
            } else {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            }
          } else {
            resolve(file);
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}
