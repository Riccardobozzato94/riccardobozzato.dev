"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { CheckCircle2, XCircle, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";

type Status = "loading" | "success" | "already" | "error";

export default function ConfirmPage() {
  const t = useTranslations("confirm");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(`/api/confirm?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setTimeout(() => {
            router.push("/thank-you");
          }, 1500);
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [searchParams, router]);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
      </div>

      <div className="max-w-lg mx-auto px-4 text-center relative">
        {status === "loading" && (
          <div className="space-y-4">
            <Loader2 className="size-12 animate-spin mx-auto text-muted-foreground" />
            <p className="text-lg text-muted-foreground/80">{t("processing")}</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6">
            <div className="size-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="size-10 text-accent" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent">
              <Sparkles className="size-3.5" />
              Confirmed
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t("successTitle")}</h1>
            <p className="text-lg text-muted-foreground/80">{t("successMessage")}</p>
          </div>
        )}

        {status === "already" && (
          <div className="space-y-6">
            <div className="size-20 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="size-10 text-blue-500" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm text-blue-500">
              <Sparkles className="size-3.5" />
              Already Confirmed
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t("alreadyTitle")}</h1>
            <p className="text-lg text-muted-foreground/80">{t("alreadyMessage")}</p>
            <Link
              href="/thank-you"
              className="group inline-flex items-center justify-center h-11 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-6 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
            >
              {t("goToDownload")}
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6">
            <div className="size-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto">
              <XCircle className="size-10 text-destructive" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/5 px-4 py-1.5 text-sm text-destructive">
              <Sparkles className="size-3.5" />
              Error
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t("errorTitle")}</h1>
            <p className="text-lg text-muted-foreground/80">{t("errorMessage")}</p>
            <Link
              href="/"
              className="group inline-flex items-center justify-center h-11 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 px-6 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
            >
              {t("backHome")}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
