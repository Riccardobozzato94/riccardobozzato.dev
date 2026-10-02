/**
 * Full-page screenshots of every route, desktop and mobile.
 * Run: node scripts/review.mjs http://localhost:3000
 *
 * Writes .mobile-audit/review/<locale>-<route>-<width>.png so a visual pass can
 * be done on the rendered result rather than on the source.
 */
import puppeteer from "puppeteer";
import { join } from "path";
import { mkdirSync } from "fs";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const LOCALES = (process.env.AUDIT_LOCALES || "it").split(",");
const ROUTES = (process.env.AUDIT_ROUTES || "/,/contact,/projects,/blog,/about,/services,/books,/freebie,/advertise,/privacy").split(",");
const SIZES = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const OUT = join(process.cwd(), ".mobile-audit", "review");
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const loc of LOCALES) {
    for (const size of SIZES) {
      const page = await browser.newPage();
      await page.setViewport({ width: size.width, height: size.height });
      // Dismiss the cookie panel so it does not cover the footer of every shot.
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem(
          "rbz_consent_v2",
          JSON.stringify({
            updatedAt: new Date().toISOString(),
            categories: { necessary: true, analytics: false, ads: false },
          }),
        );
      });

      for (const route of ROUTES) {
        const url = `${BASE}/${loc}${route}`;
        try {
          await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
        } catch (e) {
          console.log(`ERR ${url}: ${e.message}`);
          continue;
        }
        await page.evaluate(() => document.fonts?.ready);
        // Fire every scroll-reveal so full-page shots are not full of blanks.
        await page.evaluate(async () => {
          const step = window.innerHeight;
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
        });
        await new Promise((r) => setTimeout(r, 600));

        const slug = route === "/" ? "home" : route.replace(/\//g, "-").slice(1);
        const out = join(OUT, `${loc}-${slug}-${size.name}.png`);
        await page.screenshot({ path: out, fullPage: true });
        console.log(`OK ${out}`);
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}
