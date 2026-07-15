"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, FileText, ArrowRight, Download, Lock, Sparkles } from "lucide-react";
import Section from "@/components/Section";

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
      {/* Hero */}
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="!pt-0 !pb-0 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
            <Sparkles className="size-3.5" />
            Free Resource
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </Section>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left: Content */}
          <Section animate>
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
                  <FileText className="size-4" />
                  Free Download
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t("description")}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">What&apos;s Inside</h3>
                <ul className="space-y-3">
                  {whatsInside.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct download link */}
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <Lock className="size-3.5" />
                  Want it instantly? No email required:
                </p>
                <a
                  href="/files/ai-ops-security-playbook.pdf"
                  download
                  className="group inline-flex items-center gap-2 text-sm text-accent underline-offset-4 hover:underline transition-colors"
                >
                  <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                  Download PDF directly
                </a>
              </div>
            </div>
          </Section>

          {/* Right: Form */}
          <Section animate delay={100}>
            <Card className="relative overflow-hidden border-accent/30 shadow-lg shadow-accent/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <CardContent className="p-8 space-y-6 relative">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <Download className="size-7 text-accent" />
                    </div>
                    <p className="text-xl font-medium">{t("form.success")}</p>
                    {directDownload && (
                      <a
                        href={directDownload}
                        download
                        className="group inline-flex items-center justify-center h-11 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-6 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <Download className="mr-2 size-4" />
                        Download Playbook
                      </a>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                        {t("form.name")}
                      </label>
                      <Input
                        id="name"
                        placeholder={t("form.namePlaceholder")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-background/50 border-border/50 focus-visible:border-accent/50"
                      />
                    </div>
                    <div className="space-y-2">
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
                        className="bg-background/50 border-border/50 focus-visible:border-accent/50"
                      />
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-destructive">
                        {t("form.error")}
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="w-full h-11 rounded-xl"
                      size="lg"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        t("form.sending")
                      ) : (
                        <>
                          {t("form.cta")}{" "}
                          <ArrowRight className="ml-2 size-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      {t("form.privacy")}
                    </p>
                    <p className="text-xs text-muted-foreground/50 text-center">
                      <Lock className="size-3 inline mr-1" />
                      Your data is safe.{" "}
                      <a href="/privacy" className="underline underline-offset-2 hover:text-accent transition-colors">Privacy Policy</a>
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </Section>
        </div>
      </div>
    </>
  );
}