import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Github, ArrowRight, ArrowUpRight, FileSearch } from "lucide-react";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";

  return {
    title: isIt
      ? "Riccardo Bozzato — Bureaucracy Analyzer | AI & Digital Transformation"
      : "Riccardo Bozzato — Bureaucracy Analyzer | AI & Digital Transformation",
    description: isIt
      ? "Bureaucracy Analyzer: agente anti-burocrazia che legge PDF (multe, INPS, cartelle esattoriali), estrae date/importi/ente e verifica la prescrizione (art. 28 L. 689/1981) con LLM locali. 500+ documenti analizzati."
      : "Bureaucracy Analyzer: an anti-bureaucracy agent that reads PDFs (fines, INPS, tax notices), extracts dates/amounts/agency and checks prescription (art. 28 L. 689/1981) with local LLMs. 500+ documents analyzed.",
    openGraph: {
      title: isIt ? "Bureaucracy Analyzer — PDF in ingresso, verdetto in uscita" : "Bureaucracy Analyzer — PDF in, verdict out",
      description: isIt
        ? "500+ documenti analizzati con LLM locali: estrazione e verifica in secondi, invece che ore."
        : "500+ documents analyzed with local LLMs: extraction and verification in seconds, not hours.",
      url: `${baseUrl}/${locale}/projects/bureaucracy-analyzer`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/bureaucracy-analyzer`,
      languages: {
        en: `${baseUrl}/en/projects/bureaucracy-analyzer`,
        it: `${baseUrl}/it/projects/bureaucracy-analyzer`,
      },
    },
  };
}

export default async function BureaucracyAnalyzerPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("ai.projects");
  const isIt = locale === "it";
  const p = t.raw("bureaucracy") as {
    title: string; tag: string; problem: string; solution: string;
    stack: string[]; result: string; href: string;
  };

  return (
    <>
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[420px] h-[420px] rounded-full bg-warn/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
          <Breadcrumbs items={[{ label: isIt ? "Progetti" : "Projects", href: "/projects" }, { label: "Bureaucracy Analyzer" }]} />

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{p.title}</h1>
            <span className="rounded-md bg-warn/10 border border-warn/25 px-3 py-1 font-mono text-xs text-warn">
              {p.tag}
            </span>
          </div>

          {/* Terminal card riassuntiva */}
          <div className="terminal-window max-w-2xl" aria-hidden>
            <div className="terminal-header">
              <span className="terminal-dot close" />
              <span className="terminal-dot minimize" />
              <span className="terminal-dot maximize" />
              <span className="ml-3 text-[10px] text-muted-foreground tracking-wider uppercase">bureaucracy-analyzer</span>
            </div>
            <div className="terminal-body font-mono text-xs space-y-1">
              <p className="terminal-prompt">$ analyze doc_4711.pdf</p>
              <p className="console-log-muted">[15:42:01] extracted: 2 dates, 1 amount, agency: INPS</p>
              <p className="console-log-warn">[15:42:03] prescrizione check: art. 28 L.689/1981 → pending</p>
              <p className="console-log-ok">[15:42:05] report.json written to output/</p>
              <p className="console-log-muted">[..] 500+ docs processed · local LLM · zero cloud</p>
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

        {/* Flusso */}
        <Section animate delay={150} className="pt-0!">
          <div className="dossier-card p-6 md:p-8">
            <p className="dossier-label mb-4">{isIt ? "FLUSSO" : "FLOW"}</p>
            <ol className="space-y-3">
              {[
                isIt ? "PDF in ingresso (multa, lettera INPS, cartella esattoriale)" : "PDF in (fine, INPS letter, tax notice)",
                isIt ? "Estrazione strutturata: date, importi, ente mittente" : "Structured extraction: dates, amounts, sender agency",
                isIt ? "Verifica prescrizione (art. 28 L. 689/1981) con LLM locale" : "Prescription check (art. 28 L. 689/1981) with local LLM",
                isIt ? "Report JSON strutturato, pronto per workflow e team" : "Structured JSON report, ready for workflows and teams",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-accent shrink-0 mt-0.5">0{i + 1}</span>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* Risultato */}
        <Section animate delay={200} className="pt-0!">
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
        <Section animate delay={250} className="pt-0!">
          <p className="text-xs text-muted-foreground/70 font-mono flex items-center gap-2">
            <FileSearch className="size-3.5" aria-hidden />
            {isIt
              ? "// Il repository è privato: GitHub punta al profilo. Scrivi per una demo o per l'accesso al codice."
              : "// The repo is private: GitHub links to the profile. Reach out for a demo or code access."}
          </p>
        </Section>

        {/* Esplorazione correlata */}
        <Section animate delay={300} className="pt-0!">
          <div className="rounded-lg border border-outline-variant bg-surface-container p-6 md:p-8">
            <p className="dossier-label mb-4">{isIt ? "CONTINUA L'ESPLORAZIONE" : "KEEP EXPLORING"}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/projects/agent0" className="group rounded-md border border-outline-variant bg-surface-container-low p-5 hover:border-accent/40 transition-colors">
                <p className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">agent0</p>
                <p className="text-xs text-muted-foreground">{isIt ? "La piattaforma agenti self-hosted dietro questo agente." : "The self-hosted agent platform behind this agent."}</p>
              </Link>
              <Link href="/blog" className="group rounded-md border border-outline-variant bg-surface-container-low p-5 hover:border-accent/40 transition-colors">
                <p className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">{isIt ? "LLM locale e cartelle esattoriali" : "Local LLM and tax notices"}</p>
                <p className="text-xs text-muted-foreground">{isIt ? "Presto: il caso d'uso concreto di un LLM che salva tempo e soldi." : "Soon: the concrete use case of an LLM saving time and money."}</p>
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