# SINTESI FINALE — Analisi Portfolio & Piano Brand/Vendita

**Orchestratore:** AgentsOrchestrator · **Data:** 2026-07-17
**Scope:** riccardobozzato.dev (main), riccardobozzato-dev (fork), OmniVoice, VulnClaw, Trova, Panificio, job-hunter

---

## 🎯 EXECUTIVE SUMMARY

Hai una base tecnica **eccellente** e un sito main (`.dev`) già architecturato da senior con funnel di monetizzazione mappato. I gap principali sono:
1. **Bug UI critico** (Tailwind v4 `!` syntax) che rompe il layout
2. **URL hardcoded** che penalizza SEO sul dominio definitivo
3. **Prodotti OSS senza licensing commerciale** (il vero gap di revenue)
4. **Brand faceless non ancora sistemato** (logo/avatar/banner creati oggi)
5. **job-hunter** da tenere privato (rischio legale)

---

## 📊 COSA MIGLIORARE (per progetto)

### SITI (riccardobozzato.dev / -dev)
**🔴 CRITICO:**
- Fix `!pt-0` → `pt-0!` (39 occorrenze in B) — Tailwind v4 ha rimosso il prefisso `!`
- Centralizza dominio in `lib/site.ts` → `riccardobozzato.dev` (oggi punta a `.netlify.app`)
- `JWT_SECRET` senza fallback noto + `ADMIN_PASSWORD` ≠ `demo`

**🟠 MEDIO:**
- Blog → MDX (oggi hardcoded, fragile)
- Rate-limit su store condiviso (Blobs/Upstash) per serverless
- Auth reale (plan/trial) per monetizzazione
- Stripe per Trova/Prodotti
- Font → `next/font` (oggi `@import` render-blocking)

**🟡 BASSO:**
- Dark/Light toggle (docs dicono "optional" ma assente)
- RSS feed, JSON-LD Product/Breadcrumb, social share
- Unifica A→B (design-system driftato)

### VULNCLAW
- `python_execute` NON isolato → sandbox reale (blocco legale enterprise)
- Riconcilia MCP router↔registry (7 servizi inesistenti nel README)
- Constraint policy non aggiribile
- Licensing tiered + doc enterprise (EWASP/SOC2 evidence)

### TROVA
- Aggiungi LICENSE + termini
- Test critici auth/RBAC/webhook
- Valuta rischio LemonSqueezy → Stripe/Gumroad
- Demo live + landing

### OMNIVOICE
- Governance fork (debpalash vs tuo)
- Licenza commerciale dual + hosted demo
- Chiarisci pricing tiers (oggi solo "coming soon")

### PANIFICIO
- **Completa il deploy** (sitO pronto, non live)
- Congela scope (CRM/mobile = over-engineering per un panettiere)
- Estrai template riutilizzabile per altri locali

### JOB-HUNTER
- ❌ Non esporre `cloudflare_bypass_*` e credenziali
- Tieni privato (rischio ToS LinkedIn)

---

## 📋 COSA MANCA

| Area | Stato |
|------|-------|
| CMS/MDX blog | Manca in entrambi i siti |
| Auth/utenti reali + DB | Mock only |
| Stripe/billing | Assente |
| Demo funzionanti (non mock) | Mancano |
| Dark/Light toggle | Documentato ma assente |
| Social integration (share, OG img) | Parziale |
| Tests/CI | Assenti (eccetto OmniVoice/VulnClaw) |
| Commercial licensing (OSS) | ASSENTE — gap revenue #1 |
| Brand faceless kit | **CREATO OGGI** ✅ |
| Piano vendita | **CREATO OGGI** ✅ |

---

## 🚀 ROADMAP (90 GIORNI)

| Fase | Settimane | Deliverable |
|------|-----------|-------------|
| **HUB FIX** | 1-2 | Sito pronto (Tailwind, dominio, Plausible, brand kit live) |
| **QUICK WIN** | 3-4 | Trova vendibile (LICENSE+test+demo+landing) |
| **SECURITY** | 5-6 | VulnClaw sandbox + pricing + YouTube serie |
| **DUAL LIC** | 7-8 | OmniVoice licensing + hosted demo |
| **LOCAL** | 9-10 | Panificio deploy + template estratto |
| **HIGH-TICKET** | 11-12 | Servizi pricing + LinkedIn + email nurture |

**Revenue Y1 target:** €40k–100k

---

## 🎨 DELIVERABLE BRAND CREATI OGGI

```
riccardobozzato.dev/brand/
├── logo/rb-logo-faceless.svg     (profile pic universale)
├── logo/rb-mascot-hex.svg        (watermark/intro)
├── social/twitch-banner.svg      (1920×480)
├── social/youtube-banner.svg     (2560×1440)
├── social/instagram-profile.svg  (1080×1080)
└── guidelines/
    ├── BRAND-FACELESS.md         (identità + voice + social kit)
    └── SALES-PLAN.md             (monetizzazione completa)
```

**Concept faceless:** "The builder behind the terminal" — mark RB + terminale, nessun volto.
Tagline: `> building tools, breaking limits`

---

## ✅ PROSSIMI PASSI CONSIGLIATI (tuoi)

1. **Immediato:** applica i 2 fix critici sul sito (.dev) — così smetti di perdere SEO/layout
2. **Settimana 1:** attiva Plausible + collega dominio riccardobozzato.dev
3. **Settimana 3:** lancia Trova su Gumroad/Stripe (quick win)
4. **Settimana 5:** prima live Twitch faceless + serie YouTube VulnClaw
5. **Ongoing:** IG caroselli 2×/settimana dal brand kit

---

*Pipeline AgentsOrchestrator completata · tutti i deliverable salvati in riccardobozzato.dev/brand/*
