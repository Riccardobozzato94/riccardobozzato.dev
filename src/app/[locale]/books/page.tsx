import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { BookOpen, ExternalLink, Star, Sparkles, ArrowRight } from "lucide-react";
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

// Amazon affiliate tag
const AMAZON_TAG = "riccardobozz-21";

// Helper: build Amazon affiliate link
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
  key_takeaway: string;
  year_read: number;
  isFeatured?: boolean;
};

const books: Book[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    asin: "0735211299",
    rating: 5,
    category: "Self-Development",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones. The definitive guide on how small changes lead to remarkable results — the foundational text for any operations professional.",
    key_takeaway: "Systems beat goals. Focus on 1% improvements daily. Design your environment for success.",
    year_read: 2024,
    isFeatured: true,
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    asin: "1455586692",
    rating: 5,
    category: "Productivity",
    description: "Rules for focused success in a distracted world. Essential reading for anyone managing complex projects in an always-on environment.",
    key_takeaway: "Deep work is becoming rare and therefore valuable. Schedule it ruthlessly. Shallow work is a tax on your potential.",
    year_read: 2024,
    isFeatured: true,
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    asin: "0132350882",
    rating: 4,
    category: "Software Engineering",
    description: "A Handbook of Agile Software Craftsmanship. The bible of writing code that humans can read, maintain, and love.",
    key_takeaway: "Code is read far more often than it's written. Clean code is not optional — it's professional ethics.",
    year_read: 2023,
    isFeatured: true,
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    asin: "0135957052",
    rating: 5,
    category: "Software Engineering",
    description: "From Journeyman to Master. Timeless software engineering wisdom that transcends languages and frameworks.",
    key_takeaway: "Invest in your knowledge portfolio. Don't repeat yourself. Automate everything you can.",
    year_read: 2023,
    isFeatured: true,
  },
  {
    title: "Antifragile",
    author: "Nassim Nicholas Taleb",
    asin: "0812979690",
    rating: 4,
    category: "Philosophy",
    description: "Things That Gain from Disorder. The concept of antifragility — systems that get stronger from shocks and volatility — is directly applicable to operations architecture.",
    key_takeaway: "Build systems that benefit from disorder. Remove fragilities instead of predicting the future.",
    year_read: 2024,
    isFeatured: false,
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    asin: "0062457713",
    rating: 4,
    category: "Self-Development",
    description: "A counterintuitive approach to living a good life. Choose what to care about carefully.",
    key_takeaway: "You have limited f*cks. Spend them on what actually matters. Values determine everything.",
    year_read: 2023,
    isFeatured: false,
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    asin: "1544512279",
    rating: 5,
    category: "Mindset",
    description: "Master Your Mind and Defy the Odds. The ultimate lesson in mental toughness and operational resilience.",
    key_takeaway: "The 40% rule: when your mind says you're done, you're only at 40% of your capability. Embrace the uncomfortable.",
    year_read: 2024,
    isFeatured: false,
  },
  {
    title: "Dopamine Nation",
    author: "Dr. Anna Lembke",
    asin: "152474672X",
    rating: 4,
    category: "Neuroscience",
    description: "Finding Balance in the Age of Indulgence. Understanding the neuroscience of addiction and why constraint drives productivity.",
    key_takeaway: "The pleasure-pain balance governs all behavior. Dopamine fasting isn't a trend — it's neurobiology.",
    year_read: 2024,
    isFeatured: false,
  },
  {
    title: "12 Rules for Life",
    author: "Jordan B. Peterson",
    asin: "0345816021",
    rating: 4,
    category: "Philosophy",
    description: "An Antidote to Chaos. A framework for taking responsibility, building resilience, and bringing order to complexity.",
    key_takeaway: "Stand up straight with your shoulders back. Set your house in perfect order before criticizing the world.",
    year_read: 2023,
    isFeatured: false,
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    asin: "0671027034",
    rating: 5,
    category: "Communication",
    description: "The timeless classic on human relationships. As relevant today for stakeholder management as it was in 1936.",
    key_takeaway: "The deepest human need is to feel important. Listen more than you talk. Remember names. Be genuinely interested.",
    year_read: 2022,
    isFeatured: true,
  },
  {
    title: "Elon Musk",
    author: "Ashlee Vance",
    asin: "0062301233",
    rating: 4,
    category: "Biography",
    description: "Tesla, SpaceX, and the Quest for a Fantastic Future. The story of first-principles thinking applied at the highest level.",
    key_takeaway: "First-principles reasoning lets you break down problems to their fundamentals and rebuild from there.",
    year_read: 2024,
    isFeatured: false,
  },
  {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    asin: "0060555661",
    rating: 4,
    category: "Finance",
    description: "The Definitive Book on Value Investing. Timeless principles on risk management and long-term thinking.",
    key_takeaway: "The intelligent investor is realistic, not optimistic. Margin of safety is the central concept of investment.",
    year_read: 2023,
    isFeatured: false,
  },
  {
    title: "1984",
    author: "George Orwell",
    asin: "0451524934",
    rating: 5,
    category: "Fiction",
    description: "The dystopian masterpiece that predicts surveillance culture. Essential for understanding privacy in the AI age.",
    key_takeaway: "Language controls thought. Who controls the past controls the future. Technology enables control at scale.",
    year_read: 2022,
    isFeatured: false,
  },
  {
    title: "Surrounded by Psychopaths",
    author: "Thomas Erikson",
    asin: "1250763888",
    rating: 3,
    category: "Psychology",
    description: "How to protect yourself from toxic people. Understanding behavioral types for better team dynamics.",
    key_takeaway: "Not all destructive behavior is malicious — some is just different wiring. Understanding DISC profiles helps navigate conflict.",
    year_read: 2024,
    isFeatured: false,
  },
  {
    title: "Overcoming Gravity",
    author: "Steven Low",
    asin: "1468178351",
    rating: 4,
    category: "Fitness",
    description: "A Systematic Approach to Gymnastics and Bodyweight Strength. The operations mindset applied to physical training.",
    key_takeaway: "Progressive overload is the universal principle of growth — in fitness, skills, and operations.",
    year_read: 2023,
    isFeatured: false,
  },
  {
    title: "Notes from Underground",
    author: "Fyodor Dostoevsky",
    asin: "048627053X",
    rating: 4,
    category: "Fiction",
    description: "The existential novella that explores irrationality, free will, and the human condition.",
    key_takeaway: "Humans are not rational calculators. Denying irrationality is itself irrational — a lesson in understanding people.",
    year_read: 2023,
    isFeatured: false,
  },
];

const categories = [...new Set(books.map((b) => b.category))];
const featured = books.filter((b) => b.isFeatured);
const nonFeatured = books.filter((b) => !b.isFeatured);

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
              {categories.map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs font-normal border border-border/50">
                  {cat}
                </Badge>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted-foreground/50">
              {isIt
                ? "* I link sono link di affiliazione Amazon. A te non costa nulla, a me aiuta a mantenere il sito."
                : "* Links are Amazon affiliate links. You pay nothing extra, I get a small commission."}
            </div>
          </div>
        </Section>
      </section>

      {/* Featured Books */}
      <Section animate className="pb-0!">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight text-center">
            {isIt ? "⭐ Più Importanti" : "⭐ Most Influential"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featured.map((book, i) => (
              <a
                key={i}
                href={amazonLink(book.asin, locale)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group block"
              >
                <Card className="h-full border-border/50 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground/60 border-border/30">
                        {book.category}
                      </Badge>
                      <div className="text-xs text-muted-foreground/40">{book.year_read}</div>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/70 mb-2">{book.author}</p>
                    <Stars rating={book.rating} />
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1">
                      {book.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-border/30">
                      <p className="text-xs italic text-accent/80 leading-relaxed">
                        &ldquo;{book.key_takeaway}&rdquo;
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>{isIt ? "Vedi su Amazon" : "View on Amazon"}</span>
                      <ExternalLink className="size-3" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* All Books */}
      <Section animate className="pt-12!">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight text-center">
            {isIt ? "📚 Tutti i Libri" : "📚 All Books"}
          </h2>
          <div className="max-w-4xl mx-auto divide-y divide-border/30">
            {nonFeatured.map((book, i) => (
              <a
                key={i}
                href={amazonLink(book.asin, locale)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group flex items-start gap-4 py-5 hover:bg-accent/5 px-4 -mx-4 rounded-xl transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold group-hover:text-accent transition-colors">{book.title}</h3>
                    <Stars rating={book.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground/70">{book.author}</p>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                    {book.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-border/30 text-muted-foreground/60">
                      {book.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground/40">{book.year_read}</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="size-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* Want to Read section */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20 mt-8">
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
