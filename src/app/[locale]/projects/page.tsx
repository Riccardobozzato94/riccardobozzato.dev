import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage() {
  const t = await getTranslations("projects");

  return (
    <Section>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Featured: Trova — full width */}
        <ProjectCard
          title={t("trova.title")}
          subtitle={t("trova.subtitle")}
          description={t("trova.description")}
          tags={["Next.js 16", "SaaS", "TypeScript", "€49"]}
          href="/trova"
          image="/images/trova-home.png"
          badge="Product"
          badgeColor="bg-accent/10 text-accent"
          featured
        />

        {/* VulnClaw + Panificio — side by side */}
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectCard
            title={t("vulnclaw.title")}
            subtitle={t("vulnclaw.subtitle")}
            description={t("vulnclaw.description")}
            tags={["AI", "Security", "Python"]}
            href="/projects/vulnclaw"
            image="/images/vulnclaw-scan.png"
            badge="CLI Tool"
            badgeColor="bg-blue-500/10 text-blue-400"
          />
          <ProjectCard
            title={t("panificio.title")}
            subtitle={t("panificio.subtitle")}
            description={t("panificio.description")}
            tags={["Next.js", "E-Commerce", "Family"]}
            href="/projects/panificio"
            image="/images/panificio-home.png"
            badge="Family Gift"
            badgeColor="bg-amber-500/10 text-amber-400"
          />
        </div>
      </div>
    </Section>
  );
}
