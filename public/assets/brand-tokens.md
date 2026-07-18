# riccardobozzato.dev — Brand & Visual Identity Direction

**Brand:** Riccardo Bozzato — Operations & Delivery Consultant · Security Tool Builder · Boilerplate Creator
**Vibe:** "Midnight precision with a spark of innovation" — dark, professional, tech-forward, warm accent.
**Purpose:** Personal site that sells 3 products (Trova, VulnClaw, Panificio) + positions Riccardo for leadership/consulting.

---

## 1. Core Palette (HSL, CSS-var ready)

Shared dark foundation across all surfaces; each product gets a **signature accent** so the three products read as a family while staying distinct.

| Token | HSL | Hex | Use |
|-------|-----|-----|-----|
| `--bg` | 0 0% 4% | `#0A0A0B` | Page background (warm near-black) |
| `--surface` | 0 0% 7% | `#121214` | Cards, panels |
| `--surface-2` | 0 0% 11% | `#1C1C1E` | Muted blocks, inputs |
| `--border` | 0 0% 15% | `#27272A` | Hairlines, dividers |
| `--fg` | 0 0% 96% | `#F4F4F5` | Primary text |
| `--fg-muted` | 0 0% 63% | `#A1A1AA` | Secondary text |

### Product accents (use one per product section)
- **Trova (flagship / SaaS):** Emerald `#22C55E` (`160 84% 45%`) — growth, shipping, ready.
- **VulnClaw (security):** Rose `#F43F5E` (`350 88% 60%`) — alert, offensive, terminal.
- **Panificio (warmth/family):** Amber `#F59E0B` (`38 92% 50%`) — bread, heritage, warmth.

> Rule: a page may only carry ONE product accent at a time. The site chrome (nav, footer) uses Emerald as the master accent since Trova is the flagship.

---

## 2. Typography

| Role | Family | Notes |
|------|--------|-------|
| Heading | **Space Grotesk** | Tech, bold, modern — hero & section titles |
| Body | **Inter** | Clean, readable, professional |
| Mono | **JetBrains Mono** | Code, terminal, technical labels |

Scale (desktop): H1 `text-5xl md:text-7xl` tracking-tight · H2 `text-3xl md:text-4xl` · H3 `text-2xl` · Body `text-base leading-relaxed` · Caption `text-xs text-muted`.

---

## 3. Signature Effects (canonical)

- **Glass morphism:** `bg-surface/80 backdrop-blur-xl border border-border`
- **Accent glow:** `box-shadow: 0 0 20px hsl(var(--accent) / 0.15)`
- **Hover lift:** `transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`
- **Gradient hero text:** `bg-gradient-to-r from-fg via-accent to-fg bg-clip-text text-transparent`
- **Mesh gradient ambience:** 2–3 radial gradients at corners, low opacity.
- **Subtle grid:** faint 44px grid masked to center, opacity ~0.35.

---

## 4. Logo / Wordmark

- Wordmark: `riccardobozzato.dev` in Space Grotesk 600.
- Product marks: rounded-square gradient chip with a single glyph (T / ▰ / 🍞).
- No emoji as UI icons elsewhere — use Lucide.

---

## 5. Anti-Patterns (hard rules)
- ❌ No corporate stock photos / generic templates.
- ❌ No emoji as icons (Lucide only).
- ❌ No light-mode default.
- ❌ No heavy cyberpunk glitch.
- ❌ No autoplay video with sound.

---

## 6. Generated Asset Map (see `/public/assets/`)

| Asset | File |
|-------|------|
| Trova hero banner | `trova-banner-1200x630.png`, `trova-banner-1600x900.png` |
| VulnClaw hero banner | `vulnclaw-banner-1200x630.png`, `vulnclaw-banner-1600x900.png` |
| Panificio hero banner | `panificio-banner-1200x630.png`, `panificio-banner-1600x900.png` |
| Trova dashboard mockup | `trova-dashboard-1200x760.png` (+ 1600x1000) |
| VulnClaw scan mockup | `vulnclaw-scan-1200x760.png` (+ 1600x1000) |
| Panificio storefront mockup | `panificio-storefront-1200x760.png` (+ 1600x1000) |
| Trova promo deck | `../asset-gen/slides/trova-promo.html` (and `/public/assets/trova-promo.html`) |
