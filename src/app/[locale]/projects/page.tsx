import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { Sparkles, Briefcase } from "lucide-react";

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

export default async function ProjectsPage() {
  const t = await getTranslations("projects");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <Briefcase className="size-3.5" />
              {t("badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </Section>
      </section>

      <Section animate className="pt-0!">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Featured: ShipKit */}
          <ProjectCard
            title={t("shipkit.title")}
            subtitle={t("shipkit.subtitle")}
            description={t("shipkit.description")}
            tags={["SaaS", "Product Delivery", "Process Design"]}
            href="/shipkit"
            image="/assets/shipkit-banner-1600x900.png"
            badge={t("badgeLabel")}
            badgeColor="bg-accent/10 text-accent"
            featured
          />

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title={t("vulnclaw.title")}
              subtitle={t("vulnclaw.subtitle")}
              description={t("vulnclaw.description")}
              tags={["AI", "Open Source", "Product Mgmt"]}
              href="/projects/vulnclaw"
              image="/assets/vulnclaw-banner-1600x900.png"
            badge={t("badgeLabel")}
            badgeColor="bg-blue-500/10 text-blue-400"
            />
            <ProjectCard
              title={t("panificio.title")}
              subtitle={t("panificio.subtitle")}
              description={t("panificio.description")}
              tags={["E-Commerce", "Stakeholder Mgmt", "Delivery"]}
              href="/projects/panificio"
              image="/assets/panificio-banner-1600x900.png"
            badge={t("badgeLabel")}
            badgeColor="bg-amber-500/10 text-amber-400"
            />
          </div>

          {/* ric2brain: full width */}
          <ProjectCard
            title={t("ric2brain.title")}
            subtitle={t("ric2brain.subtitle")}
            description={t("ric2brain.description")}
            tags={["AI", "Obsidian", "RAG", "Knowledge Mgmt", "Python"]}
            href="/projects/ric2brain"
            image="/assets/ric2brain-banner-1600x900.png"
            badge={t("ric2brain.badge")}
            badgeColor="bg-purple-500/10 text-purple-400"
          />
        </div>
      </Section>
    </>
  );
}
