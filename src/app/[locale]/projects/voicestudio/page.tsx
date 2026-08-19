import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Github, ArrowRight, ArrowUpRight, Mic2 } from "lucide-react";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === "it";

  return {
    title: isIt
      ? "Riccardo Bozzato — VoiceStudio | AI & Digital Transformation"
      : "Riccardo Bozzato — VoiceStudio | AI & Digital Transformation",
    description: isIt
      ? "VoiceStudio: fork mantenuto di OmniVoice-Studio, l'alternativa open-source a ElevenLabs. Voice cloning zero-shot, dettatura real-time e dubbing video, 100% on-device, senza API key."
      : "VoiceStudio: a maintained fork of OmniVoice-Studio, the open-source ElevenLabs alternative. Zero-shot voice cloning, real-time dictation and video dubbing, 100% on-device, no API keys.",
    openGraph: {
      title: isIt ? "VoiceStudio — voice cloning & dubbing locale" : "VoiceStudio — local voice cloning & dubbing",
      description: isIt
        ? "646 lingue, 100% locale: voice cloning e doppiaggio senza inviare audio a terzi."
        : "646 languages, 100% local: voice cloning and dubbing without sending audio to third parties.",
      url: `${baseUrl}/${locale}/projects/voicestudio`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/projects/voicestudio`,
      languages: {
        en: `${baseUrl}/en/projects/voicestudio`,
        it: `${baseUrl}/it/projects/voicestudio`,
      },
    },
  };
}

export default async function VoiceStudioPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("ai.projects");
  const isIt = locale === "it";
  const p = t.raw("voicestudio") as {
    title: string; tag: string; problem: string; solution: string;
    stack: string[]; result: string; href: string;
  };

  return (
    <>
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[420px] h-[420px] rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
          <Breadcrumbs items={[{ label: isIt ? "Progetti" : "Projects", href: "/projects" }, { label: "VoiceStudio" }]} />

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{p.title}</h1>
            <span className="rounded-md bg-accent/10 border border-accent/25 px-3 py-1 font-mono text-xs text-accent">
              {p.tag}
            </span>
          </div>

          {/* Terminal card riassuntiva */}
          <div className="terminal-window max-w-2xl" aria-hidden>
            <div className="terminal-header">
              <span className="terminal-dot close" />
              <span className="terminal-dot minimize" />
              <span className="terminal-dot maximize" />
              <span className="ml-3 text-[10px] text-muted-foreground tracking-wider uppercase">voicestudio — local runtime</span>
            </div>
            <div className="terminal-body font-mono text-xs space-y-1">
              <p className="terminal-prompt">$ clone-voice speaker_a.wav --target "Nuova voce"</p>
              <p className="console-log-ok">[ok] zero-shot voice profile ready (2.1s)</p>
              <p className="console-log-ok">[ok] dubbing session · 646 languages</p>
              <p className="console-log-muted">[..] inference: on-device · no api key · no cloud</p>
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
            <p className="dossier-label mb-4">{isIt ? "FLUSSO" : "FLOW"}</p>
            <ol className="space-y-3">
              {[
                isIt ? "Input: registrazione o testo (voce target o script)" : "Input: recording or text (target voice or script)",
                isIt ? "Voice cloning zero-shot in locale su GPU/NPU" : "Zero-shot voice cloning locally on GPU/NPU",
                isIt ? "Dettatura real-time o dubbing video con sincronizzazione" : "Real-time dictation or video dubbing with sync",
                isIt ? "Output locale: audio/video senza inviare dati a terzi" : "Local output: audio/video without sending data to third parties",
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
                href="https://github.com/Riccardobozzato94/VoiceStudio"
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
            <Mic2 className="size-3.5" aria-hidden />
            {isIt
              ? "// Fork mantenuto (AGPL-3.0): attribuzione e licenza commerciale nel NOTICE del repo."
              : "// Maintained fork (AGPL-3.0): attribution and commercial license in the repo NOTICE."}
          </p>
        </Section>

        {/* Esplorazione correlata */}
        <Section animate delay={300} className="pt-0!">
          <div className="rounded-lg border border-outline-variant bg-surface-container p-6 md:p-8">
            <p className="dossier-label mb-4">{isIt ? "CONTINUA L'ESPLORAZIONE" : "KEEP EXPLORING"}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/projects/agent0" className="group rounded-md border border-outline-variant bg-surface-container-low p-5 hover:border-accent/40 transition-colors">
                <p className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">agent0</p>
                <p className="text-xs text-muted-foreground">{isIt ? "La piattaforma agenti self-hosted per workload AI locali." : "The self-hosted agent platform for local AI workloads."}</p>
              </Link>
              <Link href="/projects/saas-boilerplate-max" className="group rounded-md border border-outline-variant bg-surface-container-low p-5 hover:border-accent/40 transition-colors">
                <p className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">SaaS Boilerplate Max</p>
                <p className="text-xs text-muted-foreground">{isIt ? "Dal prototipo locale al SaaS con auth, billing e admin." : "From local prototype to SaaS with auth, billing and admin."}</p>
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