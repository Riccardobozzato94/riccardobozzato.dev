import { getTranslations } from "next-intl/server";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage() {
  const t = await getTranslations("projects");

  const projects = [
    {
      key: "vulnclaw",
      tags: ["AI", "Security", "Python"],
      href: "/projects/vulnclaw",
    },
    {
      key: "trova",
      tags: ["Next.js", "SaaS", "TypeScript"],
      href: "/trova",
    },
    {
      key: "panificio",
      tags: ["Next.js", "E-Commerce", "Family"],
      href: "/projects/panificio",
    },
  ];

  return (
    <Section>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map(({ key, tags, href }) => (
          <ProjectCard
            key={key}
            title={t(`${key}.title`)}
            subtitle={t(`${key}.subtitle`)}
            description={t(`${key}.description`)}
            tags={tags}
            href={href}
          />
        ))}
      </div>
    </Section>
  );
}
