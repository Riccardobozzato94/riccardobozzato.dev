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
  Sparkles,
} from "lucide-react";
import Section from "@/components/Section";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <div
      className="group rounded-2xl border border-border/50 bg-card/50 p-6 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="size-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
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
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/8 blur-[150px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <Section className="!pt-0 !pb-0 text-center relative">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5 font-normal border border-border/50 bg-card">
              Next.js 16 • Tailwind v4 • shadcn/ui
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl md:text-2xl text-accent font-semibold mb-6">
              {t("tagline")}
            </p>
            <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>
        </Section>
      </section>

      {/* Features Grid */}
      <Section animate className="!py-16 md:!py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
              <Sparkles className="size-3.5" />
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything You Need to Ship
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureKeys.map((key, idx) => (
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
                delay={idx * 100}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Demo Showcase */}
      <Section animate delay={100} className="bg-muted/30 !py-16 md:!py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Quick Demo</h2>
          <p className="text-muted-foreground mb-8">A walkthrough of the full site experience</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="group rounded-2xl border border-border/50 overflow-hidden bg-card shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-accent/30">
              <img src="/images/trova-home.svg" alt="Trova Home page" className="w-full h-auto" />
            </div>
            <div className="group rounded-2xl border border-border/50 overflow-hidden bg-card shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-accent/30">
              <img src="/images/trova-projects.svg" alt="Trova Projects page" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </Section>

      {/* Screenshots */}
      <Section animate delay={100}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">See It In Action</h2>
          <p className="text-muted-foreground mb-8">Real pages from the boilerplate</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { src: "/images/trova-home.svg", label: "Home page" },
              { src: "/images/trova-projects.svg", label: "Projects portfolio" },
              { src: "/images/trova-trova.svg", label: "Trova sales page" },
              { src: "/images/trova-freebie.svg", label: "Freebie download" },
            ].map((img, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-border/50 overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/30"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <p className="text-xs text-muted-foreground p-2.5">{img.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section animate delay={100} className="bg-muted/30 !py-16 md:!py-20">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{pricing.title}</h2>
          <p className="text-muted-foreground mb-8">{pricing.subtitle}</p>
          <Card className="relative overflow-hidden border-accent/30 shadow-xl shadow-accent/5">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <CardContent className="p-8 md:p-12 space-y-6 relative">
              <div className="space-y-1">
                <span className="text-5xl md:text-6xl font-bold tracking-tight">{pricing.price}</span>
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
              <Button size="lg" className="w-full text-base h-12 rounded-xl shadow-lg shadow-primary/10" asChild>
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