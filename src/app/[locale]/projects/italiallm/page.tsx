import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ExternalLink, Sparkles, Shield, Server, FileText, Building } from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("projects.italiallm");
  const site = await getTranslations("site");

  return {
    title: `${t("title")} — ${t("subtitle")}`,
    description: t("description"),
    openGraph: {
      title: `${t("title")} | ${site("title")}`,
      description: t("description"),
      url: `${baseUrl}/${locale}/projects/italiallm`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/italiallm`,
      languages: {
        en: `${baseUrl}/en/projects/italiallm`,
        it: `${baseUrl}/it/projects/italiallm`,
      },
    },
  };
}

const techStack = [
  "FastAPI", "VLLM", "RAG", "Python", "Kubernetes",
  "Terraform", "Swift", "Kotlin", "PostgreSQL", "Redis"
];

export default async function ItaliaLLMPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("projects.italiallm");
  const features = t.raw("features") as string[];
  const isIt = locale === "it";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-green-500/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {isIt ? "AI • LLM • Startup" : "AI • LLM • Startup"}
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
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {isIt ? "Cosa Offre ItaliaLLM" : "What ItaliaLLM Offers"}
            </h2>
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

      {/* Architecture overview */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
              <Server className="size-3.5" />
              {isIt ? "Architettura" : "Architecture"}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {isIt ? "Tecnologia & Infrastruttura" : "Technology & Infrastructure"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-green-500/20 bg-card/60">
              <CardContent className="p-6 space-y-3">
                <Shield className="size-8 text-green-400" />
                <h3 className="font-bold text-lg">{isIt ? "Sovranità" : "Sovereignty"}</h3>
                <p className="text-sm text-muted-foreground">
                  {isIt
                    ? "Infrastruttura 100% italiana su GPU Aruba/OVHcloud. Dati, log e modelli non escono mai dai confini nazionali."
                    : "100% Italian infrastructure on Aruba/OVHcloud GPUs. Data, logs, and models never leave national borders."}
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-500/20 bg-card/60">
              <CardContent className="p-6 space-y-3">
                <FileText className="size-8 text-blue-400" />
                <h3 className="font-bold text-lg">{isIt ? "Conformità" : "Compliance"}</h3>
                <p className="text-sm text-muted-foreground">
                  {isIt
                    ? "PA/AgID, ISO 27001, SOC 2, Garante. Fattura Elettronica, PEC, retention policy, notifica breach 72h."
                    : "PA/AgID, ISO 27001, SOC 2, Garante. Electronic invoicing, PEC, retention policies, 72h breach notification."}
                </p>
              </CardContent>
            </Card>
            <Card className="border-purple-500/20 bg-card/60">
              <CardContent className="p-6 space-y-3">
                <Building className="size-8 text-purple-400" />
                <h3 className="font-bold text-lg">{isIt ? "Multi-tenancy" : "Multi-tenancy"}</h3>
                <p className="text-sm text-muted-foreground">
                  {isIt
                    ? "White-label per software house, subscription per PMI, enterprise per PA. API key isolation e rate limiting per tenant."
                    : "White-label for software houses, subscriptions for SMEs, enterprise for PA. API key isolation and per-tenant rate limiting."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Tech Stack */}
      <Section animate delay={100}>
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

      {/* CTA */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <Card className="max-w-2xl mx-auto border-accent/30 shadow-lg shadow-accent/5 text-center">
          <CardContent className="p-8 md:p-12 space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {isIt ? "Scopri ItaliaLLM" : "Discover ItaliaLLM"}
            </h2>
            <p className="text-muted-foreground">
              {isIt
                ? "ItaliaLLM è in fase di lancio. Contattami per informazioni su pricing, piloti gratuiti 30gg e white-label per software house."
                : "ItaliaLLM is in launch phase. Contact me for pricing info, 30-day free pilots, and white-label for software houses."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button asChild className="h-11 rounded-xl shadow-lg shadow-primary/10">
                <Link href="/contact">
                  <ExternalLink className="mr-2 size-4" />
                  {isIt ? "Contattami" : "Contact Me"}
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-11 rounded-xl">
                <a
                  href="https://github.com/Riccardobozzato94"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 size-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
