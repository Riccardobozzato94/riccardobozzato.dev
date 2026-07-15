"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin, Send } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Form */}
        <Card>
          <CardContent className="p-6">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Send className="size-6 text-accent" />
                </div>
                <p className="text-lg font-medium">{t("form.success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("form.name")}
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
                    {t("form.email")}
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
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("form.message")}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t("form.messagePlaceholder")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="min-h-[120px]"
                  />
                </div>
                {status === "error" && (
                  <p className="text-sm text-destructive">{t("form.error")}</p>
                )}
                <Button type="submit" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? t("form.sending") : t("form.submit")}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <a
                href={`mailto:${t("email")}`}
                className="flex items-center gap-4 group"
              >
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Mail className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{t("email")}</p>
                </div>
              </a>
              <a
                href={`https://${t("github")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Github className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <p className="font-medium">{t("github")}</p>
                </div>
              </a>
              <a
                href={`https://${t("linkedin")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Linkedin className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-medium">{t("linkedin")}</p>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
