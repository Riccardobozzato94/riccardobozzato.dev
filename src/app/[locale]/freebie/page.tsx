"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, FileText, ArrowRight, Download } from "lucide-react";

export default function FreebiePage() {
  const t = useTranslations("freebie");
  const whatsInside = t.raw("whatsInside") as string[];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        {/* Left: Content */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
              <FileText className="size-4" />
              Free Download
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {t("description")}
          </p>

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
        </div>

        {/* Right: Form */}
        <Card className="border-accent/40">
          <CardContent className="p-8 space-y-6">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <div className="size-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <Download className="size-7 text-accent" />
                </div>
                <p className="text-lg font-medium">{t("form.success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder={t("form.namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {status === "error" && (
                  <p className="text-sm text-destructive">
                    Something went wrong. Try again.
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full"
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
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
