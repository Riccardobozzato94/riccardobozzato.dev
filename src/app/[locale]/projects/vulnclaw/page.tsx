import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ExternalLink, Mail } from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

const techStack = ["Python", "Typer", "Rich", "Prompt Toolkit", "AI"];

export default async function VulnClawPage() {
  const t = await getTranslations("projects.vulnclaw");
  const features = t.raw("features") as string[];

  return (
    <>
      {/* Hero */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            AI • CLI • Security
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {t("subtitle")}
          </p>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Features</h2>
          <div className="space-y-4">
            {features.map((feature: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Tech Stack */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm px-4 py-1.5">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* Screenshots placeholder */}
      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-xl border border-border bg-card flex items-center justify-center"
              >
                <p className="text-muted-foreground">Screenshot {i}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Card className="max-w-2xl mx-auto border-accent/30 text-center">
          <CardContent className="p-8 md:p-12 space-y-4">
            <h2 className="text-2xl font-bold">Get VulnClaw</h2>
            <p className="text-muted-foreground">
              VulnClaw is proprietary. Contact me for licensing inquiries or
              check out the project on GitHub.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button asChild>
                <a
                  href="https://github.com/Riccardobozzato94"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 size-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 size-4" />
                  Contact for License
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
