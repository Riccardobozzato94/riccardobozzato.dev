import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Download, CheckCircle2, Sparkles } from "lucide-react";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";

export default async function HomePage() {
  const t = await getTranslations("home");
  const tp = await getTranslations("projects");

  return (
    <>
      {/* ════════════════════════════════════════════
           HERO
         ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/8 blur-[140px] animate-glow-pulse" />
          <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] animate-float" style={{ animationDelay: "-2s" }} />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/3 blur-[100px] animate-float" style={{ animationDelay: "-4s" }} />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-8 animate-fade-in-up">
            <Sparkles className="size-3.5" />
            Operations & Delivery Consultant | PMP®
          </div>

          <div className="animate-fade-in-up space-y-8" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter">
              <span className="gradient-text">Hi, I&apos;m Riccardo</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              {t("heroTagline")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-8 text-base font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("heroCta")}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/freebie"
                className="group relative inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm px-8 text-base font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/5"
              >
                <Download className="size-4" />
                {t("heroCta2")}
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="size-6 rounded-full border border-border/40 flex items-center justify-center">
              <div className="size-1.5 rounded-full bg-muted-foreground/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           FEATURED PROJECTS
         ════════════════════════════════════════════ */}
      <Section animate>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t("featuredTitle")}
          </h2>
          <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
            {t("featuredSubtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Featured: Trova */}
          <ProjectCard
            title={tp("trova.title")}
            subtitle={tp("trova.subtitle")}
            description={tp("trova.description")}
            tags={["Next.js 16", "SaaS", "TypeScript", "€49"]}
            href="/trova"
            image="/images/trova-home.png"
            badge="Product"
            badgeColor="bg-accent/10 text-accent"
            featured
          />

          {/* VulnClaw + Panificio */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ProjectCard
              title={tp("vulnclaw.title")}
              subtitle={tp("vulnclaw.subtitle")}
              description={tp("vulnclaw.description")}
              tags={["AI", "Security", "Python"]}
              href="/projects/vulnclaw"
              image="/images/vulnclaw-scan.png"
              badge="CLI Tool"
              badgeColor="bg-blue-500/10 text-blue-400"
            />
            <ProjectCard
              title={tp("panificio.title")}
              subtitle={tp("panificio.subtitle")}
              description={tp("panificio.description")}
              tags={["Next.js", "E-Commerce", "Family"]}
              href="/projects/panificio"
              image="/images/panificio-home.png"
              badge="Family Gift"
              badgeColor="bg-amber-500/10 text-amber-400"
            />
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
           ABOUT SNIPPET
         ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Divider */}
        <div className="section-divider-vertical" />

        <Section animate className="!py-20">
          <div className="max-w-3xl mx-auto text-center relative">
            {/* Decorative quote mark */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl font-heading font-bold text-accent/10 select-none">
              &ldquo;
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
              {t("aboutTitle")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              {t("aboutText")}
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent/80"
            >
              {t("aboutCta")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Section>
      </section>

      {/* ════════════════════════════════════════════
           FREEBIE CTA
         ════════════════════════════════════════════ */}
      <Section animate delay={150}>
        <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card p-8 md:p-14 max-w-4xl mx-auto text-center group hover:border-accent/30 transition-colors duration-500">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm text-accent font-medium">
              <Download className="size-4" />
              Free Download
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              {t("freebieTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("freebieDesc")}
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href="/freebie"
                className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-7 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                {t("freebieCta")}
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/60 pt-4">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-accent/60" />
                No spam
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-accent/60" />
                Unsubscribe anytime
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-accent/60" />
                PDF delivered to inbox
              </span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
