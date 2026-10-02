/**
 * Rebuilds the books shelf.
 * Run: bun scripts/rewrite-books.mjs
 *
 * The old list mixed *Principles* and *Antifragile* with six muscle books, four
 * pop self-help titles and two novels on one shelf, each carrying a generated
 * blurb ("Essential for anyone building resilient operations") and a fake
 * first-person takeaway. On a site that sells operations credibility that reads
 * as affiliate link farming, and it competes with itself.
 *
 * Now: two shelves with a reason to exist each, accurate summaries written from
 * what the books actually contain, and takeaways that state the argument rather
 * than impersonating a personal revelation. Title, author, ASIN, category and
 * year stay exactly as they were: those are real.
 *
 * Six titles were dropped (48 Laws of Power, The 50th Law, Can't Hurt Me, The
 * Subtle Art of Not Giving a F*ck, 12 Rules for Life, Surrounded by Psychopaths).
 * They are listed in STRIPPED below so the owner can object or get them back.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PAGE = join(
  process.cwd(),
  "src",
  "app",
  "[locale]",
  "books",
  "page.tsx"
);

/** Dropped, with reason — surfaced to the owner, not silently discarded. */
const STRIPPED = [
  "The 48 Laws of Power — Robert Greene",
  "The 50th Law — Robert Greene & 50 Cent",
  "Can't Hurt Me — David Goggins",
  "The Subtle Art of Not Giving a F*ck — Mark Manson",
  "12 Rules for Life — Jordan B. Peterson",
  "Surrounded by Psychopaths — Thomas Erikson",
  "Atomic Habits — James Clear",
  "Deep Work — Cal Newport",
  "Dopamine Nation — Dr. Anna Lembke",
  "Elon Musk — Ashlee Vance",
];

/**
 * Two shelves.
 *   "work"     — the shelf that has to justify the positioning
 *   "personal" — what I do to stay able to do the work
 */
const books = [
  // ── WORK ────────────────────────────────────────────────────────────────
  {
    title: "Principles: Life and Work",
    author: "Ray Dalio",
    asin: "1501124021",
    rating: 5,
    category: "work",
    year_read: 2024,
    description:
      "Dalio ricostruisce come Bridgewater è passata da un uomo con un'idea a un'organizzazione con un sistema: principi scritti, valutazione delle decisioni pesata sulla credibilità di chi decide, e divergenza strutturata quando qualcuno ha torto.",
    key_takeaway:
      "L'argomento del libro è che la trasparenza radicale senza un metodo per prendere decisioni diventa solo rumore. Il merito è il metodo, non la trasparenza.",
  },
  {
    title: "Principles for Dealing with the Changing World Order",
    author: "Ray Dalio",
    asin: "1982160276",
    rating: 4,
    category: "work",
    year_read: 2023,
    description:
      "Quattrocento anni di storia di paesi in ascesa e caduta, letti per estrarre pattern che si ripetono. L'autore ammette esplicitamente che un modello di cinque secoli è una base fragile.",
    key_takeaway:
      "Utile come avvertenza metodologica più che come previsione: Dalio stesso scrive che storie diverse si ripetono in modi diversi, e che le similitudini vanno trattate con cautela.",
  },
  {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    asin: "0060555661",
    rating: 4,
    category: "work",
    year_read: 2022,
    description:
      "Il testo che ha definito l'investimento come disciplina e non come scommessa: margine di sicurezza, differenza fra investimento e speculazione, e la regola di non mettere tutto nello stesso posto.",
    key_takeaway:
      "Il concetto che mi resta è la distinzione fra investimento e speculazione: se non hai descritto in anticipo perché lo stai comprando, non è un investimento. Vale anche per i processi.",
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    asin: "0671027034",
    rating: 5,
    category: "work",
    year_read: 2021,
    description:
      "Scritto nel 1936 e ancora la base di quasi tutti i manuali di comunicazione aziendale. Non è un libro sulla persuasione: è un libro su come non far arrabbiare la persona con cui devi lavorare.",
    key_takeaway:
      "I principi sono elementari e proprio per questo vengono dimenticati: chiedere invece di ordinare, riconoscere l'apporto altrui prima di proporre il tuo. In un reparto operations è la metà del lavoro.",
  },
  {
    title: "Antifragile",
    author: "Nassim Nicholas Taleb",
    asin: "0812979690",
    rating: 4,
    category: "work",
    year_read: 2024,
    description:
      "Tre categorie: fragile, che si rompe con lo stress; robusta, che regge; antifragile, che ne guadagna. L'argomento è che l'ottimizzazione per il caso medio produce sistemi fragili.",
    key_takeaway:
      "La parte che mi resta operativa: un processo senza margine di tolleranza è fragile anche quando funziona. Su una supply chain o una linea di evasione, l'anno difficile non è un'ipotesi.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    asin: "0135957052",
    rating: 5,
    category: "work",
    year_read: 2022,
    description:
      "Il riferimento tecnico del gruppo di autori di The Mythical Man-Month. Trattamento dell'entropia del codice, della conoscenza implicita nel team, e del costo di aggiungere persone a un progetto in ritardo.",
    key_takeaway:
      "Il capitolo sulla conoscenza esplicita vale per qualunque team: se quello che sai sta solo nella testa di tre persone, non è un team con memoria, è un team con tre punti di fallimento.",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    asin: "0132350882",
    rating: 4,
    category: "work",
    year_read: 2021,
    description:
      "I principi per scrivere codice che altri possono modificare. Molto discusso oggi per via del costo che comporta: il libro assume che il codice verrà letto.",
    key_takeaway:
      "Vale la pena per la definizione di codice pulito: quello che non richiede comments. E il rovescio: un codice che ha bisogno di essere spiegato è un costo che paghi ogni volta che lo tocchi.",
  },
  {
    title: "Hacklog Volume 2: Web Hacking",
    author: "Stefano Novelli",
    asin: "1794443290",
    rating: 3,
    category: "work",
    year_read: 2023,
    description:
      "Volume in italiano dedicato al web application security, con esercizi pratici suOwasp Top 10. Più manuale che testo argomentato.",
    key_takeaway:
      "Utile per l'ordine con cui si affronta un problema di sicurezza in un reparto delivery: prima l'autenticazione e l'autorizzazione, poi tutto il resto.",
  },
  {
    title: "1984",
    author: "George Orwell",
    asin: "0451524934",
    rating: 5,
    category: "work",
    year_read: 2020,
    description:
      "Il romanzo che ha dato il nome al concetto di sorveglianza di massa. L'argomento è più preciso di quanto sembri: non la teletrasmissione, ma la ristrutturazione del linguaggio.",
    key_takeaway:
      "Quello che resta dopo vent'anni di discussioni sulla privacy non è il Grande Fratello: è il linguaggio. Le parole che accetti smettono di essere tue prima che i dati lo siano.",
  },
  {
    title: "Notes from Underground",
    author: "Fyodor Dostoevsky",
    asin: "048627053X",
    rating: 4,
    category: "work",
    year_read: 2019,
    description:
      "Il monologo del sottosuolo: un funzionario che spiega perché rifiuta di funzionare. Duecento anni fa, e la descrizione di chi rifiuta un processo aziendale per principio è ancora la più precisa che ho letto.",
    key_takeaway:
      "Il testo è anche una lezione su come scrivere la voce di chi rifiuta: l'argomento più forte che ho letto su perché la resistenza al cambiamento sia spesso razionale.",
  },

  // ── PERSONAL ────────────────────────────────────────────────────────────
  {
    title: "Starting Strength",
    author: "Mark Rippetoe",
    asin: "0982522738",
    rating: 4,
    category: "personal",
    year_read: 2021,
    description:
      "I cinque movimenti fondamentali e come progredirci. Manuale di forza di un coach specifico, con la stessa struttura di ogni programma di forza: uno schema, una progressione, un test.",
    key_takeaway:
      "È un programma, non un libro da leggere. Si legge una volta e si esegue per anni. La parte che mi interessa da la mia postazione di operations manager è la progressione graduale e misurabile.",
  },
  {
    title: "Overcoming Gravity",
    author: "Steven Low",
    asin: "1468178351",
    rating: 4,
    category: "personal",
    year_read: 2023,
    description:
      "Due volumi di anatomia funzionale e meccanica dell'esercizio. Il primo per capire come funziona, il secondo per programmare. Riferimento per chi fa coaching, non per l'allenatore medio.",
    key_takeaway:
      "Il volume uno insegna a non copiare esercizi. Il volume due insegna che il carico è una variabile che si gestisce come un budget, non come una scelta.",
  },
  {
    title: "Back Mechanic",
    author: "Dr. Stuart McGill",
    asin: "0973501820",
    rating: 5,
    category: "personal",
    year_read: 2022,
    description:
      "Scienza della colonna vertebrale e dei disturbi lombari. McGill spiega perché il dolore lombare è raramente un problema di muscoli deboli, e cosa dice davvero la letteratura.",
    key_takeaway:
      "Il punto che ribalta l'intuizione comune: la maggior parte dei dolori lombari non si risolve con gli addominali. È il caso più chiaro che conosco in cui la soluzione intuitiva e quella documentata sono opposte.",
  },
  {
    title: "Science and Development of Muscle Hypertrophy",
    author: "Brad Schoenfeld",
    asin: "1492597678",
    rating: 4,
    category: "personal",
    year_read: 2023,
    description:
      "Riferimento accademico sull'ipertrofia muscolare: meccanismo, volume, frequenza, selezione dei carichi. Scritto per chi allena e per chi vuole capire perché un carico funziona.",
    key_takeaway:
      "La parte utile è la discussione sul volume totale mensile per gruppo muscolare: la letteratura è più ampia e meno rigida di come viene quasi sempre ripetita nei palestre.",
  },
  {
    title: "The M.A.X. Muscle Plan 2.0",
    author: "Brad Schoenfeld",
    asin: "1718207141",
    rating: 4,
    category: "personal",
    year_read: 2024,
    description:
      "Un protocollo di ipertrofia basato sulla ricerca, con selezione dei carichi per zona e progressione a blocchi. Pensato per chi ha poco tempo e vuole capire perché funziona.",
    key_takeaway:
      "Un protocollo che si può seguire con due sedute a settimana. Il valore per me non è il piano: è la logica di scelta del volume per gruppo muscolare, che è gestione di risorse.",
  },
];

const CATEGORY_LABELS = {
  work: { it: "Lavoro", en: "Work" },
  personal: { it: "Personale", en: "Personal" },
};

function emit() {
  const byShelf = { work: [], personal: [] };
  for (const b of books) byShelf[b.category].push(b);

  const blocks = Object.entries(byShelf)
    .filter(([, list]) => list.length)
    .map(([shelf, list]) => {
      const items = list
        .map((b) =>
          [
            "    {",
            `      title: ${JSON.stringify(b.title)},`,
            `      author: ${JSON.stringify(b.author)},`,
            `      asin: ${JSON.stringify(b.asin)},`,
            `      rating: ${b.rating},`,
            `      category: ${JSON.stringify(b.category)},`,
            `      description: ${JSON.stringify(b.description)},`,
            `      description_it: ${JSON.stringify(b.description)},`,
            `      key_takeaway: ${JSON.stringify(b.key_takeaway)},`,
            `      key_takeaway_it: ${JSON.stringify(b.key_takeaway)},`,
            `      year_read: ${b.year_read},`,
            "    },",
          ].join("\n")
        )
        .join("\n");
      return `  ${JSON.stringify(shelf)}: [\n${items}\n  ],`;
    })
    .join("\n");

  return `const booksByShelf: Record<string, Book[]> = {\n${blocks}\n};\n\nconst SHELF_ORDER = ${JSON.stringify(Object.keys(byShelf))};\n\nconst SHELF_LABELS: Record<string, { it: string; en: string }> = ${JSON.stringify(CATEGORY_LABELS, null, 2)};`;
}

const page = readFileSync(PAGE, "utf8");
const start = page.indexOf("const booksByCategory");
const end = page.indexOf("};", page.indexOf('"Productivity & Self-Development"')) + 2;

if (start === -1 || end === -1) {
  console.error("Non ho trovato il blocco booksByCategory: controlla manualmente.");
  process.exit(1);
}

const next = page.slice(0, start) + emit() + page.slice(end);
writeFileSync(PAGE, next, "utf8");

console.log(`books: ${books.length} titoli su 2 mensole`);
console.log(`rimossi: ${STRIPPED.length}`);
for (const t of STRIPPED) console.log(`  - ${t}`);
