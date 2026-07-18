# Piano di Vendita & Monetizzazione — Portfolio Riccardo Bozzato

> Orchestrato da AgentsOrchestrator · 2026-07-17
> Obiettivo: trasformare il portfolio (siti + prodotti OSS + template) in un ecosistema di revenue coordinato dal personal brand faceless **riccardobozzato.dev**.

---

## 0. ARCHITETTURA DELLA MONETIZZAZIONE

```
        riccardobozzato.dev (HUB faceless)
        /      |       |       \
   YouTube   Twitch   Instagram   Newsletter
     |          |         |           |
     +---- funnel lead magnet (PDF freebie) ----+
                      |
        +-------------+-------------+
        |             |             |
   VulnClaw      Trova        OmniVoice
   (open-core)   (boilerplate)  (licenza dual)
        |             |             |
   Consulenza Ops &   Servizi       Licenze
   Delivery (1:1)     clienti locali  commerciali
```

**Principio:** il sito + social sono la vetrina; i prodotti sono i motori di revenue; la consulenza è l'high-ticket.

---

## 1. VULNCLAW — Open-Core Security (PRIORITÀ #1)

**Potenziale:** ALTÍSSIMO (nicchia local-first AI pentest, first-mover)
**Gap critici (da audit):** sandbox `python_execute`, licensing tiered, doc enterprise

### Modello di pricing (open-core)
| Tier | Prezzo | Contenuto |
|------|--------|-----------|
| Community | €0 (MIT) | CLI base, 13 provider, report |
| Pro | €29/mese | Sandbox sicura, RAG, skill EN, support |
| Team | €99/mese | Multi-seat, audit trail, CI/CD SARIF |
| Enterprise | €15k+/anno | On-prem, SLA, threat-model, deploy K8s |

### Azioni di vendita
1. **Risolvi il rischio legale** (`python_execute` in sandbox gVisor) → sblocca enterprise
2. **Landing page dedicata** su riccardobozzato.dev/projects/vulnclaw con pricing + demo video
3. **YouTube:** serie "AI Pentester" faceless (screen + voice) → drive a free tier
4. **Lead magnet:** "AI Pentest Checklist PDF" (estensione del freebie esistente)
5. **Outbound:** contatta bug-bounty teams / security boutique per trial Team

**Revenue stimato Y1:** €8k–25k (con 50 Pro + 10 Team)

---

## 2. TROVA (saas-boilerplate-max) — Template One-Time

**Potenziale:** MEDIO-ALTO (quick win)
**Gap:** LICENSE, test critici, landing/demo live, rischio LemonSqueezy

### Modello
- **€149 one-time** (LemonSqueezy/Gumroad) → valuta Stripe diretto per evitare rischio processor
- **+€49 bundle** "production-ready deploy guide" (Vercel/Railway + Supabase)

### Azioni
1. Aggiungi `LICENSE` + termini d'uso
2. Scrivi test su auth/RBAC/webhook prima di vendere
3. Crea **demo live** trova.dev (o subdomain) con seed data
4. Caroselli IG "SaaS in 7 giorni" → link in bio
5. YouTube: "Build a SaaS in a weekend with Trova"

**Revenue stimato Y1:** €5k–12k (40–80 vendite)

---

## 3. OMNIVOICE-STUDIO — Licenza Dual

**Potenziale:** ALTO (migliore base engineering) ma licensing assente
**Gap:** governance fork, licenza commerciale, hosted demo

### Modello
- **AGPL-3.0** (community) + **Commercial License** (embedding in prodotti chiusi)
- **Hosted "Pro" tier:** API gestita cloud per chi non vuole scaricare 16GB di modelli
- **Voice pack marketplace** (future)

### Azioni
1. Chiarisci governance (fork da debpalash vs tuo) nel README
2. Crea pagina licensing su sito + checkout (Stripe/Paddle)
3. Lancia **hosted demo** per ridurre friction (il download pesa)
4. YouTube faceless: "Clone any voice locally — no cloud"

**Revenue stimato Y1:** €3k–10k (licenze + hosted)

---

## 4. PANIFICIO DA SERGIO — Case Study → Template Locale

**Potenziale:** BASSO come prodotto (one-off), ALTO come template ripetibile
**Gap:** completare deploy, congelare scope

### Modello
- **Consegna cliente:** €2.5k–4k one-time + €50/mese manutenzione
- **Template "LocalBiz Site":** pacchetto riutilizzabile per ristoranti/panifici (ordine WhatsApp + Stripe)
  - Vendita: €990 one-time o servizio "setup in 1 settimana" €1.5k

### Azioni
1. Completa deploy (migrazioni + Stripe live + variabili)
2. Estrai template riutilizzabile da `config.js` parametrizzato
3. Case study sul sito → genera lead per altri clienti locali
4. IG: caroselli "Il sito del tuo panificio in 7 giorni"

**Revenue stimato Y1:** €6k–15k (3–5 clienti locali)

---

## 5. CONSULENZA OPS & DELIVERY — High-Ticket

**Driver:** il ruolo Head of Operations / Delivery Manager (da CV + about)
**Canali:** riccardobozzato.dev/services + LinkedIn + YouTube authority

### Modello
| Servizio | Prezzo |
|----------|--------|
| Audit operativo (1 settimana) | €1.5k |
| Consulenza mensile (retainer) | €3k–5k/mese |
| Workshop team (delivery/agile) | €2k/giorno |

### Azioni
1. Pagina `/services` già presente in B (.dev) → attiva con pricing reale
2. Lead gen da YouTube/Twitch (autorità su ops + build)
3. Email sequence (già coded in B) → nurture verso call
4. LinkedIn: post settimanali su delivery/ops (IT/EU)

**Revenue stimato Y1:** €15k–40k (se 2–3 retainer)

---

## 6. JOB-HUNTER — NON monetizzare direttamente

**Decisione:** tieni privato. Rischio ToS LinkedIn + `cloudflare_bypass` da non esporre.
**Uso:** force-multiplier personale per la tua job search (Head of Ops EU).
**Se mai prodottizzare:** solo come template open-source con donazioni, mai public auto-apply.

---

## 7. FUNNEL & GROWTH (cross-project)

1. **Freebie PDF** (esistente) → cattura email
2. **Email sequence 6-step** (coded in B) → nurture
3. **Demo interattive** (B) → mostra valore prodotti
4. **YouTube/Twitch faceless** → top-of-funnel
5. **IG caroselli** → link in bio → sito
6. **Plausible analytics** (cookie-free) → misura conversioni
7. **Stripe/Paddle** → checkout centralizzato

**Quick win:** attiva `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` + collega dominio `riccardobozzato.dev` (fix URL hardcoded).

---

## 8. ROADMAP REVENUE (90 giorni)

| Settimana | Azione | Output |
|-----------|--------|--------|
| 1-2 | Fix sito (Tailwind `!`, dominio, Plausible) | HUB pronto |
| 3-4 | Trova: LICENSE + test + demo + landing | Prodotto vendibile |
| 5-6 | VulnClaw: sandbox + pricing page + YouTube ser | Pipeline security |
| 7-8 | OmniVoice: licensing page + hosted demo | Revenue dual |
| 9-10 | Panificio: deploy + template estratto | Caso studio live |
| 11-12 | Servizi: pricing + LinkedIn + email nurture | Retainer pipeline |

**Target revenue Y1 conservativo:** €40k–100k (sito hub + 3 prodotti + consulenza)

---

*Generato da AgentsOrchestrator · 2026-07-17*
