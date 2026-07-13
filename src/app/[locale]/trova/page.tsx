import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Database,
  Mail,
  Languages,
  CreditCard,
  Palette,
  CheckCircle2,
  ShoppingCart,
} from "lucide-react";
import Section from "@/components/Section";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-border/60 hover:border-accent/30 transition-colors">
      <CardContent className="p-6 space-y-3">
        <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  auth: <Shield className="size-5 text-accent" />,
  database: <Database className="size-5 text-accent" />,
  email: <Mail className="size-5 text-accent" />,
  i18n: <Languages className="size-5 text-accent" />,
  billing: <CreditCard className="size-5 text-accent" />,
  ui: <Palette className="size-5 text-accent" />,
};

const featureKeys = ["auth", "database", "email", "i18n", "billing", "ui"];

export default async function TrovaPage() {
  const t = await getTranslations("trova");

  const features = t.raw("features") as Record<string, string>;
  const pricing = t.raw("pricing") as Record<string, string>;

  const pricingFeatures = [
    "Full source code",
    "Lifetime updates",
    "Priority support",
    "30-day money-back guarantee",
  ];

  return (
    <>
      {/* Hero */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">
            Next.js 16 • Tailwind v4 • shadcn/ui
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-accent font-semibold mb-6">
            {t("tagline")}
          </p>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>
      </Section>

      {/* Features Grid */}
      <Section className="bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Ship
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureKeys.map((key) => (
              <FeatureCard
                key={key}
                icon={iconMap[key]}
                title={
                  key === "auth"
                    ? "Auth"
                    : key === "database"
                      ? "Database"
                      : key === "email"
                        ? "Email"
                        : key === "i18n"
                          ? "i18n"
                          : key === "billing"
                            ? "Billing"
                            : "UI"
                }
                description={features[key]}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">{pricing.title}</h2>
          <p className="text-muted-foreground mb-8">{pricing.subtitle}</p>
          <Card className="border-accent/40">
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="space-y-1">
                <span className="text-5xl font-bold">{pricing.price}</span>
                <span className="text-lg text-muted-foreground ml-2">
                  {pricing.period}
                </span>
              </div>
              <p className="text-muted-foreground">{pricing.includes}</p>
              <ul className="space-y-3 text-left">
                {pricingFeatures.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-accent shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full text-base" asChild>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingCart className="mr-2 size-5" />
                  {pricing.cta}
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">
                {pricing.guarantee}
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
