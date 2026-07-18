import { getTranslations } from "next-intl/server";
import { Shield, Sparkles } from "lucide-react";
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
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <Shield className="size-3.5" />
              GDPR
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-sm text-muted-foreground/70">
              {t("lastUpdated")}
            </p>
          </div>
        </Section>
      </section>

      {/* Content */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground mb-12">
            {t("intro")}
          </p>

          <div className="space-y-10">
            {sections.map((section: Section, i: number) => (
              <div key={i} className="rounded-2xl border border-border/50 bg-card/50 p-6 md:p-8">
                <h2 className="text-xl font-bold mb-3 tracking-tight">{section.title}</h2>
                <div className="text-muted-foreground leading-relaxed space-y-2">
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
      <Section animate className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Sparkles className="size-6 text-accent" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Questions?</h2>
          <p className="text-muted-foreground">
            Email:{" "}
            <a
              href="mailto:riccardobozzato@gmail.com"
              className="text-accent underline-offset-4 hover:underline font-medium"
            >
              riccardobozzato@gmail.com
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}