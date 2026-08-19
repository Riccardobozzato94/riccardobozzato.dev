import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ExternalLink, Mail, Heart, Sparkles, Globe } from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("projects.panificio");
  const site = await getTranslations("site");

  return {
    title: `${t("title")} — ${t("subtitle")}`,
    description: t("description"),
    openGraph: {
      title: `${t("title")} | ${site("title")}`,
      description: t("description"),
      url: `${baseUrl}/${locale}/projects/panificio`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/panificio`,
      languages: {
        en: `${baseUrl}/en/projects/panificio`,
        it: `${baseUrl}/it/projects/panificio`,
      },
    },
  };
}

export default async function PanificioPage() {
  const t = await getTranslations("projects.panificio");
  const features = t.raw("features") as string[];
  const techstack = t.raw("techstack") as string[];
  const screenshots = t.raw("screenshots") as { label: string }[];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-sm text-amber-500 mb-6">
              <Heart className="size-4" />
              {t("badge")}
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
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-sm text-amber-500 mb-4">
              <Sparkles className="size-3.5" />
              {t("sectionFeatures")}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t("sectionWhatItDoes")}</h2>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">{t("sectionTechStack")}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techstack.map((tech: string) => (
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
          <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">{t("sectionScreenshots")}</h2>
          <p className="text-muted-foreground mb-8">{t("sectionScreenshotsDesc")}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group rounded-xl border border-border/50 overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-500/30">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/assets/panificio-storefront-1600x1000.png"
                  alt={screenshots[0].label}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <p className="text-xs text-muted-foreground p-3">{screenshots[0].label}</p>
            </div>
            <div className="group rounded-xl border border-border/50 overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-500/30">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/assets/panificio-storefront-1200x760.png"
                  alt={screenshots[1].label}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <p className="text-xs text-muted-foreground p-3">{screenshots[1].label}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Note */}
      <Section animate className="py-12!">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-500/[0.02] to-transparent px-6 py-4 text-amber-500">
            <Heart className="size-5 shrink-0" />
            <p className="text-base font-medium">
              {t("note")}
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <Card className="max-w-2xl mx-auto border-accent/30 shadow-lg shadow-accent/5 text-center">
          <CardContent className="p-8 md:p-12 space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t("ctaTitle")}</h2>
            <p className="text-muted-foreground">
              {t("ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button asChild className="h-11 rounded-xl shadow-lg shadow-primary/10">
                <a href="https://www.panificiodasergio.it/" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 size-4" />
                  {t("ctaVisit")}
                </a>
              </Button>
              <Button variant="outline" asChild className="h-11 rounded-xl">
                <Link href="/contact">
                  <Mail className="mr-2 size-4" />
                  {t("ctaButton")}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}