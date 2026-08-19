import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Avatar from "@/components/Avatar";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Section className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center">
      {/* Terminal block */}
      <div className="terminal-window mb-8 w-full max-w-md text-left" aria-hidden>
        <div className="terminal-header">
          <span className="terminal-dot close" />
          <span className="terminal-dot minimize" />
          <span className="terminal-dot maximize" />
          <span className="ml-3 text-[10px] text-muted-foreground tracking-wider uppercase">
            /lost/agent
          </span>
        </div>
        <div className="terminal-body font-mono text-xs">
          <p className="terminal-prompt">{t("terminal")}</p>
          <p className="terminal-error">{t("terminalError")}</p>
          <p className="terminal-output mt-1">
            status: <span className="terminal-success">fallback_activated</span>
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-5">
        <Avatar size={72} ariaHidden />
        <div className="text-left">
          <p className="text-6xl font-bold tracking-tighter text-accent font-mono">
            {t("title").split("—")[0]?.trim() || "404"}
          </p>
        </div>
      </div>

      <h1 className="sr-only">{t("title")}</h1>
      <p className="mt-4 text-xl font-semibold text-foreground">{t("subtitle")}</p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{t("description")}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-10 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground shadow hover:brightness-110 transition-all"
        >
          {t("cta")}
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center justify-center h-10 rounded-md border border-outline-variant bg-surface-container px-6 text-sm font-bold text-foreground hover:border-accent/50 transition-all"
        >
          {t("ctaProjects")}
        </Link>
      </div>
    </Section>
  );
}