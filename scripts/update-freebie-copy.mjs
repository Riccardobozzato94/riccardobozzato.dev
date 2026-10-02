/**
 * Rewrites the `freebie` copy in messages/{it,en}.json
 * Run: bun scripts/update-freebie-copy.mjs
 *
 * Why: the previous copy was generic marketing filler — Title Case On Every
 * Word, "Operational Chaos Diagnostic" with "Chaos" left untranslated, and a
 * description that promised "the same framework I use with my consulting
 * clients". The worksheet itself was also an empty English form, so the promise
 * and the deliverable did not match.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const MSG_DIR = join(process.cwd(), "messages");

const freebie = {
  it: {
    badge: "Foglio di lavoro · PDF",
    title: "Diagnosi del Time-to-Market",
    subtitle: "Novanta minuti, un foglio, tre azioni con un nome e una data.",
    description:
      "È il foglio che uso per capire dove un team perde tempo, prima di decidere cosa sistemare. Lo compili in tre passi: descrivi il processo, separi il tempo in cui qualcuno lavora davvero dal tempo in cui il lavoro aspetta, poi incroci due numeri per arrivare a una decisione. Se in novanta minuti non escono tre azioni con un responsabile, il foglio ha fallito.",
    honestNote:
      "Non contiene benchmark universali. Le soglie sono default sensati per iniziare a ragionare: cambiale quando hai un dato tuo che li contraddice.",
    whatsInsideTitle: "Cosa c'è dentro",
    whatsInside: [
      "Tre passi su un solo processo alla volta, con i tempi indicati per ciascuno",
      "Le tre cose da contare: cambi di mano, strumenti coinvolti, approvazioni",
      "Il calcolo dell'efficienza, e la soglia sotto cui un processo è solo attesa",
      "Le quattro cause da cui nasce il tempo di attesa, nell'ordine in cui si cercano",
      "Una matrice a quattro quadranti che chiude in una decisione, non in un desiderio",
      "Tre azioni con responsabile, scadenza e il numero che dirà se ha funzionato",
    ],
    howTitle: "Come si usa",
    how: [
      {
        step: "01",
        title: "Scegli un processo",
        desc: "Quello che oggi ti fa perdere le promesse più spesso. Non il più semplice da misurare: quello no, è una trappola.",
      },
      {
        step: "02",
        title: "Compila staccando",
        desc: "Novanta minuti con il tabellone aperto. Numeri a memoria non valgono: se non sai da dove viene il dato, il dato non conta.",
      },
      {
        step: "03",
        title: "Decidi e scrivi",
        desc: "Tre azioni, non sette. Una lista di sette non inizia. Metti un nome e una data accanto a ognuna.",
      },
    ],
    forWhoTitle: "A chi serve",
    forWho: [
      "Head of Operations, Operations Manager e Delivery Manager",
      "Project Manager e Scrum Master che rispondono delle scadenze",
      "Founder o COO di una scale-up che è cresciuta più veloce dei processi",
      "E-commerce Manager che risponde dell'evasione e dei resi",
    ],
    forWhoNotTitle: "A chi non serve",
    forWhoNot: [
      "Se cerchi un corso da seguire: qui non c'è nessun video, solo un foglio da compilare",
      "Se la tua azienda ha meno di dieci persone e un processo solo: non c'è ancora caos da diagnosticare",
      "Se vuoi che qualcuno lo faccia al posto tuo: per quello c'è la consulenza, e costa",
      "Se ti serve un software che lo faccia al posto tuo: esistono, e sono lontani da quello che fai",
    ],
    form: {
      name: "Nome",
      namePlaceholder: "Come ti chiami",
      email: "Email",
      emailPlaceholder: "tu@azienda.com",
      cta: "Inviami il foglio",
      sending: "Invio in corso...",
      success: "Controlla la casella",
      successDesc:
        "Ti ho mandato un link da confermare. appena lo apri parte il download del foglio, e da lì comincia la sequenza.",
      downloadNow: "Scarica il foglio",
      privacyNote:
        "Sei email in 30 giorni, e una disiscrizione con un clic in fondo a ognuna. I tuoi dati restano nel mio database e non li passo a nessuno.",
      error: "Non è andato a buon fine. Riprova tra un secondo.",
    },
  },
  en: {
    badge: "Worksheet · PDF",
    title: "Time-to-Market Diagnostic",
    subtitle: "Ninety minutes, one worksheet, three actions with a name and a date.",
    description:
      "This is the worksheet I use to find out where a team loses time, before deciding what to fix. You fill it in three steps: describe the process, separate the time someone is genuinely working from the time the work is waiting, then cross two numbers to reach a decision. If ninety minutes don't produce three actions with an owner, the worksheet failed.",
    honestNote:
      "It contains no universal benchmarks. The thresholds are sensible defaults to get you reasoning: change them when you have your own data that contradicts them.",
    whatsInsideTitle: "What is inside",
    whatsInside: [
      "Three steps on a single process at a time, with the time budget for each",
      "The three things to count: handoffs, tools involved, approvals",
      "The efficiency calculation, and the threshold below which a process is pure waiting",
      "The four causes waiting time comes from, in the order you should look for them",
      "A four-quadrant matrix that ends in a decision rather than a wish",
      "Three actions with an owner, a deadline, and the number that tells you it worked",
    ],
    howTitle: "How to use it",
    how: [
      {
        step: "01",
        title: "Pick one process",
        desc: "The one that makes you miss promises most often. Not the easiest to measure: that is a trap.",
      },
      {
        step: "02",
        title: "Fill it in away from your desk",
        desc: "Ninety minutes with the whiteboard open. Numbers from memory are worthless: if you cannot say where a number came from, it does not count.",
      },
      {
        step: "03",
        title: "Decide and write it down",
        desc: "Three actions, not seven. A list of seven never starts. Put a name and a date next to each one.",
      },
    ],
    forWhoTitle: "Who it is for",
    forWho: [
      "Heads of Operations, Operations Managers and Delivery Managers",
      "Project Managers and Scrum Masters who answer for deadlines",
      "Founders and COOs of a scale-up that outgrew its processes",
      "E-commerce Managers answerable for fulfilment and returns",
    ],
    forWhoNotTitle: "Who it is not for",
    forWhoNot: [
      "If you want a course to follow: there is no video here, just a sheet to fill in",
      "If you have fewer than ten people and a single process: there is no chaos to diagnose yet",
      "If you want someone to do it for you: that is consulting, and it costs",
      "If you want software to do it for you: it exists, and it is nothing like what you do",
    ],
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      cta: "Send me the worksheet",
      sending: "Sending...",
      success: "Check your inbox",
      successDesc:
        "I sent you a confirmation link. As soon as you click it the download starts, and the email sequence begins.",
      downloadNow: "Download the worksheet",
      privacyNote:
        "Six emails in 30 days, and an unsubscribe link at the bottom of each one. Your data stays in my database and is never passed on.",
      error: "That did not go through. Try again in a second.",
    },
  },
};

function apply(locale) {
  const file = join(MSG_DIR, `${locale}.json`);
  const json = JSON.parse(readFileSync(file, "utf8"));

  json.freebie = freebie[locale];

  const serialised = (JSON.stringify(json, null, 2) + "\n").replace(/\n/g, "\r\n");
  writeFileSync(file, serialised, "utf8");
  console.log(`${locale}: freebie aggiornato (${Object.keys(json.freebie).length} chiavi)`);
}

for (const locale of ["it", "en"]) apply(locale);
