"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Download, Lock, Sparkles, Map, BarChart3, Target, ArrowRight, FileText } from "lucide-react";
import Section from "@/components/Section";

const phases = [
  {
    icon: <Map className="size-5" />,
    title: "Phase 1: Process Map",
    time: "60 min",
    desc: "Map every business process end-to-end. Mark handoffs, tool switches, and approval bottlenecks.",
  },
  {
    icon: <BarChart3 className="size-5" />,
    title: "Phase 2: Metric Baseline",
    time: "60 min",
    desc: "Measure lead time, active time, and wait time. Calculate process efficiency.",
  },
  {
    icon: <Target className="size-5" />,
    title: "Phase 3: Priority Matrix",
    time: "60 min",
    desc: "Score each process by impact and fixability. Build your action plan.",
  },
];

export default function FreebiePage() {
  const t = useTranslations("freebie");
  const whatsInside = t.raw("whatsInside") as string[];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
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
        body: JSON.stringify({ name, email, consent }),
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
                Free Resource · Printable Worksheet
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-[1.1]">
                Operational<br />
                <span className="text-accent">Chaos</span> Diagnostic
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground/80 mb-8 leading-relaxed">
                {t("description")}
              </p>

              {/* Phase preview */}
              <div className="space-y-3 mb-8">
                {phases.map((phase, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                    <div className="size-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                      {phase.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground/90">{phase.title}</p>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/10 px-1.5 py-0.5 rounded">{phase.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <FileText className="size-3.5" /> Printable one-page worksheet
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="size-3.5" /> No spam, ever
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" /> Unsubscribe anytime
                </span>
              </div>
            </div>

            {/* Right: Form Card */}
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-accent/20 bg-card shadow-2xl shadow-accent/5 overflow-hidden">
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
                            Check your inbox for the confirmation link — then download your diagnostic.
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
                        <p className="text-xs text-muted-foreground">
                          PDF will also be sent to your inbox.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="text-center mb-2">
                          <h3 className="text-xl font-bold tracking-tight">Get Your Free Copy</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Printable worksheet. No credit card required.
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

                        {/* Consent checkbox */}
                        <div className="flex items-start gap-2.5">
                          <input
                            id="consent"
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            required
                            className="mt-1 size-4 shrink-0 rounded border-border/60 bg-background/50 text-accent focus-visible:ring-accent/30 focus-visible:ring-2 focus-visible:ring-offset-2"
                          />
                          <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed select-none">
                            I agree to receive the 6-email educational sequence about operations and security (unsubscribe anytime).{" "}
                            <a href="/privacy" className="underline underline-offset-2 hover:text-accent transition-colors">
                              Privacy Policy
                            </a>
                          </label>
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
                          disabled={status === "loading" || !consent}
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
                          Your data is safe. Worksheet delivered instantly to your inbox.{" "}
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
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
              <Sparkles className="size-3.5" />
              What&apos;s Inside
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything in the Diagnostic
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              A ready-to-use printable worksheet — not theory, just the framework.
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

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <Section animate delay={100} className="bg-muted/30 py-16! md:!py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              How to Use It
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Three focused sessions. One whiteboard. A clear action plan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Print or Open",
                desc: "Print the worksheet or open it on a tablet. Grab a whiteboard for the team session.",
              },
              {
                step: "02",
                title: "Run the 3 Phases",
                desc: "Follow the framework: Process Map → Metric Baseline → Priority Matrix. One phase at a time.",
              },
              {
                step: "03",
                title: "Take Action",
                desc: "Identify your Top 3 P1 quick wins. Implement this week. Measure next week.",
              },
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-2xl border border-border/50 bg-card text-center">
                <div className="text-4xl font-black text-accent/20 mb-3">{item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <Section animate className="py-16! md:!py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Target className="size-7 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to Diagnose Your Operational Chaos?
          </h2>
          <p className="text-muted-foreground text-lg">
            Download the worksheet and turn invisible complexity into a clear action plan — in three hours.
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
