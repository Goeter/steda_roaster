import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.resolve(__dirname, '..', 'public', 'logo-steda-icon.png');

// Also process from the original green-screen source
const sourcePath = process.argv[2] || inputPath;
const outputPath = path.resolve(__dirname, '..', 'public', 'logo-steda-icon.png');

async function removeGreenBackground() {
  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  const { width, height, channels } = metadata;

  // Get raw pixel data
  const rawBuffer = await image.ensureAlpha().raw().toBuffer();

  const pixels = new Uint8Array(rawBuffer);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Detect green screen pixels (bright green where G is dominant)
    const isGreen = g > 100 && g > r * 1.4 && g > b * 1.4;

    // Also detect near-green edges (slightly less strict for anti-aliasing)
    const isNearGreen = g > 80 && g > r * 1.2 && g > b * 1.2 && r < 180 && b < 180;

    if (isGreen) {
      // Fully transparent
      pixels[i + 3] = 0;
    } else if (isNearGreen) {
      // Semi-transparent for smoother edges
      const greenDominance = (g - Math.max(r, b)) / g;
      const alpha = Math.max(0, Math.min(255, Math.round(255 * (1 - greenDominance * 1.5))));
      pixels[i + 3] = alpha;

      // Remove green color cast from semi-transparent pixels
      if (alpha > 0) {
        pixels[i] = Math.min(255, Math.round(r * 1.1));
        pixels[i + 1] = Math.min(255, Math.round(g * 0.8));
        pixels[i + 2] = Math.min(255, Math.round(b * 1.1));
      }
    }
  }

  await sharp(Buffer.from(pixels), {
    raw: { width, height, channels: 4 },
  })
    .png()
    .toFile(outputPath);

  console.log(`Done! Saved transparent logo to ${outputPath}`);
}

removeGreenBackground().catch(console.error);
