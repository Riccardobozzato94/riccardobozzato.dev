/**
 * Renders the Open Graph card.
 * Run: bun scripts/generate-og.mjs
 *
 * WHY: the site shipped `og-default.svg`. Facebook, X, LinkedIn, Slack and
 * WhatsApp all refuse SVG for og:image — they render nothing. So every share
 * of riccardobozzato.com was producing a link with no preview card at all.
 *
 * Output: a 1200x630 PNG, which is what every platform actually accepts.
 */
import puppeteer from "puppeteer";
import { readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const htmlPath = join(root, "public", "images", "og-template.html");
const outDir = join(root, "public", "images");
const outPath = join(outDir, "og-default.png");

mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--force-device-scale-factor=1"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  const html = readFileSync(htmlPath, "utf-8");
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Let webfonts settle before capture.
  await page.evaluate(() => document.fonts?.ready);

  await page.screenshot({ path: outPath, type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`OK: ${outPath}`);
} finally {
  await browser.close();
}
