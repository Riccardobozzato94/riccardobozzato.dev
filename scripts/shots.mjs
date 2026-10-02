/**
 * Visual check of the header and footer across breakpoints.
 * Run: node scripts/shots.mjs http://localhost:3000
 *
 * Full-page shots of just the header and footer, at every breakpoint where the
 * layout changes. Written to .mobile-audit/shots/ for eyeballing.
 */
import puppeteer from "puppeteer";
import { join } from "path";
import { mkdirSync } from "fs";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const PATHNAME = process.argv[3] || "/it";
const OUT = join(process.cwd(), ".mobile-audit", "shots");
mkdirSync(OUT, { recursive: true });

const WIDTHS = [320, 390, 768, 1280];
const REGIONS = [
  { name: "header", selector: "header" },
  { name: "footer", selector: "footer" },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.goto(`${BASE}${PATHNAME}`, { waitUntil: "networkidle2", timeout: 45000 });
    await page.evaluate(() => document.fonts?.ready);
    // The cookie panel would sit on top of the footer in every shot. Key and
    // shape come from src/lib/consent.ts — readConsent() falls back to the
    // default record when updatedAt is missing, which reopens the panel.
    await page.evaluate(() => {
      localStorage.setItem(
        "rbz_consent_v2",
        JSON.stringify({
          updatedAt: new Date().toISOString(),
          categories: { necessary: true, analytics: false, ads: false },
        }),
      );
    });
    await page.reload({ waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 400));

    for (const region of REGIONS) {
      const el = await page.$(region.selector);
      if (!el) {
        console.log(`MISS ${region.name} @${width}`);
        continue;
      }
      const out = join(OUT, `${region.name}-${width}.png`);
      await el.screenshot({ path: out });
      console.log(`OK ${out}`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
