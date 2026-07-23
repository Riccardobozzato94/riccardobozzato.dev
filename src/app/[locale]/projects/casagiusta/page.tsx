import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ExternalLink, Github, Sparkles } from "lucide-react";
import Section from "@/components/Section";
import PaywallGate from "@/components/PaywallGate";
import { Link } from "@/i18n/navigation";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("projects.casagiusta");
  const site = await getTranslations("site");

  return {
    title: `${t("title")} — ${t("subtitle")}`,
    description: t("description"),
    openGraph: {
      title: `${t("title")} | ${site("title")}`,
      description: t("description"),
      url: `${baseUrl}/${locale}/projects/casagiusta`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/casagiusta`,
      languages: {
        en: `${baseUrl}/en/projects/casagiusta`,
        it: `${baseUrl}/it/projects/casagiusta`,
      },
    },
  };
}

const techStack = ["Next.js", "FastAPI", "TypeScript", "Python", "PostgreSQL", "Tailwind CSS"];

export default async function CasaGiustaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("projects.casagiusta");
  const features = t.raw("features") as string[];
  const isIt = locale === "it";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-1.5 text-sm text-teal-400 mb-6">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400/40" />
                <span className="relative inline-flex size-2 rounded-full bg-teal-400" />
              </span>
              {isIt ? "Product Delivery • GDPR" : "Product Delivery • GDPR"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-6">
              {t("subtitle")}
            </p>
            <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>
        </Section>
      </section>

      {/* Paywall — full project details behind email gate */}
      <PaywallGate storageKey="casagiusta">

      {/* Features */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-1.5 text-sm text-teal-400 mb-4">
              <Sparkles className="size-3.5" />
              {isIt ? "Funzionalità" : "Features"}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{isIt ? "Cosa Fa" : "Capabilities"}</h2>
          </div>
          <div className="space-y-4">
            {features.map((feature: string, i: number) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/30">
                <CheckCircle2 className="size-5 text-teal-500 shrink-0 mt-0.5" />
                <span className="text-lg text-foreground/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Tech Stack */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">{isIt ? "Stack Tecnologico" : "Tech Stack"}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm px-4 py-1.5 font-normal border border-border/50 bg-card">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* Screenshot */}
      <Section animate delay={100}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">{isIt ? "Anteprima" : "Preview"}</h2>
          <p className="text-muted-foreground mb-8">{isIt ? "Piattaforma per la tutela locatizia" : "Rental protection platform"}</p>
          <div className="rounded-xl border border-border/50 overflow-hidden bg-card transition-all duration-300 hover:shadow-lg hover:border-teal-500/30">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/assets/casagiusta-banner-1600x900.png"
                alt="CasaGiusta platform preview"
                fill
                loading="lazy"
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <Card className="max-w-2xl mx-auto border-teal-500/30 shadow-lg shadow-teal-500/5 text-center">
          <CardContent className="p-8 md:p-12 space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{isIt ? "Il Progetto" : "The Project"}</h2>
            <p className="text-muted-foreground">
              {isIt
                ? "CasaGiusta è open source. Esplora il codice su GitHub o contattami per collaborazioni."
                : "CasaGiusta is open source. Explore the code on GitHub or reach out for collaboration."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button asChild className="h-11 rounded-xl shadow-lg shadow-primary/10">
                <a
                  href="https://github.com/Riccardobozzato94/casagiusta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 size-4" />
                  {isIt ? "Vedi su GitHub" : "View on GitHub"}
                </a>
              </Button>
              <Button variant="outline" asChild className="h-11 rounded-xl">
                <Link href="/contact">
                  <ExternalLink className="mr-2 size-4" />
                  {isIt ? "Contattami" : "Contact Me"}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
      </PaywallGate>
    </>
  );
}
