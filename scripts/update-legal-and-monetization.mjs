/**
 * One-off content update for messages/{it,en}.json
 * Run: bun scripts/update-legal-and-monetization.mjs
 *
 * Rewrites the `cookies`, `advertise`, `privacy` and `accessibility` sections so
 * they match what the site actually does after the 2026-10-02 compliance work:
 * GA4 and any ad tech are consent-gated, the old privacy text wrongly claimed
 * Plausible-only analytics, and the accessibility statement now targets WCAG 2.2.
 *
 * Preserves the repo's CRLF line endings and 2-space indentation.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const MSG_DIR = join(process.cwd(), "messages");

/* ─────────────────────────── cookies (CMP) ─────────────────────────── */

const cookies = {
  it: {
    title: "Cookie e strumenti di misurazione",
    description:
      "Usiamo cookie tecnici e, solo con il tuo consenso, strumenti di analytics e pubblicitari. Puoi scegliere quali accettare e cambiare idea in qualsiasi momento.",
    privacyLink: "Leggi la Privacy Policy",
    accept: "Accetta tutto",
    reject: "Solo necessari",
    customise: "Personalizza",
    collapseSettings: "Chiudi",
    saveSelection: "Salva le scelte",
    categoriesLegend: "Categorie di cookie",
    necessaryTitle: "Necessari",
    necessaryDesc:
      "Sempre attivi. Servono al funzionamento del sito: lingua della sessione, rate limiting, token di doppio opt-in e disiscrizione. Non possono essere disattivati.",
    analyticsTitle: "Analytics",
    analyticsDesc:
      "Google Analytics 4 con anonimizzazione dell'indirizzo IP. Mi serve per capire quali pagine vengono lette. Caricato solo se accetti, e i segnali pubblicitari di Google restano disattivati.",
    adsTitle: "Pubblicità",
    adsDesc:
      "Google AdSense e i suoi partner possono impostare cookie per mostrare annunci pertinenti e misurare le campagne. Caricati solo se accetti.",
  },
  en: {
    title: "Cookies and measurement tools",
    description:
      "We use strictly necessary cookies and, only with your consent, analytics and advertising tools. You choose what to accept and can change your mind at any time.",
    privacyLink: "Read the Privacy Policy",
    accept: "Accept all",
    reject: "Necessary only",
    customise: "Customise",
    collapseSettings: "Close",
    saveSelection: "Save choices",
    categoriesLegend: "Cookie categories",
    necessaryTitle: "Necessary",
    necessaryDesc:
      "Always active. Required for the site to work: session language, rate limiting, double opt-in and unsubscribe tokens. Cannot be disabled.",
    analyticsTitle: "Analytics",
    analyticsDesc:
      "Google Analytics 4 with IP anonymization. It tells me which pages get read. Loaded only if you accept, and Google's advertising signals stay disabled.",
    adsTitle: "Advertising",
    adsDesc:
      "Google AdSense and its partners may set cookies to show relevant ads and measure campaigns. Loaded only if you accept.",
  },
};

/* ─────────────────────────── advertise (media kit) ─────────────────────────── */

const advertise = {
  it: {
    title: "Sponsorizza la pagina",
    metaDescription:
      "Media kit: pubblica il tuo prodotto su riccardobozzato.com. Audience di Head of Operations e Delivery Manager, formato blog, newsletter e sponsor README.",
    subtitle: "Raggiungi chi decide davvero sulle operations",
    heroDesc:
      "Il lettore medio di questo sito guida processi, persone e piattaforme. È il buyer esatto per strumenti ops, e-commerce, ATS e servizi di consulenza.",
    ctaPrimary: "Richiedi il media kit",
    ctaSecondary: "Scrivimi",
    emailSubject: "Richiesta media kit e sponsorizzazione",
    contactEmail: "riccardobozzato@gmail.com",
    statsNote:
      "Dati indicativi. Per ogni partnership ti fornisco le metriche reali della tua campagna: impression, clic e CTR.",
    stats: [
      { value: "600+", label: "Contatti LinkedIn", icon: "users" },
      { value: "IT + EN", label: "Audience bilingue", icon: "eye" },
      { value: "B2B", label: "Operatori e manager", icon: "target" },
      { value: "100%", label: "Contatto diretto", icon: "trending" },
    ],
    audienceTitle: "Chi legge",
    audienceDesc:
      "Non è traffico generico. Sono persone con budget e con un problema operativo da risolvere.",
    audience: [
      "Head of Operations e Operations Manager in scale-up e mid-market",
      "Delivery Manager, Project Manager e Scrum Master",
      "Founder e COO di aziende SaaS ed e-commerce",
      "E-commerce Manager e responsabili supply chain",
      "Consulenti e freelance che vendono servizi operativi",
      "La maggior parte legge in inglese o in italiano, indifferentemente",
    ],
    formatsTitle: "Formati e prezzi indicativi",
    formatsDesc:
      "Prezzi di partenza per una singola campagna. Per pacchetti su più periodi, contenuti dedicati o la newsletter, scrivimi.",
    mostPopular: "Più richiesto",
    formats: [
      {
        title: "Articolo sponsorizzato",
        desc: "Un post sul blog, scritto con la mia voce editoriale e la mia revisione tecnica. Nessuna promozione svendida: se il prodotto non serve, dico di no.",
        price: "€250",
      },
      {
        title: "Newsletter + blog",
        desc: "Il pacchetto con il miglior CPM: un'email alla lista della sequenza operativa più un articolo sul blog, collegati fra loro.",
        price: "€600",
        highlighted: true,
      },
      {
        title: "Sponsor README",
        desc: "Il tuo logo e il tuo messaggio nel README di un mio progetto open source. Pubblico, permanente, e visibile a chiunque lo usi.",
        price: "€400",
      },
    ],
    pricingNote:
      "Importi IVA esclusa. Non vendo banner display generici: il pubblico è troppo di nicchia per la pubblicità a rotazione, e per entrambi sarebbe rumore.",
    processTitle: "Come funziona",
    process: [
      { step: "1. Contatto", desc: "Mi scrivi con il tuo prodotto e l'obiettivo della campagna." },
      { step: "2. Proposal", desc: "Ricevi formato, date, prezzo e una bozza dell'angolo editoriale." },
      { step: "3. Pubblicazione", desc: "Controllo finale e pubblicazione. Nulla esce senza la mia approvazione." },
      { step: "4. Report", desc: "Metriche reali della campagna: impression, clic, CTR e lead generati." },
    ],
    faqTitle: "Domande frequenti",
    faq: [
      {
        q: "Il contenuto resta mio?",
        a: "Il testo e l'angolo editoriale sono miei. Il tuo prodotto viene descritto in modo accurato, senza enfasi eccessiva: la mia credibilità vale più di un click.",
      },
      {
        q: "Accetto solo prodotti che consiglierei davvero?",
        a: "Sì. Rifiuto regolarmente le partnership: un partner sbagliato danneggia il sito più di quanto la commissione ti faccia guadagnare. Te lo dico subito se il tuo prodotto non è adatto.",
      },
      {
        q: "Come misuri i risultati?",
        a: "Ogni campagna ha un link con UTM. Ti invio le statistiche al termine: impression, clic, CTR e, se colleghi un form, i lead raccolti.",
      },
      {
        q: "Posso scegliere la data?",
        a: "Sì, con almeno due settimane di anticipo. Gli articoli del blog restano online in modo permanente, quindi il valore non si esaurisce in una settimana.",
      },
    ],
    finalCta: {
      title: "Parliamo del tuo prodotto",
      desc: "Descrivimi cosa vendi e a chi. Ti rispondo entro due giorni lavorativi con una proposta.",
      cta: "Richiedi il media kit",
    },
  },
  en: {
    title: "Sponsor this site",
    metaDescription:
      "Media kit: put your product in front of Head of Operations and Delivery Managers. Blog, newsletter and open source README sponsorship.",
    subtitle: "Reach the people who actually make operating decisions",
    heroDesc:
      "The average reader here owns processes, people and platforms. That is the exact buyer for ops tooling, e-commerce, ATS products and consulting.",
    ctaPrimary: "Request the media kit",
    ctaSecondary: "Message me",
    emailSubject: "Media kit and sponsorship enquiry",
    contactEmail: "riccardobozzato@gmail.com",
    statsNote:
      "Indicative figures. You get the real campaign metrics for every partnership: impressions, clicks and CTR.",
    stats: [
      { value: "600+", label: "LinkedIn contacts", icon: "users" },
      { value: "IT + EN", label: "Bilingual audience", icon: "eye" },
      { value: "B2B", label: "Operators and managers", icon: "target" },
      { value: "100%", label: "Direct relationship", icon: "trending" },
    ],
    audienceTitle: "Who reads this",
    audienceDesc:
      "This is not generic traffic. These are people with a budget and an operational problem to solve.",
    audience: [
      "Heads of Operations and Operations Managers in scale-ups and mid-market",
      "Delivery Managers, Project Managers and Scrum Masters",
      "Founders and COOs of SaaS and e-commerce companies",
      "E-commerce Managers and supply chain leads",
      "Consultants and freelancers selling operational services",
      "Most read in English or Italian, interchangeably",
    ],
    formatsTitle: "Formats and indicative pricing",
    formatsDesc:
      "Starting prices for a single campaign. Get in touch for multi-period packages, dedicated content or the newsletter.",
    mostPopular: "Most requested",
    formats: [
      {
        title: "Sponsored article",
        desc: "One blog post, written in my editorial voice and technically reviewed by me. No over-sold copy: if the product does not fit, I say no.",
        price: "€250",
      },
      {
        title: "Newsletter + blog",
        desc: "The best CPM package: one email to the operations sequence list plus one blog post, cross-linked.",
        price: "€600",
        highlighted: true,
      },
      {
        title: "README sponsorship",
        desc: "Your logo and message in the README of one of my open source projects. Public, permanent, and seen by everyone who uses it.",
        price: "€400",
      },
    ],
    pricingNote:
      "Prices exclude VAT. I do not sell generic display banners: the audience is too niche for rotating ads, and that would be noise for both of us.",
    processTitle: "How it works",
    process: [
      { step: "1. Enquiry", desc: "You tell me your product and the goal of the campaign." },
      { step: "2. Proposal", desc: "You get format, dates, price and a draft of the editorial angle." },
      { step: "3. Publication", desc: "Final check and go live. Nothing ships without my approval." },
      { step: "4. Report", desc: "Real campaign metrics: impressions, clicks, CTR and leads generated." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Do you keep the content?",
        a: "The text and the editorial angle are mine. Your product is described accurately, without over-selling: my credibility is worth more than a click.",
      },
      {
        q: "Will you only promote products you recommend?",
        a: "Yes. I turn partnerships down regularly: the wrong partner damages the site more than the fee earns you. I tell you straight away if your product is not a fit.",
      },
      {
        q: "How do you measure results?",
        a: "Every campaign gets a UTM-tagged link. I send the numbers at the end: impressions, clicks, CTR and, if you wire up a form, the leads collected.",
      },
      {
        q: "Can I pick the date?",
        a: "Yes, with at least two weeks notice. Blog posts stay online permanently, so the value is not limited to one week.",
      },
    ],
    finalCta: {
      title: "Let's talk about your product",
      desc: "Tell me what you sell and to whom. I reply within two business days with a proposal.",
      cta: "Request the media kit",
    },
  },
};

/* ─────────────────────────── privacy (rewritten) ─────────────────────────── */

const privacy = {
  it: {
    lastUpdated: "Ultimo aggiornamento: 2 ottobre 2026",
    intro:
      "Questa informativa descrive come trattiamo i dati personali di chi visita riccardobozzato.com. Il sito non ha finalità di profilazione e non richiede la creazione di un account per essere consultato.",
    sections: [
      {
        title: "1. Titolare del Trattamento",
        content:
          "Titolare: Riccardo Bozzato, con sede in Legnaro (PD), Italia.<br>Contatti per ogni questione relativa ai dati: riccardobozzato@gmail.com.<br>Il sito è gestito tramite Netlify (hosting) e distribuito tramite Cloudflare (CDN e DNS). Entrambi trattano dati tecnici come indirizzo IP e user agent per erogare il sito.",
      },
      {
        title: "2. Dati Raccolti - Per Ogni Servizio",
        content:
          "Modulo di contatto generico: nome, email e messaggio. Usato per richieste di ruolo lavorativo, progetti o consulenza.<br><br>Servizi di consulenza (Operational Audit, Operations Overhaul, Fractional Head of Operations): nome, email, azienda, descrizione del problema operativo, dettagli di team e processi. Per l'Overhaul possono servire dettagli tecnici delle piattaforme (Magento, Shopware, Pimcore) e credenziali di accesso temporanee, distrutte al termine dell'incarico. I prezzi si concordano in call e nella proposta scritta: nessuna tariffa è pubblicata sul sito.<br><br>Download delle risorse gratuite (playbook): nome e indirizzo email, per consegnare il PDF e inviare la sequenza email (massimo 6 email in 30 giorni). Richiede doppio opt-in: senza la conferma dell'indirizzo la sequenza non parte.<br><br>Download CV: nessun dato raccolto, il download è anonimo.<br><br>Acquisto di ShipKit: nome, email e indirizzo di fatturazione, gestiti tramite Stripe. Io non ricevo né memorizzo i dati della carta di credito.",
      },
      {
        title: "3. Come Utilizzo i Tuoi Dati",
        content:
          "Uso i dati per rispondere alle richieste, erogare i servizi concordati e, solo se hai chiesto il playbook, inviarti la sequenza email operativa. Non vendo i tuoi dati, non li condivido con terzi per finalità di marketing e non li uso per addestrare modelli.<br><br>I lead del playbook sono conservati su Netlify Blobs, uno storage situato negli Stati Uniti.",
      },
      {
        title: "4. Cookie, Analytics e Pubblicità",
        content:
          "Il sito distingue tre categorie e tu scegli quali accettare.<br><br>Necessari: sempre attivi. Servono al funzionamento del sito (lingua della sessione, rate limiting, token di doppio opt-in e disiscrizione) e non possono essere disattivati.<br><br>Analytics: Google Analytics 4, caricato solo dopo il tuo consenso esplicito. È attivo con l'anonimizzazione dell'indirizzo IP e con i segnali pubblicitari di Google disattivati, a meno che tu non abbia accettato anche la categoria pubblicitaria. Serve a capire quali pagine vengono lette.<br><br>Pubblicità: Google AdSense e i suoi partner possono impostare cookie per mostrare annunci pertinenti e misurare le campagne. Anche questi vengono caricati solo con il tuo consenso. Il sito può inoltre ospitare contenuti sponsorizzati venduti direttamente, sempre etichettati come tali.<br><br>Se rifiuti, GA4 e AdSense non vengono richiesti: il sito funziona normalmente, senza misurazione e senza annunci.",
      },
      {
        title: "5. Consenso, Doppio Opt-In e Disiscrizione",
        content:
          "La base giuridica è il consenso espresso, prestato con un'azione affermativa. Per la sequenza email si applica il doppio opt-in: ricevi una email di conferma e la sequenza parte solo dopo il tuo clic sul link di conferma.<br><br>Ogni email della sequenza contiene un link di disiscrizione che agisce immediatamente. Puoi inoltre modificare le tue scelte sui cookie in qualsiasi momento, dal link «Impostazioni cookie» nel footer del sito.<br><br>Il consenso non è condizionato all'acquisto di beni o servizi.",
      },
      {
        title: "6. Base Giuridica (GDPR)",
        content:
          "Art. 6.1.a Consenso espresso: cookie non necessari, sequenza email.<br>Art. 6.1.b Esecuzione del contratto: risposte a richieste di contatto e servizi in corso.<br>Art. 6.1.c Obbligo legale: dati di fatturazione, conservati per 10 anni come previsto dalla normativa fiscale.<br>Art. 6.1.f Legittimo interesse: sicurezza del sito (rate limiting, log tecnici) e difesa da abusi.",
      },
      {
        title: "7. Conservazione dei Dati",
        content:
          "Richieste di contatto e candidature: 24 mesi dall'ultimo contatto, salvo necessità di conservarli più a lungo per obblighi di legge.<br>Dati di fatturazione: 10 anni (obbligo fiscale).<br>Lead della sequenza playbook: 30 giorni dall'ultima email, poi cancellati. Se ti disiscrivi, vengono cancellati immediatamente.<br>Log tecnici di sicurezza: 90 giorni.<br>Credenziali tecniche fornite per un incarico di Overhaul: distrutte al termine dell'incarico.",
      },
      {
        title: "8. I Tuoi Diritti (GDPR)",
        content:
          "Puoi in ogni momento chiedere accesso, rettifica, cancellazione, limitazione, portabilità e opposizione, e revocare il consenso.<br>Per esercitarli scrivi a riccardobozzato@gmail.com. Rispondo entro 30 giorni.<br>Non applico decisioni automatizzate né profilazione. Puoi chiedere la portabilità dei tuoi dati in formato JSON.",
      },
      {
        title: "9. Terze Parti e Responsabili del Trattamento",
        content:
          "Solo i servizi strettamente necessari, con i relativi trattamenti:<br><br>Netlify (Netlify Inc., USA): hosting, Netlify Identity per l'autenticazione dell'area riservata e Netlify Blobs per la conservazione dei lead del playbook.<br>Cloudflare (Cloudflare Inc., USA): CDN, DNS e mitigazione degli attacchi.<br>Google Ireland Limited (Irlanda, con trasferimenti negli USA): Google Analytics 4 e, se hai accettato, Google AdSense.<br>Resend Inc. (USA): invio delle email transazionali e della sequenza.<br>Stripe Inc. (USA): pagamenti, esclusivamente per l'acquisto di ShipKit.<br>Amazon EU S.a.r.l.: programma affiliati. Alcuni link in uscita sono link affiliati e generano una commissione. Per l'affiliazione non uso cookie di tracciamento aggiuntivi.",
      },
      {
        title: "10. Trasferimenti Internazionali",
        content:
          "Netlify, Cloudflare, Resend, Stripe e Google trattano dati fuori dallo Spazio Economico Europeo. Per questi trasferimenti ci si basa sulle Clausole Contrattuali Standard (SCC) della Commissione Europea, Decisione di Esecuzione 2021/914, e su misure supplementari come l'anonimizzazione dell'IP in Google Analytics.<br>Puoi chiedere copia delle SCC applicabili scrivendo a riccardobozzato@gmail.com.",
      },
      {
        title: "11. Sicurezza dei Dati",
        content:
          "HTTPS con TLS su tutto il sito, HSTS con durata di due anni, CSP restrittiva, rate limiting su tutte le API e comportamento fail-closed su tutti gli endpoint protetti. I secret non sono mai committati nel repository e le password di amministrazione non sono hardcoded nel sorgente.<br>Nessun sistema è al riparo da violazioni: in caso di data breach ti avviso via email senza ritardo indebito e con le informazioni richieste dal GDPR.",
      },
      {
        title: "12. Cookie di Netlify Identity",
        content:
          "L'area riservata /login usa Netlify Identity, che impiega cookie tecnici per la sessione di autenticazione. Non vengono impostati cookie di profilazione. L'area è protetta da password e le richieste sono limitate per IP.",
      },
      {
        title: "13. Dati di Candidature Lavorative",
        content:
          "Le candidature che invii sono trattate per valutare la posizione e, in caso di esito positivo, per gestire il rapporto di lavoro. Non condivido i tuoi dati di candidatura con terzi e non li uso per finalità di marketing. Puoi chiedere la cancellazione in qualsiasi momento.",
      },
      {
        title: "14. Limiti di Responsabilità",
        content:
          "I contenuti del sito, incluse stime, metriche e risultati di case study, hanno finalità informativa e non costituiscono consulenza legale, fiscale o finanziaria. L'utente è responsabile delle decisioni assunte sulla base delle informazioni pubblicate.",
      },
      {
        title: "15. Modifiche a Questa Policy",
        content:
          "Questa informativa può essere aggiornata, per esempio in caso di nuovi servizi, di nuovi partner tecnici o di variazioni normative. La data in alto indica sempre l'ultima revisione. Le modifiche sostanziali vengono comunicate via email a chi ha richiesto il playbook.",
      },
      {
        title: "16. Reclami",
        content:
          "Se ritieni che il trattamento violi il GDPR, puoi presentare reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it) o all'autorità di controllo dello Stato membro in cui risiedi. Prima puoi sempre scrivere a riccardobozzato@gmail.com: risponderò entro 30 giorni.",
      },
    ],
  },
  en: {
    lastUpdated: "Last updated: 2 October 2026",
    intro:
      "This notice explains how we handle personal data from visitors to riccardobozzato.com. The site has no profiling purpose and does not require an account to be browsed.",
    sections: [
      {
        title: "1. Data Controller",
        content:
          "Controller: Riccardo Bozzato, based in Legnaro (PD), Italy.<br>Contact for any data-related question: riccardobozzato@gmail.com.<br>The site is hosted on Netlify and distributed through Cloudflare (CDN and DNS). Both process technical data such as IP address and user agent to serve the site.",
      },
      {
        title: "2. Data Collected - Per Service",
        content:
          "General contact form: name, email and message. Used for job applications, project enquiries or consulting.<br><br>Consulting services (Operational Audit, Operations Overhaul, Fractional Head of Operations): name, email, company, description of the operational problem, team and process details. For the Overhaul we may need platform details (Magento, Shopware, Pimcore) and temporary access credentials, destroyed at the end of the engagement. Prices are agreed on a call and in the written proposal: no rate is published on the site.<br><br>Free resource downloads (playbook): name and email address, used to deliver the PDF and send the email sequence (maximum 6 emails in 30 days). Double opt-in applies: without address confirmation the sequence does not start.<br><br>CV download: no data collected, the download is anonymous.<br><br>ShipKit purchase: name, email and billing address, handled by Stripe. I never receive or store your card details.",
      },
      {
        title: "3. How I Use Your Data",
        content:
          "I use data to answer enquiries, deliver agreed services and, only if you requested the playbook, send you the operations email sequence. I do not sell your data, do not share it with third parties for marketing and do not use it to train models.<br><br>Playbook leads are stored on Netlify Blobs, a store located in the United States.",
      },
      {
        title: "4. Cookies, Analytics and Advertising",
        content:
          "The site separates three categories and you choose which to accept.<br><br>Necessary: always active. They make the site work (session language, rate limiting, double opt-in and unsubscribe tokens) and cannot be disabled.<br><br>Analytics: Google Analytics 4, loaded only after your explicit consent. It runs with IP anonymization and with Google's advertising signals disabled unless you also accepted the advertising category. It tells me which pages get read.<br><br>Advertising: Google AdSense and its partners may set cookies to serve relevant ads and measure campaigns. These are also loaded only with your consent. The site may also host directly sold sponsored content, always labelled as such.<br><br>If you decline, neither GA4 nor AdSense is requested: the site works normally, without measurement or ads.",
      },
      {
        title: "5. Consent, Double Opt-In and Unsubscribing",
        content:
          "The legal basis is your consent, given through an affirmative action. The email sequence uses double opt-in: you receive a confirmation email and the sequence starts only after you click the confirmation link.<br><br>Every email in the sequence contains an unsubscribe link that acts immediately. You can also change your cookie choices at any time, via the 'Cookie settings' link in the site footer.<br><br>Consent is never a condition of purchase.",
      },
      {
        title: "6. Legal Basis (GDPR)",
        content:
          "Art. 6.1.a Consent: non-essential cookies, email sequence.<br>Art. 6.1.b Performance of a contract: replies to contact requests and services in progress.<br>Art. 6.1.c Legal obligation: billing data, retained for 10 years as required by tax law.<br>Art. 6.1.f Legitimate interest: site security (rate limiting, technical logs) and defence against abuse.",
      },
      {
        title: "7. Data Retention",
        content:
          "Contact requests and applications: 24 months from last contact, unless longer retention is legally required.<br>Billing data: 10 years (tax obligation).<br>Playbook sequence leads: 30 days after the last email, then deleted. If you unsubscribe, they are deleted immediately.<br>Technical security logs: 90 days.<br>Technical credentials provided for an Overhaul engagement: destroyed at the end of the engagement.",
      },
      {
        title: "8. Your Rights (GDPR)",
        content:
          "You can ask at any time for access, rectification, erasure, restriction, portability and objection, and you can withdraw consent.<br>To exercise them write to riccardobozzato@gmail.com. I reply within 30 days.<br>I apply no automated decision-making and no profiling. You can request your data in JSON format.",
      },
      {
        title: "9. Third Parties and Processors",
        content:
          "Only strictly necessary services, with the related processing:<br><br>Netlify (Netlify Inc., USA): hosting, Netlify Identity for admin area authentication, and Netlify Blobs for playbook lead storage.<br>Cloudflare (Cloudflare Inc., USA): CDN, DNS and attack mitigation.<br>Google Ireland Limited (Ireland, with transfers to the USA): Google Analytics 4 and, if you accepted, Google AdSense.<br>Resend Inc. (USA): transactional and sequence email delivery.<br>Stripe Inc. (USA): payments, for the ShipKit purchase only.<br>Amazon EU S.a.r.l.: affiliate programme. Some outbound links are affiliate links and earn a commission. No additional tracking cookies are used for the affiliation.",
      },
      {
        title: "10. International Transfers",
        content:
          "Netlify, Cloudflare, Resend, Stripe and Google process data outside the European Economic Area. These transfers rely on the European Commission's Standard Contractual Clauses, Commission Implementing Decision (EU) 2021/914, plus supplementary measures such as IP anonymization in Google Analytics.<br>You can request a copy of the applicable SCCs by writing to riccardobozzato@gmail.com.",
      },
      {
        title: "11. Data Security",
        content:
          "HTTPS with TLS sitewide, HSTS with a two-year max-age, a restrictive CSP, rate limiting on every API and fail-closed behaviour on all protected endpoints. Secrets are never committed to the repository and admin passwords are never hardcoded in source.<br>No system is breach-proof: in the event of a data breach I will notify you by email without undue delay and with the information required by the GDPR.",
      },
      {
        title: "12. Netlify Identity Cookies",
        content:
          "The /login area uses Netlify Identity, which uses technical cookies for the authentication session. No profiling cookies are set. The area is password protected and requests are rate limited per IP.",
      },
      {
        title: "13. Job Application Data",
        content:
          "Applications you send are processed to assess the role and, if successful, to manage the employment relationship. I do not share your application data with third parties and do not use it for marketing. You can request erasure at any time.",
      },
      {
        title: "14. Limitations of Liability",
        content:
          "Site content, including estimates, metrics and case study results, is for information only and does not constitute legal, tax or financial advice. The user is responsible for decisions taken on the basis of the published information.",
      },
      {
        title: "15. Changes to This Policy",
        content:
          "This notice may be updated, for example when new services, new technical partners or regulatory changes require it. The date at the top always reflects the latest revision. Substantial changes are notified by email to anyone who requested the playbook.",
      },
      {
        title: "16. Complaints",
        content:
          "If you believe processing infringes the GDPR, you can lodge a complaint with the Italian Data Protection Authority (www.garanteprivacy.it) or with the supervisory authority of your country of residence. You can always write to riccardobozzato@gmail.com first: I reply within 30 days.",
      },
    ],
  },
};

/* ─────────────────────────── accessibility (updated) ─────────────────────────── */

const accessibility = {
  it: {
    lastUpdated: "Ultima verifica: 2 ottobre 2026",
    intro:
      "Questa dichiarazione descrive lo stato di accessibilità di riccardobozzato.com. L'obiettivo è un sito utilizzabile da chiunque, indipendentemente da disabilità o tecnologia assistiva.",
    sections: [
      {
        title: "1. Stato di Conformità",
        content:
          "Parzialmente conforme. Il sito è stato sottoposto ad autovalutazione e verifica manuale il 2 ottobre 2026 rispetto alle WCAG 2.2 livello AA.<br><br>La maggior parte dei contenuti e dei componenti rispetta i criteri. Le eccezioni note sono elencate nella sezione 5 e sono limitate a componenti di terze parti che non controllo.",
      },
      {
        title: "2. Requisiti Normativi Applicabili",
        content:
          "Il sito è valutato rispetto a:<br><br>WCAG 2.2, Web Content Accessibility Guidelines, livello AA (W3C Recommendation, ottobre 2023)<br>Legge 13 marzo 1988 n. 104 e successive modifiche, in particolare gli articoli 55 e seguenti<br>Linee guida AgID per la misurabilità e il monitoraggio dell'accessibilità web (2021)<br>European Accessibility Act, recepito in Italia, applicabile ai servizi di e-commerce",
      },
      {
        title: "3. Criteri Applicati",
        content:
          "Sono stati verificati tutti i criteri di livello A e AA delle WCAG 2.2. In particolare i criteri relativi a struttura e orientamento (1.3.1, 1.3.2), testo alternativo (1.1.1), contrasto minimo (1.4.3, 1.4.11), navigazione da tastiera (2.1.1, 2.1.2, 2.4.1, 2.4.3, 2.4.7), finestre di cambio contesto (3.2.1, 3.2.2, 3.2.3, 3.2.4), nome accessibile e ruolo (4.1.2), messaggi di stato (4.1.3) e punti di riferimento ARIA (2.4.1).",
      },
      {
        title: "4. Misure Implementate",
        content:
          "Struttura semantica con header, nav, main e footer identificati; link «Vai al contenuto principale» come primo elemento focusabile.<br><br>Gerarchia dei titoli coerente su ogni pagina, senza salti di livello.<br><br>Contrasto dei colori verificato sul tema reale, non solo sul tema di default.<br><br>Tutti i controlli interattivi sono raggiungibili e attivabili da tastiera, con indicatore di focus sempre visibile.<br><br>Icone decorative marcate aria-hidden; icone informative con testo alternativo.<br><br>Form con label esplicite, required dichiarati e messaggi d'errore associati all'input via aria-describedby.<br><br>Messaggi di stato (invio del form, caricamento) annunciati con role=status o aria-live.<br><br>Contenuti dinamici (messaggi di risposta) annunciati senza spostare il focus.<br><br>Riduzione del movimento: le animazioni rispettano prefers-reduced-motion e il banner dei cookie può essere stampato senza interferenze.<br><br>Testo selezionabile e zoom al 200% senza perdita di contenuto o funzionalità, anche su mobile.<br><br>Nessuna informazione trasmessa tramite il solo colore.",
      },
      {
        title: "5. Conformità Parziale - Limiti Noti",
        content:
          "Banner dei cookie: finché la finestra di consenso è aperta, il contenuto sottostante resta nel flusso del documento perché il banner non usa un dialog modale che blocchi la navigazione. Alcuni utenti di screen reader potrebbero doverlo chiudere esplicitamente per raggiungere il contenuto.<br><br>Annunci pubblicitari di terze parti: contenuti e comportamenti degli annunci dipendono da Google AdSense e non sono sotto il mio controllo. Non sono sempre etichettati come pubblicità in modo accessibile e possono non rispettare il contrasto richiesto. Compaiono solo se accetti la categoria pubblicitaria.<br><br>Link affiliati Amazon: etichettati visivamente, ma l'indicazione testuale per i lettori di schermo non è sempre completa.<br><br>Widget Netlify Identity: presente solo nell'area riservata /login, che è un'area amministrativa e non fa parte del contenuto pubblico del sito.",
      },
      {
        title: "6. Tecniche Utilizzate",
        content:
          "HTML semantico con landmark ARIA; attributi role e aria-* solo dove il markup nativo non basta.<br><br>Focus visibile e mai rimosso, gestito con :focus-visible per non penalizzare l'uso del mouse.<br><br>Supporto di prefers-reduced-motion, prefers-contrast e forced-colors dove applicabile.<br><br>Nessun testo dentro le immagini: le informazioni sono sempre disponibili come testo reale, selezionabile e indicizzabile.",
      },
      {
        title: "7. Strumenti di Valutazione",
        content:
          "Lighthouse Accessibility (Chrome), axe DevTools e WAVE, eseguiti sulle pagine principali in italiano e in inglese.<br><br>Verifica manuale con tastiera su tutti i flussi: navigazione, pagina servizi, form di contatto, download del playbook e pannello dei cookie.<br><br>Il controllo fa parte della definizione di «fare» di ogni modifica, insieme a TypeScript e ESLint in fase di build.",
      },
      {
        title: "8. Feedback e Contatti",
        content:
          "Se trovi un problema di accessibilità, scrivi a riccardobozzato@gmail.com indicando la pagina, il problema e, se possibile, la tecnologia assistiva che usi. Rispondo entro 5 giorni lavorativi e, se il problema riguarda un componente condiviso, la correzione entra nel ciclo di sviluppo successivo.",
      },
      {
        title: "9. Procedura di Recupero",
        content:
          "Le segnalazioni sono registrate con pagina, criterio WCAG interessato e impatto. I problemi che impediscono la lettura o l'uso del contenuto hanno priorità massima e vengono corretti prima delle nuove funzionalità.<br><br>Se ritieni che la risposta non sia adeguata, puoi presentare reclamo all'AgID o al Garante per la protezione dei dati personali.",
      },
      {
        title: "10. Aggiornamento di Questa Dichiarazione",
        content:
          "Questa dichiarazione viene rivista almeno una volta all'anno e ogni volta che cambiano in modo rilevante il contenuto, la struttura o i componenti del sito. La data in alto indica sempre l'ultima verifica. Le modifiche sostanziali vengono annunciate nella home page.",
      },
    ],
  },
  en: {
    lastUpdated: "Last reviewed: 2 October 2026",
    intro:
      "This statement describes the accessibility status of riccardobozzato.com. The goal is a site usable by everyone, regardless of disability or assistive technology.",
    sections: [
      {
        title: "1. Conformance Status",
        content:
          "Partially conformant. The site was self-assessed and manually reviewed on 2 October 2026 against WCAG 2.2 level AA.<br><br>Most content and components meet the criteria. Known exceptions are listed in section 5 and are limited to third-party components I do not control.",
      },
      {
        title: "2. Applicable Standards",
        content:
          "The site is evaluated against:<br><br>WCAG 2.2, Web Content Accessibility Guidelines, level AA (W3C Recommendation, October 2023)<br>Italian Law 13 March 1988 no. 104 and subsequent amendments, articles 55 onwards<br>AgID guidelines for the measurability and monitoring of web accessibility (2021)<br>European Accessibility Act, transposed in Italy, applicable to e-commerce services",
      },
      {
        title: "3. Criteria Applied",
        content:
          "All level A and AA criteria of WCAG 2.2 were reviewed. In particular the criteria covering structure and orientation (1.3.1, 1.3.2), text alternatives (1.1.1), minimum contrast (1.4.3, 1.4.11), keyboard navigation (2.1.1, 2.1.2, 2.4.1, 2.4.3, 2.4.7), changes of context (3.2.1, 3.2.2, 3.2.3, 3.2.4), accessible name and role (4.1.2), status messages (4.1.3) and ARIA landmarks (2.4.1).",
      },
      {
        title: "4. Measures Implemented",
        content:
          "Semantic structure with identified header, nav, main and footer; a 'Skip to main content' link as the first focusable element.<br><br>Consistent heading hierarchy on every page, with no skipped levels.<br><br>Colour contrast verified against the real theme, not only the default one.<br><br>All interactive controls are reachable and operable by keyboard, with a focus indicator that is always visible.<br><br>Decorative icons marked aria-hidden; meaningful icons carry alternative text.<br><br>Forms with explicit labels, required states declared, and error messages associated to their input via aria-describedby.<br><br>Status messages (form submission, loading) announced with role=status or aria-live.<br><br>Dynamic content (response messages) announced without moving focus.<br><br>Reduced motion: animations respect prefers-reduced-motion and the cookie banner can be printed without interference.<br><br>Selectable text and 200% zoom without loss of content or functionality, including on mobile.<br><br>No information conveyed by colour alone.",
      },
      {
        title: "5. Partial Conformance - Known Limitations",
        content:
          "Cookie banner: while the consent window is open, the underlying content remains in the document flow because the banner does not use a modal dialog that traps navigation. Some screen reader users may need to dismiss it explicitly to reach the content.<br><br>Third-party advertising: the content and behaviour of ads depend on Google AdSense and are outside my control. They are not always labelled as advertising in an accessible way and may not meet the required contrast. They appear only if you accept the advertising category.<br><br>Amazon affiliate links: visually labelled, but the textual indication for screen reader users is not always complete.<br><br>Netlify Identity widget: present only in the /login reserved area, which is administrative and not part of the site's public content.",
      },
      {
        title: "6. Techniques Used",
        content:
          "Semantic HTML with ARIA landmarks; role and aria-* attributes only where native markup is insufficient.<br><br>Visible focus that is never removed, managed with :focus-visible so mouse users are not penalised.<br><br>Support for prefers-reduced-motion, prefers-contrast and forced-colors where applicable.<br><br>No text baked into images: information is always available as real, selectable, indexable text.",
      },
      {
        title: "7. Assessment Tools",
        content:
          "Lighthouse Accessibility (Chrome), axe DevTools and WAVE, run on the main pages in both Italian and English.<br><br>Manual keyboard verification across all flows: navigation, services page, contact form, playbook download and the cookie panel.<br><br>This check is part of the definition of 'done' for every change, alongside TypeScript and ESLint at build time.",
      },
      {
        title: "8. Feedback and Contact",
        content:
          "If you find an accessibility problem, write to riccardobozzato@gmail.com with the page, the problem and, if possible, the assistive technology you use. I reply within 5 business days and, when the problem affects a shared component, the fix goes into the next development cycle.",
      },
      {
        title: "9. Remediation Process",
        content:
          "Reports are logged with the page, the WCAG criterion involved and the impact. Issues that block reading or use of content take top priority and are fixed before any new feature.<br><br>If you consider the response inadequate you can lodge a complaint with AgID or the Italian Data Protection Authority.",
      },
      {
        title: "10. Updating This Statement",
        content:
          "This statement is reviewed at least once a year, and whenever site content, structure or components change significantly. The date at the top always reflects the latest review. Substantial changes are announced on the home page.",
      },
    ],
  },
};

/* ─────────────────────────── footer extras ─────────────────────────── */

const footerExtras = {
  it: { cookieSettings: "Impostazioni cookie", advertise: "Sponsorizza il sito" },
  en: { cookieSettings: "Cookie settings", advertise: "Advertise" },
};

/* ─────────────────────────── apply ─────────────────────────── */

function apply(locale) {
  const file = join(MSG_DIR, `${locale}.json`);
  const json = JSON.parse(readFileSync(file, "utf8"));
  const before = Object.keys(json);

  json.cookies = cookies[locale];
  json.advertise = advertise[locale];
  json.privacy = privacy[locale];
  json.accessibility = accessibility[locale];

  if (json.footer && typeof json.footer === "object") {
    json.footer.cookieSettings = footerExtras[locale].cookieSettings;
    json.footer.advertise = footerExtras[locale].advertise;
  }

  // Repo uses CRLF: normalise so the diff stays limited to real content changes.
  const serialised = (JSON.stringify(json, null, 2) + "\n").replace(/\n/g, "\r\n");
  writeFileSync(file, serialised, "utf8");

  const after = Object.keys(JSON.parse(readFileSync(file, "utf8")));
  console.log(
    `${locale}: ${after.length} namespaces (added: [${after
      .filter((k) => !before.includes(k))
      .join(", ")}], removed: [${before.filter((k) => !after.includes(k)).join(", ")}])`
  );
}

for (const locale of ["it", "en"]) apply(locale);
