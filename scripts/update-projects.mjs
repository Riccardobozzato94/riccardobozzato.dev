/**
 * Restructures the `projects` section around operational outcomes instead of
 * a list of AI side-projects.
 * Run: bun scripts/update-projects.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const MSG_DIR = join(process.cwd(), "messages");

const projects = {
  it: {
    title: "Cosa ho gestito",
    subtitle:
      "Sette anni di operations: retail, e-commerce B2B, consulenza. Qui sotto il percorso completo e i progetti su cui puoi guardare il risultato.",
    badgeLabel: "Track record",

    trackTitle: "Il percorso",
    trackSubtitle:
      "Quattro realtà, una stessa domanda di ogni volta: perché questo team impiega trenta giorni a fare quello che dovrebbe fare in tre?",
    track: [
      {
        company: "In's Mercato",
        role: "Operations",
        period: "Retail",
        scope:
          "Primo posto dove ho imparato cosa succede quando un processo non è scritto: nel retail la scadenza non sposta.",
        outcome: "Regole e flussi resi ripetibili tra punti vendita e magazzino",
      },
      {
        company: "Aldi",
        role: "Operations",
        period: "Retail",
        scope:
          "Catena con volumi alti e margini stretti: qui un due percento di efficienza è l'intero margine.",
        outcome: "Automazione dei processi, +30% di efficienza dichiarata",
      },
      {
        company: "Accenture",
        role: "Delivery & Automation",
        period: "Consulenza",
        scope:
          "Primi progetti per clienti, con l'obiettivo dichiarato di togliere passaggi manuali e tempi di attesa.",
        outcome: "Processi automatizzati, +30% di efficienza dichiarata",
      },
      {
        company: "Esse Solutions",
        role: "Head of Operations",
        period: "E-commerce B2B",
        scope:
          "Portfolio da €500K su Magento, Shopware e Pimcore, con team distribuiti di 8-12 persone. Qui ho introdotto Agile in un'organizzazione che non lo usava.",
        outcome: "+25% di produttività, -40% di time-to-market",
      },
    ],

    clientTitle: "Progetto con cliente",
    clientSubtitle:
      "Un solo progetto, raccontato per intero. È l'unico dove puoi verificare da solo quello che ho fatto.",
    panificio: {
      title: "Panificio da Sergio",
      subtitle: "E-commerce per un panificio di famiglia, consegnato e ancora online",
      description:
        "Non mi hanno chiesto un sito. Hanno un archivio di ricette scritto a mano su quadri, tre generazioni che disagreevano su tutto, e un negozio che finiva le giornate senza sapere cosa avesse venduto. Il lavoro vero è stato decidere cosa automatizzare e cosa lasciare a una persona.",
      problemTitle: "Il problema",
      problem:
        "Tre generazioni, opinioni incompatibili su prezzo, catalogo e orari. Nessun dato su cosa vendesse davvero, perché la raccolta era a mano. Un sito da £0 di budget materiali.",
      approachTitle: "Come l'ho affrontato",
      approach: [
        "Workshop con le tre generazioni insieme, per far decidere i principi prima delle specifiche",
        "Specifiche scritte in italiano e inglese, così nessuno poteva dire di non aver capito",
        "Stack solo open source e tier gratuiti: il vincolo di budget era il vincolo progettuale",
        "Catalogo con pianificazione del ritiro, perché nel pane la data conta più del prezzo",
      ],
      outcomeTitle: "Il risultato",
      outcome: [
        "E-commerce completo in produzione, sotto il budget di materiali",
        "Flusso ordini end-to-end: catalogo, carrello, ritiro, conferma, dashboard",
        "Bilingue, con attenzione ai clienti del negozio",
        "Progetto ancora online dopo mesi, che è l'unico test che conta",
      ],
      stackNote:
        "Next.js, Tailwind, TypeScript, PostgreSQL, next-intl, Netlify",
      ctaVisit: "panificiodasergio.it",
      ctaContact: "Parlane con me",
    },

    builtTitle: "Cosa costruisco per lavorare meglio",
    builtSubtitle:
      "Due progetti miei, aperti. Non li metto qui per fare curriculum: sono gli strumenti con cui faccio il lavoro di cui sopra.",
    vulnclaw: {
      title: "VulnClaw",
      description:
        "CLI open source per penetration testing. È nato perché volevo capire come funziona un attacco senza dipendere da strumenti che non potevo ispezionare.",
      link: "github.com/Riccardobozzato94",
    },
    synapse: {
      title: "Synapse",
      description:
        "Il mio vault di conoscenza con ricerca semantica e memoria condivisa tra agenti. È il posto dove finisce tutto quello che imparo sui processi.",
      link: "",
    },
  },

  en: {
    title: "What I have run",
    subtitle:
      "Seven years in operations: retail, B2B e-commerce, consulting. Below is the full path, plus the projects where you can check the result yourself.",
    badgeLabel: "Track record",

    trackTitle: "The path",
    trackSubtitle:
      "Four companies, the same question every time: why does this team take thirty days to do something that should take three?",
    track: [
      {
        company: "In's Mercato",
        role: "Operations",
        period: "Retail",
        scope:
          "Where I learned what happens when a process is not written down: in retail, the deadline does not move.",
        outcome: "Rules and flows made repeatable across stores and warehouse",
      },
      {
        company: "Aldi",
        role: "Operations",
        period: "Retail",
        scope:
          "A chain with high volumes and thin margins: here, two points of efficiency is the entire margin.",
        outcome: "Process automation, +30% stated efficiency",
      },
      {
        company: "Accenture",
        role: "Delivery & Automation",
        period: "Consulting",
        scope:
          "First client projects, with the stated goal of removing manual steps and waiting time.",
        outcome: "Automated processes, +30% stated efficiency",
      },
      {
        company: "Esse Solutions",
        role: "Head of Operations",
        period: "B2B e-commerce",
        scope:
          "A €500K portfolio across Magento, Shopware and Pimcore, with distributed teams of 8-12. Here I introduced Agile to an organisation that did not use it.",
        outcome: "+25% productivity, -40% time-to-market",
      },
    ],

    clientTitle: "Client project",
    clientSubtitle:
      "One project, told in full. It is the only one where you can check my work yourself.",
    panificio: {
      title: "Panificio da Sergio",
      subtitle: "E-commerce for a family bakery, delivered and still online",
      description:
        "Nobody asked me for a website. They had a recipe archive handwritten on paper, three generations who disagreed about everything, and a shop that ended each day not knowing what it had sold. The real work was deciding what to automate and what to leave to a human.",
      problemTitle: "The problem",
      problem:
        "Three generations with incompatible opinions on pricing, catalogue and opening hours. No data on what actually sold, because it was recorded by hand. A website with a £0 materials budget.",
      approachTitle: "How I handled it",
      approach: [
        "A workshop with all three generations together, so principles were decided before specs",
        "Specs written in Italian and English, so nobody could claim they had not understood",
        "Open source and free tiers only: the budget constraint became the design constraint",
        "A catalogue with collection scheduling, because for bread the date matters more than the price",
      ],
      outcomeTitle: "The result",
      outcome: [
        "A complete e-commerce site in production, under the materials budget",
        "End-to-end order flow: catalogue, cart, collection, confirmation, dashboard",
        "Bilingual, with care for the shop's walk-in customers",
        "Still online months later, which is the only test that counts",
      ],
      stackNote: "Next.js, Tailwind, TypeScript, PostgreSQL, next-intl, Netlify",
      ctaVisit: "panificiodasergio.it",
      ctaContact: "Talk to me about it",
    },

    builtTitle: "What I build to do the job better",
    builtSubtitle:
      "Two projects of mine, both open. I am not listing them to pad a CV: they are the tools behind the work above.",
    vulnclaw: {
      title: "VulnClaw",
      description:
        "An open source CLI for penetration testing. It started because I wanted to understand how an attack works without depending on tools I could not inspect.",
      link: "github.com/Riccardobozzato94",
    },
    synapse: {
      title: "Synapse",
      description:
        "My knowledge vault with semantic search and memory shared between agents. Everything I learn about processes ends up here.",
      link: "",
    },
  },
};

function apply(locale) {
  const file = join(MSG_DIR, `${locale}.json`);
  const json = JSON.parse(readFileSync(file, "utf8"));
  json.projects = projects[locale];
  writeFileSync(file, (JSON.stringify(json, null, 2) + "\n").replace(/\n/g, "\r\n"), "utf8");
  console.log(`${locale}: projects riscritti`);
}

for (const locale of ["it", "en"]) apply(locale);
