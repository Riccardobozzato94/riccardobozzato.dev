import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

const skills = [
  "PMP®",
  "Project Management",
  "Agile/Scrum/Kanban",
  "eCommerce (Magento, Shopware)",
  "PIM/DAM (Pimcore)",
  "SAP UI5",
  "JavaScript",
  "Python",
  "SQL",
  "Next.js",
  "Docker",
  "AI/ML",
  "Ops",
  "Security",
];

export default async function AboutPage() {
  const t = await getTranslations("about");
  const story = t.raw("story") as string[];
  const philosophy = t("philosophy");

  return (
    <>
      {/* Hero */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          {/* Avatar placeholder */}
          <div className="mx-auto mb-8 size-32 rounded-full bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center">
            <span className="text-3xl font-bold text-accent-foreground">
              RB
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>
      </Section>

      {/* Intro */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </div>
      </Section>

      {/* Story */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-6">
          {story.map((paragraph: string, i: number) => (
            <p key={i} className="text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-4 border-accent pl-6 py-4">
            <Quote className="absolute -left-3 top-0 size-6 text-accent" />
            <p className="text-xl md:text-2xl font-medium italic leading-relaxed">
              {philosophy}
            </p>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Skills & Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-sm px-4 py-1.5"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-muted/30 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
          <p className="text-muted-foreground text-lg">
            {t("ctaDesc")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-1 h-10 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-8 text-base transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </Section>
    </>
  );
}
