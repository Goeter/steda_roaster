import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = process.argv[2];
const outputPath = path.resolve(__dirname, '..', 'public', 'logo-steda-icon.png');

async function removeGreenAndOptimize() {
  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Get raw pixel data with alpha
  const rawBuffer = await image.ensureAlpha().raw().toBuffer();
  const pixels = new Uint8Array(rawBuffer);

  // Pass 1: Remove green background
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    const isGreen = g > 100 && g > r * 1.4 && g > b * 1.4;
    const isNearGreen = g > 80 && g > r * 1.2 && g > b * 1.2 && r < 180 && b < 180;

    if (isGreen) {
      pixels[i + 3] = 0;
    } else if (isNearGreen) {
      const greenDominance = (g - Math.max(r, b)) / g;
      const alpha = Math.max(0, Math.min(255, Math.round(255 * (1 - greenDominance * 1.5))));
      pixels[i + 3] = alpha;
      if (alpha > 0) {
        pixels[i] = Math.min(255, Math.round(r * 1.1));
        pixels[i + 1] = Math.min(255, Math.round(g * 0.8));
        pixels[i + 2] = Math.min(255, Math.round(b * 1.1));
      }
    }
  }

  // Pass 2: Find bounding box of non-transparent pixels
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (pixels[idx + 3] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Add small padding
  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  console.log(`Original: ${width}x${height}`);
  console.log(`Cropped bounds: ${cropW}x${cropH}`);

  // Create the cleaned image, crop, then make it square by extending width
  let result = sharp(Buffer.from(pixels), {
    raw: { width, height, channels: 4 },
  })
    .extract({ left: minX, top: minY, width: cropW, height: cropH });

  // If taller than wide, pad sides to make it more square (1:1 ratio)
  if (cropH > cropW) {
    const targetSize = cropH;
    const extraWidth = targetSize - cropW;
    const leftPad = Math.floor(extraWidth / 2);
    const rightPad = extraWidth - leftPad;

    result = result.extend({
      top: 0,
      bottom: 0,
      left: leftPad,
      right: rightPad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });

    console.log(`Padded to square: ${targetSize}x${targetSize}`);
  }

  // Resize to a good size and sharpen for clarity
  await result
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .sharpen({ sigma: 1.2, m1: 1.0, m2: 0.5 })
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log(`Done! Saved to ${outputPath} (512x512, sharpened)`);
}

removeGreenAndOptimize().catch(console.error);
