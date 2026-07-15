import { getTranslations } from "next-intl/server";
import { Shield } from "lucide-react";
import Section from "@/components/Section";

interface Section {
  title: string;
  content: string;
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as Section[];

  return (
    <>
      {/* Hero */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
            <Shield className="size-4" />
            GDPR
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("lastUpdated")}
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground mb-10">
            {t("intro")}
          </p>

          <div className="space-y-8">
            {sections.map((section: Section, i: number) => (
              <div key={i}>
                <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                <div className="text-muted-foreground leading-relaxed space-y-1">
                  {section.content.split("<br>").map((line: string, j: number) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Questions?</h2>
          <p className="text-muted-foreground">
            Email: <a href="mailto:riccardobozzato@gmail.com" className="text-accent underline-offset-4 hover:underline">riccardobozzato@gmail.com</a>
          </p>
        </div>
      </Section>
    </>
  );
}
