import { getTranslations } from "next-intl/server";
import { CheckCircle2, ArrowRight, Sparkles, Calendar } from "lucide-react";
import Section from "@/components/Section";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface Package {
  title: string;
  price: string;
  desc: string;
  features: string[];
}

interface Step {
  step: string;
  desc: string;
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const packages = t.raw("packages") as Package[];
  const approach = t.raw("approach") as { title: string; steps: Step[] };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/6 blur-[150px]" />
          <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs>
              <pattern id="dots-svc" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-svc)" />
          </svg>
        </div>
        <Section className="!pt-0 !pb-0 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <Sparkles className="size-3.5" />
              Consulting
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
            <p className="text-muted-foreground/60 max-w-xl mx-auto mt-4">
              {t("heroDesc")}
            </p>
          </div>
        </Section>
      </section>

      {/* Packages */}
      <Section animate className="!py-16 md:!py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {packages.map((pkg: Package, i: number) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-border/50 bg-card p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold tracking-tight">{pkg.title}</h3>
                  <span className="text-lg font-bold text-accent shrink-0 ml-4">{pkg.price}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {pkg.desc}
                </p>
                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map((feat: string, j: number) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="group/btn inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  {t("cta")} <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How I Work */}
      <Section animate delay={100} className="bg-muted/30 !py-16 md:!py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{approach.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.steps.map((step: Step, i: number) => (
              <div key={i} className="text-center">
                <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <span className="text-lg font-bold text-accent">{step.step.split(".")[0]}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.step}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section animate>
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card p-8 md:p-10 space-y-5">
            <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
              <Calendar className="size-6 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Let&apos;s Talk</h2>
            <p className="text-muted-foreground">
              Book a free 15-minute discovery call. No commitment, just a conversation
              about what you&apos;re building and how I can help.
            </p>
            <Button asChild className="h-12 rounded-xl px-8 text-base shadow-lg shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300">
              <Link href="/contact">
                {t("cta")} <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}