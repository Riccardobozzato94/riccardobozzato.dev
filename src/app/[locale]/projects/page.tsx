import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Section from "@/components/Section";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";

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
      type: "website",
      images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "" }],
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

/**
 * Projects page, rebuilt around operational outcomes.
 *
 * The previous version listed four unrelated AI side-projects with no narrative
 * connecting them, which contradicted the site's actual positioning (Head of
 * Ops, €500K retail and e-commerce portfolio). A hiring manager or client read
 * "person who builds AI toys", not "person who ran €500K of operations".
 *
 * Now: the career track is the spine, the one client project is told in full
 * and is independently verifiable, and the personal tools are demoted to an
 * honest footnote about the tools behind the work.
 */
export default async function ProjectsPage(): Promise<React.ReactNode> {
  const t = await getTranslations("projects");

  const track = t.raw("track") as {
    company: string;
    role: string;
    period: string;
    scope: string;
    outcome: string;
  }[];
  const approach = t.raw("panificio.approach") as string[];
  const outcome = t.raw("panificio.outcome") as string[];

  const built = t.raw("built") as {
    key: string;
    title: string;
    description: string;
    link: string;
    reach: string;
    lesson: string;
  }[];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! relative">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-accent font-mono mb-4">{t("badgeLabel")}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{t("subtitle")}</p>
          </div>
        </Section>
      </section>

      {/* Track */}
      <Section animate className="pb-16! md:!pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{t("trackTitle")}</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            {t("trackSubtitle")}
          </p>

          <ol className="relative">
            {track.map((item) => (
              <li key={item.company} className="relative pl-8 pb-10 last:pb-0">
                {/* spine */}
                <span
                  aria-hidden
                  className="absolute left-[3px] top-2 bottom-0 w-px bg-border last:hidden"
                />
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 size-[7px] rounded-full bg-accent"
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-bold tracking-tight">{item.company}</h3>
                  <span className="text-xs text-muted-foreground">{item.role}</span>
                  <span className="text-xs text-muted-foreground/60 font-mono">{item.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">
                  {item.scope}
                </p>
                <p className="text-sm text-accent mt-2 font-medium">{item.outcome}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Client project */}
      <Section animate className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{t("clientTitle")}</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            {t("clientSubtitle")}
          </p>

          <article className="rounded-2xl border border-border/60 bg-card p-6 md:p-10">
            <h3 className="text-2xl font-bold tracking-tight">{t("panificio.title")}</h3>
            <p className="text-sm text-accent mt-1 mb-6">{t("panificio.subtitle")}</p>
            <p className="text-muted-foreground leading-relaxed mb-10">{t("panificio.description")}</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-semibold mb-2 text-foreground/90">
                  {t("panificio.problemTitle")}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("panificio.problem")}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-foreground/90">
                  {t("panificio.approachTitle")}
                </h4>
                <ul className="space-y-2">
                  {approach.map((line, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span aria-hidden className="mt-[7px] size-1 rounded-full bg-accent shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-foreground/90">
                  {t("panificio.outcomeTitle")}
                </h4>
                <ul className="space-y-2">
                  {outcome.map((line, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span aria-hidden className="mt-[7px] size-1 rounded-full bg-accent shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-border/40 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-xs text-muted-foreground font-mono">
                {t("panificio.stackNote")}
              </span>
              <div className="flex flex-wrap gap-3 ml-auto">
                <a
                  href="https://panificiodasergio.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-11 rounded-lg border border-border/60 px-3.5 text-xs font-medium hover:bg-muted/50 transition-colors"
                >
                  {t("panificio.ctaVisit")}
                  <ExternalLink className="size-3" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 min-h-11 rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {t("panificio.ctaContact")}
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </Section>

      {/* Built */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{t("builtTitle")}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            {t("builtSubtitle")}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {built.map((item) => (
              <div key={item.key} className="rounded-xl border border-border/50 bg-card/40 p-6 flex flex-col h-full">
                <h3 className="font-semibold tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

                {item.reach ? (
                  <p className="text-sm text-accent font-medium mt-4">{item.reach}</p>
                ) : null}

                {item.lesson ? (
                  <p className="text-sm text-muted-foreground/80 leading-relaxed mt-3 border-t border-border/40 pt-3">
                    {item.lesson}
                  </p>
                ) : null}

                {item.link ? (
                  <a
                    href={`https://${item.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    /* mt-auto: the three cards hold very different amounts of
                       text, so without pushing the link down they end at three
                       different heights and the row reads as broken. */
                    className="inline-flex items-center gap-1.5 mt-auto pt-4 text-xs font-mono text-accent hover:underline"
                  >
                    {item.link}
                    <ExternalLink className="size-3 shrink-0" />
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
