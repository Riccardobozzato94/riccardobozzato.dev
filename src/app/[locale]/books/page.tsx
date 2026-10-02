import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { BookOpen, ExternalLink, ArrowRight, Sparkles, Star } from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const site = await getTranslations("site");
  const isIt = locale === "it";

  return {
    title: isIt ? "La mia libreria" : "My bookshelf",
    description: isIt
      ? "I libri che mi restano addosso. Una mensola di lavoro e una personale, con quello che mi hanno cambiato. Link di affiliazione Amazon dichiarati."
      : "The books that stuck with me. One work shelf and one personal shelf, with what each of them changed. Amazon affiliate links, disclosed.",
    // Re-enabled 2026-10-02. The page had been left `noindex` and unlinked from
    // navigation, so 25 reviewed books with Amazon affiliate links were earning
    // nothing.
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "" }],
      title: `${isIt ? "La mia libreria" : "My bookshelf"} | ${site("title")}`,
      description: isIt
        ? "Una mensola di lavoro e una personale, con quello che mi hanno cambiato."
        : "One work shelf and one personal shelf, with what each of them changed.",
      url: `${baseUrl}/${locale}/books`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/books`,
      languages: {
        en: `${baseUrl}/en/books`,
        it: `${baseUrl}/it/books`,
      },
    },
  };
}

// Amazon affiliate tag (StoreID). Affiliate links are disclosed in the footer
// and on this page, as Amazon's programme requires.
const AMAZON_TAG = "rikbozz-21";

function amazonLink(asin: string, locale: string): string {
  const domain = locale === "it" ? "amazon.it" : "amazon.com";
  return `https://www.${domain}/dp/${asin}?tag=${AMAZON_TAG}`;
}

type Book = {
  title: string;
  author: string;
  asin: string;
  rating: number;
  category: string;
  description: string;
  description_it: string;
  key_takeaway: string;
  key_takeaway_it: string;
  year_read: number;
};

/**
 * Two shelves, not one category list.
 *
 * The previous version put *Principles* and *Antifragile* on the same shelf as
 * six muscle books, four pop self-help titles and two novels, each carrying a
 * generated blurb and an invented first-person takeaway. On a site that sells
 * operations credibility, that reads as affiliate link farming.
 *
 * `work` has to justify the positioning. `personal` is the other half of the
 * job: staying able to do it. Neither pretends to be the other.
 */
const booksByShelf: Record<string, Book[]> = {
  work: [
    {
      title: "Principles: Life and Work",
      author: "Ray Dalio",
      asin: "1501124021",
      rating: 5,
      category: "work",
      description:
        "Ricostruisce come Bridgewater sia passata da un uomo con un'idea a un'organizzazione con un sistema: principi scritti, decisioni pesate sulla credibilità di chi decide, e divergenza strutturata quando qualcuno ha torto.",
      description_it: "",
      key_takeaway:
        "L'argomento è che la trasparenza radicale senza un metodo per decidere diventa solo rumore. Il merito è il metodo, non la trasparenza.",
      key_takeaway_it: "",
      year_read: 2024,
    },
    {
      title: "Principles for Dealing with the Changing World Order",
      author: "Ray Dalio",
      asin: "1982160276",
      rating: 4,
      category: "work",
      description:
        "Quattrocento anni di paesi in ascesa e caduta, letti per estrarre pattern. L'autore scrive esplicitamente che un modello di cinque secoli è una base fragile.",
      description_it: "",
      key_takeaway:
        "Serve più come avvertenza metodologica che come previsione: lo stesso autore scrive che storie diverse si ripetono in modi diversi.",
      key_takeaway_it: "",
      year_read: 2023,
    },
    {
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      asin: "0060555661",
      rating: 4,
      category: "work",
      description:
        "Il testo che ha definito l'investimento come disciplina: margine di sicurezza, distinzione fra investimento e speculazione, e la regola di non mettere tutto nello stesso posto.",
      description_it: "",
      key_takeaway:
        "Se non hai descritto in anticipo perché stai comprando qualcosa, non è un investimento. La regola vale identica per i processi.",
      key_takeaway_it: "",
      year_read: 2022,
    },
    {
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      asin: "0671027034",
      rating: 5,
      category: "work",
      description:
        "Scritto nel 1936, è la base di quasi tutti i manuali di comunicazione aziendale. Non è un libro sulla persuasione: è un libro su come non far arrabbiare la persona con cui devi lavorare.",
      description_it: "",
      key_takeaway:
        "Chiedere invece di ordinare, riconoscere l'apporto altrui prima di proporre il tuo. Elementari, e per questo dimenticati. In un reparto operations è metà del lavoro.",
      key_takeaway_it: "",
      year_read: 2021,
    },
    {
      title: "Antifragile",
      author: "Nassim Nicholas Taleb",
      asin: "0812979690",
      rating: 4,
      category: "work",
      description:
        "Tre categorie: fragile, che si rompe con lo stress; robusta, che regge; antifragile, che ne guadagna. L'argomento è che ottimizzare per il caso medio produce sistemi fragili.",
      description_it: "",
      key_takeaway:
        "Un processo senza margine di tolleranza è fragile anche quando funziona. Su una supply chain, l'anno difficile non è un'ipotesi.",
      key_takeaway_it: "",
      year_read: 2024,
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt, David Thomas",
      asin: "0135957052",
      rating: 5,
      category: "work",
      description:
        "Il riferimento tecnico del gruppo di autori di The Mythical Man-Month: entropia del codice, conoscenza implicita nel team, e costo di aggiungere persone a un progetto in ritardo.",
      description_it: "",
      key_takeaway:
        "Se quello che sai sta solo nella testa di tre persone, non è un team con memoria: è un team con tre punti di fallimento.",
      key_takeaway_it: "",
      year_read: 2022,
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      asin: "0132350882",
      rating: 4,
      category: "work",
      description:
        "I principi per scrivere codice che altri possono modificare. Discusso oggi per il costo che comporta: il libro assume che il codice verrà letto.",
      description_it: "",
      key_takeaway:
        "Codice che ha bisogno di commenti è un costo che paghi ogni volta che lo tocchi. Il libro lo dice in modo più netto di quanto sia oggi di moda.",
      key_takeaway_it: "",
      year_read: 2021,
    },
    {
      title: "Hacklog Volume 2: Web Hacking",
      author: "Stefano Novelli",
      asin: "1794443290",
      rating: 3,
      category: "work",
      description:
        "Volume in italiano dedicato al web application security, con esercizi pratici sulle OWASP Top 10. Più manuale che testo argomentato.",
      description_it: "",
      key_takeaway:
        "Utile per l'ordine con cui si affronta la sicurezza in un reparto delivery: prima autenticazione e autorizzazione, poi tutto il resto.",
      key_takeaway_it: "",
      year_read: 2023,
    },
    {
      title: "1984",
      author: "George Orwell",
      asin: "0451524934",
      rating: 5,
      category: "work",
      description:
        "Il romanzo che ha dato il nome al concetto di sorveglianza di massa. L'argomento è più preciso di quanto sembri: non la teletrasmissione, ma la ristrutturazione del linguaggio.",
      description_it: "",
      key_takeaway:
        "Non il Grande Fratello: il linguaggio. Le parole che accetti smettono di essere tue prima che i dati lo siano.",
      key_takeaway_it: "",
      year_read: 2020,
    },
    {
      title: "Notes from Underground",
      author: "Fyodor Dostoevsky",
      asin: "048627053X",
      rating: 4,
      category: "work",
      description:
        "Il monologo del sottosuolo: un funzionario che spiega perché rifiuta di funzionare. Duecento anni fa, e la descrizione di chi rifiuta un processo per principio è ancora la più precisa che ho letto.",
      description_it: "",
      key_takeaway:
        "Anche una lezione su come scrivere la voce di chi rifiuta: l'argomento più forte che ho letto su perché la resistenza al cambiamento sia spesso razionale.",
      key_takeaway_it: "",
      year_read: 2019,
    },
  ],
  personal: [
    {
      title: "Starting Strength",
      author: "Mark Rippetoe",
      asin: "0982522738",
      rating: 4,
      category: "personal",
      description:
        "I cinque movimenti fondamentali e come progredirci. Manuale di forza di un coach specifico, con la struttura di ogni buon programma: uno schema, una progressione, un test.",
      description_it: "",
      key_takeaway:
        "È un programma, non un libro da leggere. Si legge una volta e si esegue per anni. La progressione graduale e misurabile è la stessa cosa che cerco in un processo.",
      key_takeaway_it: "",
      year_read: 2021,
    },
    {
      title: "Overcoming Gravity",
      author: "Steven Low",
      asin: "1468178351",
      rating: 4,
      category: "personal",
      description:
        "Due volumi di anatomia funzionale e meccanica dell'esercizio. Il primo per capire come funziona, il secondo per programmare. Riferimento per chi fa coaching.",
      description_it: "",
      key_takeaway:
        "Il volume uno insegna a non copiare esercizi. Il volume due che il carico è una variabile da gestire come un budget, non come una scelta.",
      key_takeaway_it: "",
      year_read: 2023,
    },
    {
      title: "Back Mechanic",
      author: "Dr. Stuart McGill",
      asin: "0973501820",
      rating: 5,
      category: "personal",
      description:
        "Scienza della colonna vertebrale e dei disturbi lombari. McGill spiega perché il dolore lombare è raramente un problema di muscoli deboli, e cosa dice davvero la letteratura.",
      description_it: "",
      key_takeaway:
        "La maggior parte dei dolori lombari non si risolve con gli addominali. È il caso più chiaro che conosco in cui la soluzione intuitiva e quella documentata sono opposte.",
      key_takeaway_it: "",
      year_read: 2022,
    },
    {
      title: "Science and Development of Muscle Hypertrophy",
      author: "Brad Schoenfeld",
      asin: "1492597678",
      rating: 4,
      category: "personal",
      description:
        "Riferimento accademico sull'ipertrofia muscolare: meccanismo, volume, frequenza, selezione dei carichi. Scritto per chi allena e per chi vuole capire perché un carico funziona.",
      description_it: "",
      key_takeaway:
        "Sul volume totale mensile per gruppo muscolare la letteratura è più ampia e meno rigida di come venga quasi sempre ripetuta nelle palestre.",
      key_takeaway_it: "",
      year_read: 2023,
    },
    {
      title: "The M.A.X. Muscle Plan 2.0",
      author: "Brad Schoenfeld",
      asin: "1718207141",
      rating: 4,
      category: "personal",
      description:
        "Un protocollo di ipertrofia basato sulla ricerca, con selezione dei carichi per zona e progressione a blocchi. Pensato per chi ha poco tempo.",
      description_it: "",
      key_takeaway:
        "Un protocollo che si segue con due sedute a settimana. Il valore non è il piano: è la logica di scelta del volume, che è gestione di risorse.",
      key_takeaway_it: "",
      year_read: 2024,
    },
  ],
};

const SHELF_ORDER = ["work", "personal"] as const;

const SHELF_LABELS: Record<string, { it: string; en: string; blurbIt: string; blurbEn: string }> = {
  work: {
    it: "Lavoro",
    en: "Work",
    blurbIt:
      "I libri che devono giustificare quello che faccio. Se uno di questi non ti serve, probabilmente non ti serve il lavoro che faccio.",
    blurbEn:
      "The books that have to justify what I do. If one of them is not useful to you, the work I do probably is not either.",
  },
  personal: {
    it: "Personale",
    en: "Personal",
    blurbIt:
      "L'altra metà del lavoro: restare in condizione di farlo. Quattro su cinque sono tecnici di sollevamento, e questa è una scelta.",
    blurbEn:
      "The other half of the job: staying able to do it. Four of five are lifting references, and that is a deliberate choice.",
  },
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-3 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20"}`} />
      ))}
    </span>
  );
}

function BookCard({ book, locale }: { book: Book; locale: string }) {
  const isIt = locale === "it";
  const description = isIt ? book.description_it || book.description : book.description;
  const takeaway = isIt ? book.key_takeaway_it || book.key_takeaway : book.key_takeaway;

  return (
    <a
      href={amazonLink(book.asin, locale)}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block h-full"
    >
      <div className="h-full rounded-xl border border-border/50 bg-card/50 p-5 transition-all duration-300 hover:border-accent/30 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <h3 className="font-semibold tracking-tight leading-snug text-[15px]">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
          </div>
          <Stars rating={book.rating} />
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

        <p className="text-sm text-foreground/85 leading-relaxed mt-3 border-l-2 border-accent/40 pl-3">
          {takeaway}
        </p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
          <span className="text-[11px] font-mono text-muted-foreground/70">
            {book.year_read}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-accent">
            {isIt ? "Vedi su Amazon" : "See on Amazon"}
            <ExternalLink className="size-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default async function BooksPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";
  const allBooks = Object.values(booksByShelf).flat();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! relative">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <BookOpen className="size-3.5" />
              {allBooks.length} {isIt ? "libri" : "books"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
              {isIt ? "La mia libreria" : "My bookshelf"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isIt
                ? "Due mensole. Una di lavoro, una personale. Non ho il tempo di scrivere la scheda di ogni libro che leggo, quindi qui ci sono solo quelli che mi hanno cambiato qualcosa — e per cui ho cambiato io qualcosa."
                : "Two shelves. One for work, one personal. I do not have time to write a note on everything I read, so these are only the ones that changed something — and that I changed something about."}
            </p>
            <p className="text-sm text-muted-foreground/70 mt-4 border-l-2 border-border pl-4 italic leading-relaxed">
              {isIt
                ? "I link sono di affiliazione Amazon: se compri un libro attraverso questa pagina, Amazon mi versa una commissione senza che tu paghi nulla in più. Non cambia il prezzo, e non cambia il giudizio qui sopra."
                : "The links are Amazon affiliate links: if you buy a book through this page, Amazon pays me a commission and you pay nothing extra. It does not change the price, and it does not change the judgement above."}
            </p>
          </div>
        </Section>
      </section>

      {/* Shelves */}
      {SHELF_ORDER.map((shelf) => (
        <Section
          key={shelf}
          animate
          delay={shelf === "work" ? 0 : 100}
          className={shelf === "work" ? "pb-16! md:!pb-20" : "bg-muted/30 py-16! md:!py-20"}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {isIt ? SHELF_LABELS[shelf].it : SHELF_LABELS[shelf].en}
              </h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {isIt ? SHELF_LABELS[shelf].blurbIt : SHELF_LABELS[shelf].blurbEn}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {booksByShelf[shelf].map((book) => (
                <BookCard key={book.asin} book={book} locale={locale} />
              ))}
            </div>
          </div>
        </Section>
      ))}

      {/* CTA */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Sparkles className="size-6 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {isIt ? "Cerchi i libri giusti per un reparto?" : "Looking for the right books for a team?"}
          </h2>
          <p className="text-muted-foreground">
            {isIt
              ? "Ho letto quasi tutta questa libreria per un motivo preciso. Se ti serve una lista che non sia generica, scrivimi e te la mando."
              : "I have read almost all of this shelf for a specific reason. If you need a list that is not generic, write to me and I will send it."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {isIt ? "Scrivimi" : "Message me"}
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/freebie"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border/60 px-6 text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              {isIt ? "Diagnosi del Time-to-Market" : "Time-to-Market Diagnostic"}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
