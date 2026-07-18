import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Download, Sparkles, Cpu, Cloud, Zap, GitBranch, Lightbulb, Package, MapPin, ArrowUpRight } from "lucide-react";
import Section from "@/components/Section";

const baseUrl = SITE_URL;

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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const tp = await getTranslations("projects");
  const isIt = locale === "it";

  const serviceList = t.raw("serviceList") as { icon: string; title: string; desc: string }[];

  return (
    <>
      {/* ════════════════════════════════════════════
            HERO — Operations & Delivery
          ════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Single clean ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-accent/8 blur-[160px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Role badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-8">
              <MapPin className="size-3.5" />
              <span>Legnaro, PD — {isIt ? "Senior Delivery Manager & Head of Operations" : "Senior Delivery Manager & Head of Operations"} | PMP®</span>
            </div>

            <div className="space-y-6 mb-10">
              <h1 className="font-heading text-[clamp(36px,6vw,72px)] font-bold leading-[1.05] tracking-tighter">
                <span className="gradient-text">{t("heroTitle")}</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t("heroTagline")}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/30 px-7 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("heroCta")}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm px-7 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5"
              >
                {t("heroCta2")}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            {/* Key metrics */}
            <div className="flex items-center justify-center gap-8 sm:gap-12 mt-12 pt-8 border-t border-border/30 max-w-xl mx-auto">
              <div className="text-center">
                <span className="text-2xl font-bold text-foreground">€500K+</span>
                <p className="text-xs text-muted-foreground/60 mt-1">{isIt ? "portfolio progetti" : "portfolio value"}</p>
              </div>
              <div className="w-px h-10 bg-border/40" />
              <div className="text-center">
                <span className="text-2xl font-bold text-foreground">8-12</span>
                <p className="text-xs text-muted-foreground/60 mt-1">{isIt ? "team size" : "team size"}</p>
              </div>
              <div className="w-px h-10 bg-border/40" />
              <div className="text-center">
                <span className="text-2xl font-bold text-foreground">-40%</span>
                <p className="text-xs text-muted-foreground/60 mt-1">time-to-market</p>
              </div>
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
                      <span>Scopri di più</span>
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
            RISULTATI MISURABILI — metriche chiave
          ════════════════════════════════════════════ */}
      <Section animate>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            {t("featuredSubtitle")}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t("featuredTitle")}
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Metric 1 */}
          <div className="relative group rounded-2xl border border-border/50 bg-card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/30">
            <span className="text-4xl md:text-5xl font-bold text-accent">€500K+</span>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {isIt ? "Portfolio progetti enterprise gestito end-to-end" : "Enterprise project portfolio managed end-to-end"}
            </p>
          </div>

          {/* Metric 2 */}
          <div className="relative group rounded-2xl border border-border/50 bg-card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/30">
            <span className="text-4xl md:text-5xl font-bold text-green-500">-40%</span>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {isIt ? "Time-to-market ridotto su implementazioni Pimcore" : "Faster time-to-market on Pimcore implementations"}
            </p>
          </div>

          {/* Metric 3 */}
          <div className="relative group rounded-2xl border border-border/50 bg-card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/30">
            <span className="text-4xl md:text-5xl font-bold text-accent">+25%</span>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {isIt ? "Produttività team con l'introduzione di Agile" : "Team productivity increase with Agile adoption"}
            </p>
          </div>

          {/* Metric 4 */}
          <div className="relative group rounded-2xl border border-border/50 bg-card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/30">
            <span className="text-4xl md:text-5xl font-bold text-foreground">8-12</span>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {isIt ? "Team distribuiti coordinati su progetti enterprise" : "Distributed team members coordinated"}
            </p>
          </div>
        </div>

        {/* CTA to results page */}
        <div className="text-center mt-10">
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 h-11 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm px-6 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5"
          >
            {t("aboutCta")}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
            ABOUT — Storia + Timeline
          ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-muted/20">
        <Section animate className="py-20! md:!py-28">
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
            {/* Left: RB avatar placeholder */}
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-accent/20 via-accent/10 to-card">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="size-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 ring-2 ring-accent/30">
                        <span className="text-3xl font-bold text-accent">RB</span>
                      </div>
                      <p className="text-xs text-muted-foreground/50 font-meta">PMP®</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 size-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin className="size-4 text-accent/60" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content + Timeline */}
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

              {/* Timeline */}
              <div className="space-y-0 timeline-line pl-8">
                {[
                  { year: "2018–2021", text: isIt ? "Retail Management — In's Mercato, Aldi, Terranova (leadership operativa, KPI, team)" : "Retail Management — In's Mercato, Aldi, Terranova (operational leadership, KPIs, team)" },
                  { year: "2022–2024", text: isIt ? "Accenture — IT Systems Specialist (+30% efficienza, -15% errori, SAP UI5)" : "Accenture — IT Systems Specialist (+30% efficiency, -15% errors, SAP UI5)" },
                  { year: "2024–2026", text: isIt ? "Esse Solutions — PM (€500K portfolio, team 8-12, Agile, -40% time-to-market)" : "Esse Solutions — PM (€500K portfolio, teams of 8-12, Agile, -40% time-to-market)" },
                  { year: "2026", text: isIt ? "Ciao Elsa — Head of Operations (governance operativa, KPI, processi da zero)" : "Ciao Elsa — Head of Operations (ops governance, KPIs, processes from scratch)" },
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

        <Section animate className="py-20! md:!py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Badge minimal */}
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/8 px-4 py-1.5 text-xs text-accent font-medium border border-accent/15">
              <Download className="size-3" />
              GRATIS — Accesso Immediato
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

            {/* Trust */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/50">
              <span>No spam · Cancellati quando vuoi</span>
              <span className="hidden sm:inline text-muted-foreground/20">|</span>
              <span>PDF consegnato via email</span>
              <span className="hidden sm:inline text-muted-foreground/20">|</span>
              <span>Usato da 500+ professionisti</span>
            </div>
          </div>
        </Section>
      </section>
    </>
  );
}
