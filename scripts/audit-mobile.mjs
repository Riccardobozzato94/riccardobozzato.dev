/**
 * Mobile audit: what actually breaks on a phone.
 * Run: bun scripts/audit-mobile.mjs
 *
 * Usage:
 *   AUDIT_BASE=http://localhost:3000 node scripts/audit-mobile.mjs
 *
 * WHY: the desktop audit cannot see any of this. The three failures that cost
 * the most on a phone are, in order:
 *   1. horizontal overflow — one unbreakable string forces a page-wide
 *      side-scroll and every element to shrink
 *   2. touch targets under 44px — the finger misses and the tap lands on
 *      whatever is next to it
 *   3. tiny type — 10-11px labels are unreadable on a real phone even though
 *      they look fine in a browser screenshot
 *
 * Measured in the real layout engine at 320px, the narrowest phone still in
 * use, and reported per page so the fix has an address.
 */
import puppeteer from "puppeteer";
import { join } from "path";
import { mkdirSync } from "fs";

const BASE = (process.env.AUDIT_BASE || "http://localhost:3000").replace(/\/$/, "");
const OUT_DIR = process.env.AUDIT_OUT || join(process.cwd(), ".mobile-audit");
const LOCALES = (process.env.AUDIT_LOCALES || "it,en").split(",");

const ROUTES = [
  "", "/about", "/accessibility", "/advertise", "/books", "/blog", "/contact",
  "/freebie", "/playbook", "/privacy", "/projects", "/services", "/thank-you",
];

const WIDTHS = [320, 390];
const MIN_TAP = 44;
const MIN_FONT = 12;

// Screenshots are expensive; only the pages where the layout is most at risk.
const SHOTS = new Set(["", "/contact", "/projects", "/blog"]);

mkdirSync(OUT_DIR, { recursive: true });

// Anything smaller is decorative: dots, a 1px rule, an icon rendered inside a
// padded button. Those are not tappable on their own.
const DECORATIVE = /^(svg|path|span|i|hr|br|img|picture|video|use|circle|rect|line|ellipse|polygon|defs|filter|feGaussianBlur|feMerge|feMergeNode)$/i;

const findings = [];
const add = (sev, where, msg) => findings.push({ sev, where, msg });

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const loc of LOCALES) {
    for (const route of ROUTES) {
      const path = `/${loc}${route}`;
      const url = `${BASE}${path}`;
      const page = await browser.newPage();
      await page.setViewport({ width: WIDTHS[0], height: 800, deviceScaleFactor: 1 });
      await page.setUserAgent(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      );

      try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
      } catch (e) {
        add("ERR", path, `goto fallito: ${e.message}`);
        await page.close();
        continue;
      }

      // Let fonts settle so measurements reflect final layout.
      await page.evaluate(() => document.fonts?.ready);
      await new Promise((r) => setTimeout(r, 250));

      const report = await page.evaluate(
        (minTap, minFont, decorativeSrc, widths) => {
          const decorative = new RegExp(decorativeSrc, "i");
          const out = {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            overflowers: [],
            smallTaps: [],
            tinyText: [],
          };

          const describe = (el) => {
            const id = el.id ? `#${el.id}` : "";
            const cls = typeof el.className === "string" && el.className
              ? `.${el.className.trim().split(/\s+/).slice(0, 2).join(".")}`
              : "";
            const label = (el.getAttribute("aria-label") || el.textContent || "")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 34);
            return `${el.tagName.toLowerCase()}${id}${cls}${label ? ` "${label}"` : ""}`;
          };

          const inViewportColumn = (r) => r.left < widths.clientWidth && r.right > 0;

          for (const el of document.body.querySelectorAll("*")) {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;

            const style = getComputedStyle(el);
            if (style.visibility === "hidden" || style.display === "none") continue;
            if (style.overflowX === "auto" || style.overflowX === "scroll") continue;

            // 1. horizontal overflow
            if (r.right > widths.clientWidth + 1 && inViewportColumn(r)) {
              if (out.overflowers.length < 8) {
                out.overflowers.push(
                  `${describe(el)} right=${Math.round(r.right)} (scrollWidth ${out.scrollWidth})`,
                );
              }
            }

            // 2. touch targets
            // A control hidden from the visual layout (the WCAG skip link) has
            // no target to hit until it receives focus, which makes it 100%.
            if (el.classList.contains("sr-only")) continue;

            if (el.matches("a, button, [role=button], input, select, textarea, summary")) {
              // The real tap area is the wrapping <label>, or the one pointing
              // at this control by id — not the 16px checkbox itself.
              const label =
                el.closest("label") ||
                (el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`) : null);
              // The input itself is always tappable; a <label for> only adds
              // area. A <label> that is just the field's caption ("Nome") is
              // smaller than the field, so take the larger of the two rather
              // than letting the caption mask a perfectly good 44px target.
              const hit = label ? label.getBoundingClientRect() : { width: 0, height: 0 };
              const w = Math.max(r.width, hit.width);
              const h = Math.max(r.height, hit.height);
              if (h < minTap && w < minTap && !el.hasAttribute("aria-hidden")) {
                if (out.smallTaps.length < 10) {
                  out.smallTaps.push(`${describe(el)} ${Math.round(w)}x${Math.round(h)}`);
                }
              }
            }

            // 3. unreadable text
            if (el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) {
              const size = parseFloat(style.fontSize);
              const readable = el.closest("p, span, a, li, dd, dt, h1, h2, h3, h4, div") === el;
              if (readable && size < minFont && !decorative.test(el.tagName)) {
                if (out.tinyText.length < 8) {
                  out.tinyText.push(`${describe(el)} ${size}px`);
                }
              }
            }
          }

          return out;
        },
        MIN_TAP,
        MIN_FONT,
        DECORATIVE.source,
        { clientWidth: WIDTHS[0] },
      );

      if (report.scrollWidth > WIDTHS[0] + 1) {
        add(
          "ERR",
          path,
          `overflow orizzontale a ${WIDTHS[0]}px: scrollWidth ${report.scrollWidth} (+${report.scrollWidth - WIDTHS[0]})`,
        );
        for (const o of report.overflowers) add("→", path, o);
      }

      for (const s of report.smallTaps) add("WARN", path, `target < ${MIN_TAP}px: ${s}`);
      for (const t of report.tinyText) add("WARN", path, `testo ${t}`);

      if (SHOTS.has(route)) {
        const slug = route.replace(/\//g, "-") || "-home";
        const shot = join(OUT_DIR, `mobile-${loc}${slug}-${WIDTHS[0]}.png`);
        await page.screenshot({ path: shot });
        add("INFO", path, `screenshot ${shot}`);
      }

      await page.close();
    }
  }
} finally {
  await browser.close();
}

const order = { ERR: 0, "→": 1, WARN: 2, INFO: 3 };
findings.sort((a, b) => order[a.sev] - order[b.sev] || a.where.localeCompare(b.where));

console.log(`\n=== MOBILE AUDIT ${BASE} @ ${WIDTHS[0]}px ===\n`);
for (const f of findings) {
  const tag = f.sev === "ERR" ? "✗" : f.sev === "WARN" ? "!" : f.sev === "INFO" ? "·" : "  ";
  console.log(`${tag} [${f.sev}] ${f.where} — ${f.msg}`);
}

const errs = findings.filter((f) => f.sev === "ERR").length;
const warns = findings.filter((f) => f.sev === "WARN").length;
console.log(`\n${errs} errori, ${warns} warning`);
