import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Quote, ArrowRight, Sparkles, MapPin, Mail, Briefcase, GraduationCap, Award, ArrowUpRight, PawPrint } from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("about");
  const site = await getTranslations("site");

  return {
    title: t("title"),
    description: t("intro"),
    openGraph: {
      title: `${t("title")} | ${site("title")}`,
      description: t("intro"),
      url: `${baseUrl}/${locale}/about`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: {
        en: `${baseUrl}/en/about`,
        it: `${baseUrl}/it/about`,
      },
    },
  };
}

const timelineIt = [
  {
    period: "2018 – 2021",
    title: "Gestione Retail",
    company: "In's Mercato · Aldi · Terranova",
    desc: "Leadership operativa, gestione team, KPI. Ho imparato le operations sul campo, con le mani nei processi.",
    icon: "▹",
  },
  {
    period: "2022 – 2024",
    title: "Sviluppo Applicazioni Enterprise",
    company: "Accenture",
    desc: "SAP UI5, JavaScript, automazione processi. +30% efficienza, -15% errori amministrativi. Scala enterprise, impatto misurabile.",
    icon: "▹",
  },
  {
    period: "2024 – 2026",
    title: "Project Manager Portfolio Digitale",
    company: "Esse Solutions",
    desc: "Gestito portfolio da €500K coordinando team distribuiti di 8-12 persone su eCommerce B2B (Magento, Shopware) e PIM/DAM (Pimcore). Introdotto Agile: +25% produttività, -40% time-to-market.",
    icon: "▹",
  },
  {
    period: "2026",
    title: "Head of Operations",
    company: "Ciao Elsa — Legnaro, PD",
    desc: "Architettura operativa costruita da zero per una startup AI-native. Processi, KPI, governance, struttura del team. Engagement breve e mirato: sistema costruito, formato il team, consegnato.",
    icon: "▹",
  },
] as const;

const timelineEn = [
  {
    period: "2018 – 2021",
    title: "Retail Management",
    company: "In's Mercato · Aldi · Terranova",
    desc: "Operational leadership, team management, KPI tracking. Learned operations hands-on, with my hands in the processes.",
    icon: "▹",
  },
  {
    period: "2022 – 2024",
    title: "Enterprise Application Development",
    company: "Accenture",
    desc: "SAP UI5, JavaScript, process automation. +30% efficiency, -15% administrative errors. Enterprise scale, measurable impact.",
    icon: "▹",
  },
  {
    period: "2024 – 2026",
    title: "Digital Portfolio Manager",
    company: "Esse Solutions",
    desc: "Managed a €500K portfolio coordinating distributed teams of 8-12 across B2B eCommerce (Magento, Shopware) and PIM/DAM (Pimcore). Introduced Agile: +25% productivity, -40% time-to-market.",
    icon: "▹",
  },
  {
    period: "2026",
    title: "Head of Operations",
    company: "Ciao Elsa — Legnaro, PD",
    desc: "Built operational architecture from scratch for an AI-native startup. Processes, KPIs, governance, team structure. Short, focused engagement: system built, team trained, handed over.",
    icon: "▹",
  },
] as const;

const skills = [
  "PMP®",
  "Project Management",
  "Agile/Scrum/Kanban",
  "eCommerce (Magento, Shopware)",
  "PIM/DAM (Pimcore)",
  "SAP UI5",
  "JavaScript",
  "Python",
  "SQL",
  "Next.js",
  "Docker",
  "AI/ML",
  "Ops",
  "Security",
];

const certifications = [
  { name: "PMP® — Project Management Professional", year: "2026", icon: Award },
  { name: "Cisco Cybersecurity Operation Associate", year: "2024", icon: Award },
  { name: "Google Data Analyst Certificate", year: "2023", icon: Award },
  { name: "Pimcore Consultant Certified", year: "2024", icon: Award },
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const story = t.raw("story") as string[];
  const philosophy = t("philosophy");
  const isIt = locale === "it";
  const timeline = isIt ? timelineIt : timelineEn;

  return (
    <>
      {/* ═══════════ HERO — Split ═══════════ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="noise-overlay" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] animate-drift-slow" />
        </div>

        <Section className="pt-0! pb-0! relative">
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
            {/* Mascot area (faceless: RB mark + dog co-pilot, no human face) */}
            <div className="md:col-span-2 order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-3 bg-accent/5 rounded-3xl blur-xl" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-accent/15 via-accent/5 to-card">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-6">
                      <div className="size-28 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 ring-2 ring-accent/30 shadow-lg shadow-accent/10">
                        <span className="text-4xl font-bold text-accent">RB</span>
                      </div>
                      <p className="text-xs text-muted-foreground/40 font-mono">&gt; operations builder</p>
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs text-accent">
                        <PawPrint className="size-3.5" />
                        co-pilota a 4 zampe
                      </div>
                    </div>
                  </div>
                  {/* Location pin */}
                  <div className="absolute top-4 right-4 size-10 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                    <MapPin className="size-5 text-accent/70" />
                  </div>
                  {/* Dog badge bottom-left */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 px-3 py-1.5 text-xs text-muted-foreground">
                    <PawPrint className="size-3.5 text-accent/70" />
                    {isIt ? "co-pilota a 4 zampe" : "aussie co-pilot"}
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="md:col-span-3 order-1 md:order-2 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs text-accent mb-4">
                  <MapPin className="size-3" />
                  Legnaro, PD, Italy
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
                  {t("title")}
                </h1>
                <p className="text-xl text-muted-foreground/80">{t("subtitle")}</p>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                {t("intro")}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 h-10 rounded-xl bg-primary text-primary-foreground px-5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-primary/10"
                >
                  <Mail className="size-4" />
                  {isIt ? "Contattami" : "Contact Me"}
                </Link>
                <a
                  href="https://www.linkedin.com/in/riccardobozzato/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 rounded-xl border border-border/60 px-5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all duration-300"
                >
                  LinkedIn <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* ═══════════ Full Timeline ═══════════ */}
      <Section animate className="bg-muted/20 py-20! md:!py-28">
        <div className="max-w-4xl mx-auto">
          <div className="mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/40 font-medium">
              {isIt ? "Percorso" : "Career Path"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
              {isIt ? "Dal Retail alla Consulenza" : "From Retail to Consulting"}
            </h2>
          </div>

          <div className="relative timeline-line pl-10 space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="relative pb-10 last:pb-0 group">
                <div className="timeline-dot absolute -left-10 top-1.5 group-hover:scale-125 group-hover:shadow-[0_0_12px_hsl(var(--accent)/0.4)] transition-all duration-500" />
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-xs font-mono text-accent/60 font-medium">{item.period}</span>
                    <span className="text-sm text-muted-foreground/50">—</span>
                    <span className="text-sm font-medium text-foreground/80">{item.company}</span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </div>
                {/* Connector line between entries (not for last) */}
                {i < timeline.length - 1 && (
                  <div className="absolute -bottom-0 left-[calc(-10px+4px)] w-0.5 h-full bg-gradient-to-b from-accent/30 to-accent/5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ Story ═══════════ */}
      <Section animate delay={100}>
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/40 font-medium">
            {isIt ? "La Storia" : "The Full Story"}
          </span>
          {story.map((paragraph: string, i: number) => (
            <p key={i} className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* ═══════════ Philosophy ═══════════ */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/[0.03] via-card to-card p-8 md:p-12 overflow-hidden">
            {/* Decorative accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
            <Quote className="absolute top-6 right-6 size-10 text-accent/10" />
            <p className="text-lg md:text-xl font-medium italic leading-relaxed text-foreground/85 relative z-10 pl-6">
              {philosophy}
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ Skills + Certs Grid ═══════════ */}
      <Section animate delay={100} className="bg-muted/20 py-16! md:!py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="size-5 text-accent" />
              <h2 className="text-2xl font-bold tracking-tight">{isIt ? "Competenze" : "Skills & Stack"}</h2>
            </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-sm px-3.5 py-1.5 font-normal border border-border/50 bg-card transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5 hover:shadow-sm hover:shadow-accent/5 cursor-default animate-in fade-in"
                    style={{ animationDelay: `${i * 30}ms`, animationFillMode: "both" }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="size-5 text-accent" />
              <h2 className="text-2xl font-bold tracking-tight">{isIt ? "Certificazioni" : "Certifications"}</h2>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, i) => {
                const Icon = cert.icon;
                return (
                  <div key={i} className="flex items-start gap-3 group transition-all duration-300 hover:-translate-x-0.5">
                    <div className="size-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                      <Icon className="size-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-200">{cert.name}</p>
                      <p className="text-xs text-muted-foreground/50">{cert.year}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ Dog + Dev Life ═══════════ */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/[0.03] via-card to-card p-8 md:p-12 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <PawPrint className="size-5 text-accent" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{isIt ? "Dietro le quinte" : "Behind the Build"}</h2>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {isIt
                ? "Non troverai foto selfie qui. Ma se vuoi un motivo in più per fidarti: il mio pastore australiano supervisiona ogni deploy dal divano. Mentre costruisco sistemi e risolvo problemi, lui approva le operazioni (o le critica con uno sguardo). È il mio co-pilota a 4 zampe."
                : "You won't find selfies here. But if you need one more reason to trust the process: my Australian Shepherd supervises every deploy from the couch. While I build systems and solve problems, he approves the operations (or questions them with a look). Four-legged co-pilot since day one."}
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ CTA ═══════════ */}
      <Section animate>
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Mail className="size-7 text-accent" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{t("ctaTitle")}</h2>
          <p className="text-muted-foreground text-lg">
            {t("ctaDesc")}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-8 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
          >
            {t("cta")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Section>
    </>
  );
}
