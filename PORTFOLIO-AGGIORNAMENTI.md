# Portfolio Updates — VulnClaw & Panificio

Date: 2026-07-16
Author: Frontend update (Next.js 16 + next-intl + shadcn/ui)

## Projects touched
- `src/app/[locale]/projects/vulnclaw/page.tsx`
- `src/app/[locale]/projects/panificio/page.tsx`
- `messages/en.json` (`projects.vulnclaw`, `projects.panificio`)
- `messages/it.json` (`projects.vulnclaw`, `projects.panificio`)

---

## VulnClaw — Rebrand to Open-Core (commercial)

### page.tsx
- Removed the old "proprietary" framing and GitHub-only CTA.
- Hero now tagged `AI • CLI • Security • Open-Core` with a `status` badge (`Open-Core v0.4.0`).
- Tech stack updated to real capabilities: Python, Typer, Rich, Prompt Toolkit, OpenAI-compatible LLM, **MCP**, FastAPI (Web UI), ChromaDB.
- Features list rewritten from `t.raw("features")` to reflect reality: natural-language pentest loop, 8 LLM providers, 21 pentest skills, MCP toolchain, auto-report + PoC, persistent mode, Web UI/TUI, crypto toolkit. No MCP placeholders claimed.
- **New Pricing / Tiers section** reusing `Card`/`CardContent` (inspired by `/trova`), driven by `t.raw("tiers")`:
  - Community €0 (free & open source MIT)
  - VulnClaw Pro €29/mo (highlighted "Popular")
  - VulnClaw Teams €99/mo
  - Enterprise (custom)
- **CTA section** now has three buttons:
  - `View on GitHub` → links to GitHub repo (open source CLI)
  - `Visit Landing Page` → links to landing site
  - `Contact for License` → `/contact` (Enterprise)

### messages (en.json / it.json)
- `projects.vulnclaw`: new `subtitle`, `description`, expanded `features[]`, `techstack[]`, `status`.
- Added `ctaGithub`, `ctaWebsite`, `ctaLicense`, `githubUrl`, `websiteUrl`.
- Added `tiers` object: `title`, `subtitle`, and four tier blocks (`community`, `pro`, `teams`, `enterprise`) each with `name`, `price`, `period`, `tagline`, `features[]`, `cta`.
- Both EN and IT translated and kept in sync.

---

## Panificio Da Sergio — Professional / Production-Ready

### page.tsx
- Hero badge changed from "Family Project" (`Heart`) to **"Production-Ready"** (`PackageCheck`).
- Note section now reads the `note` translation (production-ready: Stripe, admin dashboard, multi-language) instead of "A gift for family — not for sale".
- Screenshots grid expanded from 2 → 4 images, reusing existing assets: `panificio-home`, `panificio-mobile`, `panificio-prodotti` (catalog), `panificio-admin` (dashboard).
- `Heart` import removed (unused); `PackageCheck` added.

### messages (en.json / it.json)
- `projects.panificio`: `subtitle` → "Production-Ready Bakery E-Commerce" (IT: "E-Commerce per Panetteria Pronta per la Produzione").
- `description` rewritten to emphasize a complete, production-ready platform (Stripe checkout, multilingual storefront, admin dashboard).
- `features[]` expanded (categories, Stripe checkout, admin dashboard, SEO, mobile-first).
- `techstack[]` updated to include **Stripe** and **Supabase** (replacing generic PostgreSQL).
- `note` key updated to a professional production-ready statement (both languages).

---

## Links configured
- GitHub: `https://github.com/riccardobozzato/vulnclaw` (verified repo in README).
- Landing page: `https://riccardobozzato.github.io/vulnclaw` — used per instructions; if the GitHub Pages site is not yet published, update `projects.vulnclaw.websiteUrl` in both `messages/en.json` and `messages/it.json`.
- Tier CTAs (Pro/Teams/Enterprise) currently point to the landing page URL; repoint to the actual pricing/checkout URLs when available.

## Build status
`npm run build` passes successfully.
- TypeScript: OK
- Static generation: OK (all routes including `/[locale]/projects/vulnclaw` and `/[locale]/projects/panificio` generated)
- Only warning: pre-existing `middleware` → `proxy` deprecation notice (unrelated to these changes).

## Images reused (no new assets needed)
- VulnClaw: `/images/vulnclaw-help.png`, `/images/vulnclaw-scan.png`, `/images/vulnclaw-results.png`
- Panificio: `/images/panificio-home.png`, `/images/panificio-mobile.png`, `/images/panificio-prodotti.png`, `/images/panificio-admin.png`
