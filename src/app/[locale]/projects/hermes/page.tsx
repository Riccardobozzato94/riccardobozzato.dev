import type { Metadata } from "next";
import Image from "next/image";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Sparkles, BookOpen, Brain, Search, GitBranch, Layers, Database, Workflow } from "lucide-react";
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
    title: isIt ? "Hermes — Il mio Second Brain" : "Hermes — My Second Brain",
    description: isIt
      ? "Come ho costruito un vault Obsidian di 9000+ note collegato a motori AI (RAG + LLM Wiki) per avere tutto il mio sapere sempre accessibile."
      : "How I built a 9000+ note Obsidian vault connected to AI engines (RAG + LLM Wiki) to keep all my knowledge accessible.",
    openGraph: {
      title: `${isIt ? "Hermes — Second Brain" : "Hermes — Second Brain"} | ${site("title")}`,
      description: isIt
        ? "Vault Obsidian con AI integrata: RAG semantico, LLM Wiki, agent memory."
        : "Obsidian vault with integrated AI: semantic RAG, LLM Wiki, agent memory.",
      url: `${baseUrl}/${locale}/projects/hermes`,
      images: [`${baseUrl}/assets/hermes-banner-1600x900.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/hermes`,
      languages: {
        en: `${baseUrl}/en/projects/hermes`,
        it: `${baseUrl}/it/projects/hermes`,
      },
    },
  };
}

const techStack = [
  "Obsidian", "Python", "ChromaDB", "Sentence Transformers",
  "RAG", "LLM Wiki", "Git", "MCP"
];

export default async function HermesPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";

  const sections = isIt ? {
    title: "Hermes — Il mio Second Brain AI-Nativo",
    subtitle: "Vault Obsidian | 9000+ note | RAG | LLM Wiki | Agent Memory",
    intro: "Non prendo appunti. Costruisco un ecosistema di conoscenza vivente, indicizzato e interrogabile dall'AI.",
    graphAlt: "Grafo della conoscenza del vault Hermes — visualizzazione delle connessioni tra note",
    problem: {
      title: "Il Problema",
      desc: "Nel 2022 avevo informazioni sparse in 7 piattaforme diverse: Google Drive, note telefoniche, email, documenti locali, bookmarks. Ogni ricerca costava tempo. Ogni cambio di progetto significava ricominciare da capo.",
    },
    solution: {
      title: "La Soluzione",
      desc: "Un vault Obsidian unificato da 9000+ note, organizzato per aree semantiche con convenzioni di naming e frontmatter. Ogni nota ha: titolo, data, tag, tipo e collegamenti wiki ad altre note correlate. Il risultato è un grafo della conoscenza vivo.",
    },
    ai: {
      title: "I Motori AI",
      items: [
        {
          icon: "search",
          title: "RAG (ChromaDB)",
          desc: "Embedding semantici di tutto il vault. Cerco per significato, non per parola chiave. Il modello all-MiniLM-L6-v2 trasforma ogni nota in un vettore; ChromaDB restituisce i chunk più pertinenti in millisecondi.",
        },
        {
          icon: "book",
          title: "LLM Wiki",
          desc: "Genera un indice strutturato di tutte le note, raggruppato per area. Ogni agente AI che opera sul vault legge prima questo indice per navigare il contenuto senza scandire 9000 file.",
        },
        {
          icon: "brain",
          title: "Agent Memory",
          desc: "Una directory dedicata alla memoria operativa degli agenti AI: setup, session log, daily log. Ogni agente registra cosa ha fatto, perché e quali file ha toccato — creando una memoria condivisa tra sessioni.",
        },
        {
          icon: "layers",
          title: "MCP Integration",
          desc: "Il vault è esposto come risorsa MCP (Model Context Protocol), accessibile da qualsiasi agente AI compatibile. I tool RAG e LLM Wiki sono server MCP indipendenti.",
        },
      ],
    },
    workflow: {
      title: "Flusso di Lavoro",
      steps: [
        "Cattura rapida in 📥 Inbox (appunti grezzi, link, screenshot)",
        "Classificazione: sposto nella cartella pertinente con frontmatter standard",
        "Collegamento: aggiungo wiki link a note correlate nel vault",
        "Indicizzazione: reindicizzo con RAG + LLM Wiki (reindex.ps1)",
        "Interrogazione: cerco via semantic search o chiedo a un agente AI",
      ],
    },
    results: "Oggi il vault è la mia memoria esterna. Ogni progetto, idea, lezione e contatto è indicizzato e recuperabile in secondi. L'AI agent ci lavora sopra come un assistente che conosce tutto il mio contesto."
  } : {
    title: "Hermes — My AI-Native Second Brain",
    subtitle: "Obsidian Vault | 9000+ notes | RAG | LLM Wiki | Agent Memory",
    intro: "I don't take notes. I build a living knowledge ecosystem — indexed and queryable by AI.",
    graphAlt: "Knowledge graph of the Hermes vault — visualizing connections between notes",
    problem: {
      title: "The Problem",
      desc: "By 2022, my information was scattered across 7 platforms: Google Drive, phone notes, emails, local documents, bookmarks. Every search cost time. Every project change meant starting from zero.",
    },
    solution: {
      title: "The Solution",
      desc: "A unified 9000+ note Obsidian vault, organized by semantic areas with naming conventions and frontmatter. Every note has: title, date, tags, type, and wiki links to related notes. The result is a living knowledge graph.",
    },
    ai: {
      title: "The AI Engines",
      items: [
        {
          icon: "search",
          title: "RAG (ChromaDB)",
          desc: "Semantic embeddings of the entire vault. Search by meaning, not keywords. The all-MiniLM-L6-v2 model turns every note into a vector; ChromaDB returns the most relevant chunks in milliseconds.",
        },
        {
          icon: "book",
          title: "LLM Wiki",
          desc: "Generates a structured index of all notes, grouped by area. Every AI agent operating on the vault reads this index first to navigate content without scanning 9000 files.",
        },
        {
          icon: "brain",
          title: "Agent Memory",
          desc: "A dedicated directory for AI agent operational memory: setup, session logs, daily logs. Every agent records what it did, why, and which files it touched — creating shared memory across sessions.",
        },
        {
          icon: "layers",
          title: "MCP Integration",
          desc: "The vault is exposed as an MCP (Model Context Protocol) resource, accessible from any compatible AI agent. RAG and LLM Wiki tools are independent MCP servers.",
        },
      ],
    },
    workflow: {
      title: "Workflow",
      steps: [
        "Quick capture in 📥 Inbox (raw notes, links, screenshots)",
        "Classification: move to relevant folder with standard frontmatter",
        "Linking: add wiki links to related notes in the vault",
        "Indexing: re-index with RAG + LLM Wiki (reindex.ps1)",
        "Query: search via semantic search or ask an AI agent",
      ],
    },
    results: "Today the vault is my external memory. Every project, idea, lesson, and contact is indexed and retrievable in seconds. AI agents work on top of it like an assistant that knows my entire context."
  };

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
              <Brain className="size-3.5" />
              {isIt ? "Second Brain" : "Second Brain"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {sections.title}
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto">
              {sections.subtitle}
            </p>
          </div>
        </Section>
      </section>

      {/* Intro + Graph */}
      <Section animate className="py-12! md:!py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Intro */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {sections.intro}
            </p>
          </div>

          {/* Graph visualization */}
          <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-accent/5 to-card shadow-xl">
            <Image
              src="/assets/hermes-graph-1200x1600.png"
              alt={sections.graphAlt}
              width={600}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs font-normal border border-border/50">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* Problem + Solution */}
      <section className="border-y border-border/50 bg-muted/10">
        <Section animate className="py-16! md:!py-20">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive text-sm font-bold">!</span>
                {sections.problem.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {sections.problem.desc}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="size-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm font-bold">→</span>
                {sections.solution.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {sections.solution.desc}
              </p>
            </div>
          </div>
        </Section>
      </section>

      {/* AI Engines */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {sections.ai.title}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {sections.ai.items.map((item, i) => {
              const iconMap: Record<string, React.ReactNode> = {
                search: <Search className="size-6" />,
                book: <BookOpen className="size-6" />,
                brain: <Brain className="size-6" />,
                layers: <Layers className="size-6" />,
              };
              return (
                <Card key={i} className="border-border/50 shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 text-accent">
                      {iconMap[item.icon] || <Brain className="size-6" />}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Workflow */}
      <section className="border-y border-border/50 bg-muted/10">
        <Section animate className="py-16! md:!py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {sections.workflow.title}
            </h2>
            <div className="space-y-6">
              {sections.workflow.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="shrink-0 size-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="pt-2 text-muted-foreground leading-relaxed">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Results */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
            <Sparkles className="size-3.5" />
            {isIt ? "Risultato" : "Result"}
          </div>
          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/90 max-w-3xl mx-auto">
            &ldquo;{sections.results}&rdquo;
          </blockquote>
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-muted/5">
        <Section animate className="py-16! md:!py-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              {isIt ? "Costruisci il Tuo Second Brain" : "Build Your Own Second Brain"}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {isIt
                ? "Il vault Hermes è privato (contiene dati personali), ma il framework è open source. Puoi iniziare con Obsidian oggi stesso e aggiungere i motori AI man mano."
                : "The Hermes vault is private (it contains personal data), but the framework is open source. You can start with Obsidian today and add AI engines as you grow."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a href="https://obsidian.md" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4 mr-2" />
                  {isIt ? "Scarica Obsidian" : "Download Obsidian"}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <BookOpen className="size-4 mr-2" />
                  {isIt ? "Leggi il Blog" : "Read the Blog"}
                </Link>
              </Button>
            </div>
          </div>
        </Section>
      </section>
    </>
  );
}
