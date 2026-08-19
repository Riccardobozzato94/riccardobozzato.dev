import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Github, ArrowRight, ArrowUpRight, Rocket } from "lucide-react";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";

  return {
    title: isIt
      ? "Riccardo Bozzato — SaaS Boilerplate Max | AI & Digital Transformation"
      : "Riccardo Bozzato — SaaS Boilerplate Max | AI & Digital Transformation",
    description: isIt
      ? "SaaS Boilerplate Max: boilerplate production-ready con Better Auth, RBAC multi-organizzazione, billing Stripe + LemonSqueezy, admin dashboard, i18n IT/EN e test. Da zero a MVP in giorni."
      : "SaaS Boilerplate Max: production-ready boilerplate with Better Auth, multi-org RBAC, Stripe + LemonSqueezy billing, admin dashboard, IT/EN i18n and tests. From zero to MVP in days.",
    openGraph: {
      title: isIt ? "SaaS Boilerplate Max — da zero a SaaS in giorni" : "SaaS Boilerplate Max — from zero to SaaS in days",
      description: isIt
        ? "Auth, billing, admin, test e CI già pronti: il lavoro ripetuto sparisce, resta la feature."
        : "Auth, billing, admin, tests and CI already done: the repeated work disappears, the feature remains.",
      url: `${baseUrl}/${locale}/projects/saas-boilerplate-max`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/saas-boilerplate-max`,
      languages: {
        en: `${baseUrl}/en/projects/saas-boilerplate-max`,
        it: `${baseUrl}/it/projects/saas-boilerplate-max`,
      },
    },
  };
}

export default async function SaasBoilerplateMaxPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("ai.projects");
  const isIt = locale === "it";
  const p = t.raw("saasBoilerplate") as {
    title: string; tag: string; problem: string; solution: string;
    stack: string[]; result: string; href: string;
  };

  return (
    <>
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[420px] h-[420px] rounded-full bg-warn/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
          <Breadcrumbs items={[{ label: isIt ? "Progetti" : "Projects", href: "/projects" }, { label: "SaaS Boilerplate Max" }]} />

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{p.title}</h1>
            <span className="rounded-md bg-warn/10 border border-warn/25 px-3 py-1 font-mono text-xs text-warn">
              {p.tag}
            </span>
          </div>

          {/* Terminal card riassuntiva */}
          <div className="terminal-window max-w-2xl" aria-hidden>
            <div className="terminal-header">
              <span className="terminal-dot close" />
              <span className="terminal-dot minimize" />
              <span className="terminal-dot maximize" />
              <span className="ml-3 text-[10px] text-muted-foreground tracking-wider uppercase">saas-boilerplate-max — scaffold</span>
            </div>
            <div className="terminal-body font-mono text-xs space-y-1">
              <p className="terminal-prompt">$ npx create-saas my-app</p>
              <p className="console-log-ok">[ok] auth: Better Auth (email + google + github)</p>
              <p className="console-log-ok">[ok] rbac: multi-org · roles: owner/admin/member</p>
              <p className="console-log-ok">[ok] billing: stripe + lemonsqueezy</p>
              <p className="console-log-ok">[ok] i18n: it/en · tests: unit + e2e · ci: 3 workflows</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 md:pb-32">
        {/* Dossier problem/solution */}
        <Section animate className="pt-0!">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="dossier-card p-6 md:p-8">
              <p className="dossier-label mb-3">{t("problem")}</p>
              <p className="text-muted-foreground leading-relaxed">{p.problem}</p>
            </div>
            <div className="dossier-card p-6 md:p-8">
              <p className="dossier-label mb-3">{t("solution")}</p>
              <p className="text-muted-foreground leading-relaxed">{p.solution}</p>
            </div>
          </div>
        </Section>

        {/* Stack */}
        <Section animate delay={100} className="pt-0!">
          <p className="dossier-label mb-4">{t("stack")}</p>
          <ul className="flex flex-wrap gap-2.5">
            {p.stack.map((s) => (
              <li key={s} className="rounded-md border border-outline-variant bg-surface-container px-4 py-2 font-mono text-xs text-muted-foreground">{s}</li>
            ))}
          </ul>
        </Section>

        {/* Flusso */}
        <Section animate delay={150} className="pt-0!">
          <div className="dossier-card p-6 md:p-8">
            <p className="dossier-label mb-4">{isIt ? "INCLUSO NEL BOILERPLATE" : "INCLUDED IN THE BOILERPLATE"}</p>
            <ol className="space-y-3">
              {[
                isIt ? "Auth completa: email/password + Google, GitHub, Facebook" : "Full auth: email/password + Google, GitHub, Facebook",
                isIt ? "RBAC multi-organizzazione con ruoli e inviti via email" : "Multi-org RBAC with roles and email invites",
                isIt ? "Billing: Stripe (subscriptions) + LemonSqueezy (one-time/licenze)" : "Billing: Stripe (subscriptions) + LemonSqueezy (one-time/licenses)",
                isIt ? "Admin dashboard, i18n IT/EN, test unit + E2E, 3 workflow CI" : "Admin dashboard, IT/EN i18n, unit + E2E tests, 3 CI workflows",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-accent shrink-0 mt-0.5">0{i + 1}</span>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* Risultato */}
        <Section animate delay={200} className="pt-0!">
          <div className="dossier-card p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="dossier-label mb-2">{t("result")}</p>
              <p className="text-foreground/90 leading-relaxed">{p.result}</p>
            </div>
            <div className="shrink-0 flex flex-col gap-3 md:items-end">
              <a
                href="https://github.com/Riccardobozzato94/saas-boilerplate-max"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-xs font-bold tracking-wider text-primary-foreground transition-all hover:brightness-110"
              >
                <Github className="size-4" />
                {t("githubLink")}
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </Section>

        {/* Note onestà */}
        <Section animate delay={250} className="pt-0!">
          <p className="text-xs text-muted-foreground/70 font-mono flex items-center gap-2">
            <Rocket className="size-3.5" aria-hidden />
            {isIt
              ? "// Open source: la base che userei per ogni nuovo prodotto SaaS, condivisa."
              : "// Open source: the base I would use for every new SaaS product, shared."}
          </p>
        </Section>

        {/* Esplorazione correlata */}
        <Section animate delay={300} className="pt-0!">
          <div className="rounded-lg border border-outline-variant bg-surface-container p-6 md:p-8">
            <p className="dossier-label mb-4">{isIt ? "CONTINUA L'ESPLORAZIONE" : "KEEP EXPLORING"}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/projects/voicestudio" className="group rounded-md border border-outline-variant bg-surface-container-low p-5 hover:border-accent/40 transition-colors">
                <p className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">VoiceStudio</p>
                <p className="text-xs text-muted-foreground">{isIt ? "Un prodotto AI desktop locale: voice cloning e dubbing." : "A local desktop AI product: voice cloning and dubbing."}</p>
              </Link>
              <Link href="/projects/agent0" className="group rounded-md border border-outline-variant bg-surface-container-low p-5 hover:border-accent/40 transition-colors">
                <p className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">agent0</p>
                <p className="text-xs text-muted-foreground">{isIt ? "La piattaforma agenti self-hosted per workload AI locali." : "The self-hosted agent platform for local AI workloads."}</p>
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/contact" className="hover-underline inline-flex items-center gap-1.5 text-sm font-bold">
                {isIt ? "Parliamone" : "Let's talk"}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}