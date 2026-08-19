import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Mail, Github, Linkedin, MessageSquare, Download, Clock3 } from "lucide-react";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const site = await getTranslations("site");
  const isIt = locale === "it";

  return {
    title: isIt
      ? "Riccardo Bozzato — Contatti | AI & Digital Transformation"
      : "Riccardo Bozzato — Contact | AI & Digital Transformation",
    description: isIt
      ? "Parlami del tuo progetto AI o di un ruolo. Rispondo entro 24 ore lavorative. Remote EU (CET ±2), disponibile subito."
      : "Tell me about your AI project or a role. I reply within 24 business hours. Remote EU (CET ±2), available now.",
    openGraph: {
      title: isIt
        ? "Riccardo Bozzato — Contatti | AI & Digital Transformation"
        : "Riccardo Bozzato — Contact | AI & Digital Transformation",
      description: isIt
        ? "Parlami del tuo progetto AI o di un ruolo. Rispondo entro 24 ore lavorative."
        : "Tell me about your AI project or a role. I reply within 24 business hours.",
      url: `${baseUrl}/${locale}/contact`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        en: `${baseUrl}/en/contact`,
        it: `${baseUrl}/it/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const isIt = locale === "it";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6 font-mono">
            <MessageSquare className="size-3.5" />
            {isIt ? "Contattami" : "Contact"}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </Section>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: isIt ? "Contatti" : "Contact" }]} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <Section animate>
            <div className="rounded-lg border border-outline-variant bg-surface-container p-6 md:p-8">
              {/* Response-time promise header (checklist punto 8) */}
              <div className="mb-6 flex items-center gap-3 rounded-md border border-accent/20 bg-accent/5 px-4 py-3">
                <span className="status-dot shrink-0" aria-hidden />
                <p className="text-xs font-mono text-accent">{t("promise")}</p>
                <Clock3 className="size-3.5 text-accent ml-auto shrink-0" aria-hidden />
              </div>
              <ContactForm />
            </div>
          </Section>

          {/* Contact Info */}
          <Section animate delay={100}>
            <div className="space-y-6">
              <div className="rounded-lg border border-outline-variant bg-surface-container p-6 md:p-8 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground mb-2 font-mono">
                  {isIt ? "// canali diretti" : "// direct channels"}
                </div>
                <a
                  href={`mailto:${t("email")}`}
                  className="flex items-center gap-4 group p-3 -mx-3 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="size-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
                    <Mail className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">{isIt ? "Email" : "Email"}</p>
                    <p className="font-medium text-foreground/90">{t("email")}</p>
                  </div>
                </a>
                <a
                  href={`https://${t("github")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-3 -mx-3 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="size-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
                    <Github className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">GitHub</p>
                    <p className="font-medium text-foreground/90">{t("github")}</p>
                  </div>
                </a>
                <a
                  href={`https://${t("linkedin")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-3 -mx-3 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="size-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
                    <Linkedin className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">LinkedIn</p>
                    <p className="font-medium text-foreground/90">{t("linkedin")}</p>
                  </div>
                </a>
              </div>

              {/* Dove & come lavoro (checklist punto 14 adattato) */}
              <div className="rounded-lg border border-outline-variant bg-surface-container p-6 md:p-8">
                <p className="dossier-label mb-3">{isIt ? "DOVE & COME LAVORO" : "WHERE & HOW I WORK"}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isIt
                    ? "Base in Veneto (Legnaro, PD) — remote-first in EU (CET ±2). On-site occasionale. Full-time, consulenza o interim."
                    : "Based in Veneto (Legnaro, PD) — remote-first across the EU (CET ±2). Occasional on-site. Full-time, consulting or interim."}
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* CV Download */}
        <Section animate delay={200} className="max-w-5xl mx-auto mt-8">
          <div className="rounded-lg border border-accent/20 bg-surface-container p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold mb-1">
                {isIt ? "Scarica il mio CV" : "Download My CV"}
              </h2>
              <p className="text-sm text-muted-foreground/80">
                {isIt
                  ? "Percorso professionale e competenze, formato ATS-ready."
                  : "Professional background and expertise, ATS-ready format."}
              </p>
            </div>
            <a
              href="/files/CV-Riccardo-Bozzato.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground hover:brightness-110 px-6 py-3 text-sm font-medium transition-all shrink-0"
            >
              <Download className="size-4" />
              {isIt ? "Scarica PDF" : "Download PDF"}
            </a>
          </div>
        </Section>
      </div>
    </>
  );
}