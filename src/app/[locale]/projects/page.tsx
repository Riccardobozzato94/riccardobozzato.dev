import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { Link } from "@/i18n/navigation";
import { Sparkles, Briefcase, ArrowUpRight } from "lucide-react";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("projects");
  const site = await getTranslations("site");

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: `${t("title")} | ${site("title")}`,
      description: t("subtitle"),
      url: `${baseUrl}/${locale}/projects`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/projects`,
      languages: {
        en: `${baseUrl}/en/projects`,
        it: `${baseUrl}/it/projects`,
      },
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("projects");
  const isIt = locale === "it";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <Briefcase className="size-3.5" />
              {t("badgeLabel")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </Section>
      </section>

      <Section animate className="pt-0!">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* AI Projects — in produzione (checklist punto 1) */}
          <div className="grid md:grid-cols-2 gap-8">
            {(() => {
              const ai = {
                label: isIt ? "AI PROJECTS — IN PRODUZIONE" : "AI PROJECTS — IN PRODUCTION",
                agent0: {
                  title: "agent0",
                  tag: isIt ? "Piattaforma agenti self-hosted" : "Self-hosted agent platform",
                  desc: isIt
                    ? "LLM locali (Ollama), server MCP, planner con tool-loop ed eval harness con 10+ golden case. 3 agenti in produzione su infrastruttura privata."
                    : "Local LLMs (Ollama), MCP servers, planner with tool-loop and an eval harness with 10+ golden cases. 3 agents in production on private infrastructure.",
                },
                bureaucracy: {
                  title: "Bureaucracy Analyzer",
                  tag: isIt ? "Agente anti-burocrazia" : "Anti-bureaucracy agent",
                  desc: isIt
                    ? "PDF in ingresso, verdetto in uscita: estrazione date/importi/ente e verifica prescrizione (art. 28 L. 689/1981) con LLM locali. 500+ documenti analizzati."
                    : "PDF in, verdict out: extracts dates/amounts/agency and checks prescription (art. 28 L. 689/1981) with local LLMs. 500+ documents analyzed.",
                },
                voicestudio: {
                  title: "VoiceStudio",
                  tag: isIt ? "Voice cloning locale" : "Local voice cloning",
                  desc: isIt
                    ? "Fork mantenuto di OmniVoice-Studio: dettatura real-time, voice cloning zero-shot e dubbing video, 100% on-device, senza API key, 646 lingue."
                    : "Maintained fork of OmniVoice-Studio: real-time dictation, zero-shot voice cloning and video dubbing, 100% on-device, no API keys, 646 languages.",
                },
                saasBoilerplate: {
                  title: "SaaS Boilerplate Max",
                  tag: isIt ? "SaaS production-ready" : "Production-ready SaaS",
                  desc: isIt
                    ? "Auth, RBAC multi-org, billing Stripe + LemonSqueezy, admin, i18n IT/EN, test unit + E2E e CI. Da zero a MVP SaaS in giorni."
                    : "Auth, multi-org RBAC, Stripe + LemonSqueezy billing, admin, IT/EN i18n, unit + E2E tests and CI. From zero to SaaS MVP in days.",
                },
              };
              return (
                <>
                  <Link
                    href="/projects/agent0"
                    className="group dossier-card flex flex-col p-6 md:p-8 hover:border-accent/40 transition-colors"
                  >
                    <p className="font-mono text-[10px] text-accent mb-3">{ai.label}</p>
                    <div className="flex items-center gap-2.5 mb-3">
                      <h2 className="text-2xl font-bold group-hover:text-accent transition-colors">{ai.agent0.title}</h2>
                      <span className="rounded-md bg-accent/10 border border-accent/25 px-2 py-0.5 font-mono text-[9px] text-accent">{ai.agent0.tag}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ai.agent0.desc}</p>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                      {isIt ? "Leggi il case study" : "Read the case study"}
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                  <Link
                    href="/projects/bureaucracy-analyzer"
                    className="group dossier-card flex flex-col p-6 md:p-8 hover:border-warn/40 transition-colors"
                  >
                    <p className="font-mono text-[10px] text-warn mb-3">{ai.label}</p>
                    <div className="flex items-center gap-2.5 mb-3">
                      <h2 className="text-2xl font-bold group-hover:text-warn transition-colors">{ai.bureaucracy.title}</h2>
                      <span className="rounded-md bg-warn/10 border border-warn/25 px-2 py-0.5 font-mono text-[9px] text-warn">{ai.bureaucracy.tag}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ai.bureaucracy.desc}</p>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-bold text-foreground group-hover:text-warn transition-colors">
                      {isIt ? "Leggi il case study" : "Read the case study"}
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                  <Link
                    href="/projects/voicestudio"
                    className="group dossier-card flex flex-col p-6 md:p-8 hover:border-accent/40 transition-colors"
                  >
                    <p className="font-mono text-[10px] text-accent mb-3">{ai.label}</p>
                    <div className="flex items-center gap-2.5 mb-3">
                      <h2 className="text-2xl font-bold group-hover:text-accent transition-colors">{ai.voicestudio.title}</h2>
                      <span className="rounded-md bg-accent/10 border border-accent/25 px-2 py-0.5 font-mono text-[9px] text-accent">{ai.voicestudio.tag}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ai.voicestudio.desc}</p>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                      {isIt ? "Leggi il case study" : "Read the case study"}
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                  <Link
                    href="/projects/saas-boilerplate-max"
                    className="group dossier-card flex flex-col p-6 md:p-8 hover:border-warn/40 transition-colors"
                  >
                    <p className="font-mono text-[10px] text-warn mb-3">{ai.label}</p>
                    <div className="flex items-center gap-2.5 mb-3">
                      <h2 className="text-2xl font-bold group-hover:text-warn transition-colors">{ai.saasBoilerplate.title}</h2>
                      <span className="rounded-md bg-warn/10 border border-warn/25 px-2 py-0.5 font-mono text-[9px] text-warn">{ai.saasBoilerplate.tag}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ai.saasBoilerplate.desc}</p>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-bold text-foreground group-hover:text-warn transition-colors">
                      {isIt ? "Leggi il case study" : "Read the case study"}
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </Link>
                </>
              );
            })()}
          </div>

          {/* Featured: ShipKit */}
          <ProjectCard
            title={t("shipkit.title")}
            subtitle={t("shipkit.subtitle")}
            description={t("shipkit.description")}
            tags={["SaaS", "Product Delivery", isIt ? "Progettazione Processi" : "Process Design"]}
            href="/shipkit"
            image="/assets/shipkit-banner-1600x900.png"
            badge={t("badgeLabel")}
            badgeColor="bg-accent/10 text-accent"
            featured
          />

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title={t("vulnclaw.title")}
              subtitle={t("vulnclaw.subtitle")}
              description={t("vulnclaw.description")}
              tags={["AI", "Open Source", isIt ? "Gestione Prodotto" : "Product Mgmt"]}
              href="/projects/vulnclaw"
              image="/assets/vulnclaw-banner-1600x900.png"
            badge={t("badgeLabel")}
            badgeColor="bg-blue-500/10 text-blue-400"
            />
            <ProjectCard
              title={t("panificio.title")}
              subtitle={t("panificio.subtitle")}
              description={t("panificio.description")}
              tags={["E-Commerce", isIt ? "Live" : "Live", isIt ? "Sito Reale" : "Production"]}
              href="https://www.panificiodasergio.it/"
              image="/assets/panificio-banner-1600x900.png"
            badge={t("badgeLabel")}
            badgeColor="bg-amber-500/10 text-amber-400"
            />
          </div>

          {/* ric2brain: full width */}
          <ProjectCard
            title={t("ric2brain.title")}
            subtitle={t("ric2brain.subtitle")}
            description={t("ric2brain.description")}
            tags={["AI", "Obsidian", "RAG", isIt ? "Gestione Conoscenza" : "Knowledge Mgmt", "Python"]}
            href="/projects/ric2brain"
            image="/assets/ric2brain-banner-1600x900.png"
            badge={t("ric2brain.badge")}
            badgeColor="bg-purple-500/10 text-purple-400"
          />

          {/* More experiments — open source */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <p className="font-mono text-[10px] text-muted-foreground tracking-widest">
                {isIt ? "MORE EXPERIMENTS — OPEN SOURCE" : "MORE EXPERIMENTS — OPEN SOURCE"}
              </p>
              <span className="h-px flex-1 bg-outline-variant" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  href: "https://github.com/Riccardobozzato94/job-hunter",
                  title: "job-hunter",
                  tag: isIt ? "Automazione ricerca lavoro" : "Job search automation",
                  desc: isIt
                    ? "Scraper per portali, agente LinkedIn, applier automatico e dashboard risultati. AI assistita per application su misura."
                    : "Portal scrapers, LinkedIn agent, auto-applier and results dashboard. AI-assisted tailored applications.",
                },
                {
                  href: "https://github.com/Riccardobozzato94/qwen-hermes-bridge",
                  title: "qwen-hermes-bridge",
                  tag: isIt ? "LLM locale + Obsidian RAG" : "Local LLM + Obsidian RAG",
                  desc: isIt
                    ? "Bridge tra Qwen/llama.cpp locale e il vault Obsidian: RAG sulle note con esclusione delle cartelle sensibili."
                    : "Bridge between local Qwen/llama.cpp and the Obsidian vault: RAG over notes with sensitive-folder exclusion.",
                },
                {
                  href: "https://github.com/Riccardobozzato94/condominio-demo",
                  title: "condominio-demo",
                  tag: isIt ? "Analytics condomini" : "Condo analytics",
                  desc: isIt
                    ? "Pipeline dati sintetici: risk scoring, alert automatici, dashboard ECharts, modelli Power BI e forecast."
                    : "Synthetic data pipeline: risk scoring, automated alerts, ECharts dashboards, Power BI models and forecast.",
                },
                {
                  href: "https://github.com/Riccardobozzato94/youtube-pipeline",
                  title: "youtube-pipeline",
                  tag: isIt ? "Pipeline contenuti YouTube" : "YouTube content pipeline",
                  desc: isIt
                    ? "Script e voiceover AI-assisted per 3 canali tematici: AI tools, DevSecOps ITA, storytelling finanziario."
                    : "AI-assisted scripts and voiceovers for 3 thematic channels: AI tools, DevSecOps ITA, financial storytelling.",
                },
              ].map((exp) => (
                <a
                  key={exp.title}
                  href={exp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-outline-variant bg-surface-container-low p-5 flex flex-col hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <h3 className="font-mono text-sm font-bold group-hover:text-accent transition-colors">{exp.title}</h3>
                    <span className="rounded-md bg-accent/10 border border-accent/20 px-2 py-0.5 font-mono text-[9px] text-accent">{exp.tag}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
                  <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                    GitHub
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
