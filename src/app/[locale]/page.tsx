import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Download, CheckCircle2, Sparkles, Cpu, Cloud, Zap, GitBranch, Lightbulb, Package, Calendar, Terminal, MapPin, ArrowUpRight } from "lucide-react";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.netlify.app";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("home");
  const site = await getTranslations("site");

  return {
    title: `${site("title")} — ${t("heroRole")}`,
    description: `${t("heroTagline")} €500K+ delivered. Services: AI agents, serverless, automation, integration, consulting.`,
    openGraph: {
      title: `${site("title")} — ${t("heroTitle")}`,
      description: t("heroTagline"),
      url: `${baseUrl}/${locale}`,
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

const serviceIcons: Record<string, React.ReactNode> = {
  cpu: <Cpu className="size-6" />,
  cloud: <Cloud className="size-6" />,
  zap: <Zap className="size-6" />,
  "git-branch": <GitBranch className="size-6" />,
  lightbulb: <Lightbulb className="size-6" />,
  package: <Package className="size-6" />,
};

export default async function HomePage() {
  const t = await getTranslations("home");
  const tp = await getTranslations("projects");

  const serviceList = t.raw("serviceList") as { icon: string; title: string; desc: string }[];

  return (
    <>
      {/* ════════════════════════════════════════════
           HERO — Split Layout
         ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Ambient gradient — più sottile, laterale */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-40 top-1/3 w-[600px] h-[600px] rounded-full bg-accent/6 blur-[140px] animate-drift-slow" />
          <div className="absolute -right-40 bottom-1/4 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px] animate-drift-slow" style={{ animationDelay: "-4s" }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-24 lg:py-0">
            {/* ─── LEFT: Content ─── */}
            <div className="space-y-8">
              {/* Location / role badge — più personale */}
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent">
                <MapPin className="size-3.5" />
                <span>Legnaro, PD — Operations & Delivery</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.92] tracking-tighter">
                  <span className="gradient-text">{t("heroTitle")}</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  {t("heroTagline")}
                </p>
              </div>

              {/* CTAs — stessi link, look diverso */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/freebie"
                  className="group relative inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-7 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("freebieCta")}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  href="/projects"
                  className="group inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm px-7 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5"
                >
                  {t("heroCta")}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              {/* Social proof — più integrato, meno "barra stats" */}
              <div className="flex items-center gap-8 pt-4 border-t border-border/30">
                <div>
                  <span className="text-xl font-bold text-foreground stat-glow">€500K+</span>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">enterprise portfolio</p>
                </div>
                <div className="size-1 rounded-full bg-border/40" />
                <div>
                  <span className="text-xl font-bold text-foreground stat-glow">500+</span>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">playbook downloads</p>
                </div>
                <div className="size-1 rounded-full bg-border/40" />
                <div>
                  <span className="text-xl font-bold text-foreground stat-glow">4.8/5</span>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">client rating</p>
                </div>
              </div>
            </div>

            {/* ─── RIGHT: Terminal Mockup ─── */}
            <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-dot close" />
                  <div className="terminal-dot minimize" />
                  <div className="terminal-dot maximize" />
                  <span className="ml-2 text-xs text-muted-foreground/40 font-mono">riccardobozzato@dev — vulnclaw</span>
                </div>
                <div className="terminal-body">
                  <div className="space-y-1.5">
                    <p>
                      <span className="terminal-prompt">$ </span>
                      <span className="terminal-command">vulnclaw scan --target example.com</span>
                    </p>
                    <p className="terminal-output">→ Resolving target... <span className="terminal-success">OK</span></p>
                    <p className="terminal-output">→ Scanning open ports... <span className="terminal-success">7 found</span></p>
                    <p className="terminal-output">→ Enumerating services... <span className="terminal-success">4 identified</span></p>
                    <p className="terminal-output">→ Checking vulnerabilities... <span className="terminal-error">2 critical</span></p>
                    <p className="terminal-output">→ Generating report...</p>
                    <p className="mt-3">
                      <span className="terminal-success">✓</span>{" "}
                      <span className="terminal-success font-medium">Scan complete in 12.4s</span>
                    </p>
                    <p className="terminal-output mt-2">
                      Report: <span className="text-accent underline underline-offset-2">vulnclaw-report-2026-07.html</span>
                    </p>
                    <p className="mt-2">
                      <span className="terminal-prompt">$ </span>
                      <span className="terminal-command inline-flex items-center">
                        trova deploy --prod
                        <span className="ml-1 inline-block size-3 border-l-2 border-accent animate-blink-cursor" />
                      </span>
                    </p>
                    <p className="terminal-output text-[11px] text-muted-foreground/30 mt-1 italic">
                      // VulnClaw + Trova — built by riccardobozzato.dev
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator — più sottile */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 opacity-40">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-medium">Scroll</span>
            <div className="size-4 rounded-full border border-border/30 flex items-center justify-center">
              <div className="size-1 rounded-full bg-muted-foreground/30 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           SERVICES — Asymmetric Grid
         ════════════════════════════════════════════ */}
      <Section animate className="overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Section label — senza pill, più pulito */}
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/40 font-medium">
              {t("servicesSubtitle")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2">
              {t("servicesTitle")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-fr">
            {serviceList.map((svc, i) => {
              // Make AI Agents and Turnkey span 2 rows tall
              const isTall = svc.icon === "cpu" || svc.icon === "package";
              return (
                <Link
                  key={i}
                  href="/services"
                  className={`group relative rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 ${
                    isTall ? "sm:row-span-2" : ""
                  } hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30`}
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--card) / 0.8), hsl(var(--card)))`,
                  }}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-6 md:p-7 flex flex-col h-full">
                    <div className={`rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300 ${
                      isTall ? "size-14" : "size-12"
                    }`}>
                      <span className={`text-accent ${isTall ? "size-7" : "size-6"}`}>
                        {serviceIcons[svc.icon]}
                      </span>
                    </div>
                    <h3 className={`font-bold tracking-tight mb-2 group-hover:text-accent transition-colors ${
                      isTall ? "text-xl" : "text-lg"
                    }`}>
                      {svc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {svc.desc}
                    </p>
                    {/* Subtle arrow indicator on hover */}
                    <div className="mt-4 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                      <span>Learn more</span>
                      <ArrowRight className="size-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
           FEATURED PROJECTS
         ════════════════════════════════════════════ */}
      <Section animate>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t("featuredTitle")}
          </h2>
          <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
            {t("featuredSubtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Featured: Trova */}
          <ProjectCard
            title={tp("trova.title")}
            subtitle={tp("trova.subtitle")}
            description={tp("trova.description")}
            tags={["Next.js 16", "SaaS", "TypeScript", "€49"]}
            href="/trova"
            image="/images/trova-home.svg"
            badge="Product"
            badgeColor="bg-accent/10 text-accent"
            featured
          />

          {/* VulnClaw + Panificio */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ProjectCard
              title={tp("vulnclaw.title")}
              subtitle={tp("vulnclaw.subtitle")}
              description={tp("vulnclaw.description")}
              tags={["AI", "Security", "Python"]}
              href="/projects/vulnclaw"
              image="/images/vulnclaw-scan.svg"
              badge="CLI Tool"
              badgeColor="bg-blue-500/10 text-blue-400"
            />
            <ProjectCard
              title={tp("panificio.title")}
              subtitle={tp("panificio.subtitle")}
              description={tp("panificio.description")}
              tags={["Next.js", "E-Commerce", "Family"]}
              href="/projects/panificio"
              image="/images/panificio-home.svg"
              badge="Family Gift"
              badgeColor="bg-amber-500/10 text-amber-400"
            />
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
           ABOUT SNIPPET — Timeline + Foto placeholder
         ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-muted/20">
        <Section animate className="!py-20 md:!py-28">
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
            {/* Left: Photo / Avatar placeholder */}
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-accent/20 via-accent/10 to-card">
                  {/* Placeholder — in produzione: foto di Riccardo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="size-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 ring-2 ring-accent/30">
                        <span className="text-3xl font-bold text-accent">RB</span>
                      </div>
                      <p className="text-xs text-muted-foreground/50 font-mono">photo → coming soon</p>
                    </div>
                  </div>
                  {/* Decorative corner */}
                  <div className="absolute top-3 right-3 size-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin className="size-4 text-accent/60" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content + Mini Timeline */}
            <div className="md:col-span-3 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/40 font-medium">
                  Chi sono
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4">
                  {t("aboutTitle")}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {t("aboutText")}
                </p>
              </div>

              {/* Mini Timeline */}
              <div className="space-y-0 timeline-line pl-8">
                {[
                  { year: "2017–2019", text: "Retail Management — In's Mercato, Aldi, Terranova", icon: "▹" },
                  { year: "2019–2022", text: "Accenture — SAP UI5, process automation (+30% efficiency)", icon: "▹" },
                  { year: "2022–2025", text: "Esse Solutions — €500K portfolio, 8-12 person teams", icon: "▹" },
                  { year: "2025→", text: "Independent — Serverless, AI agents, automation", icon: "▹" },
                ].map((item, i) => (
                  <div key={i} className="relative pb-6 group">
                    <div className="timeline-dot absolute -left-8 top-1.5 group-hover:scale-125 transition-transform duration-300" />
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-accent/60 shrink-0 w-20">{item.year}</span>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 border border-accent/20 rounded-xl px-5 py-2.5 hover:bg-accent/5"
              >
                {t("aboutCta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Section>
      </section>

      {/* ════════════════════════════════════════════
           FREEBIE CTA — Full-bleed con pattern unico
         ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-border/30">
        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Pattern: diagonal grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(45deg, hsl(var(--accent)) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient glow laterale */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px] pointer-events-none" />

        <Section animate className="!py-20 md:!py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Badge minimal */}
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/8 px-4 py-1.5 text-xs text-accent font-medium border border-accent/15">
              <Download className="size-3" />
              FREE — Instant Access
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                {t("freebieTitle")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                {t("freebieDesc")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/freebie"
                className="group relative inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 px-8 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Shimmer on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="size-4" />
                  {t("freebieCta")}
                </span>
              </Link>
            </div>

            {/* Trust — più stretto, meno invadente */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/50">
              <span>No spam · Unsubscribe anytime</span>
              <span className="hidden sm:inline text-muted-foreground/20">|</span>
              <span>PDF delivered to your inbox</span>
              <span className="hidden sm:inline text-muted-foreground/20">|</span>
              <span>Used by 500+ professionals</span>
            </div>
          </div>
        </Section>
      </section>
    </>
  );
}
