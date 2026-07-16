"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Download, Lock, Sparkles, TrendingUp, Users, Star, ArrowRight } from "lucide-react";
import Section from "@/components/Section";

const testimonials = [
  {
    quote: "Exactly what I needed to align my security and ops teams. Practical, actionable.",
    author: "Marco V.",
    role: "DevOps Lead at UniCredit",
  },
  {
    quote: "The AI workflows alone saved us weeks of manual threat modeling.",
    author: "Sarah K.",
    role: "Security Engineer at Dentons",
  },
];

const stats = [
  { icon: <Download className="size-5" />, value: "500+", label: "Downloads" },
  { icon: <Star className="size-5" />, value: "4.8/5", label: "Rating" },
  { icon: <Users className="size-5" />, value: "50+", label: "Companies" },
];

export default function FreebiePage() {
  const t = useTranslations("freebie");
  const whatsInside = t.raw("whatsInside") as string[];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [directDownload, setDirectDownload] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/freebie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setStatus("success");
      if (data.directDownload && data.downloadUrl) {
        setDirectDownload(data.downloadUrl);
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/6 blur-[150px]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
          {/* Dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Value Proposition */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
                <Sparkles className="size-3.5" />
                Free Resource · Instant Access
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-[1.1]">
                AI + Ops + Security
                <br />
                <span className="text-accent">Playbook</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground/80 mb-6 leading-relaxed">
                A practical guide to aligning security with operations
                using AI-driven workflows — used by teams at 50+ companies.
              </p>

              {/* Social proof stats */}
              <div className="flex flex-wrap gap-6 md:gap-10 mb-8">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="size-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      {stat.icon}
                    </div>
                    <div>
                      <span className="text-lg font-bold text-foreground">{stat.value}</span>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Lock className="size-3.5" /> No spam, ever
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" /> Unsubscribe anytime
                </span>
                <span className="flex items-center gap-1.5">
                  <Download className="size-3.5" /> Instant PDF delivery
                </span>
              </div>
            </div>

            {/* Right: Form Card */}
            <div>
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-accent/20 bg-card shadow-2xl shadow-accent/5 overflow-hidden">
                  {/* Accent top bar */}
                  <div className="h-1.5 bg-gradient-to-r from-accent/80 via-accent to-accent/80" />

                  <div className="p-6 md:p-8">
                    {status === "success" ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center space-y-5">
                        <div className="size-20 rounded-2xl bg-accent/10 flex items-center justify-center">
                          <Download className="size-10 text-accent" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold tracking-tight">{t("form.success")}</p>
                          <p className="text-muted-foreground text-sm">
                            Check your inbox — your playbook is on its way.
                          </p>
                        </div>
                        {directDownload && (
                          <a
                            href={directDownload}
                            download
                            className="group inline-flex items-center justify-center h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-8 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <Download className="mr-2 size-4" />
                            Download Now
                          </a>
                        )}
                        <a
                          href="/files/ai-ops-security-playbook.pdf"
                          download
                          className="text-sm text-accent underline-offset-2 hover:underline"
                        >
                          Or download directly
                        </a>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Form header */}
                        <div className="text-center mb-2">
                          <h3 className="text-xl font-bold tracking-tight">Get Your Free Copy</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Join 500+ readers. No credit card required.
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                            {t("form.name")}
                          </label>
                          <Input
                            id="name"
                            placeholder={t("form.namePlaceholder")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="h-11 bg-background/50 border-border/50 focus-visible:border-accent/50 focus-visible:ring-accent/20"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                            {t("form.email")}
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t("form.emailPlaceholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-11 bg-background/50 border-border/50 focus-visible:border-accent/50 focus-visible:ring-accent/20"
                          />
                        </div>

                        {status === "error" && (
                          <p className="text-sm text-destructive bg-destructive/5 rounded-lg p-3">
                            {t("form.error")}
                          </p>
                        )}

                        <Button
                          type="submit"
                          className="w-full h-12 rounded-xl text-base font-medium shadow-lg shadow-accent/10 hover:shadow-xl hover:shadow-accent/20 transition-all duration-300"
                          size="lg"
                          disabled={status === "loading"}
                        >
                          {status === "loading" ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin size-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              {t("form.cta")} <ArrowRight className="size-4" />
                            </span>
                          )}
                        </Button>

                        <p className="text-xs text-muted-foreground/60 text-center">
                          <Lock className="size-3 inline mr-1" />
                          Your data is safe. PDF delivered instantly to your inbox.{" "}
                          <a href="/privacy" className="underline underline-offset-2 hover:text-accent transition-colors">
                            Privacy Policy
                          </a>
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT'S INSIDE ═══════════════ */}
      <Section animate className="!py-16 md:!py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
              <Sparkles className="size-3.5" />
              What You&apos;ll Learn
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything in the Playbook
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Actionable frameworks and ready-to-use templates — not theory.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whatsInside.map((item: string, i: number) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-card/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/20"
              >
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <CheckCircle2 className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-foreground/90 font-medium leading-snug">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <Section animate delay={100} className="bg-muted/30 !py-16 md:!py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Trusted by Industry Professionals
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative rounded-2xl border border-border/50 bg-card p-6 md:p-8"
              >
                <svg className="absolute top-4 right-4 size-8 text-accent/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-muted-foreground leading-relaxed mb-4 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-medium text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ DIRECT DOWNLOAD REMOVED ═══════════════ */}
      {/* Direct download section removed to avoid conversion cannibalization.
          Users must submit the form to access the PDF, ensuring email capture
          for the nurturing sequence. See GAP-12 in the audit. */}

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <Section animate className="bg-muted/30 !py-16 md:!py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <TrendingUp className="size-7 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to Align Security with Ops?
          </h2>
          <p className="text-muted-foreground text-lg">
            Download the playbook and start building a security culture
            that enables velocity — not hinders it.
          </p>
          <a
            href="#"
            className="group inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-8 text-base font-medium transition-all duration-300 hover:-translate-y-0.5"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Get Your Free Copy <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </Section>
    </>
  );
}
