# BRAND-PERSONAL.md — riccardobozzato.dev

> Personal brand di **Riccardo Bozzato**. Questo file definisce posizionamento,
> pubblico, pilastri di servizi e boundary rispetto agli altri due brand.
> NON è un hub/centro di comando: è il sito personale con identità reale.

## Posizionamento
Riccardo Bozzato si presenta con la sua identità reale (non faceless su questo
dominio). È un **builder di dev tools** (VulnClaw, Trova, OmniVoice) e un
**consulente/ops indipendente** che aiuta sviluppatori solo e piccoli team a
costruire sistemi serverless, AI-integrati e sicuri-by-default. Tagline di
riferimento: *"Build systems. Deliver results."*

Differenza chiave rispetto alla vecchia copy "Operations & Delivery Consultant /
Faceless, just code": qui Riccardo è sé stesso, con faccia e reputazione.

## Pubblico target
- **Solo developers / indie hackers** che vogliono shipping veloce senza debito tecnico.
- **Piccoli team (2-20 persone)** senza hire dedicato per security o AI.
- **Founder non-tecnici** che cercano leadership tecnica part-time (fractional).
- **Aziende eCommerce / PIM-DAM** (Magento, Shopware, Pimcore) per integrazione e automazione.

## 3 pilastri di servizi / consulenza
I dati tipizzati vivono in `src/lib/services.ts` (`SERVICES`, `SERVICE_PILLARS`).

1. **Dev Tools Consulting** — audit e build di prodotti/tooling developer-facing
   (es. SaaS Foundation sul blueprint Trova, architecture audit). `dev-tools`
2. **AI Integration** — embedding di AI/agenti in workflow reali con
   human-in-the-loop e misurazione ROI. `ai-integration`
3. **Security & DevSecOps for Solo Devs** — hardening secure-by-default,
   CSP/secrets/supply-chain, audit pragmatico. `devsecops`

+ Modello ombrello **Fractional CTO / Ops** (retainer/ advisory) che lega i tre
  pilastri con leadership tecnica on-demand. `fractional-cto`

## Tone of voice
Diretto, tecnico ma accessibile, orientato a risultati e prezzi trasparenti
(fixed price, "no surprises"). Niente jargon di facciata: si parla di ciò che è
stato effettivamente costruito e consegnato (€500K+ portfolio).

## Come si differenzia dai due brand separati
- **`.dev` (questo sito)** = identità reale di Riccardo, personal brand +
  consulenza/servizi. Canali attivi: GitHub, LinkedIn, Email.
- **Brand FACELESS** (contenuti Instagram/YouTube/Twitch) = marca separata,
  personaggio senza volto. I suoi handle su `.dev` sono marcati `placeholder: true`
  in `src/lib/social.ts` e NON vanno renderizzati qui.
- **Brand "Baki" (cane)** = marca separata, avatar cane. Anche questa avrà il
  proprio sito.

Su `.dev` NON si fa da centro di comando per gli altri brand: si preparano solo
link-out placeholder (vedi sotto).

## Placeholder di link-out agli altri due brand
TODO: collegare quando i rispettivi siti esisteranno. NON sono link attivi.

- Faceless brand: `https://[faceless-brand].dev`
- Baki brand:    `https://[baki-brand].dev`

> Non inventare URL definitivi: usare questi segnaposto finché i domini/progetti
> non sono pronti. Aggiornare `src/lib/social.ts` e la navigazione di conseguenza.

## Note tecniche collegate
- `src/lib/site.ts` → `SITE_DESCRIPTION` aggiornata al posizionamento personal.
- `src/lib/social.ts` → canali faceless marcati `placeholder: true`; usare
  `ACTIVE_PROFILES` in Navbar/Footer.
- `netlify.toml` → CSP indurito (`script-src 'self'`, `object-src 'none'`,
  `base-uri 'self'`, `frame-ancestors 'none'`); `style-src` mantiene
  `unsafe-inline` per gli stili inline di Next/Tailwind.
- `src/app/[locale]/services/page.tsx` → oggi legge i pacchetti da
  `messages/*.json` (`services.packages`). `src/lib/services.ts` è la SSOT dati
  da cui rifattorizzare la pagina quando servirà (niente JSX pesante per ora).
