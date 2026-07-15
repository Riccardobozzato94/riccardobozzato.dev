"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

type Status = "loading" | "success" | "already" | "error";

export default function UnsubscribePage() {
  const t = useTranslations("unsubscribe");
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(`/api/unsubscribe?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.alreadyUnsubscribed) {
          setStatus("already");
        } else if (data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [searchParams]);

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      {status === "loading" && (
        <div className="space-y-4">
          <Loader2 className="size-12 animate-spin mx-auto text-muted-foreground" />
          <p className="text-lg text-muted-foreground">{t("processing")}</p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-6">
          <div className="size-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold">{t("successTitle")}</h1>
          <p className="text-lg text-muted-foreground">{t("successMessage")}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-10 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-6 text-sm transition-colors"
          >
            {t("backHome")}
          </Link>
        </div>
      )}

      {status === "already" && (
        <div className="space-y-6">
          <div className="size-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold">{t("alreadyTitle")}</h1>
          <p className="text-lg text-muted-foreground">{t("alreadyMessage")}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-10 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-6 text-sm transition-colors"
          >
            {t("backHome")}
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-6">
          <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <XCircle className="size-8 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold">{t("errorTitle")}</h1>
          <p className="text-lg text-muted-foreground">{t("errorMessage")}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-10 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-6 text-sm transition-colors"
          >
            {t("backHome")}
          </Link>
        </div>
      )}
    </div>
  );
}
