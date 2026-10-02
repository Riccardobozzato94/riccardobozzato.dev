import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  ShieldCheck,
  Clock,
  BadgeCheck,
} from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("services");
  const site = await getTranslations("site");

  const title = t("title");
  const description = t("heroDesc");

  return {
    title,
    description,
    // Offer funnel is contact-gated (no P.IVA yet: prestazione occasionale,
    // no public checkout). Page stays de-indexed until P.IVA is active.
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "" }],
      title: `${title} | ${site("title")}`,
      description,
      url: `${baseUrl}/${locale}/services`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/services`,
      languages: {
        en: `${baseUrl}/en/services`,
        it: `${baseUrl}/it/services`,
      },
    },
  };
}

interface Package {
  title: string;
  badge?: string;
  timeline?: string;
  desc: string;
  features: string[];
  excludes?: string[];
  idealFor?: string;
  notFor?: string;
  guarantee?: string;
}

interface Step {
  step: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("services");
  const isIt = locale === "it";
  const packages = t.raw("packages") as Package[];
  const approach = t.raw("approach") as { title: string; steps: Step[] };
  const ui = t.raw("ui") as {
    includesTitle: string;
    excludesTitle: string;
    idealTitle: string;
    notIdealTitle: string;
    timelineLabel: string;
  };
  const faq = t.raw("faq") as { title: string; items: FaqItem[] };
  const finalCta = t.raw("finalCta") as { title: string; desc: string; cta: string };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/6 blur-[150px]" />
          <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs>
              <pattern id="dots-svc" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-svc)" />
          </svg>
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <Sparkles className="size-3.5" />
              {isIt ? "Risultati misurabili" : "Measurable results"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
            <p className="text-muted-foreground/60 max-w-xl mx-auto mt-4">
              {t("heroDesc")}
            </p>
          </div>
        </Section>
      </section>

      {/* Packages — 3 tier */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 items-stretch">
            {packages.map((pkg: Package, i: number) => {
              const featured = i === 1;
              return (
                <div
                  key={i}
                  className={`group relative rounded-2xl border bg-card p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 flex flex-col ${
                    featured
                      ? "border-accent/50 shadow-lg shadow-accent/10 lg:scale-[1.03]"
                      : "border-border/50 hover:border-accent/30"
                  }`}
                >
                  {pkg.badge && (
                    <div
                      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold whitespace-nowrap ${
                        featured
                          ? "bg-accent text-accent-foreground"
                          : "border border-accent/30 bg-background text-accent"
                      }`}
                    >
                      <BadgeCheck className="size-3.5" />
                      {pkg.badge}
                    </div>
                  )}
                  <h3 className="text-xl font-bold tracking-tight mt-2">{pkg.title}</h3>
                  {/* Prezzi non in vista: funnel contact-gated, si parla in call. */}
                  {pkg.timeline && (
                    <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                      <Clock className="size-3.5 text-accent" />
                      {ui.timelineLabel}: {pkg.timeline}
                    </p>
                  )}
                  <p className="text-muted-foreground text-sm mt-4 mb-6 leading-relaxed">
                    {pkg.desc}
                  </p>

                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-3">
                    {ui.includesTitle}
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {pkg.features.map((feat: string, j: number) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.excludes && pkg.excludes.length > 0 && (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-3">
                        {ui.excludesTitle}
                      </p>
                      <ul className="space-y-2.5 mb-6">
                        {pkg.excludes.map((ex: string, j: number) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm">
                            <XCircle className="size-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                            <span className="text-muted-foreground/70">{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {(pkg.idealFor || pkg.notFor) && (
                    <div className="rounded-xl bg-muted/40 border border-border/40 p-4 mb-6 space-y-2 text-[13px] leading-relaxed">
                      {pkg.idealFor && (
                        <p className="text-muted-foreground">
                          <span className="font-semibold text-foreground/80">
                            {ui.idealTitle}:{" "}
                          </span>
                          {pkg.idealFor}
                        </p>
                      )}
                      {pkg.notFor && (
                        <p className="text-muted-foreground/80">
                          <span className="font-semibold text-foreground/80">
                            {ui.notIdealTitle}:{" "}
                          </span>
                          {pkg.notFor}
                        </p>
                      )}
                    </div>
                  )}

                  {pkg.guarantee && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-accent/25 bg-accent/5 p-4 mb-6 text-[13px] leading-relaxed">
                      <ShieldCheck className="size-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{pkg.guarantee}</span>
                    </div>
                  )}

                  <div className="mt-auto pt-2">
                    {/* Nota: Link stilizzato come button invece di Button asChild:
                        next-intl Link + Radix Slot solleva
                        "Slot failed to slot onto its children" con le dipendenze attuali. */}
                    <Link
                      href="/contact"
                      className={`inline-flex w-full h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                        featured
                          ? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                          : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {t("cta")} <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* How I Work */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{approach.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.steps.map((step: Step, i: number) => (
              <div key={i} className="text-center">
                <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <span className="text-lg font-bold text-accent">{step.step.split(".")[0]}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.step}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">
            {faq.title}
          </h2>
          <div className="space-y-3">
            {faq.items.map((item: FaqItem, i: number) => (
              <details
                key={i}
                className="group rounded-xl border border-border/50 bg-card px-5 py-4 open:border-accent/30 transition-colors"
              >
                <summary className="cursor-pointer font-semibold list-none flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ArrowRight className="size-4 shrink-0 text-accent transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section animate>
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card p-8 md:p-10 space-y-5">
            <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
              <Calendar className="size-6 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{finalCta.title}</h2>
            <p className="text-muted-foreground">{finalCta.desc}</p>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              {finalCta.cta} <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
