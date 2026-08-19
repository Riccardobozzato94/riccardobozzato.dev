import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle2, Github, Linkedin, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ from?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";
  return {
    title: isIt
      ? "Riccardo Bozzato — Grazie | AI & Digital Transformation"
      : "Riccardo Bozzato — Thank You | AI & Digital Transformation",
    robots: { index: false, follow: true },
    alternates: { canonical: `${baseUrl}/${locale}/thank-you` },
  };
}

export default async function ThankYouPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { from } = await searchParams;
  const isIt = locale === "it";
  const t = await getTranslations("thankYou");

  // Modalità contatti (post form) vs modalità freebie (download diagnostic)
  const isContact = from === "contact";

  return (
    <>
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="mx-auto mb-6 size-20 rounded-lg bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="size-10 text-accent" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6 font-mono">
              <span className="status-dot" aria-hidden />
              {isIt ? "messaggio ricevuto" : "message received"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {isContact ? t("contactTitle") : t("title")}
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-lg mx-auto">
              {isContact ? t("contactSubtitle") : t("subtitle")}
            </p>
          </div>
        </Section>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 md:pb-32">
        <Breadcrumbs items={[{ label: isIt ? "Grazie" : "Thank you" }]} />

        {isContact ? (
          /* ── Contatti: LinkedIn + GitHub + esplora ── */
          <Section animate>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://linkedin.com/in/riccardobozzato"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-outline-variant bg-surface-container p-6 hover:border-accent/50 transition-colors"
              >
                <Linkedin className="size-6 text-accent mb-3" aria-hidden />
                <p className="font-semibold">{t("contactLinkedin")}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">in/riccardobozzato</p>
              </a>
              <a
                href="https://github.com/Riccardobozzato94"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-outline-variant bg-surface-container p-6 hover:border-accent/50 transition-colors"
              >
                <Github className="size-6 text-accent mb-3" aria-hidden />
                <p className="font-semibold">{t("contactGithub")}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">@Riccardobozzato94</p>
              </a>
            </div>

            <div className="text-center mt-12">
              <h3 className="font-semibold text-lg mb-4">{t("contactExplore")}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-md border border-outline-variant bg-surface-container px-5 py-2.5 text-sm font-medium hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                >
                  <ArrowRight className="size-4" />
                  {t("viewProjects")}
                </Link>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 rounded-md border border-outline-variant bg-surface-container px-5 py-2.5 text-sm font-medium hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                >
                  <BookOpen className="size-4" />
                  {t("readBlog")}
                </Link>
              </div>
            </div>
          </Section>
        ) : (
          /* ── Freebie: download diagnostic + prossimi passi ── */
          <>
            <Section animate>
              <div className="text-center mb-12">
                <a
                  href="/files/operational-chaos-diagnostic.pdf"
                  download
                  className="group inline-flex items-center justify-center h-12 rounded-md bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl px-8 text-base font-medium transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t("downloadAgain")}
                </a>
              </div>
            </Section>

            <Section animate delay={100}>
              <div className="rounded-lg border border-accent/20 bg-surface-container p-8 space-y-5 mb-12">
                <h3 className="font-semibold text-lg">{t("whatsNextTitle")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("whatsNextText")}</p>
                <ul className="space-y-2">
                  {[
                    t("email1"),
                    t("email2"),
                    t("email3"),
                    t("email4"),
                    t("email5"),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="size-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          </>
        )}
      </div>
    </>
  );
}