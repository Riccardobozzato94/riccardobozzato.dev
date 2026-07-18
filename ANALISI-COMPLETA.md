# ANALISI COMPLETA — Ecosistema Riccardo Bozzato (A + B + C)

**Date:** 2026-07-17
**Scope:** A) Portfolio progetti · B) Sito riccardobozzato.dev · C) Business & posizionamento faceless
**Method:** Tutto ciò che segue è marcato **[E]** (evidenza verificata: audit repo, ricerca mercato live 2026, file letti) o **[H]** (ipotesi non confermata da dati interni — Riccardo non ha fornito cifre di trazione). Ogni [H] ha un test in §C.4.

---

# PARTE A — PORTFOLIO PROGETTI

## A.1 Matrice di stato (tutti i repo, audit fact-based)

| Repo | Stack | License | Segreti leak | Gitignore | Test | Readiness | Rischio dominante |
|-------|-------|---------|--------------|-----------|------|-----------|-------------------|
| **riccardobozzato.dev** | Next.js + Netlify | MIT impl. | No (JWT_SECRET obbligatorio) | sì | n/a (sito) | Build OK, auth solido | CSP `unsafe-inline` debole [E] |
| **saas-boilerplate-max** (Trova) | Next 16.2 / Drizzle / better-auth / LemonSqueezy | MIT | No (placeholder) | sì (.env non tracked) | Sottile (3 file) | Prodotto completo ma type-check bypassato | Next 16 breakage: `lint` morto, `ignoreBuildErrors`, async params [E] |
| **VulnClaw** | Python Typer/TUI + Web UI | MIT (fork VulnPilot, attrib OK) | **No** | sì | 35+ file | Maturo ma `python_execute` isolamento debole | RCE-risk se commercializzato; gap MCP doc≠codice [E] |
| **OmniVoice-Studio** | Bun monorepo + Python + Tauri | AGPL-3.0-only | No | sì | 50+ file (maturo) | Il più completo | **COMMERCIAL-LICENSE.md è DRAFT non vincolante** → vendita closed-source oggi = lacuna legale [E] |
| **Panificio da Sergio** | React+Vite / Supabase / Stripe-ready | n/a (sito cliente) | No | sì | n/a | Build OK, schema semplice, CRM isolato | Nessuno (solo WhatsApp, no Stripe) [E] |
| **job-hunter** | Python CLI + Playwright | n/a | **No segreto reale** (`.env` placeholder) | sì | n/a | Funzionante, 1 candidatura reale inviata | **PII reali** in `cv/profile_*.json` (email/tel/LinkedIn) se repo condiviso [E] |

## A.2 Licenze — coerenza verificata [E]
- Trova (MIT) su dipendenze MIT/Apache → **compatibile**.
- VulnClaw (MIT) fork MIT di VulnPilot, copyright originale mantenuto → **compatibile**. Manca NOTICE (gap minore, non obbligatorio per MIT).
- OmniVoice (AGPL-3.0) su dipendenze permissive → **compatibile**; NOTICE presente e corretto. **MA** la licenza commerciale è un DRAFT non eseguito: vendere closed-source oggi non ha base contrattuale.

## A.3 Sicurezza — facto critici [E]
1. `job-hunter/cv/profile_*.json` contiene PII reali (riccardobozzato@gmail.com, +39 389 213 9542, linkedin.com/in/riccardobozzato, github.com/Riccardobozzato94). Se il repo viene mai pushato/condiviso, espone identità e recapiti. **Azione:** aggiungere `cv/profile_*.json` e `jobs_output/*.json` al `.gitignore` (oggi il repo non è git-tracked, quindi non urgente ma da fare prima di qualunque init).
2. `saas-boilerplate-max/.env` ha `BETTER_AUTH_SECRET=super-secret-key-change-in-production-...` — placeholder prevedibile. Se deployato cosí com'è = session secret indovinabile. **Azione:** generare secret a deploy-time.
3. VulnClaw `python_execute`: subprocess con regex-filter bypassabile, non isolato (container). Vendibile solo "authorized beta", non enterprise.
4. Sito `.dev` auth.ts: **solido** — nessun fallback hardcoded, JWT con issuer/audience, fail-closed. Punto di forza, non debolezza.

## A.4 Allineamento con STRATEGY.md
STRATEGY raccomanda: revenue = prodotti (Trova + VulnClaw bundle), canale = contenuto faceless, consulenza = rinviata.
- ✅ Trova e VulnClaw sono i due asset giusti.
- ⚠️ VulnClaw non è "enterprise-ready" (A.3.3) → il bundle "Ship Safe Pack" deve essere posizionato come **research/beta license**, non come prodotto hardening.
- ⚠️ OmniVoice ha licenza commerciale non valida → **escluso** dal modello di business finché COMMERCIAL-LICENSE.md non diventa esecutivo (questione legale, non tecnica).
- ✅ Panificio è un caso "template riutilizzabile" (separato dal brand personale) — coerente.

---

# PARTE B — SITO riccardobozzato.dev (audit tecnico)

## B.1 Build & Deploy [E]
- `npm run build` → exit 0 (verificato in sessione precedente). `.next/` generato.
- `netlify.toml`: `command="npm run build"`, `publish=".next"` → coerente con Next.js static/SSG.
- **GAP:** nessun `REDIRECTS`/canonical esplicito; dominio `riccardobozzato.dev` non ancora collegato (deploy rinviato per scelta tua).

## B.2 Security Headers [E]
`netlify.toml` CSP:
```
default-src 'self'; img-src 'self' data: https:;
script-src 'self' 'unsafe-inline';   ← DEBOLE
style-src 'self' 'unsafe-inline';
font-src 'self'; connect-src 'self' https://api.resend.com;
```
- ✅ X-Frame-Options DENY, Referrer-Policy, nosniff presenti.
- ⚠️ **`script-src 'unsafe-inline'`** permette XSS da qualunque injection. Next.js supporta nonce/hash; da migrare a `script-src 'self'` + nonce appena il sito esce da fase di prototipo. Priorità media (non bloccante per sito statico senza input utente non sanificato, ma da chiudere prima del go-live con form/API).

## B.3 Auth & Secrets [E]
- `src/lib/auth.ts`: JWT_HS256, issuer `riccardobozzato.dev`, audience `api.riccardobozzato.dev`, `JWT_SECRET` **obbligatorio** (throw se assente) → nessun fallback "demo". `validateCredentials` fail-closed. **Ottimo.**
- `.env.example` presente; `.env` deve contenere `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` a deploy-time.

## B.4 Contenuti & Funnel [E + H]
- Pagine: About (faceless + cane), progetti (Trova/VulnClaw/OmniVoice/Panificio), demo (6), freebie PDF (AI Ops Security Playbook, 95KB, 10 pagine).
- **[H]** metriche di traffico/conversione non disponibili (deploy rinviato).
- **GAP (da STRATEGY/GROWTH-ANALYSIS):** `RESEND_API_KEY` non settata → funnel email morto; nessuna `/services` page → consulenza non ha punto d'ingresso (coerente con "consulenza rinviata", ma il playbook CTA punta a riccardobozzato@gmail.com, non a uno step di nurturing).

## B.5 SEO & Accessibilità [E]
- `og:image` referenzia `/assets/trova-banner-1600x900.png` (verificare esista in `public/`).
- Nessun JSON-LD (`Product`/`Person`) né `sitemap` esplicito rilevato in `netlify.toml`/layout letti. **GAP:** da aggiungere prima go-live per visibilità organica.

## B.6 Identità confliggente [E]
`site.ts` → *"Operations & Delivery Consultant. Builder of AI-powered dev tools."*
Questa descrizione posiziona come **consulente** — ma STRATEGY sceglie il modello **indie-products-led**. Il copy del sito deve essere allineato a "builder di dev tools + faceless brand", non "consultant", altrimenti il visitatore si aspetta servizi B2B che non stai vendendo ora.

---

# PARTE C — BUSINESS & POSIZIONAMENTO FACELESS

## C.1 Mercato faceless 2026 [E] (ricerca live)
| Dato | Fonte | Implicazione |
|------|-------|-------------|
| Faceless = **38%** nuove venture monetizzate (da 12% nel 2022) | ContentGrip / MiraFlow / AutoFaceless 2025–26 | Trend confermato, non una scommessa |
| **Solo 3%** dei canali faceless automatizzati raggiunge la monetizzazione | SEO&Switch 2026 | Il faceless NON è "facile soldi"; serve volume+costanza |
| 3–5 post/settimana per **mesi** prima di risultati significativi | Clippie / MiraFlow 2026 | Il canale è lento; non è un'acquisizione rapida |
| Mascot/character ricorrente = fattore di "recognizability" (battaglia volti) | Lorphic / VO3 AI 2026 | **Il cane è un asset strategico**, non decorativo |
| RPM alto in tech/finance; produzione video <$3 caduno con AI | MiraFlow / ReelsMakerAI 2026 | Il modello "contenuto faceless + prodotti" ha economia favorevole |

## C.2 Posizionamento — dove giocare [E + H]
**Scelta STRATEGY:** indie-products-led (Trova €49 + VulnClaw license) con faceless content come UNICO canale di acquisizione.

**Perché il cane conta [E]:** la ricerca 2026 dice che in un feed saturo di "faceless dev tips" generici, la differenziazione viene da un **personaggio ricorrente riconoscibile** (mascot). Il pastore australiano è il tuo "Volto-sostituto" — crea memoria di marca senza volto. Questo è il vantaggio competitivo piú sottovalutato nel kit brand giá creato.

**Competitor diretti [E]:** pochi dev-tool faceless con mascot+cane. La categoria "dev security tips faceless" esiste (saturo di consigli AI-gen), ma la combinazione **persona-cane + prodotti reali shippati (Trova/VulnClaw)** è rara → spazio reale di differenziazione.

## C.3 Modello di business (da STRATEGY, raffinato)
| Layer | Prodotto | Prezzo | Stato |
|-------|---------|--------|------|
| Lead magnet | AI Ops Security Playbook (PDF) | €0 | ✅ pronto |
| Anchor | Trova (boilerplate) | €49 (testare €79) | ✅ pronto, serve Stripe |
| Defensible | VulnClaw Commercial License | €49–199 | ⚠️ posizionare come beta/authorized, non enterprise |
| Bundle | "Ship Safe Pack" (Trova+VulnClaw) | €99–149 | da creare |
| Deferred | Consulenza ops/security | €80–250/h | rinviata (trigger: ≥50 clienti prodotto) |

## C.4 Piano di validazione — conversione [H]→[E]
Ogni ipotesi interna ha un test eseguibile. (Deploy rinviato per tua scelta, quindi i test V1/V2 partono quando dirai "è pronto".)

| ID | Ipotesi | Test | Metric | Pass |
|----|---------|------|--------|------|
| V1 [H2] | il sito riceve traffico | Deploy + GA4/Netlify analytics | UV/30gg | ≥200 |
| V2 [H2] | Trova vende | Stripe live + 1 post | unità vendute/30gg | ≥3 |
| V3 [H1] | autorità faceless funziona | 4 post IG/YT (cane + ship-safe-code) | follower + saves | ≥50 OR ≥5 saves/post |
| V6 [H3] | ho il tempo | log ore/settimana | hr/wk | ≥6 sostenute |
| V8 | revenue totale | cumulativo 90gg | € | ≥300 → B validata |

## C.5 Scenari (da STRATEGY §7)
- **Base:** €150–400/90gg (content moderato, 6hr/wk).
- **Upside:** €800–2.000/90gg (1 post micro-virale, bundle funziona).
- **Downside:** €0–50/90gg (content flop, <4hr/wk) → pivot a consulenza pura.

---

# PARTE D — SINTESI: GAP CRITICI E AZIONI

## D.1 Blocchi sicurezza (fare prima del qualunque deploy)
1. **job-hunter PII**: aggiungere `cv/profile_*.json`, `jobs_output/*.json` a `.gitignore` prima di `git init`. [E]
2. **Trova BETTER_AUTH_SECRET**: generare secret a deploy-time, mai il placeholder. [E]
3. **VulnClaw**: non commercializzare come "enterprise hardened" finché `python_execute` non è containerizzato. Posizionare come beta. [E]
4. **OmniVoice**: COMMERCIAL-LICENSE.md è DRAFT non vincolante → non vendere closed-source finché non eseguito da un legale. [E]

## D.2 Gap sito `.dev` (pre-go-live)
5. Allineare `site.ts` da "Consultant" a "builder di dev tools / faceless brand". [E]
6. Chiudere CSP `unsafe-inline` → nonce/hash. [E]
7. Aggiungere JSON-LD + sitemap + verificare og:image. [E]
8. `social.ts`: sostituire placeholder con handle reali (quando creati). [E]

## D.3 Gap modello business
9. VulnClaw + Trova → "Ship Safe Pack" bundle (one-time, no metering infra). [E+H]
10. `RESEND_API_KEY` + `/services` page rimandati a scelta tua (deploy rinviato). [H]

## D.4 Cosa NON fare (disciplina)
- Non costruire i 6 demo come SaaS (3–6 mesi, domanda non provata).
- Non vendere OmniVoice closed-source oggi (lacuna legale).
- Non posizionare come consulente primario ora (H1/H3 non provati).

---

## Appendix — Fonti
**Repo audit (fact-based, agent explore, 2026-07-17):** saas-boilerplate-max, VulnClaw, OmniVoice-Studio, job-hunter.
**Sito .dev (file letti):** src/lib/auth.ts, netlify.toml, src/lib/site.ts, src/lib/social.ts.
**Mercato 2026 (web search live):** ContentGrip, MiraFlow, AutoFaceless, SEO&Switch, Clippie, Lorphic, VO3 AI, ReelsMakerAI, StarterPick (boilerplate), Axis Intelligence (SaaS pricing).
