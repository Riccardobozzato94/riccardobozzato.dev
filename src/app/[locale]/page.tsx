import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download } from "lucide-react";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";

export default async function HomePage() {
  const t = await getTranslations("home");
  const tp = await getTranslations("projects");

  const projects = [
    {
      title: tp("vulnclaw.title"),
      subtitle: tp("vulnclaw.subtitle"),
      description: tp("vulnclaw.description"),
      tags: ["AI", "Security", "Python"],
      href: "/projects/vulnclaw",
    },
    {
      title: tp("trova.title"),
      subtitle: tp("trova.subtitle"),
      description: tp("trova.description"),
      tags: ["Next.js", "SaaS", "TypeScript"],
      href: "/trova",
    },
  ];

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
              <Button asChild size="lg">
                <Link href="/projects">
                  {t("heroCta")} <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/freebie">
                  <Download className="mr-1 size-4" /> {t("heroCta2")}
                </Link>
              </Button>
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
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              tags={project.tags}
              href={project.href}
            />
          ))}
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
          <Button variant="link" asChild>
            <Link href="/about" className="text-lg">
              {t("aboutCta")}
            </Link>
          </Button>
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
            <Button asChild size="lg" className="mt-2">
              <Link href="/freebie">
                {t("freebieCta")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
