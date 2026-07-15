# Riccardo Bozzato — Personal Brand & Portfolio

> Operations & Delivery Consultant | PMP®.
> Building the tools I wish existed.

Built with [Next.js 16](https://nextjs.org/), [Tailwind v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), and [next-intl](https://next-intl.dev/).

## Tech Stack

- **Framework**: Next.js 16 (Turbopack)
- **UI**: Tailwind v4 + shadcn/ui (New York style)
- **Language**: TypeScript
- **i18n**: next-intl (en/it)
- **Email**: Resend
- **Deployment**: Netlify

## Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-routed pages
│   │   ├── page.tsx       # Home
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact with form
│   │   ├── freebie/       # Lead magnet download
│   │   ├── projects/      # Portfolio grid
│   │   │   └── vulnclaw/  # VulnClaw detail
│   │   ├── trova/         # Trova sales page
│   │   └── not-found.tsx  # 404
│   └── api/
│       ├── contact/       # Contact form handler
│       └── freebie/       # Playbook email delivery
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   └── Section.tsx
├── i18n/                  # next-intl config
├── lib/                   # Utilities
├── styles/
│   └── globals.css        # Design system
└── types/                 # TypeScript declarations
```

## Design System

The design system is documented in `design-system/riccardo-bozzato/MASTER.md`:
- **Vibe**: "Midnight precision with a spark of innovation"
- **Dark mode default** with emerald accent (#22C55E)
- **Fonts**: Space Grotesk (headings) + Inter (body) + JetBrains Mono (code)
- **Motion-driven** animations with `prefers-reduced-motion` respect

## Getting Started

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # Production build
```

## Environment Variables

```env
# Required for email features (optional — dev works without)
RESEND_API_KEY=
CONTACT_FROM_EMAIL=onboarding@resend.dev
CONTACT_TO_EMAIL=riccardobozzato@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## License

Proprietary. All rights reserved.
