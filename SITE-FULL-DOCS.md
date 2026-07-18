# Riccardo Bozzato — Sito Portfolio

**URL**: https://idyllic-cranachan-b2c666.netlify.app  
**Dominio principale**: https://riccardobozzato.dev  
**Stack**: Next.js 16 (Turbopack) + next-intl (i18n) + Tailwind v4 + shadcn/ui  
**Hosting**: Netlify (auto-deploy da GitHub)  
**Pagamenti**: Stripe (per Trova)  
**Email**: Resend (form contatto, freebie automation, transazionali)  
**Auth**: Better Auth (magic link, OAuth, 2FA)

---

## INDICE

1. [Sitemap completa](#1-sitemap-completa)
2. [Navigazione](#2-navigazione)
3. [Footer](#3-footer)
4. [Homepage](#4-homepage)
5. [Servizi (Services)](#5-servizi-services)
6. [Progetti / Case Studies](#6-progetti--case-studies)
7. [Trova (prodotto SaaS)](#7-trova-prodotto-saas)
8. [About / Chi Sono](#8-about--chi-sono)
9. [Freebie / Operational Chaos Diagnostic](#9-freebie--operational-chaos-diagnostic)
10. [Contattami](#10-contattami)
11. [Blog](#11-blog)
12. [Privacy Policy](#12-privacy-policy)
13. [Login / Thank You / Unsubscribe / 404 / Cookies](#13-pagine-secondarie)
14. [Dati strutturati e identità](#14-dati-strutturati-e-identità)
15. [Social Profiles](#15-social-profiles)

---

## 1. SITEMAP COMPLETA

### Pagine principali (EN + IT)

| Route | EN Title | IT Title | Tipo |
|-------|----------|----------|------|
| `/` | Riccardo Bozzato | Riccardo Bozzato | Homepage |
| `/services` | Operations & Delivery — Risultati Misurabili | Operations & Delivery — Risultati Misurabili | Servizi |
| `/projects` | Case Studies | Case Studies | Vetrina progetti |
| `/projects/panificio` | Panificio Da Sergio - Stakeholder Delivery | Panificio Da Sergio - Delivery con Stakeholder | Case study dettaglio |
| `/projects/vulnclaw` | VulnClaw - Product Delivery: AI CLI | VulnClaw - Product Delivery: CLI AI | Case study dettaglio |
| `/trova` | Trova - The SaaS boilerplate that actually ships. | Trova - Il boilerplate SaaS che va davvero in produzione. | Pagina prodotto |
| `/freebie` | Operational Chaos Diagnostic - Download Gratuito | Operational Chaos Diagnostic - Download Gratuito | Landing risorsa gratuita |
| `/about` | About Riccardo | Su Riccardo | Bio + percorso |
| `/contact` | Get in Touch | Contattami | Contatti |
| `/blog` | Blog | Blog | Blog posts |
| `/blog/[slug]` | (dynamic) | (dynamic) | Singolo post |
| `/privacy` | Privacy Policy | Privacy Policy | Informativa privacy |
| `/login` | Login - Area Clienti | Login - Area Clienti | Login amministrazione |
| `/thank-you` | (download conferma) | (download conferma) | Post-download freebie |
| `/unsubscribe` | (disiscrizione) | (disiscrizione) | Gestione unsubscribe |

### API routes

| Route | Funzione |
|-------|----------|
| `POST /api/contact` | Invia messaggio dal form contatti |
| `POST /api/freebie` | Invia PDF freebie via Resend |
| `POST /api/leads` | Salva lead in DB |
| `POST /api/unsubscribe` | Gestisce disiscrizione |
| `POST /api/auth/login` | Login amministrazione |
| `GET /api/auth/verify` | Verifica token auth |
| `POST /api/cron/email-sequence` | Cron per sequenza email automatica |

### Pagine rimosse col rebrand (non più in navigazione, ma forse ancora esistenti)
- `/demo/ai-agent`
- `/demo/automation`
- `/demo/cost-calculator`
- `/demo/integration`
- `/demo/tech-audit`
- `/demo/turnkey`
- `/demo/layout`
- Relative API routes per ciascuna demo

---

## 2. NAVIGAZIONE

### Navbar (fissa, sticky, backdrop-blur)

**Logo**: `Riccardo.Bozzato` con icona esagonale

**Voci menu** (desktop e mobile):
```
Home  |  Services  |  Projects  |  Blog  |  About  |  Contact
```

**Elementi extra**:
- **Language Switcher**: EN ↔ IT (basato su pathname corrente)
- **Free Playbook CTA**: Bottone `✨ Free Playbook` → `/freebie`
- **Social icons** (desktop): solo profili attivi (GitHub, LinkedIn, Email)
- **Mobile menu**: hamburger con le stesse voci + CTA Free Playbook

**DEMO_ITEMS**: rimosse dal nav principale (commento nel codice: "il sito è stato riposizionato su Operations & Delivery, non developer portfolio").

---

## 3. FOOTER

Layout a 4 colonne:

### Colonna 1 — Brand
- Logo `Riccardo.Bozzato`
- Tagline: "Senior Delivery Manager | Head of Operations | PMP® — operations, execution, AI-enabled workflows"
- Recapiti: Legnaro, PD, Italy
- Telefono: +39 389 213 9542
- Email: riccardobozzato@gmail.com

### Colonna 2 — Navigate
```
Home | Services | Projects | Free Diagnostic | Blog | About | Contact
```

### Colonna 3 — Projects
```
Trova | VulnClaw | Panificio Da Sergio
```

### Colonna 4 — Free Diagnostic
- "Get the Operational Chaos Diagnostic — a 3-hour framework to map, measure, and prioritize operational debt."
- Bottone "Download Free" → `/freebie`
- **Connect**: GitHub, LinkedIn, Email (solo profili attivi)
- Privacy Policy | Built with Next.js & shadcn/ui | © {year}

---

## 4. HOMEPAGE

### EN

**Hero**:
```
Operations, delivery, and execution — with a builder mindset.
No chaos. Just processes that work.

Senior Delivery Manager & Head of Operations (PMP®). I build the operational
architecture — processes, KPIs, governance, automation — that turns growth chaos
into predictable execution. €500K+ enterprise portfolio, teams of 8-12, 40% faster
time-to-market.

[Let's Talk] [See Results]
```

**Featured / Risultati Misurabili**:
```
Titolo: Risultati Misurabili
Sottotitolo: Numeri che parlano. Nessuna storia.
```

**Servizi in homepage** (4 card):

| # | Titolo | Descrizione |
|---|--------|-------------|
| 1 | Delivery & Process Design | Agile, Scrum, Kanban. Release planning, capacity management, risk mitigation. Team 8-12, portfolio €500K+. Riduzione time-to-market 20-40%. |
| 2 | eCommerce & PIM-DAM Operations | Pimcore, Magento, Shopware. Implementazioni enterprise, integrazione piattaforme, governance del dato. Riduzione time-to-market del 40% su progetti PIM. |
| 3 | AI-Assisted Operations | Automazione flussi, dashboard KPI real-time, knowledge base centralizzata. Documentazione processi + AI workflow = 10-40 ore/settimana recuperate. |
| 4 | Fractional Head of Ops / Delivery | Per startup early-stage che non hanno ancora un Head of Operations interno. Interim o part-time. Costruisco l'architettura, formo il team, lascio il sistema funzionante. |

**About preview**:
```
Titolo: Dal retail alla cabina di regia.
Testo: 7+ anni di operations. Partito dal retail (In's Mercato, Aldi), passato per
Accenture (automazione processi, +30% efficienza), poi Esse Solutions (portfolio
€500K, team 8-12, Agile). Head of Operations da Ciao Elsa (2026). PMP® certificato.
Ora aiuto team digitali a scalare senza implodere.
CTA: Storia Completa →
```

**Freebie preview**:
```
Titolo: Free: Operational Chaos Diagnostic
Desc: A 3-hour framework to map, measure, and prioritize operational debt.
CTA: Download Free →
```

### IT (stessa struttura, traduzione italiana)

**Hero**:
```
Operations, delivery ed execution — con una mentalità da builder.
Niente caos. Solo processi che funzionano.

Senior Delivery Manager & Head of Operations (PMP®). Costruisco l'architettura
operativa — processi, KPI, governance, automazione — che trasforma il caos della
crescita in esecuzione prevedibile. Portfolio enterprise €500K+, team 8-12,
-40% time-to-market.

[Parliamone] [Vedi i Risultati]

Risultati Misurabili
Numeri che parlano. Niente storie.
```

---

## 5. SERVIZI (SERVICES)

### Pagina servizi completa

```
Titolo: Operations & Delivery — Risultati Misurabili
Sottotitolo: Fixed price. Delivered.
```

**Hero desc (EN)**:
```
Have an operational problem? I build the architecture — processes, KPIs, team,
automation — that turns chaos into a predictable system. PMP® certified, €500K+
portfolio, teams of 8-12, 40% faster time-to-market. No fluff: just what it takes
to scale.

CTA: Let's Talk
```

**Hero desc (IT)**:
```
Hai un problema operativo? Costruisco l'architettura — processi, KPI, team,
automazione — che trasforma il caos in esecuzione prevedibile. PMP® certificato,
portfolio €500K+, team 8-12, -40% time-to-market. Niente fuffa: solo quello che
serve per scalare.

CTA: Parliamone
```

### Pacchetti servizio

#### 1. Delivery & Process Design
- **Prezzo**: From €1,500
- **Desc**: Agile transformation, release planning, capacity management, risk mitigation. Per team digital che vogliono prevedibilità senza burocrazia.
- **Features**:
  - Current-state process audit & gap analysis
  - Agile/Scrum/Kanban framework implementation
  - Release planning & capacity modeling
  - Risk management framework & mitigation
  - KPI dashboard: velocity, quality, predictability

#### 2. eCommerce & PIM-DAM Operations
- **Prezzo**: From €2,000
- **Desc**: Pimcore, Magento, Shopware — implementazioni enterprise, integrazioni, governance del dato. Riduzione time-to-market 20-40%.
- **Features**:
  - PIM/DAM architecture & implementation
  - eCommerce platform integration (Magento, Shopware)
  - Data governance & quality frameworks
  - Workflow automation for product content
  - Team training & knowledge transfer

#### 3. AI-Assisted Operations
- **Prezzo**: From €2,500
- **Desc**: Automazione flussi operativi, dashboard KPI real-time, knowledge management centralizzato. Recupera 10-40 ore/settimana.
- **Features**:
  - Process documentation & knowledge base setup
  - AI workflow automation (support, data, content)
  - Real-time KPI dashboards & alerting
  - Tool integration & middleware
  - ROI measurement framework

#### 4. Fractional Head of Ops / Delivery
- **Prezzo**: From €3,000/mo
- **Desc**: Interim o part-time per startup early-stage. Costruisco l'architettura operativa, formo il team, lascio il sistema funzionante.
- **Features**:
  - Operations architecture design
  - Team structure & hiring support
  - Process governance & accountability
  - SLA framework & escalation paths
  - Handover documentation & training

### Metodo di lavoro (split EN/IT — diversi per lingua)

**Versione EN**:
```
Title: How I Work
Subtitle: Fixed price. On time. Production-ready.
Steps:
  1. Diagnosis — I analyze the current state: processes, resources, KPIs, bottlenecks.
     In 1 week I deliver a chaos map and a prioritized action plan.
  2. Architecture — I design the operational architecture: processes, governance,
     metrics, automation. Everything documented, everything measurable.
  3. Execution — I implement the system with weekly checkpoints, transparent progress,
     and continuous feedback. I train the team, I leave skills.
  4. Handover — Complete documentation, knowledge transfer, success metrics. Your team
     operates autonomously. Optional support for evolution.
```

**Versione IT**:
```
Steps:
  1. Discovery — Definiamo il problema, vincoli e criteri di successo. Consegno
     architettura e preventivo a prezzo fisso — nessun impegno.
  2. Costruzione — Costruisco la soluzione end-to-end con checkpoint settimanali,
     progresso trasparente e feedback continuo.
  3. Deploy — Deployment in produzione con monitoraggio, documentazione e passaggio
     di consegne. Il tuo team può gestirlo in autonomia.
  4. Evoluzione — Ritainer opzionale per ottimizzazione continua, nuove funzionalità
     e supporto. Il tuo sistema scala con te.
```

---

## 6. PROGETTI / CASE STUDIES

### Pagina progetti

```
Title: Case Studies
Subtitle: Prodotti, progetti e processi che ho costruito — con tutto quello che ho
imparato lungo la strada.
```

### Panificio Da Sergio

**EN**:
```
Title: Panificio Da Sergio
Subtitle: Stakeholder Delivery: E-Commerce for a Family Bakery
Description: Delivered a full e-commerce platform for a traditional Italian bakery —
managing stakeholder expectations, technical constraints, and a tight budget. A lesson
in scope negotiation, client communication, and shipping under real-world constraints.
Features:
  - Stakeholder management: translating family needs into technical requirements
  - Budget-constrained delivery: full e-commerce under material constraints
  - Multi-language (EN/IT) with local SEO
  - End-to-end: product catalog → orders → admin dashboard
Tech stack: Next.js, Tailwind CSS, TypeScript, i18n, PostgreSQL
CTA: Read Case Study
Note: Family project, delivered under budget
```

**IT**:
```
Title: Panificio Da Sergio
Subtitle: Delivery con Stakeholder: E-Commerce per una Famiglia
Description: Consegnata una piattaforma e-commerce completa per un panificio tradizionale
— gestendo aspettative degli stakeholder, vincoli tecnici e un budget stretto. Una
lezione di negoziazione dello scope, comunicazione col cliente e delivery sotto
vincoli reali.
Features:
  - Gestione stakeholder: tradurre bisogni familiari in requisiti tecnici
  - Delivery con budget limitato: e-commerce completo sotto vincoli reali
  - Multi-lingua (EN/IT) con SEO locale
  - End-to-end: catalogo prodotti → ordini → dashboard admin
Tech stack: Next.js, Tailwind CSS, TypeScript, i18n, PostgreSQL
CTA: Leggi il Case Study
Note: Progetto familiare, consegnato sotto budget
```

### VulnClaw

**EN**:
```
Title: VulnClaw
Subtitle: Product Delivery: AI CLI from Zero to Open Source Community
Description: Built an open-source AI penetration testing CLI from scratch. Managed
scope, community contributions, roadmap prioritization, and shipping a v0.4.0 with
active users. Key lesson: starting narrow beats building broad every time.
Features:
  - Product scoping: from port scanner to full AI agent in 6 months
  - Community management: triaging PRs, issues, and feature requests
  - Roadmap prioritization: saying "no" to good ideas to ship the essential ones
  - Open source as a delivery strategy
Tech stack: Python, Typer, Rich, Prompt Toolkit, AI/LLM
Status: Shipped v0.4.0
CTA: Read Case Study
```

**IT**:
```
Title: VulnClaw
Subtitle: Product Delivery: CLI AI dalla Community Open Source
Description: Ho costruito un CLI open-source di penetration testing AI da zero.
Gestione dello scope, contributi della community, priorità roadmap e shipping della
v0.4.0 con utenti attivi. Lezione chiave: iniziare stretto batte costruire largo
ogni volta.
Features:
  - Product scoping: da port scanner ad agente AI in 6 mesi
  - Community management: triage di PR, issue e feature request
  - Prioritizzazione roadmap: dire "no" alle buone idee per ship quelle essenziali
  - Open source come strategia di delivery
Tech stack: Python, Typer, Rich, Prompt Toolkit, AI/LLM
Status: Shippato v0.4.0
CTA: Leggi il Case Study
```

---

## 7. TROVA (PRODOTTO SAAS)

### Pagina prodotto Trova

**EN**:
```
Title: Trova
Tagline: The SaaS boilerplate that actually ships.
Description: Stop rebuilding auth, emails, billing, and i18n for every project. Trova
gives you a production-ready foundation so you can focus on what makes your SaaS unique.

Features:
  - Better Auth — magic links, OAuth (Google, GitHub), 2FA, session management
  - Drizzle ORM — type-safe, migration-ready, PostgreSQL
  - Resend + React Email — transactional emails, 5 templates included
  - next-intl — English and Italian out of the box, easy to extend
  - Stripe — subscriptions, webhooks, customer portal
  - shadcn/ui + Tailwind v4 — dark mode, responsive, customizable

Pricing:
  Title: Simple Pricing
  Subtitle: One price. Everything included.
  Price: €49 one-time
  Includes: Full source code, lifetime updates, priority support
  CTA: Buy Trova
  Guarantee: 30-day money-back guarantee
```

**IT**:
```
Title: Trova
Tagline: Il boilerplate SaaS che va davvero in produzione.
Description: Smetti di re-inventare autenticazione, email, fatturazione e i18n per ogni
progetto. Trova ti dà una base pronta per la produzione, così puoi concentrarti su ciò
che rende unico il tuo SaaS.

Features: (tradotte in italiano)
  - Better Auth — magic link, OAuth (Google, GitHub), 2FA, gestione sessioni
  - Drizzle ORM — type-safe, migration-ready, PostgreSQL
  - Resend + React Email — email transazionali, 5 template inclusi
  - next-intl — Inglese e Italiano già pronti, estendibili
  - Stripe — piani abbonamento, webhook, portale clienti
  - shadcn/ui + Tailwind v4 — dark mode, responsive, custom

Pricing:
  Title: Prezzo Semplice
  Subtitle: Un prezzo. Tutto incluso.
  Price: €49 una tantum
  Includes: Codice sorgente completo, aggiornamenti a vita, supporto prioritario
  CTA: Acquista Trova
  Guarantee: Garanzia rimborso 30 giorni
```

---

## 8. ABOUT / CHI SONO

### EN

```
Title: About Riccardo
Subtitle: Operations & Delivery. PMP®. Dalla trincea alla cabina di regia.

Intro: Operations & Delivery Manager (PMP®). 7+ anni a costruire architetture
operative che scalano. Portfolio enterprise €500K+, team 8-12, -40% time-to-market.
Partito dal retail, passato per Accenture, ora aiuto team digitali a scalare senza
implodere.

Story (5 paragrafi):
  1. "Il mio percorso inizia nel retail management — In\u0027s Mercato, Aldi, Terranova —
      dove ho imparato leadership operativa, gestione team e KPI sul campo, gestendo
      turni, costi e performance di punto vendita."
  2. "Poi Accenture: sviluppo applicazioni enterprise (SAP UI5, JavaScript),
      automazione processi con risultati misurabili: +30% efficienza, -15% errori
      amministrativi, -20% tempi di risposta. La prima volta che ho capito che i
      processi giusti battono il talento grezzo."
  3. "In Esse Solutions ho gestito un portfolio progetti digitali da €500K,
      coordinando team distribuiti di 8-12 persone su eCommerce B2B (Magento, Shopware)
      e PIM/DAM (Pimcore). Introdotto Agile strutturato: +25% produttività, -40%
      time-to-market, -20% tempi di completamento."
  4. "In Ciao Elsa ho ricoperto il ruolo di Head of Operations, costruendo l'architettura
      operativa da zero per una startup AI-native. Processi, KPI, struttura del team,
      governance — da zero a operations funzionanti in 8 settimane. Un engagement breve
      ma intenso, che ha dimostrato come il playbook funzioni anche a velocità startup."
  5. "Oggi opero come consulente indipendente. Aiuto aziende digitali a costruire
      architetture operative scalabili — processi, KPI, governance, automazione — che
      trasformano il caos in esecuzione prevedibile. Certificato PMP®. Nel tempo libero
      costruisco strumenti (Trova, VulnClaw), perché chi costruisce operations migliori
      è anche chi costruisce prodotti."

Philosophy: "Il problema non è la mancanza di talento o di idee. Il problema è che le
operations collassano sotto il peso della crescita. Il mio lavoro è costruire
l'architettura operativa che trasforma il potenziale in esecuzione prevedibile. Combino
rigore metodologico (PMP®), esperienza enterprise e velocità operativa. Niente buffer.
Niente attriti. Solo processi che funzionano."
```

**Certifications**:
  - PMP® — Project Management Professional (2026)
  - Cisco Cybersecurity Operation Associate (2024)
  - Google Data Analyst Certificate (2023)
  - Pimcore Consultant Certified (2024)

**Skills** (17):
  Project Management, Agile/Scrum/Kanban, Budget & Risk Management,
  eCommerce (Adobe Commerce/Magento, Shopware), PIM/DAM (Pimcore),
  SAP UI5, JavaScript, Python, SQL, HTML/CSS, Jira, Confluence, MS Project,
  Data Analysis & Reporting, Process Documentation, AI Tools for Operations,
  Knowledge Management

**CTA**: Let's Talk → /contact

### EN (aggiornata — Ciao Elsa inserita)

**Story (5 paragrafi)**:
```
1. "My career started in retail management — In's Mercato, Aldi, Terranova — where I
    learned operational leadership, team management, and KPIs on the ground: managing
    shifts, costs, and store performance."
2. "Then Accenture: enterprise application development (SAP UI5, JavaScript), process
    automation with measurable results: +30% efficiency, -15% administrative errors,
    -20% response times. The first time I understood that the right processes beat
    raw talent."
3. "At Esse Solutions I managed a €500K digital project portfolio, coordinating
    distributed teams of 8-12 on B2B eCommerce (Magento, Shopware) and PIM/DAM
    (Pimcore). Introduced structured Agile: +25% productivity, -40% time-to-market,
    -20% completion times."
4. "At Ciao Elsa I served as Head of Operations, building the operational architecture
    from the ground up for an AI-native startup. Defined processes, KPIs, team
    structure, and governance — from zero to functional operations in 8 weeks. A short,
    intense engagement that proved the playbook works even at startup speed."
5. "Today I work as an independent consultant. I help digital companies build scalable
    operational architectures — processes, KPIs, governance, automation — that turn
    chaos into predictable execution. PMP® certified. In my free time I build tools
    (Trova, VulnClaw), because those who build better operations also build better
    products."
```

### IT (stessa struttura, tradotta in italiano)

```
Title: Su Riccardo
Subtitle: Operations & Delivery. PMP®. Dalla trincea alla cabina di regia.
CTA finale: Parliamone
CTA bottom: Parliamone (con descrizione "Hai un progetto, un'idea o semplicemente
curiosità? Sono sempre aperto a conversazioni interessanti.")
```

---

## 9. FREEBIE / OPERATIONAL CHAOS DIAGNOSTIC

### EN

```
Title: Operational Chaos Diagnostic
Subtitle: A 3-hour framework to map, measure, and prioritize operational debt — before
it becomes a crisis.
Description: A field-tested worksheet based on the same framework I use in consulting
engagements. Map your processes, baseline your metrics, and build your priority matrix
in three focused sessions.

What's inside:
  - The Process Map: end-to-end workflow visualization
  - The Metric Baseline: lead time, active time, wait time
  - The Priority Matrix: impact vs. fixability scoring
  - Pre-filled examples for real processes
  - Top 3 Actions This Week: immediate next steps

Form:
  Name: "Your name"
  Email: "you@company.com"
  CTA: "Send Me the Diagnostic"
  Success: "Check your inbox! The diagnostic is on its way."
  Privacy: "No spam. Unsubscribe anytime."
```

### IT

```
Title: Operational Chaos Diagnostic
Subtitle: Un framework da 3 ore per mappare, misurare e prioritizzare il debito
operativo — prima che diventi crisi.
Description: Un worksheet testato sul campo basato sullo stesso framework che uso nelle
consulenze. Mappa i tuoi processi, misura le metriche di base e costruisci la matrice
di priorità in tre sessioni mirate.

What's inside:
  - La Process Map: visualizzazione end-to-end dei flussi di lavoro
  - La Metric Baseline: lead time, active time, wait time
  - La Priority Matrix: scoring impatto vs. risolvibilità
  - Esempi pre-compilati per processi reali
  - Top 3 Azioni Questa Settimana: prossimi passi immediati

Form:
  Name: "Il tuo nome"
  Email: "tu@azienda.com"
  CTA: "Inviami il Diagnostic"
  Success: "Controlla la tua casella! Il diagnostic è in arrivo."
  Privacy: "Niente spam. Ti cancelli quando vuoi."
```

---

## 10. CONTATTO

### EN

```
Title: Get in Touch
Subtitle: Building something interesting? Let's talk operations, security, or tools.

Form fields:
  - Name (placeholder: "Your name")
  - Email (placeholder: "you@company.com")
  - Message (placeholder: "What are you building?")
  - Submit: "Send Message"
  - Success: "Thanks! I'll get back to you within 24 hours."
  - Error: "Something went wrong. Try emailing me directly."

Contact info:
  - Email: riccardobozzato@gmail.com
  - GitHub: github.com/Riccardobozzato94
  - LinkedIn: linkedin.com/in/riccardobozzato
```

### IT

```
Title: Contattami
Subtitle: Stai costruendo qualcosa di interessante? Parliamo di operations, sicurezza
o strumenti.
(Stessi campi form tradotti in italiano)
```

---

## 11. BLOG

### Blog listing page

Route: `/blog` e `/it/blog`
Mostra elenco di post del blog (contenuto dinamico da `src/content/blog/index.ts`).

### Blog post detail

Route: `/blog/[slug]` e `/it/blog/[slug]`
Singolo post con contenuto full.

---

## 12. PRIVACY POLICY

Pagine `/privacy` e `/it/privacy` — completa informativa GDPR con 11 sezioni:

1. Data Controller — Riccardo Bozzato, Legnaro PD
2. Data I Collect — form contatto, freebie downloads, consulting inquiries, analytics
3. How I Use Your Data — rispondere a richieste, inviare risorse, comunicare consulenze
4. Email Marketing (Consent & Unsubscribe) — sequenza 6 email in 30 giorni
5. Legal Basis (GDPR) — consenso, necessità contrattuale, legittimo interesse
6. Data Retention — 12 mesi inattività, fino a disiscrizione, +24 mesi fiscali
7. Your Rights (GDPR) — accesso, rettifica, cancellazione, limitazione, portabilità
8. Third-Party Processors — Resend, Netlify, GitHub, Stripe, Iubenda
9. Data Security — HTTPS, access control, minimizzazione
10. Changes to This Policy
11. Contact

---

## 13. PAGINE SECONDARIE

### Login

Route: `/login`, `/it/login`
Titolo: "Login - Area Clienti"
Pannello admin con autenticazione.

### Thank You (post freebie download)

Route: `/thank-you`, `/it/thank-you`
Messaggio di conferma download + sequenza email in arrivo (5 email, giorni 1-14).
Link a blog e progetti.

### Unsubscribe

Route: `/unsubscribe`, `/it/unsubscribe`
Gestione disiscrizione con stati: processing, success, already, error.
Link "Back to Home".

### 404

Per pagine non trovate — titolo "404", messaggio amichevole, CTA "Go Home".

### Cookie banner

Banner cookie con "Accept All" / "Only Necessary". Solo cookie tecnici e analytics
anonimizzati. Nessun cookie di profilazione. Link a Privacy Policy.

---

## 14. DATI STRUTTURATI E IDENTITÀ

### SITE config (`src/lib/site.ts`)
```
SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.dev"
SITE_NAME = "riccardobozzato.dev"
OG_IMAGE = "/assets/trova-banner-1600x900.png"
```

### Meta description (EN)
```
Senior Delivery Manager & Head of Operations (PMP®) from Legnaro, PD. I build operational
architectures that scale: process design, team leadership, eCommerce/PIM-DAM delivery,
and AI-enabled operations. €500K+ enterprise portfolio, 8-12 person teams,
25-40% efficiency gains.
```

### Tagline
```
Senior Delivery Manager | Head of Operations | PMP® — operations, execution, AI-enabled workflows.
```

---

## 15. SOCIAL PROFILES

### Attivi (sul sito personale)

| Canale | Handle | URL |
|--------|--------|-----|
| GitHub | @Riccardobozzato94 | https://github.com/Riccardobozzato94 |
| LinkedIn | in/riccardobozzato | https://www.linkedin.com/in/riccardobozzato/ |
| Email | riccardobozzato@gmail.com | mailto:riccardobozzato@gmail.com |

### Inattivi (non renderizzati sul sito personale)

Instagram, YouTube e Twitch sono stati rimossi dal footer. I profili esistono ma non sono collegati dal sito principale.

---

*Documento generato il 18 Luglio 2026 dal codice sorgente di riccardobozzato.dev*
