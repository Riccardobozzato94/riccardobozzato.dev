import { getTranslations } from "next-intl/server";
import { Megaphone, TrendingUp, Eye, Users, Target, ArrowRight, Mail } from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

/**
 * Media kit / sponsorship page.
 *
 * Rationale: for a niche B2B operations audience, direct sponsorship pays
 * multiples of what display ads do — the reader is a Head of Ops or Delivery
 * Manager, i.e. exactly the buyer persona for operations tooling, HR/ATS,
 * e-commerce platforms and consulting. AdSense is implemented too (AdSlot),
 * but this page is where the margin actually is.
 */
export default async function AdvertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("advertise");
  const isIt = locale === "it";

  const stats = t.raw("stats") as { value: string; label: string; icon: string }[];
  const formats = t.raw("formats") as {
    title: string;
    desc: string;
    price: string;
    highlighted?: boolean;
  }[];
  const audience = t.raw("audience") as string[];

  const iconFor = (name: string) => {
    switch (name) {
      case "eye":
        return <Eye className="size-4" />;
      case "users":
        return <Users className="size-4" />;
      case "trending":
        return <TrendingUp className="size-4" />;
      case "target":
        return <Target className="size-4" />;
      default:
        return <TrendingUp className="size-4" />;
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <Megaphone className="size-3.5" />
              {isIt ? "Media kit" : "Media kit"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
            <p className="text-muted-foreground/60 max-w-xl mx-auto mt-4">{t("heroDesc")}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <a
                href={`mailto:${t("contactEmail")}?subject=${encodeURIComponent(t("emailSubject"))}`}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Mail className="mr-2 size-4" />
                {t("ctaPrimary")}
              </a>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border/50 px-8 text-base font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </Section>
      </section>

      {/* Stats */}
      <Section animate className="py-12!">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/50 bg-card/50 p-5 text-center"
              >
                <div className="size-9 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  {iconFor(stat.icon)}
                </div>
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60 text-center mt-4">{t("statsNote")}</p>
        </div>
      </Section>

      {/* Audience */}
      <Section animate className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
            {t("audienceTitle")}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            {t("audienceDesc")}
          </p>
          <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {audience.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/40 p-4 text-sm"
              >
                <span className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Formats & pricing */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
            {t("formatsTitle")}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            {t("formatsDesc")}
          </p>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {formats.map((fmt, i) => (
              <div
                key={i}
                className={`flex flex-col rounded-2xl border bg-card p-6 md:p-8 transition-shadow ${
                  fmt.highlighted
                    ? "border-accent/50 shadow-lg shadow-accent/10 md:-mt-3 md:mb-3"
                    : "border-border/50"
                }`}
              >
                {fmt.highlighted && (
                  <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground mb-4">
                    {t("mostPopular")}
                  </div>
                )}
                <h3 className="text-lg font-bold tracking-tight">{fmt.title}</h3>
                <div className="text-2xl font-bold text-accent mt-2 mb-3">{fmt.price}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{fmt.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60 text-center mt-8">{t("pricingNote")}</p>
        </div>
      </Section>

      {/* Process */}
      <Section animate className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            {t("processTitle")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t.raw("process") as { step: string; desc: string }[]).map((p, i) => (
              <div key={i} className="text-center">
                <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-accent">{p.step.split(".")[0]}</span>
                </div>
                <h3 className="font-semibold mb-2">{p.step}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">
            {t("faqTitle")}
          </h2>
          <div className="space-y-3">
            {(t.raw("faq") as { q: string; a: string }[]).map((item, i) => (
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card p-8 md:p-10 space-y-5">
            <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
              <Megaphone className="size-6 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t("finalCta.title")}</h2>
            <p className="text-muted-foreground">{t("finalCta.desc")}</p>
            <a
              href={`mailto:${t("contactEmail")}?subject=${encodeURIComponent(t("emailSubject"))}`}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Mail className="mr-2 size-4" />
              {t("finalCta.cta")}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
