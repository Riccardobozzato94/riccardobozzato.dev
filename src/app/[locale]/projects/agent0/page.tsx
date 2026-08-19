import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Github, ArrowRight, ArrowUpRight, CheckCircle2, TerminalSquare } from "lucide-react";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";

  return {
    title: isIt
      ? "Riccardo Bozzato — agent0 | AI & Digital Transformation"
      : "Riccardo Bozzato — agent0 | AI & Digital Transformation",
    description: isIt
      ? "agent0: piattaforma agenti AI self-hosted. LLM locali (Ollama), server MCP, planner con tool-loop ed eval harness con 10+ golden case. 3 agenti in produzione su infrastruttura privata."
      : "agent0: self-hosted AI agent platform. Local LLMs (Ollama), MCP servers, planner with tool-loop and an eval harness with 10+ golden cases. 3 agents in production on private infrastructure.",
    openGraph: {
      title: isIt ? "agent0 — piattaforma agenti self-hosted" : "agent0 — self-hosted agent platform",
      description: isIt
        ? "LLM locali, MCP, tool-loop ed eval harness: come portare agenti AI in produzione senza dipendere dal cloud."
        : "Local LLMs, MCP, tool-loop and eval harness: how to bring AI agents to production without cloud dependency.",
      url: `${baseUrl}/${locale}/projects/agent0`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/agent0`,
      languages: {
        en: `${baseUrl}/en/projects/agent0`,
        it: `${baseUrl}/it/projects/agent0`,
      },
    },
  };
}

export default async function Agent0Page({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("ai.projects");
  const isIt = locale === "it";
  const p = t.raw("agent0") as {
    title: string; tag: string; problem: string; solution: string;
    stack: string[]; result: string; href: string;
  };

  return (
    <>
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[420px] h-[420px] rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
          <Breadcrumbs items={[{ label: isIt ? "Progetti" : "Projects", href: "/projects" }, { label: "agent0" }]} />

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{p.title}</h1>
            <span className="rounded-md bg-accent/10 border border-accent/25 px-3 py-1 font-mono text-xs text-accent">
              {p.tag}
            </span>
          </div>

          {/* Terminal card riassuntiva */}
          <div className="terminal-window max-w-2xl" aria-hidden>
            <div className="terminal-header">
              <span className="terminal-dot close" />
              <span className="terminal-dot minimize" />
              <span className="terminal-dot maximize" />
              <span className="ml-3 text-[10px] text-muted-foreground tracking-wider uppercase">agent0 — deploy</span>
            </div>
            <div className="terminal-body font-mono text-xs space-y-1">
              <p className="terminal-prompt">$ agent0 status --all</p>
              <p className="console-log-ok">[ok] 3 agents online · planner: ready</p>
              <p className="console-log-ok">[ok] mcp servers: filesystem, browser, shell (3)</p>
              <p className="console-log-ok">[ok] eval harness: 10/10 golden cases PASS</p>
              <p className="console-log-muted">[..] infra: private · ollama: local models</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 md:pb-32">
        {/* Dossier problem/solution */}
        <Section animate className="pt-0!">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="dossier-card p-6 md:p-8">
              <p className="dossier-label mb-3">{t("problem")}</p>
              <p className="text-muted-foreground leading-relaxed">{p.problem}</p>
            </div>
            <div className="dossier-card p-6 md:p-8">
              <p className="dossier-label mb-3">{t("solution")}</p>
              <p className="text-muted-foreground leading-relaxed">{p.solution}</p>
            </div>
          </div>
        </Section>

        {/* Stack */}
        <Section animate delay={100} className="pt-0!">
          <p className="dossier-label mb-4">{t("stack")}</p>
          <ul className="flex flex-wrap gap-2.5">
            {p.stack.map((s) => (
              <li key={s} className="rounded-md border border-outline-variant bg-surface-container px-4 py-2 font-mono text-xs text-muted-foreground">{s}</li>
            ))}
          </ul>
        </Section>

        {/* Risultato */}
        <Section animate delay={150} className="pt-0!">
          <div className="dossier-card p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="dossier-label mb-2">{t("result")}</p>
              <p className="text-foreground/90 leading-relaxed">{p.result}</p>
            </div>
            <div className="shrink-0 flex flex-col gap-3 md:items-end">
              <a
                href="https://github.com/Riccardobozzato94"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-xs font-bold tracking-wider text-primary-foreground transition-all hover:brightness-110"
              >
                <Github className="size-4" />
                {t("githubLink")}
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </Section>

        {/* Note onestà */}
        <Section animate delay={200} className="pt-0!">
          <p className="text-xs text-muted-foreground/70 font-mono">
            {isIt
              ? "// Il repository è privato: GitHub punta al profilo. Scrivi per una demo o per l'accesso al codice."
              : "// The repo is private: GitHub links to the profile. Reach out for a demo or code access."}
          </p>
        </Section>

        {/* Esplorazione correlata */}
        <Section animate delay={250} className="pt-0!">
          <div className="rounded-lg border border-outline-variant bg-surface-container p-6 md:p-8">
            <p className="dossier-label mb-4">{isIt ? "CONTINUA L'ESPLORAZIONE" : "KEEP EXPLORING"}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/projects/bureaucracy-analyzer" className="group rounded-md border border-outline-variant bg-surface-container-low p-5 hover:border-accent/40 transition-colors">
                <p className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">Bureaucracy Analyzer</p>
                <p className="text-xs text-muted-foreground">{isIt ? "L'agente anti-burocrazia: PDF in ingresso, verdetto in uscita." : "The anti-bureaucracy agent: PDF in, verdict out."}</p>
              </Link>
              <Link href="/blog" className="group rounded-md border border-outline-variant bg-surface-container-low p-5 hover:border-accent/40 transition-colors">
                <p className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">{isIt ? "agent0: anatomia di una piattaforma" : "agent0: anatomy of a platform"}</p>
                <p className="text-xs text-muted-foreground">{isIt ? "Presto: come ho architettato agent0 dallo scheduler all'eval harness." : "Soon: how I architected agent0, from scheduler to eval harness."}</p>
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/contact" className="hover-underline inline-flex items-center gap-1.5 text-sm font-bold">
                {isIt ? "Parliamone" : "Let's talk"}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}