# DEPLOY-README.md — riccardobozzato.dev

Guida deploy-ready per Netlify (Next.js 16). **NON è stato fatto il deploy reale.**

## Prerequisiti
- Node >= 20 (vedi `package.json` engines).
- Netlify CLI: `npm i -g netlify-cli`
- Autenticazione: `netlify login` oppure esporta `NETLIFY_AUTH_TOKEN`.
- **TODO: INSERISCI SITE ID** — il Netlify Site ID non è disponibile offline.
  Collegalo al repo prima del deploy (Dashboard → Site settings → General, oppure
  `netlify link` dopo aver creato il sito).

## Comandi esatti
```powershell
# Build locale di verifica (già eseguita con successo)
npm run build

# Deploy in produzione (richiede NETLIFY_AUTH_TOKEN + site ID collegato)
netlify deploy --prod
```

## Configurazione (già presente)
- `netlify.toml`: `command = "npm run build"`, `publish = ".next"`.
- `package.json`: script `build` = `next build`.
- CSP in `netlify.toml` `[[headers]] for = "/*"`:
  - `script-src 'self'` (senza `unsafe-inline`) ✅
  - `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'` ✅
  - Nota: `style-src` mantiene `'unsafe-inline'` (necessario per Tailwind/Next inline styles).

## File modificati rispetto alla vecchia versione
- `src/lib/site.ts` — `SITE_DESCRIPTION` aggiornata al posizionamento personal brand.
- `src/lib/social.ts` — canali faceless marcati `placeholder: true`; esposto `ACTIVE_PROFILES`.
- `src/lib/services.ts` — SSOT `SERVICES` / `SERVICE_PILLARS` (3 pilastri + fractional CTO).
- `netlify.toml` — CSP indurito (rimosso `unsafe-inline` da `script-src`).
- `src/components/Navbar.tsx` / `src/components/Footer.tsx` — usano `ACTIVE_PROFILES`, niente link faceless attivi.
- `BRAND-PERSONAL.md` — definizione brand, link-out placeholder (`[faceless-brand].dev`, `[baki-brand].dev`).

## Placeholder link-out (non attivi)
- Faceless: `https://[faceless-brand].dev`
- Baki:     `https://[baki-brand].dev`

## Note
- Nessun commit eseguito. Nessun deploy eseguito.
- Build verificata localmente: **PASS** (type-check attivo, nessun `ignoreBuildErrors`).
