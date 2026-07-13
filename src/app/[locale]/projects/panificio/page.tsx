import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Heart, Mail } from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";

export default async function PanificioPage() {
  const t = await getTranslations("projects.panificio");
  const features = t.raw("features") as string[];
  const techstack = t.raw("techstack") as string[];

  return (
    <>
      {/* Hero */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/5 px-4 py-1.5 text-sm text-amber-500 mb-6">
            <Heart className="size-4" />
            Family Project
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
            {techstack.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="text-sm px-4 py-1.5">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* Screenshots */}
      <Section>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border overflow-hidden bg-card">
              <img
                src="/images/panificio-home.png"
                alt="Panificio Da Sergio home page"
                className="w-full h-auto"
              />
              <p className="text-xs text-muted-foreground p-2">Home page — warm bakery theme</p>
            </div>
            <div className="rounded-xl border border-border overflow-hidden bg-card">
              <img
                src="/images/panificio-mobile.png"
                alt="Panificio Da Sergio mobile view"
                className="w-full h-auto"
              />
              <p className="text-xs text-muted-foreground p-2">Mobile responsive view</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Note */}
      <Section className="bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-6 py-4 text-amber-600">
            <Heart className="size-5 shrink-0" />
            <p className="text-lg font-medium">
              Built as a gift for family &mdash; not for sale
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Card className="max-w-2xl mx-auto border-accent/30 text-center">
          <CardContent className="p-8 md:p-12 space-y-4">
            <h2 className="text-2xl font-bold">Want something similar?</h2>
            <p className="text-muted-foreground">
              I build custom e-commerce solutions and operational tools.
              Let&apos;s talk about your project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button asChild>
                <Link href="/contact">
                  <Mail className="mr-2 size-4" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
