import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ExternalLink, Mail, Sparkles } from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("projects.vulnclaw");
  const site = await getTranslations("site");

  return {
    title: `${t("title")} — ${t("subtitle")}`,
    description: t("description"),
    openGraph: {
      title: `${t("title")} | ${site("title")}`,
      description: t("description"),
      url: `${baseUrl}/${locale}/projects/vulnclaw`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/vulnclaw`,
      languages: {
        en: `${baseUrl}/en/projects/vulnclaw`,
        it: `${baseUrl}/it/projects/vulnclaw`,
      },
    },
  };
}

const techStack = ["Python", "Typer", "Rich", "Prompt Toolkit", "AI"];

export default async function VulnClawPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("projects.vulnclaw");
  const features = t.raw("features") as string[];
  const isIt = locale === "it";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              AI • CLI • Security
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

      {/* Features */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
              <Sparkles className="size-3.5" />
              {isIt ? "Funzionalità" : "Features"}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{isIt ? "Cosa Fa" : "Capabilities"}</h2>
          </div>
          <div className="space-y-4">
            {features.map((feature: string, i: number) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/30">
                <CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" />
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

      {/* Screenshots */}
      <Section animate delay={100}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">{isIt ? "Screenshot" : "Screenshots"}</h2>
          <p className="text-muted-foreground mb-8">{isIt ? "Esperienza da terminale" : "Terminal-first experience"}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { src: "/assets/vulnclaw-scan-1600x1000.png", label: "CLI help & commands" },
              { src: "/assets/vulnclaw-scan-1600x1000.png", label: "Live reconnaissance scan" },
              { src: "/assets/vulnclaw-scan-1600x1000.png", label: "Findings & results" },
            ].map((img, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-border/50 overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500/30"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <p className="text-xs text-muted-foreground p-2.5">{img.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <Card className="max-w-2xl mx-auto border-accent/30 shadow-lg shadow-accent/5 text-center">
          <CardContent className="p-8 md:p-12 space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{isIt ? "Ottieni VulnClaw" : "Get VulnClaw"}</h2>
            <p className="text-muted-foreground">
              {isIt
                ? "VulnClaw è un progetto proprietario. Contattami per richiedere una licenza o scopri il progetto su GitHub."
                : "VulnClaw is proprietary. Contact me for licensing inquiries or check out the project on GitHub."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button asChild className="h-11 rounded-xl shadow-lg shadow-primary/10">
                <a
                  href="https://github.com/Riccardobozzato94"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 size-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild className="h-11 rounded-xl">
                <Link href="/contact">
                  <Mail className="mr-2 size-4" />
                  {isIt ? "Richiedi una Licenza" : "Contact for License"}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}