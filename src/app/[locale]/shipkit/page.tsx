import { getTranslations } from "next-intl/server";
import Image from "next/image";
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
  Users,
  Download,
  Star,
  Clock,
  AlertTriangle,
  XCircle,
  ArrowRight,
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

export default async function ShipKitPage() {
  const t = await getTranslations("shipkit");

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
        <Section className="pt-0! pb-0! text-center relative">
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

      {/* Social Proof */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 p-5 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Download className="size-4 text-accent" />
            </div>
            <div>
              <span className="text-sm font-bold">500+</span>
              <p className="text-xs text-muted-foreground">Downloads</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-border/50" />
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="size-4 text-accent" />
            </div>
            <div>
              <span className="text-sm font-bold">50+</span>
              <p className="text-xs text-muted-foreground">Companies</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-border/50" />
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Star className="size-4 text-accent" />
            </div>
            <div>
              <span className="text-sm font-bold">4.8/5</span>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-border/50" />
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Clock className="size-4 text-amber-500" />
            </div>
            <div>
              <span className="text-sm font-bold text-amber-500">Launch Price</span>
              <p className="text-xs text-muted-foreground">Increases to €79</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <Section animate className="py-16! md:!py-20">
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
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Quick Demo</h2>
          <p className="text-muted-foreground mb-8">A walkthrough of the full site experience</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="group rounded-2xl border border-border/50 overflow-hidden bg-card shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-accent/30">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image src="/assets/shipkit-dashboard-1600x1000.png" alt="ShipKit Home page" fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div className="group rounded-2xl border border-border/50 overflow-hidden bg-card shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-accent/30">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image src="/assets/shipkit-dashboard-1200x760.png" alt="ShipKit Projects page" fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
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
              { src: "/assets/shipkit-dashboard-1600x1000.png", label: "Home page" },
              { src: "/assets/shipkit-dashboard-1200x760.png", label: "Projects portfolio" },
              { src: "/assets/shipkit-banner-1600x900.png", label: "ShipKit sales page" },
              { src: "/assets/shipkit-banner-1200x630.png", label: "Freebie download" },
            ].map((img, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-border/50 overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/30"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="text-xs text-muted-foreground p-2.5">{img.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Comparison Table */}
      <Section animate delay={100} className="py-16! md:!py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why ShipKit?</h2>
            <p className="text-muted-foreground mt-2">Compared to building from scratch or using alternatives.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-4 px-4 font-medium text-muted-foreground">
                    <XCircle className="size-4 inline mr-1 text-red-500" />
                    From Scratch
                  </th>
                  <th className="text-center py-4 px-4 font-medium text-muted-foreground">
                    <AlertTriangle className="size-4 inline mr-1 text-amber-500" />
                    Others
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-accent">
                    <CheckCircle2 className="size-4 inline mr-1" />
                    ShipKit
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feat: "Auth (magic link, OAuth, 2FA)", scratch: "2-4 weeks", other: "Partial", shipkit: "✅ Included" },
                  { feat: "Database (Drizzle ORM + PG)", scratch: "1-2 weeks", other: "Partial", shipkit: "✅ Included" },
                  { feat: "Transactional Emails", scratch: "1 week", other: "Add-on", shipkit: "✅ Included" },
                  { feat: "i18n (en/it)", scratch: "1-2 weeks", other: "Add-on", shipkit: "✅ Included" },
                  { feat: "Stripe Billing", scratch: "2-3 weeks", other: "Partial", shipkit: "✅ Included" },
                  { feat: "shadcn/ui Components", scratch: "1 week", other: "Included", shipkit: "✅ Included" },
                  { feat: "Dark Mode", scratch: "3-5 days", other: "Add-on", shipkit: "✅ Included" },
                  { feat: "CI/CD Ready", scratch: "1 week", other: "Varies", shipkit: "✅ Included" },
                  { feat: "Time to Ship", scratch: "8-16 weeks", other: "2-4 weeks", shipkit: "⚡ Days" },
                  { feat: "Price", scratch: "€15,000+ dev cost", other: "€99-299/yr", shipkit: "€49 once" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-foreground/90">{row.feat}</td>
                    <td className="py-3.5 px-4 text-center text-muted-foreground">{row.scratch}</td>
                    <td className="py-3.5 px-4 text-center text-muted-foreground">{row.other}</td>
                    <td className="py-3.5 px-4 text-center text-accent font-medium">{row.shipkit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              * Time estimates based on senior developer experience. Your mileage may vary.
            </p>
          </div>
        </div>
      </Section>

      {/* Urgency Banner */}
      <Section animate className="py-8!">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-500/[0.02] to-transparent p-6 text-center">
            <p className="text-sm text-amber-500 font-medium flex items-center justify-center gap-2">
              <Clock className="size-4" />
              Launch pricing — €49 one-time. Price increases to €79 soon. Lock in now.
            </p>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{pricing.title}</h2>
          <p className="text-muted-foreground mb-8">{pricing.subtitle}</p>
          <Card className="relative overflow-hidden border-accent/30 shadow-xl shadow-accent/5">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <CardContent className="p-8 md:p-12 space-y-6 relative">
              {/* Trust badges row */}
              <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="size-3.5" /> 50+ companies</span>
                <span className="flex items-center gap-1"><Star className="size-3.5" /> 4.8/5 rating</span>
                <span className="flex items-center gap-1"><Download className="size-3.5" /> 500+ downloads</span>
              </div>
              <div className="space-y-1">
                <span className="text-5xl md:text-6xl font-bold tracking-tight">{pricing.price}</span>
                {pricing.period && (
                  <span className="text-lg text-muted-foreground ml-2">
                    {pricing.period}
                  </span>
                )}
              </div>
              {pricing.includes && <p className="text-muted-foreground">{pricing.includes}</p>}
              <ul className="space-y-3 text-left">
                {pricingFeatures.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-accent shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full text-base h-12 rounded-xl shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5" asChild>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingCart className="mr-2 size-5" />
                  {pricing.cta}
                </a>
              </Button>
              {pricing.guarantee && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {pricing.guarantee}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}