import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { BookOpen, ExternalLink, Star, Sparkles, ArrowRight, Download } from "lucide-react";
import Section from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    title: isIt ? "Libri — I Libri che ho Letto" : "Books — What I'm Reading",
    description: isIt
      ? "I libri che hanno formato il mio pensiero su operations, tecnologia, leadership e crescita personale. Con link di affiliazione Amazon."
      : "The books that shaped my thinking on operations, technology, leadership, and personal growth. With Amazon affiliate links.",
    openGraph: {
      title: `${isIt ? "Libri" : "Books"} | ${site("title")}`,
      description: isIt
        ? "Biblioteca personale con recensioni e link Amazon."
        : "Personal library with reviews and Amazon links.",
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

// Amazon affiliate tag (StoreID)
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

// ─── All books organized by category ───
const booksByCategory: Record<string, Book[]> = {
  "Business & Strategy": [
    {
      title: "Principles: Life and Work",
      author: "Ray Dalio",
      asin: "1501124021",
      rating: 5,
      category: "Business & Strategy",
      description:
        "The #1 NYT bestseller from the founder of Bridgewater Associates on radical transparency, idea meritocracies, and systemized decision-making. Essential for anyone building resilient operations.",
      description_it:
        "Il bestseller nº 1 del NYT del fondatore di Bridgewater Associates su trasparenza radicale, meritocrazia delle idee e decisioni sistemizzate. Essenziale per chi costruisce operations resilienti.",
      key_takeaway:
        "Systemize everything into principles. Radical transparency and believability-weighted decision-making create the strongest cultures.",
      key_takeaway_it:
        "Sistemizza tutto in principi. La trasparenza radicale e le decisioni ponderate sulla credibilità creano le culture più solide.",
      year_read: 2024,
    },
    {
      title: "Principles for Dealing with the Changing World Order",
      author: "Ray Dalio",
      asin: "1982160276",
      rating: 4,
      category: "Business & Strategy",
      description:
        "Dalio examines the rise and fall of empires over 500 years to reveal the 'Big Cycle' that drives global shifts. A strategic lens for understanding macroeconomic risk.",
      description_it:
        "Dalio analizza l'ascesa e la caduta degli imperi in 500 anni per rivelare il 'Grande Ciclo' che guida i cambiamenti globali. Una lente strategica per comprendere il rischio macroeconomico.",
      key_takeaway:
        "History repeats in cycles. Understanding the archetype of empires helps navigate periods of radical change.",
      key_takeaway_it:
        "La storia si ripete in cicli. Comprendere l'archetipo degli imperi aiuta a navigare i periodi di cambiamento radicale.",
      year_read: 2022,
    },
    {
      title: "The 48 Laws of Power",
      author: "Robert Greene",
      asin: "0140280197",
      rating: 4,
      category: "Business & Strategy",
      description:
        "The definitive manual on power dynamics, distilled from 3,000 years of history. Essential reading for stakeholder management and organizational navigation.",
      description_it:
        "Il manuale definitivo sulle dinamiche del potere, distillato da 3.000 anni di storia. Lettura essenziale per la gestione degli stakeholder e la navigazione organizzativa.",
      key_takeaway:
        "Power is a game you can't opt out of. Learn the rules, or become a pawn. Master the laws of strategy and human nature.",
      key_takeaway_it:
        "Il potere è un gioco da cui non puoi ritirarti. Impara le regole o diventa un pedina. Padroneggia le leggi della strategia e della natura umana.",
      year_read: 2023,
    },
    {
      title: "The 50th Law",
      author: "Robert Greene & 50 Cent",
      asin: "006177460X",
      rating: 4,
      category: "Business & Strategy",
      description:
        "Fearlessness as the ultimate competitive advantage. Greene's strategic wisdom meets 50 Cent's street-smart hustle — a playbook for operating without limitations.",
      description_it:
        "L'audacia come vantaggio competitivo supremo. La saggezza strategica di Greene incontra l'intraprendenza di strada di 50 Cent — un playbook per operare senza limiti.",
      key_takeaway:
        "Fear nothing. The ability to take calculated risks without emotional attachment is the foundation of all power.",
      key_takeaway_it:
        "Non temere nulla. La capacità di correre rischi calcolati senza attaccamento emotivo è il fondamento di ogni potere.",
      year_read: 2023,
    },
    {
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      asin: "0060555661",
      rating: 4,
      category: "Business & Strategy",
      description:
        "The definitive book on value investing. Timeless principles on risk management, margin of safety, and long-term thinking — directly applicable to operations strategy.",
      description_it:
        "Il libro definitivo sull'investimento di valore. Principi senza tempo su gestione del rischio, margine di sicurezza e pensiero di lungo periodo — direttamente applicabili alla strategia operativa.",
      key_takeaway:
        "The intelligent investor is realistic, not optimistic. Margin of safety is the central concept of investment.",
      key_takeaway_it:
        "L'investitore intelligente è realista, non ottimista. Il margine di sicurezza è il concetto centrale dell'investimento.",
      year_read: 2023,
    },
    {
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      asin: "0671027034",
      rating: 5,
      category: "Business & Strategy",
      description:
        "The timeless classic on human relationships. As relevant today for stakeholder management as it was in 1936.",
      description_it:
        "Il classico senza tempo sulle relazioni umane. Oggi rilevante per la gestione degli stakeholder quanto lo era nel 1936.",
      key_takeaway:
        "The deepest human need is to feel important. Listen more than you talk. Remember names. Be genuinely interested.",
      key_takeaway_it:
        "Il bisogno umano più profondo è sentirsi importanti. Ascolta più di quanto parli. Ricorda i nomi. Sii genuinamente interessato.",
      year_read: 2022,
    },
  ],
  "Software Engineering": [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      asin: "0132350882",
      rating: 4,
      category: "Software Engineering",
      description:
        "A Handbook of Agile Software Craftsmanship. The bible of writing code that humans can read, maintain, and love.",
      description_it:
        "Un manuale di artigianato software agile. La bibbia per scrivere codice che gli umani possono leggere, mantenere e amare.",
      key_takeaway:
        "Code is read far more often than it's written. Clean code is not optional — it's professional ethics.",
      key_takeaway_it:
        "Il codice viene letto molto più spesso di quanto venga scritto. Il codice pulito non è facoltativo — è etica professionale.",
      year_read: 2023,
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt, David Thomas",
      asin: "0135957052",
      rating: 5,
      category: "Software Engineering",
      description:
        "From Journeyman to Master. Timeless software engineering wisdom that transcends languages and frameworks.",
      description_it:
        "Da garzone a maestro. Saggezza ingegneristica senza tempo che va oltre linguaggi e framework.",
      key_takeaway:
        "Invest in your knowledge portfolio. Don't repeat yourself. Automate everything you can.",
      key_takeaway_it:
        "Investi nel tuo portafoglio di conoscenze. Non ripeterti. Automatizza tutto ciò che puoi.",
      year_read: 2023,
    },
    {
      title: "Hacklog Volume 2: Web Hacking",
      author: "Stefano Novelli",
      asin: "1794443290",
      rating: 3,
      category: "Software Engineering",
      description:
        "Italian manual on web security and ethical hacking. Covers SQL injection, XSS, CSRF, and penetration testing methodologies. Practical for understanding how attackers think.",
      description_it:
        "Manuale italiano su sicurezza web ed ethical hacking. Copre SQL injection, XSS, CSRF e metodologie di penetration testing. Pratico per capire come ragionano gli attaccanti.",
      key_takeaway:
        "To defend a system, you must think like an attacker. Security is not a feature — it's a continuous practice.",
      key_takeaway_it:
        "Per difendere un sistema devi pensare come un attaccante. La sicurezza non è una funzionalità — è una pratica continua.",
      year_read: 2024,
    },
  ],
  "Productivity & Self-Development": [
    {
      title: "Atomic Habits",
      author: "James Clear",
      asin: "0735211299",
      rating: 5,
      category: "Productivity & Self-Development",
      description:
        "An Easy & Proven Way to Build Good Habits & Break Bad Ones. The foundational text for any operations professional.",
      description_it:
        "Un metodo semplice e comprovato per costruire abitudini positive e eliminare quelle negative. Il testo fondamentale per ogni professionista delle operations.",
      key_takeaway:
        "Systems beat goals. Focus on 1% improvements daily. Design your environment for success.",
      key_takeaway_it:
        "I sistemi battono gli obiettivi. Concentrati su miglioramenti dell'1% al giorno. Progetta il tuo ambiente per il successo.",
      year_read: 2024,
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      asin: "1455586692",
      rating: 5,
      category: "Productivity & Self-Development",
      description:
        "Rules for focused success in a distracted world. Essential reading for anyone managing complex projects in an always-on environment.",
      description_it:
        "Regole per il successo focalizzato in un mondo distratto. Lettura essenziale per chi gestisce progetti complessi in un ambiente sempre connesso.",
      key_takeaway:
        "Deep work is becoming rare and therefore valuable. Schedule it ruthlessly. Shallow work is a tax on your potential.",
      key_takeaway_it:
        "Il lavoro profondo sta diventando raro e quindi prezioso. Pianificalo senza pietà. Il lavoro superficiale è una tassa sul tuo potenziale.",
      year_read: 2024,
    },
    {
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      asin: "0062457713",
      rating: 4,
      category: "Productivity & Self-Development",
      description:
        "A counterintuitive approach to living a good life. Choose what to care about carefully.",
      description_it:
        "Un approccio controintuitivo a una vita felice. Scegli con cura a cosa dare importanza.",
      key_takeaway:
        "You have limited f*cks. Spend them on what actually matters. Values determine everything.",
      key_takeaway_it:
        "Hai un numero limitato di 'f*ck'. Spendili per ciò che conta davvero. I valori determinano tutto.",
      year_read: 2023,
    },
    {
      title: "Dopamine Nation",
      author: "Dr. Anna Lembke",
      asin: "152474672X",
      rating: 4,
      category: "Productivity & Self-Development",
      description:
        "Finding Balance in the Age of Indulgence. Understanding the neuroscience of addiction and why constraint drives productivity.",
      description_it:
        "Trovare l'equilibrio nell'era dell'indulgenza. Capire la neuroscienza della dipendenza e perché la moderazione alimenta la produttività.",
      key_takeaway:
        "The pleasure-pain balance governs all behavior. Dopamine fasting isn't a trend — it's neurobiology.",
      key_takeaway_it:
        "L'equilibrio piacere-dolore governa ogni comportamento. Il digiuno da dopamina non è una moda — è neurobiologia.",
      year_read: 2024,
    },
  ],
  "Mindset & Resilience": [
    {
      title: "Can't Hurt Me",
      author: "David Goggins",
      asin: "1544512279",
      rating: 5,
      category: "Mindset & Resilience",
      description:
        "Master Your Mind and Defy the Odds. The ultimate lesson in mental toughness and operational resilience.",
      description_it:
        "Padroneggia la tua mente e sfida le avversità. La lezione definitiva su resistenza mentale e resilienza operativa.",
      key_takeaway:
        "The 40% rule: when your mind says you're done, you're only at 40% of your capability. Embrace the uncomfortable.",
      key_takeaway_it:
        "La regola del 40%: quando la mente dice che hai finito, sei solo al 40% delle tue capacità. Abbraccia il disagio.",
      year_read: 2024,
    },
    {
      title: "Antifragile",
      author: "Nassim Nicholas Taleb",
      asin: "0812979690",
      rating: 4,
      category: "Mindset & Resilience",
      description:
        "Things That Gain from Disorder. The concept of antifragility — systems that get stronger from shocks — is directly applicable to operations architecture.",
      description_it:
        "Cose che traggono giovamento dal disordine. Il concetto di antifragilità — sistemi che si rafforzano grazie agli shock — è direttamente applicabile all'architettura operativa.",
      key_takeaway:
        "Build systems that benefit from disorder. Remove fragilities instead of predicting the future.",
      key_takeaway_it:
        "Costruisci sistemi che traggono beneficio dal disordine. Elimina le fragilità invece di prevedere il futuro.",
      year_read: 2024,
    },
    {
      title: "12 Rules for Life",
      author: "Jordan B. Peterson",
      asin: "0345816021",
      rating: 4,
      category: "Mindset & Resilience",
      description:
        "An Antidote to Chaos. A framework for taking responsibility, building resilience, and bringing order to complexity.",
      description_it:
        "Un antidoto al caos. Un framework per assumersi la responsabilità, costruire resilienza e portare ordine nella complessità.",
      key_takeaway:
        "Stand up straight with your shoulders back. Set your house in perfect order before criticizing the world.",
      key_takeaway_it:
        "Stai dritto con le spalle indietro. Metti in ordine perfetto la tua casa prima di criticare il mondo.",
      year_read: 2023,
    },
  ],
  "Communication & Storytelling": [
    {
      title: "Surrounded by Psychopaths",
      author: "Thomas Erikson",
      asin: "1250763888",
      rating: 3,
      category: "Communication & Storytelling",
      description:
        "How to protect yourself from toxic people. Understanding behavioral types for better team dynamics.",
      description_it:
        "Come proteggersi dalle persone tossiche. Comprendere i tipi comportamentali per una migliore dinamica di squadra.",
      key_takeaway:
        "Not all destructive behavior is malicious — some is just different wiring. Understanding DISC profiles helps navigate conflict.",
      key_takeaway_it:
        "Non tutto il comportamento distruttivo è malvagio — alcuni sono solo 'cablati' diversamente. Capire i profili DISC aiuta a gestire i conflitti.",
      year_read: 2024,
    },
  ],
  "Philosophy & Fiction": [
    {
      title: "1984",
      author: "George Orwell",
      asin: "0451524934",
      rating: 5,
      category: "Philosophy & Fiction",
      description:
        "The dystopian masterpiece that predicts surveillance culture. Essential for understanding privacy in the AI age.",
      description_it:
        "Il capolavoro distopico che predice la cultura della sorveglianza. Essenziale per comprendere la privacy nell'era dell'IA.",
      key_takeaway:
        "Language controls thought. Who controls the past controls the future. Technology enables control at scale.",
      key_takeaway_it:
        "Il linguaggio controlla il pensiero. Chi controlla il passato controlla il futuro. La tecnologia abilita il controllo su larga scala.",
      year_read: 2022,
    },
    {
      title: "Notes from Underground",
      author: "Fyodor Dostoevsky",
      asin: "048627053X",
      rating: 4,
      category: "Philosophy & Fiction",
      description:
        "The existential novella that explores irrationality, free will, and the human condition.",
      description_it:
        "La novella esistenzialista che esplora l'irrazionalità, il libero arbitrio e la condizione umana.",
      key_takeaway:
        "Humans are not rational calculators. Denying irrationality is itself irrational — a lesson in understanding people.",
      key_takeaway_it:
        "Gli esseri umani non sono calcolatrici razionali. Negare l'irrazionalità è di per sé irrazionale — una lezione per comprendere le persone.",
      year_read: 2023,
    },
    {
      title: "Elon Musk",
      author: "Ashlee Vance",
      asin: "0062301233",
      rating: 4,
      category: "Philosophy & Fiction",
      description:
        "Tesla, SpaceX, and the Quest for a Fantastic Future. The story of first-principles thinking applied at the highest level.",
      description_it:
        "Tesla, SpaceX e la ricerca di un futuro fantastico. La storia del pensiero dai primi principi applicato al massimo livello.",
      key_takeaway:
        "First-principles reasoning lets you break down problems to their fundamentals and rebuild from there.",
      key_takeaway_it:
        "Il ragionamento dai primi principi ti permette di scomporre i problemi fino alle basi e ricostruire da lì.",
      year_read: 2024,
    },
  ],
  "Fitness & Health": [
    {
      title: "Overcoming Gravity",
      author: "Steven Low",
      asin: "1468178351",
      rating: 4,
      category: "Fitness & Health",
      description:
        "A Systematic Approach to Gymnastics and Bodyweight Strength. The operations mindset applied to physical training.",
      description_it:
        "Un approccio sistematico alla ginnastica e alla forza a corpo libero. La mentalità operativa applicata all'allenamento fisico.",
      key_takeaway:
        "Progressive overload is the universal principle of growth — in fitness, skills, and operations.",
      key_takeaway_it:
        "Il sovraccarico progressivo è il principio universale della crescita — nel fitness, nelle abilità e nelle operations.",
      year_read: 2023,
    },
    {
      title: "Starting Strength",
      author: "Mark Rippetoe",
      asin: "0982522738",
      rating: 4,
      category: "Fitness & Health",
      description:
        "Basic Barbell Training, 3rd Edition. The definitive guide to strength training mechanics — as precise and systematic as any technical operations manual.",
      description_it:
        "Allenamento di base con bilanciere, 3ª edizione. La guida definitiva alla meccanica del forza allenamento — precisa e sistematica quanto qualsiasi manuale operativo tecnico.",
      key_takeaway:
        "Master the basic lifts before optimizing. Form follows function. Strength is the foundation of all athletic performance.",
      key_takeaway_it:
        "Padroneggia i sollevamenti di base prima di ottimizzare. La forma segue la funzione. La forza è il fondamento di ogni prestazione atletica.",
      year_read: 2023,
    },
    {
      title: "Back Mechanic",
      author: "Dr. Stuart McGill",
      asin: "0973501820",
      rating: 5,
      category: "Fitness & Health",
      description:
        "The step-by-step McGill Method to fix back pain. Evidence-based spine health from 30 years of research — essential for anyone who sits at a desk.",
      description_it:
        "Il metodo McGill passo dopo passo per risolvere il mal di schiena. Salute della colonna basata su evidenze da 30 anni di ricerca — essenziale per chi sta seduto alla scrivania.",
      key_takeaway:
        "Find your pain trigger, remove the cause, then build resilience. The 'Big 3' exercises are non-negotiable for spine health.",
      key_takeaway_it:
        "Trova il tuo fattore scatenante del dolore, rimuovi la causa, poi costruisci resistenza. I 'Big 3' esercizi sono imprescindibili per la salute della colonna.",
      year_read: 2024,
    },
    {
      title: "Science and Development of Muscle Hypertrophy",
      author: "Brad Schoenfeld",
      asin: "1492597678",
      rating: 4,
      category: "Fitness & Health",
      description:
        "The definitive scientific resource on muscle growth. Over 1,000 references covering mechanisms, programming, and nutrition for hypertrophy.",
      description_it:
        "La risorsa scientifica definitiva sulla crescita muscolare. Oltre 1.000 riferimenti su meccanismi, programmazione e nutrizione per l'ipertrofia.",
      key_takeaway:
        "Mechanical tension, muscle damage, and metabolic stress are the three mechanisms of hypertrophy. Volume is the primary driver.",
      key_takeaway_it:
        "Tensione meccanica, danno muscolare e stress metabolico sono i tre meccanismi dell'ipertrofia. Il volume è il fattore principale.",
      year_read: 2024,
    },
    {
      title: "The M.A.X. Muscle Plan 2.0",
      author: "Brad Schoenfeld",
      asin: "1718207141",
      rating: 4,
      category: "Fitness & Health",
      description:
        "A science-based 6-month total-body transformation program. Three phases (Strength, Metabolic, Muscle) backed by the latest hypertrophy research.",
      description_it:
        "Un programma di trasformazione totale basato sulla scienza di 6 mesi. Tre fasi (Forza, Metabolico, Muscolo) supportate dalle ultime ricerche sull'ipertrofia.",
      key_takeaway:
        "Periodization is the key to sustained progress. Rotate between strength, metabolic, and muscle phases to avoid plateaus.",
      key_takeaway_it:
        "La periodizzazione è la chiave per un progresso sostenuto. Alterna tra fasi di forza, metabolica e muscolare per evitare plateau.",
      year_read: 2024,
    },
  ],
};

const categoryOrder = [
  "Business & Strategy",
  "Software Engineering",
  "Productivity & Self-Development",
  "Mindset & Resilience",
  "Communication & Storytelling",
  "Philosophy & Fiction",
  "Fitness & Health",
];

const allBooks = Object.values(booksByCategory).flat();

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20"}`}
        />
      ))}
    </span>
  );
}

function BookCard({ book, locale, featured }: { book: Book; locale: string; featured?: boolean }) {
  const isIt = locale === "it";
  const description = isIt ? book.description_it : book.description;
  const keyTakeaway = isIt ? book.key_takeaway_it : book.key_takeaway;
  return (
    <a
      href={amazonLink(book.asin, locale)}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block"
    >
      <Card className={`h-full border-border/50 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1 ${featured ? "border-accent/20 bg-accent/[0.02]" : ""}`}>
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground/60 border-border/30">
              {book.category}
            </Badge>
            <div className="text-xs text-muted-foreground/40">{book.year_read}</div>
          </div>
          <h3 className={`font-bold mb-1 group-hover:text-accent transition-colors ${featured ? "text-lg" : "text-base"}`}>
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground/70 mb-2">{book.author}</p>
          <Stars rating={book.rating} />
          <p className={`text-muted-foreground mt-3 leading-relaxed flex-1 ${featured ? "text-sm" : "text-xs"}`}>
            {description}
          </p>
          <div className="mt-4 pt-3 border-t border-border/30">
            <p className={`italic text-accent/80 leading-relaxed ${featured ? "text-xs" : "text-[11px]"}`}>
              &ldquo;{keyTakeaway}&rdquo;
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>{(locale === "it") ? "Vedi su Amazon" : "View on Amazon"}</span>
            <ExternalLink className="size-3" />
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

export default async function BooksPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("books");
  const isIt = locale === "it";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[150px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <BookOpen className="size-3.5" />
              {isIt ? "Biblioteca" : "Library"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {t("description")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {categoryOrder.map((cat) => (
                <a key={cat} href={`#${cat.replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-xs font-medium text-muted-foreground/60 hover:text-accent transition-colors border border-border/30 rounded-full px-3 py-1 hover:border-accent/30">
                  {cat}
                </a>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted-foreground/50">
              {isIt
                ? "* I link sono link di affiliazione Amazon (StoreID: rikbozz-21). A te non costa nulla, a me aiuta a mantenere il sito."
                : "* Links are Amazon affiliate links (StoreID: rikbozz-21). You pay nothing extra, I get a small commission."}
            </div>
          </div>
        </Section>
      </section>

      {/* Category Sections */}
      {categoryOrder.map((category) => {
        const books = booksByCategory[category];
        if (!books || books.length === 0) return null;
        const catId = category.replace(/\s+/g, "-").toLowerCase();
        // First book in each category gets featured treatment
        const featured = books[0];
        const rest = books.slice(1);

        return (
          <Section key={category} animate id={catId} className={rest.length === 0 ? "pb-4!" : ""}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category Header */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {category}
                </h2>
                <div className="h-px w-12 bg-accent/40 mt-3" />
              </div>

              {/* Featured book (large card) */}
              <div className="max-w-md mb-8">
                <BookCard book={featured} locale={locale} featured />
              </div>

              {/* Rest of the books in grid */}
              {rest.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((book, i) => (
                    <BookCard key={i} book={book} locale={locale} />
                  ))}
                </div>
              )}
            </div>
          </Section>
        );
      })}

      {/* Stats Section */}
      <Section animate className="bg-muted/30 py-12!">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-accent">{allBooks.length}</div>
              <div className="text-xs text-muted-foreground/60 mt-1 uppercase tracking-wider">
                {isIt ? "Libri" : "Books"}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">{categoryOrder.length}</div>
              <div className="text-xs text-muted-foreground/60 mt-1 uppercase tracking-wider">
                {isIt ? "Categorie" : "Categories"}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">
                {Math.round(allBooks.reduce((s, b) => s + b.rating, 0) / allBooks.length * 10) / 10}
              </div>
              <div className="text-xs text-muted-foreground/60 mt-1 uppercase tracking-wider">
                {isIt ? "Media Rating" : "Avg Rating"}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">
                {[...new Set(allBooks.map(b => b.author))].length}
              </div>
              <div className="text-xs text-muted-foreground/60 mt-1 uppercase tracking-wider">
                {isIt ? "Autori" : "Authors"}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section animate delay={100} className="py-16! md:!py-20">
        <div className="max-w-2xl mx-auto text-center space-y-5 px-4">
          <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Sparkles className="size-6 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {isIt ? "Vuoi Consigli su Misura?" : "Need Personalized Recommendations?"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {isIt
              ? "Ogni libro qui è stato letto e selezionato. Se cerchi qualcosa di specifico su operations, AI, security o product delivery, contattami — ti consiglio io."
              : "Every book here has been read and curated. If you're looking for something specific on operations, AI, security, or product delivery — reach out, I'll point you in the right direction."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
            <Button asChild variant="secondary">
              <Link href="/freebie">
                <Download className="size-4 mr-2" />
                {isIt ? "Scarica la Diagnostica Gratuita" : "Get the Free Diagnostic"}
              </Link>
            </Button>
            <Button asChild>
              <Link href="/contact">
                {isIt ? "Contattami" : "Contact Me"}
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
