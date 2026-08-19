import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import AgentConsole from "@/components/AgentConsole";
import MetricTile from "@/components/MetricsCounter";
import FaqAccordion from "@/components/FaqAccordion";
import Avatar from "@/components/Avatar";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Download, TerminalSquare } from "lucide-react";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const site = await getTranslations("site");
  const isIt = locale === "it";

  const title = isIt
    ? "Riccardo Bozzato — AI & Digital Transformation Leader | Agenti AI, Automazioni, PMP®"
    : "Riccardo Bozzato — AI & Digital Transformation Leader | AI Agents, Automation, PMP®";
  const description = site("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: site("title"),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        it: `${baseUrl}/it`,
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("ai");
  const isIt = locale === "it";

  // ── Dati strutturati dal namespace "ai" ──
  const hero = t.raw("hero") as {
    status: string; title: string; sub: string; trust: string[];
    ctaProjects: string; ctaTalk: string; whoami: string; consoleTitle: string;
  };
  const projects = t.raw("projects") as {
    label: string; title: string; intro: string; problem: string; solution: string;
    stack: string; result: string; viewCase: string;
    agent0: { title: string; tag: string; problem: string; solution: string; stack: string[]; result: string; href: string };
    bureaucracy: { title: string; tag: string; problem: string; solution: string; stack: string[]; result: string; href: string };
    saasBoilerplate: { title: string; tag: string; problem: string; solution: string; stack: string[]; result: string; href: string };
    ciaoElsa: { title: string; tag: string; problem: string; solution: string; stack: string[]; result: string; href: string };
  };
  const method = t.raw("method") as { label: string; title: string; steps: { name: string; desc: string }[] };
  const metrics = t.raw("metrics") as { label: string; title: string; tiles: { value: string; suffix: string; label: string }[] };
  const stack = t.raw("stack") as { label: string; title: string; items: string[] };
  const cases = t.raw("cases") as {
    label: string; title: string; problemLabel: string; solutionLabel: string;
    esse: { company: string; period: string; title: string; problem: string; solution: string; metrics: { v: string; l: string }[] };
    accenture: { company: string; period: string; title: string; problem: string; solution: string; metrics: { v: string; l: string }[] };
    ciaoElsa: { company: string; period: string; title: string; problem: string; solution: string; metrics: { v: string; l: string }[] };
  };
  const timeline = t.raw("timeline") as { label: string; title: string; entries: { hash: string; year: string; role: string; metric: string }[] };
  const blog = t.raw("blog") as { label: string; title: string; comingSoon: string; stubs: { title: string; abstract: string }[] };
  const faq = t.raw("faq") as { label: string; title: string };
  const where = t.raw("where") as { label: string; title: string; text: string };
  const contact = t.raw("contact") as { label: string; title: string; text: string; cta: string; promise: string; links: string };

  const [headline, accentLine] = hero.title.split("—").map((s) => s.trim());

  return (
    <>
      {/* ════════════════════════════════════════════
           HERO — asimmetrica: copy a sinistra, console a destra
         ════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Glow discreti (no gradienti viola) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-0 w-[480px] h-[480px] rounded-full bg-accent/5 blur-[130px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-accent/4 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Copy */}
            <div className="lg:col-span-7">
              {/* Status */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 mb-7 font-mono text-xs text-accent">
                <span className="status-dot" aria-hidden />
                {hero.status}
              </div>

              {/* Terminal whoami */}
              <div aria-hidden className="font-mono text-xs mb-6 space-y-1">
                <p className="terminal-prompt">$ whoami</p>
                <p className="console-log-ok inline-block">
                  {hero.whoami}
                </p>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
                {headline}
                {accentLine && (
                  <>
                    <br />
                    <span className="text-accent">{accentLine}</span>
                  </>
                )}
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                {hero.sub}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-9">
                <Link
                  href="/#ai-projects"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-xs font-bold tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95"
                >
                  {hero.ctaProjects}
                  <ArrowDownIcon />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-outline-variant bg-surface-container px-7 py-3.5 text-xs font-bold tracking-widest text-foreground transition-all hover:border-accent/50 hover:bg-accent/5 active:scale-95"
                >
                  {hero.ctaTalk}
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>

              {/* Trust chips */}
              <ul className="flex flex-wrap gap-2" aria-label={isIt ? "Fattori di fiducia" : "Trust factors"}>
                {hero.trust.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-md border border-outline-variant bg-surface-container-low px-3 py-1.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Console + avatar */}
            <div className="lg:col-span-5">
              <div className="relative">
                <AgentConsole title={hero.consoleTitle} />
                <div className="mt-4 flex items-center gap-4 rounded-lg border border-outline-variant bg-surface-container p-4">
                  <Avatar size={56} className="shrink-0" ariaHidden />
                  <div className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                    <p className="terminal-prompt">$ agent status</p>
                    <p className="console-log-ok">
                      available · remote EU (CET ±2)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           AI PROJECTS — dossier alternati (checklist 1-2)
         ════════════════════════════════════════════ */}
      <section id="ai-projects" className="border-y border-outline-variant bg-surface-container-low">
        <Section className="py-[clamp(80px,9vw,110px)]">
          <div className="mb-12 max-w-3xl">
            <p className="dossier-label mb-3">{projects.label}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{projects.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{projects.intro}</p>
          </div>

          <div className="space-y-6">
            {/* agent0 */}
            <article className="dossier-card grid lg:grid-cols-12 gap-8 p-6 md:p-10">
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold">{projects.agent0.title}</h3>
                  <span className="rounded-md bg-accent/10 border border-accent/25 px-2.5 py-1 font-mono text-[10px] text-accent">
                    {projects.agent0.tag}
                  </span>
                </div>
                <p className="dossier-label mb-2">{projects.problem}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {projects.agent0.problem}
                </p>
                <p className="dossier-label mb-2">{projects.solution}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {projects.agent0.solution}
                </p>
              </div>
              <div className="lg:col-span-7 lg:pl-10 lg:border-l border-outline-variant/60 flex flex-col">
                <div className="mb-5">
                  <p className="dossier-label mb-2">{projects.stack}</p>
                  <ul className="flex flex-wrap gap-2">
                    {projects.agent0.stack.map((s) => (
                      <li key={s} className="rounded-md border border-outline-variant bg-surface-container-low px-3 py-1.5 font-mono text-[11px] text-muted-foreground">{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="dossier-label mb-2">{projects.result}</p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{projects.agent0.result}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-3">
                  <Link href={projects.agent0.href} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-bold tracking-wider text-primary-foreground transition-all hover:brightness-110">
                    {projects.viewCase}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>

            {/* bureaucracy-analyzer */}
            <article className="dossier-card grid lg:grid-cols-12 gap-8 p-6 md:p-10">
              <div className="lg:col-span-7 lg:pr-10 lg:border-r border-outline-variant/60 flex flex-col">
                <div className="mb-5">
                  <p className="dossier-label mb-2">{projects.stack}</p>
                  <ul className="flex flex-wrap gap-2">
                    {projects.bureaucracy.stack.map((s) => (
                      <li key={s} className="rounded-md border border-outline-variant bg-surface-container-low px-3 py-1.5 font-mono text-[11px] text-muted-foreground">{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <p className="dossier-label mb-2">{projects.result}</p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{projects.bureaucracy.result}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-3">
                  <Link href={projects.bureaucracy.href} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-bold tracking-wider text-primary-foreground transition-all hover:brightness-110">
                    {projects.viewCase}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold">{projects.bureaucracy.title}</h3>
                  <span className="rounded-md bg-warn/10 border border-warn/25 px-2.5 py-1 font-mono text-[10px] text-warn">
                    {projects.bureaucracy.tag}
                  </span>
                </div>
                <p className="dossier-label mb-2">{projects.problem}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {projects.bureaucracy.problem}
                </p>
                <p className="dossier-label mb-2">{projects.solution}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {projects.bureaucracy.solution}
                </p>
              </div>
            </article>

            {/* saas-boilerplate — compact card */}
            <article className="dossier-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold">{projects.saasBoilerplate.title}</h3>
                    <span className="rounded-md bg-warn/10 border border-warn/25 px-2.5 py-1 font-mono text-[10px] text-warn">
                      {projects.saasBoilerplate.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {projects.saasBoilerplate.solution}
                  </p>
                  <ul className="flex flex-wrap gap-2 mb-5">
                    {projects.saasBoilerplate.stack.map((s) => (
                      <li key={s} className="rounded-md border border-outline-variant bg-surface-container-low px-3 py-1.5 font-mono text-[11px] text-muted-foreground">{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 md:w-72">
                  <p className="dossier-label mb-1">{projects.result}</p>
                  <p className="text-sm text-foreground/90 leading-relaxed mb-4">{projects.saasBoilerplate.result}</p>
                  <Link href={projects.saasBoilerplate.href} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-bold tracking-wider text-primary-foreground transition-all hover:brightness-110">
                    {projects.viewCase}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>

            {/* ciaoElsa — band */}
            <article className="dossier-card p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold">{projects.ciaoElsa.title}</h3>
                    <span className="rounded-md border border-outline-variant px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                      {projects.ciaoElsa.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {projects.ciaoElsa.solution}
                  </p>
                </div>
                <div className="shrink-0 md:text-right">
                  <p className="dossier-label mb-1">{projects.result}</p>
                  <p className="text-sm text-accent font-semibold">{projects.ciaoElsa.result}</p>
                  <Link href={projects.ciaoElsa.href} className="hover-underline inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-foreground">
                    {isIt ? "Vai al viaggio" : "See the journey"}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </Section>
      </section>

      {/* ════════════════════════════════════════════
           METHOD — 4 step numerati
         ════════════════════════════════════════════ */}
      <Section>
        <div className="mb-12 max-w-3xl">
          <p className="dossier-label mb-3">{method.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{method.title}</h2>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {method.steps.map((step, i) => (
            <li key={step.name} className="rounded-lg border border-outline-variant bg-surface-container p-6 hover:border-accent/40 transition-colors">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-bold">{step.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ════════════════════════════════════════════
           AI METRICS — count-up + sparkline
         ════════════════════════════════════════════ */}
      <section className="border-y border-outline-variant bg-surface-container-low">
        <Section className="py-[clamp(80px,9vw,110px)]">
          <div className="mb-12 max-w-3xl">
            <p className="dossier-label mb-3">{metrics.label}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{metrics.title}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.tiles.map((tile, i) => (
              <MetricTile
                key={tile.label}
                value={parseInt(tile.value, 10) || 0}
                suffix={tile.suffix}
                label={tile.label}
                delay={i * 150}
              />
            ))}
          </div>
        </Section>
      </section>

      {/* ════════════════════════════════════════════
           TECH STACK
         ════════════════════════════════════════════ */}
      <Section>
        <div className="mb-10 max-w-3xl">
          <p className="dossier-label mb-3">{stack.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{stack.title}</h2>
        </div>
        <ul className="flex flex-wrap gap-2.5">
          {stack.items.map((item) => (
            <li
              key={item}
              className="rounded-md border border-outline-variant bg-surface-container px-4 py-2 font-mono text-xs text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* ════════════════════════════════════════════
           CASE STUDIES — risultati misurabili
         ════════════════════════════════════════════ */}
      <section className="border-y border-outline-variant bg-surface-container-low">
        <Section className="py-[clamp(80px,9vw,110px)]">
          <div className="mb-12 max-w-3xl">
            <p className="dossier-label mb-3">{cases.label}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{cases.title}</h2>
          </div>

          <div className="space-y-6">
            {[cases.esse, cases.accenture, cases.ciaoElsa].map((c, i) => (
              <article key={i} className="dossier-card grid md:grid-cols-12 gap-6 p-6 md:p-8">
                <div className="md:col-span-4">
                  <p className="font-mono text-[11px] text-accent mb-1">{c.company}</p>
                  <p className="font-mono text-[11px] text-muted-foreground mb-3">{c.period}</p>
                  <h3 className="text-xl font-bold leading-snug mb-4">{c.title}</h3>
                  <ul className="space-y-2">
                    {c.metrics.map((m) => (
                      <li key={m.l} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-lg font-bold text-accent shrink-0">{m.v}</span>
                        <span className="text-xs text-muted-foreground leading-tight">{m.l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-8 md:pl-8 md:border-l border-outline-variant/60">
                  <p className="dossier-label mb-2">{cases.problemLabel}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.problem}</p>
                  <p className="dossier-label mb-2">{cases.solutionLabel}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.solution}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </section>

      {/* ════════════════════════════════════════════
           TIMELINE — git log --oneline (checklist punto 3)
         ════════════════════════════════════════════ */}
      <Section>
        <div className="mb-12 max-w-3xl">
          <p className="dossier-label mb-3">{timeline.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-mono">
            <span className="terminal-prompt">$ </span>{timeline.title}
          </h2>
        </div>
        <div className="gitlog" id="journey">
          {timeline.entries.map((entry) => (
            <div key={entry.hash} className="gitlog-row">
              <span className="gitlog-hash">{entry.hash}</span>
              <span className="gitlog-year">{entry.year}</span>
              <span className="gitlog-role">{entry.role}</span>
              <span className="gitlog-metric">{entry.metric}</span>
            </div>
          ))}
          <div className="gitlog-row opacity-60">
            <span className="gitlog-hash">HEAD</span>
            <span className="gitlog-year">now</span>
            <span className="gitlog-role text-accent">{isIt ? "→ prossimo ruolo: AI Delivery / AI Transformation Lead" : "→ next role: AI Delivery / AI Transformation Lead"}</span>
            <span className="gitlog-metric text-accent">open to work</span>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
           BLOG — stub articoli (checklist punto 11)
         ════════════════════════════════════════════ */}
      <section className="border-y border-outline-variant bg-surface-container-low">
        <Section className="py-[clamp(80px,9vw,110px)]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="dossier-label mb-3">{blog.label}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{blog.title}</h2>
            </div>
            <Link href="/blog" className="hover-underline inline-flex items-center gap-1.5 text-sm font-bold">
              {isIt ? "Tutti gli articoli" : "All articles"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {blog.stubs.map((post, i) => (
              <article key={i} className="dossier-card flex flex-col p-6">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-md border border-warn/30 bg-warn/5 px-2.5 py-1 font-mono text-[10px] text-warn">
                    {blog.comingSoon}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">posts/{String(i + 1).padStart(3, "0")}.md</span>
                </div>
                <h3 className="font-bold leading-snug mb-3">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.abstract}</p>
              </article>
            ))}
          </div>
        </Section>
      </section>

      {/* ════════════════════════════════════════════
           FAQ — accordion
         ════════════════════════════════════════════ */}
      <Section>
        <div className="mb-12 max-w-3xl">
          <p className="dossier-label mb-3">{faq.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{faq.title}</h2>
        </div>
        <div className="max-w-3xl">
          <FaqAccordion />
        </div>
      </Section>

      {/* ════════════════════════════════════════════
           WHERE — dove & come lavoro
         ════════════════════════════════════════════ */}
      <section className="border-y border-outline-variant bg-surface-container-low">
        <Section className="py-[clamp(70px,8vw,96px)]">
          <div className="dossier-card p-6 md:p-12 text-center max-w-4xl mx-auto">
            <p className="dossier-label mb-4">{where.label}</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{where.title}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">{where.text}</p>
            <div className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-accent">
              <span className="status-dot" aria-hidden />
              {hero.status}
            </div>
          </div>
        </Section>
      </section>

      {/* ════════════════════════════════════════════
           CONTACT — chiusura con promise
         ════════════════════════════════════════════ */}
      <Section>
        <div className="dossier-card p-6 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-10">
            <div className="flex-1">
              <p className="dossier-label mb-3">{contact.label}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{contact.title}</h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">{contact.text}</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-accent/25 bg-accent/5 px-4 py-2 font-mono text-xs text-accent">
                <TerminalSquare className="size-3.5" aria-hidden />
                {contact.promise}
              </p>
            </div>
            <div className="shrink-0 flex flex-col gap-3 lg:items-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-xs font-bold tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95"
              >
                {contact.cta}
                <ArrowRight className="size-3.5" />
              </Link>
              <div className="flex flex-wrap gap-4 font-mono text-xs text-muted-foreground lg:justify-end">
                <a href="https://linkedin.com/in/riccardobozzato" target="_blank" rel="noopener noreferrer" className="hover-underline inline-flex items-center gap-1.5 hover:text-foreground">
                  <Linkedin className="size-3.5" /> LinkedIn
                </a>
                <a href="https://github.com/Riccardobozzato94" target="_blank" rel="noopener noreferrer" className="hover-underline inline-flex items-center gap-1.5 hover:text-foreground">
                  <Github className="size-3.5" /> GitHub
                </a>
                <a href="mailto:riccardobozzato@gmail.com" className="hover-underline inline-flex items-center gap-1.5 hover:text-foreground">
                  <Mail className="size-3.5" /> Email
                </a>
                <a href="/files/CV-Riccardo-Bozzato.pdf" download className="hover-underline inline-flex items-center gap-1.5 hover:text-foreground">
                  <Download className="size-3.5" /> CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/** Freccia verso il basso (CTA scroll) */
function ArrowDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M6 1v8m0 0 3.5-3.5M6 9 2.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}