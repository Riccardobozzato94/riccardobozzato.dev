import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download } from "lucide-react";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";

export default async function HomePage() {
  const t = await getTranslations("home");
  const tp = await getTranslations("projects");

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
          <div className="animate-fade-in-up space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent leading-tight">
              {t("heroTitle")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              {t("heroRole")}
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("heroTagline")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-1 h-10 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-8 text-base transition-colors"
              >
                {t("heroCta")} <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/freebie"
                className="inline-flex items-center justify-center gap-1 h-10 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-8 text-base transition-colors"
              >
                <Download className="size-4" /> {t("heroCta2")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("featuredTitle")}
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            {t("featuredSubtitle")}
          </p>
        </div>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Featured: Trova */}
          <ProjectCard
            title={tp("trova.title")}
            subtitle={tp("trova.subtitle")}
            description={tp("trova.description")}
            tags={["Next.js 16", "SaaS", "TypeScript", "$149"]}
            href="/trova"
            image="/images/trova-home.png"
            badge="Product"
            badgeColor="bg-accent/10 text-accent"
            featured
          />
          {/* VulnClaw + Panificio */}
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title={tp("vulnclaw.title")}
              subtitle={tp("vulnclaw.subtitle")}
              description={tp("vulnclaw.description")}
              tags={["AI", "Security", "Python"]}
              href="/projects/vulnclaw"
              image="/images/vulnclaw-scan.png"
              badge="CLI Tool"
              badgeColor="bg-blue-500/10 text-blue-400"
            />
            <ProjectCard
              title={tp("panificio.title")}
              subtitle={tp("panificio.subtitle")}
              description={tp("panificio.description")}
              tags={["Next.js", "E-Commerce", "Family"]}
              href="/projects/panificio"
              image="/images/panificio-home.png"
              badge="Family Gift"
              badgeColor="bg-amber-500/10 text-amber-400"
            />
          </div>
        </div>
      </Section>

      {/* About Snippet */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("aboutTitle")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {t("aboutText")}
          </p>
          <Link href="/about" className="text-lg text-primary underline-offset-4 hover:underline">
            {t("aboutCta")}
          </Link>
        </div>
      </Section>

      {/* Freebie CTA */}
      <Section>
        <Card className="border-accent/40 bg-card max-w-3xl mx-auto text-center">
          <CardContent className="p-8 md:p-12 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("freebieTitle")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("freebieDesc")}
            </p>
            <Link
              href="/freebie"
              className="inline-flex items-center justify-center h-10 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-8 text-base transition-colors mt-2"
            >
              {t("freebieCta")}
            </Link>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
