import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Quote, ArrowRight, Sparkles } from "lucide-react";
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
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="!pt-0 !pb-0 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <Sparkles className="size-3.5" />
              About Me
            </div>
            <div className="mx-auto mb-8 size-28 rounded-full bg-gradient-to-br from-accent via-accent/60 to-accent/20 flex items-center justify-center shadow-lg shadow-accent/10 ring-2 ring-accent/20">
              <span className="text-2xl font-bold text-accent-foreground">
                RB
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground/80">{t("subtitle")}</p>
          </div>
        </Section>
      </section>

      {/* Intro */}
      <Section animate className="bg-muted/30 !py-16 md:!py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </div>
      </Section>

      {/* Story */}
      <Section animate delay={100}>
        <div className="max-w-3xl mx-auto space-y-6">
          {story.map((paragraph: string, i: number) => (
            <p key={i} className="text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section animate className="!py-16 md:!py-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card p-8 md:p-10">
            <Quote className="absolute top-6 left-6 size-8 text-accent/20" />
            <p className="text-xl md:text-2xl font-medium italic leading-relaxed text-foreground/90 relative z-10 pl-4 border-l-2 border-accent/40">
              {philosophy}
            </p>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section animate delay={100} className="bg-muted/30 !py-16 md:!py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            Toolbox
          </div>
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Skills & Stack</h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-sm px-4 py-1.5 font-normal border border-border/50 bg-card hover:border-accent/30 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section animate>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Quote className="size-7 text-accent" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{t("ctaTitle")}</h2>
          <p className="text-muted-foreground text-lg">
            {t("ctaDesc")}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-8 text-base font-medium transition-all duration-300 hover:-translate-y-0.5"
          >
            Get in Touch
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Section>
    </>
  );
}