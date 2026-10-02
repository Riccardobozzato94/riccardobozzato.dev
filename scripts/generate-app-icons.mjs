/**
 * Renders the app / home-screen icons.
 * Run: bun scripts/generate-app-icons.mjs
 *
 * WHY: the site shipped only `favicon.svg`. A phone ignores SVG for the
 * home-screen icon, so "Add to Home Screen" produced a generic globe, and
 * Chrome never offered installation because installability requires a 192px
 * and a 512px PNG. `apple-touch-icon` was absent entirely, which on iOS means
 * a screenshot of the page becomes the icon.
 *
 * Output: the PNGs that site.webmanifest and the layout metadata point at.
 *   public/icons/apple-touch-icon.png   180x180  iOS home screen
 *   public/icons/icon-192.png           192x192  Android install minimum
 *   public/icons/icon-512.png           512x512  splash screen + install UI
 *   public/icons/icon-maskable-512.png  512x512  Android adaptive icon
 */
import puppeteer from "puppeteer";
import { readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const htmlPath = join(root, "public", "images", "app-icon.html");
const outDir = join(root, "public", "icons");
mkdirSync(outDir, { recursive: true });

// The template is authored at 512x512; smaller outputs are the same
// composition scaled down, not a crop of the top-left corner.
const TARGETS = [
  { file: "apple-touch-icon.png", size: 180, maskable: false },
  { file: "icon-192.png", size: 192, maskable: false },
  { file: "icon-512.png", size: 512, maskable: false },
  { file: "icon-maskable-512.png", size: 512, maskable: true },
];

const html = readFileSync(htmlPath, "utf-8");

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--force-device-scale-factor=1"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts?.ready);

  for (const target of TARGETS) {
    const scale = target.size / 512;

    await page.evaluate(
      (s, isMaskable) => {
        const stage = document.getElementById("stage");
        stage.classList.toggle("maskable", isMaskable);
        stage.style.transform = `scale(${s})`;
      },
      scale,
      target.maskable,
    );

    const outPath = join(outDir, target.file);
    await page.screenshot({
      path: outPath,
      type: "png",
      clip: { x: 0, y: 0, width: target.size, height: target.size },
    });
    console.log(`OK: ${outPath} (${target.size}x${target.size})`);
  }
} finally {
  await browser.close();
}
