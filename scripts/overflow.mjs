/**
 * Overflow forensics: given a page and a viewport width, print exactly which
 * element creates the horizontal scrollbar, with its ancestor chain and the
 * computed styles that let it escape.
 *
 * Run: node scripts/overflow.mjs http://localhost:3000 /it 320
 */
import puppeteer from "puppeteer";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const PATHNAME = process.argv[3] || "/it";
const WIDTH = Number(process.argv[4] || 320);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${BASE}${PATHNAME}`, { waitUntil: "networkidle2", timeout: 45000 });
  await page.evaluate(() => document.fonts?.ready);
  await new Promise((r) => setTimeout(r, 300));

  const out = await page.evaluate((vw) => {
    const de = document.documentElement;
    const lines = [];

    // An element is "clipped" if any ancestor has a non-visible overflow,
    // so it cannot push the document scrollWidth.
    const isClipped = (el) => {
      let p = el.parentElement;
      while (p && p !== document.body) {
        const s = getComputedStyle(p);
        if (
          s.overflowX === "hidden" ||
          s.overflowX === "clip" ||
          s.overflowX === "auto" ||
          s.overflowX === "scroll"
        ) {
          return p;
        }
        p = p.parentElement;
      }
      return null;
    };

    const describe = (el) => {
      const cls =
        typeof el.className === "string" && el.className
          ? `.${el.className.trim().split(/\s+/).slice(0, 4).join(".")}`
          : "";
      const label = (el.getAttribute("aria-label") || el.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 40);
      return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${cls}${label ? ` "${label}"` : ""}`;
    };

    lines.push(
      `documentElement.scrollWidth=${de.scrollWidth} clientWidth=${de.clientWidth} body.scrollWidth=${document.body.scrollWidth}`,
    );
    lines.push("");

    // Body's direct children: the outermost thing that can overflow.
    for (const child of document.body.children) {
      const r = child.getBoundingClientRect();
      const s = getComputedStyle(child);
      lines.push(
        `body > ${describe(child)}  rect=[${Math.round(r.left)}..${Math.round(r.right)}] w=${Math.round(r.width)} pos=${s.position} ovx=${s.overflowX} display=${s.display}`,
      );
    }

    lines.push("");
    lines.push("=== elementi che escono, per importanza ===");

    const offenders = [];
    // An element can grow documentElement.scrollWidth without its own rect
    // escaping, when it is a scroll container whose content is wider. So check
    // both: rect.right past the viewport, and scrollWidth > clientWidth.
    lines.push("--- contenuto piu' largo del proprio box ---");
    for (const el of document.querySelectorAll("*")) {
      if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) {
        const s = getComputedStyle(el);
        lines.push(
          `  ${describe(el)} scrollWidth=${el.scrollWidth} clientWidth=${el.clientWidth} ovx=${s.overflowX} pos=${s.position}`,
        );
      }
    }
    lines.push("");

    for (const el of document.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right <= vw + 0.5) continue;
      const clipped = isClipped(el);
      const s = getComputedStyle(el);
      // Leaf-most offenders first: they are the actual cause.
      const hasContent = [...el.children].some((c) => {
        const cr = c.getBoundingClientRect();
        return cr.right > vw + 1;
      });
      offenders.push({
        el,
        right: Math.round(r.right),
        width: Math.round(r.width),
        text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 50),
        clipped: clipped ? describe(clipped) : null,
        leaf: !hasContent,
        whiteSpace: s.whiteSpace,
        minWidth: s.minWidth,
        position: s.position,
      });
    }

    offenders.sort((a, b) => Number(b.leaf) - Number(a.leaf) || b.right - a.right);

    for (const o of offenders.slice(0, 30)) {
      const chain = [];
      let p = o.el;
      while (p && p !== document.body && chain.length < 5) {
        chain.push(describe(p));
        p = p.parentElement;
      }
      lines.push(
        `${o.leaf ? "LEAF" : "    "} right=${o.right} w=${o.width} ws=${o.whiteSpace} minW=${o.minWidth} pos=${o.position}${o.clipped ? ` CLIP_BY(${o.clipped})` : ""}`,
      );
      lines.push(`      ${describe(o.el)}  «${o.text}»`);
      lines.push(`      chain: ${chain.join(" < ")}`);
    }

    return lines.join("\n");
  }, WIDTH);

  console.log(out);
} finally {
  await browser.close();
}
