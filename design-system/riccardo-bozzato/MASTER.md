# Riccardo Bozzato — Design System MASTER

## Identity
- **Operations & Delivery Consultant** | PMP® — Enterprise delivery, scalable operations
- **Security Tool Builder** — VulnClaw (AI pentesting CLI)
- **Boilerplate Creator** — Trova (SaaS boilerplate)
- **Vibe**: "Midnight precision with a spark of innovation" — Dark, professional, tech-forward, warm accents

## Pattern: Portfolio Grid
- Hero → Projects (masonry) → About/Philosophy → CTA/Contact
- Conversion goal: Get contacted for leadership roles
- Primary CTA: Project card hover reveals "Case Study →"

## Style: Motion-Driven (Dark Default, Light Optional)
- **Dark mode default** (respects system pref)
- Smooth scroll-triggered animations (Intersection Observer)
- Micro-interactions on hover (scale, glow)
- Subtle parallax on hero
- **prefers-reduced-motion** respected: fade-only fallback

## Color System
```css
/* Tokens — Zinc base + Emerald/Indigo accent */
--background: 0 0% 4%;         /* #0A0A0B — near-black with warmth */
--foreground: 0 0% 96%;        /* #F4F4F5 */
--card: 0 0% 7%;               /* #121214 */
--card-foreground: 0 0% 96%;
--popover: 0 0% 7%;
--popover-foreground: 0 0% 96%;
--primary: 0 0% 96%;
--primary-foreground: 0 0% 4%;
--secondary: 0 0% 13%;         /* #212124 */
--secondary-foreground: 0 0% 96%;
--muted: 0 0% 11%;             /* #1C1C1E */
--muted-foreground: 0 0% 63%;  /* #A1A1AA */
--accent: 160 84% 45%;         /* #22C55E — emerald */
--accent-foreground: 0 0% 4%;
--destructive: 0 84% 60%;      /* #EF4444 */
--destructive-foreground: 0 0% 96%;
--border: 0 0% 15%;            /* #27272A */
--input: 0 0% 15%;
--ring: 160 84% 45%;           /* matches accent */
--radius: 0.5rem;
```

## Typography
```css
/* Headings: Space Grotesk — tech, bold, modern */
/* Body: Inter — clean, readable, professional */
--font-heading: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
/* Mono: JetBrains Mono — for code snippets */
--font-mono: 'JetBrains Mono', monospace;
```

### Scale
```
Heading 1: text-5xl md:text-7xl font-bold tracking-tight
Heading 2: text-3xl md:text-4xl font-semibold tracking-tight
Heading 3: text-2xl md:text-3xl font-semibold
Body:      text-base leading-relaxed
Small:     text-sm text-muted-foreground
Caption:   text-xs text-muted-foreground
```

## Key Effects
- **Glass morphism**: Cards with `bg-card/80 backdrop-blur-xl border border-border`
- **Glow on accent**: `box-shadow: 0 0 20px hsl(var(--accent) / 0.15)`
- **Hover lift**: `transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`
- **Entrance animations**: `fade-in-up` (opacity 0 → 1, translateY 20 → 0)
- **Gradient text on hero**: `bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent`

## Anti-Patterns (Avoid)
- ❌ No corporate stock photos or generic templates
- ❌ No emoji as icons (use Lucide icons)
- ❌ No light mode as default
- ❌ No heavy cyberpunk glitch effects (detracts from professionalism)
- ❌ No autoplay video with sound
