/**
 * Full-site audit against production.
 * Run: bun scripts/audit.mjs
 *
 * Checks the things that actually cost traffic or trust: metadata uniqueness
 * and length, canonical/hreflang, heading hierarchy, OG/Twitter, image alt,
 * internal link health, CTA consistency, and sitemap/robots alignment.
 */

const BASE = process.env.AUDIT_BASE || "https://riccardobozzato.com";
const LOCALES = ["it", "en"];

const ROUTES = [
  "", "/about", "/accessibility", "/advertise", "/books", "/blog", "/contact",
  "/freebie", "/playbook", "/privacy", "/projects", "/services", "/shipkit",
  "/thank-you", "/unsubscribe", "/confirm",
];

async function get(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "User-Agent": "audit/1.0" },
    redirect: "manual",
  });
  return { status: res.status, html: await res.text(), headers: res.headers };
}

const findings = [];
const add = (sev, where, msg) => findings.push({ sev, where, msg });

const meta = {};
const allLinks = new Map();
const ctas = [];

for (const loc of LOCALES) {
  for (const route of ROUTES) {
    const path = `/${loc}${route}`;
    let r;
    try {
      r = await get(path);
    } catch (e) {
      add("ERR", path, `fetch fallito: ${e.message}`);
      continue;
    }

    if (r.status !== 200) {
      add("ERR", path, `HTTP ${r.status}`);
      continue;
    }

    const h = r.html;
    const g = (re) => (h.match(re) || [])[1];

    // ── title ──
    const title = g(/<title>([^<]*)<\/title>/i);
    if (!title) add("ERR", path, "nessun <title>");
    else if (title.length > 60) add("WARN", path, `title ${title.length} caratteri (>60): "${title}"`);
    if (title) (meta.title ||= new Map()).set(path, title);

    // ── description ──
    const desc = g(/<meta name="description" content="([^"]*)"/i);
    if (!desc) add("ERR", path, "nessuna meta description");
    else if (desc.length > 165) add("WARN", path, `description ${desc.length} caratteri (>165)`);
    else if (desc.length < 70) add("WARN", path, `description troppo corta (${desc.length})`);
    if (desc) (meta.desc ||= new Map()).set(path, desc);

    // ── duplicate titles / descriptions across pages ──
    // ── canonical ──
    const canon = g(/<link rel="canonical" href="([^"]*)"/i);
    if (!canon) add("ERR", path, "nessun canonical");
    else if (!canon.startsWith(BASE)) add("ERR", path, `canonical fuori dominio: ${canon}`);

    // ── hreflang ──
    const alts = [...h.matchAll(/<link rel="alternate" hreflang="(it|en)" href="([^"]*)"/gi)];
    if (!alts.length) add("WARN", path, "nessun hreflang");
    else {
      const langs = alts.map((m) => m[1]);
      for (const l of LOCALES) if (!langs.includes(l)) add("WARN", path, `manca hreflang ${l}`);
    }

    // ── og ──
    for (const p of ["og:title", "og:description", "og:image", "og:url", "og:type"]) {
      if (!h.includes(`property="${p}"`)) add("WARN", path, `manca ${p}`);
    }
    if (!h.includes('name="twitter:card"')) add("WARN", path, "manca twitter:card");

    // ── headings ──
    const h1s = [...h.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)].map((m) => m[1].replace(/<[^>]*>/g, "").trim());
    if (h1s.length === 0) add("ERR", path, "nessun H1");
    else if (h1s.length > 1) add("ERR", path, `${h1s.length} H1 (deve essere 1): ${JSON.stringify(h1s)}`);

    // ── images ──
    for (const m of h.matchAll(/<img\b([^>]*?)\/?>/gi)) {
      const attrs = m[1];
      if (!/\salt=/.test(attrs)) add("ERR", path, "img senza alt");
      if (!/loading=/.test(attrs) && !/loading=/.test(h.slice(0, m.index).slice(-400))) {
        /* Next injects loading=lazy on most; only flag bare <img> without any */
      }
      if (!/width=/.test(attrs) && !/fill/.test(attrs)) add("WARN", path, "img senza width/height (CLS)");
    }
    for (const m of h.matchAll(/<img\b(?![^>]*alt=)[^>]*>/gi)) {
      add("ERR", path, `img senza alt: ${m[0].slice(0, 80)}`);
    }

    // ── lang ──
    const htmlLang = g(/<html lang="([^"]*)"/i);
    if (htmlLang !== loc) add("ERR", path, `html lang="${htmlLang}" invece di "${loc}"`);

    // ── internal links ──
    for (const m of h.matchAll(/href="(\/[^"#?]*)"/g)) {
      const target = m[1];
      if (!allLinks.has(target)) allLinks.set(target, new Set());
      allLinks.get(target).add(path);
    }

    // ── CTAs ──
    for (const m of h.matchAll(/<(a|button)\b([^>]*)>([\s\S]{0,120}?)<\/\1>/gi)) {
      const attrs = m[2];
      const label = m[3].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      if (!label || label.length > 60) continue;
      if (!/\/(contact|services|advertise|freebie|playbook|shipkit)\b/.test(m[1] + " " + attrs)) continue;
      if (/^(Home|Progetti|Blog|Libri|Home|Projects|Books)$/i.test(label)) continue;
      const key = label.toLowerCase();
      if (!ctas.some((c) => c.key === key)) ctas.push({ key, label, from: path });
    }
  }
}

// ── duplicate metadata ──
for (const [kind, map] of Object.entries(meta)) {
  const seen = new Map();
  for (const [path, val] of map) {
    if (seen.has(val)) add("ERR", path, `${kind} duplicato identico a ${seen.get(val)}`);
    else seen.set(val, path);
  }
}

// ── broken internal links ──
const checked = new Set();
for (const [target, sources] of allLinks) {
  const norm = target.replace(/\/$/, "") || "/";
  if (checked.has(norm)) continue;
  checked.add(norm);
  const testPath = norm.startsWith("/it") || norm.startsWith("/en") ? norm : `/it${norm}`;
  try {
    const res = await fetch(`${BASE}${testPath}`, { method: "GET", redirect: "manual" });
    if (res.status >= 400) add("ERR", [...sources][0], `link rotto -> ${norm} (HTTP ${res.status})`);
  } catch {
    add("ERR", [...sources][0], `link rotto -> ${norm} (errore rete)`);
  }
}

// ── robots.txt / sitemap ──
const robots = await get("/robots.txt");
if (robots.status !== 200) add("ERR", "/robots.txt", `HTTP ${robots.status}`);
else {
  if (!robots.html.includes("Sitemap:")) add("ERR", "/robots.txt", "manca Sitemap:");
}

const sm = await get("/sitemap.xml");
if (sm.status !== 200) add("ERR", "/sitemap.xml", `HTTP ${sm.status}`);
else {
  const locs = [...sm.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  add("INFO", "/sitemap.xml", `${locs.length} URL`);
  for (const noindexPage of ["/it/services", "/it/books", "/en/services", "/en/books", "/it/playbook"]) {
    const clean = noindexPage.replace("/it", "").replace("/en", "") || "";
    const found = locs.some((l) => l.endsWith(noindexPage) || (clean && l.endsWith(clean)));
    if (found && !noindexPage.includes("books")) {
      add("ERR", "/sitemap.xml", `pagina in sitemap: ${noindexPage}`);
    }
  }
}

// ── report ──
const order = { ERR: 0, WARN: 1, INFO: 2 };
findings.sort((a, b) => order[a.sev] - order[b.sev] || a.where.localeCompare(b.where));

console.log(`\n=== AUDIT ${BASE} ===\n`);
for (const f of findings) {
  const tag = f.sev === "ERR" ? "✗" : f.sev === "WARN" ? "!" : "·";
  console.log(`${tag} [${f.sev}] ${f.where} — ${f.msg}`);
}

const errs = findings.filter((f) => f.sev === "ERR").length;
const warns = findings.filter((f) => f.sev === "WARN").length;
console.log(`\n${errs} errori, ${warns} warning, ${findings.filter(f=>f.sev==="INFO").length} note`);

console.log(`\n=== CTA DISTRIBUITE (${ctas.length} uniche) ===`);
for (const c of ctas) console.log(`  "${c.label}"  (da ${c.from})`);
