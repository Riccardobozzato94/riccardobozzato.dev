import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/content/blog";
import { CalendarDays, ArrowLeft, ArrowRight, Sparkles, Download, ShoppingCart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.netlify.app";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && p.locale === locale);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const canonicalSlug = slug;

  return {
    title: `${post.title} — Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Riccardo Bozzato`,
      description: post.excerpt,
      url: `${baseUrl}/${locale}/blog/${canonicalSlug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${canonicalSlug}`,
    },
  };
}

const postContent: Record<string, { body: string[] }> = {
  "ops-security-alignment": {
    body: [
      "For years, the relationship between operations and security teams has been adversarial. Security says \"no\" — operations finds a way around it. Security adds a gate — operations discovers a bypass. The result is a brittle, theater-of-security posture that frustrates everyone.",
      "The fundamental problem is that most security frameworks were designed for a different era. They assume that security can be a separate function that reviews and approves. But in modern DevOps environments, velocity is survival. If security slows things down, teams will route around it — intentionally or not.",
      "The Ops-Security Alignment Framework changes this by requiring every security control to earn its place. The rule is simple: every control must map to an ops metric. If it doesn't improve uptime, reduce MTTR, or lower error rates, it needs to be rethought.",
      "<strong>How to start:</strong>",
      "1. Audit your current security controls. For each one, ask: what ops metric does this improve?",
      "2. Replace manual approval gates with automated policy checks (policy-as-code).",
      "3. Measure security adoption by ops velocity, not compliance scorecards.",
      "4. Review quarterly — if a control isn't moving an ops needle, deprecate it.",
      "The teams that get this right don't see security as a cost center. They see it as a force multiplier. When security makes ops faster (not slower), everyone wins."
    ]
  },
  "building-vulnclaw": {
    body: [
      "VulnClaw started as a side project — a way to automate the tedious parts of penetration testing that I kept doing manually. What began as a few hundred lines of Python grew into a full AI-driven pentesting CLI with MCP toolchain integration.",
      "<strong>Why CLI-first?</strong>",
      "Most security tools try to be everything: web UI, API, CLI, dashboard. The result is usually mediocre at everything. I chose CLI-first because penetration testers live in the terminal. A CLI is composable, scriptable, and integrates naturally with CI/CD pipelines.",
      "The architecture is straightforward: an LLM agent (OpenAI-compatible) orchestrates a toolchain of MCP servers for recon, scanning, and exploitation. Each phase feeds into the next — recon results determine scan targets, scan findings guide exploitation.",
      "<strong>Key lessons:</strong>",
      "1. Start with the narrowest possible scope. VulnClaw v0.1 only did port scanning + service detection.",
      "2. LLM agents are powerful but unpredictable. Always validate outputs before execution.",
      "3. MCP (Model Context Protocol) was a game-changer — it decouples the agent from specific tools.",
      "4. Open source drove the quality up faster than any QA process could have.",
      "The project is now at v0.4.0 with active community contributions. Available on GitHub under MIT license."
    ]
  },
  "saas-boilerplate-lessons": {
    body: [
      "I've built the same auth system five times. Magic links, OAuth, 2FA, session management — every time a new project, every time from scratch. The fifth time, I stopped and asked: why isn't there a production-ready boilerplate that just works?",
      "So I built Trova.",
      "Trova is a Next.js 16 SaaS boilerplate with everything you need to launch: Better Auth, Drizzle ORM, Resend emails, Stripe billing, i18n (en/it), and shadcn/ui. It's not a demo app — it's a production foundation.",
      "<strong>What I learned:</strong>",
      "1. <strong>Auth is the hardest part.</strong> Magic links, OAuth providers, 2FA, session rotation — getting all of these right without a managed service is deceptively complex. Better Auth handled most of it, but edge cases still required careful handling.",
      "2. <strong>i18n must be there from day one.</strong> Adding internationalization later is a painful refactor. next-intl made it straightforward, but only because it was baked into the architecture from the start.",
      "3. <strong>Stripe integration is never \"done\".</strong> Webhooks, idempotency, failure recovery — Stripe requires careful state management. The boilerplate handles the 90% case; every SaaS will need to customize the remaining 10%.",
      "4. <strong>Email is infrastructure, not a feature.</strong> Transactional emails (welcome, reset password, invoices) must be reliable. Using Resend with React Email templates gave us type-safe, beautiful emails out of the box.",
      "Trova is available as a one-time purchase (€49) with full source code, lifetime updates, and priority support."
    ]
  },
  "operazioni-e-sicurezza-allineamento": {
    body: [
      "Per anni, la relazione tra team operations e team sicurezza è stata conflittuale. La sicurezza dice \"no\" — le operations trovano un modo per aggirarlo. La sicurezza aggiunge un gate — le operations scoprono un bypass. Il risultato è una fragilità che frustra tutti.",
      "Il problema di fondo è che la maggior parte dei framework di sicurezza sono stati progettati per un'epoca diversa. Presuppongono che la sicurezza possa essere una funzione separata che revisiona e approva. Ma negli ambienti DevOps moderni, la velocità è sopravvivenza.",
      "Il framework di allineamento Operations-Sicurezza cambia questo, richiedendo che ogni controllo di sicurezza si guadagni il suo posto. La regola è semplice: ogni controllo deve mappare a una metrica operativa.",
      "<strong>Come iniziare:</strong>",
      "1. Analizza i tuoi controlli di sicurezza attuali. Per ognuno, chiedi: quale metrica operativa migliora?",
      "2. Sostituisci i gate di approvazione manuali con controlli automatizzati (policy-as-code).",
      "3. Misura l'adozione della sicurezza tramite la velocità operativa, non scorecard di conformità.",
      "4. Revisione trimestrale — se un controllo non muove un ago operativo, deprecalo.",
      "I team che capiscono questo non vedono la sicurezza come un centro di costo. La vedono come un moltiplicatore di forza."
    ]
  },
  "costruire-vulnclaw": {
    body: [
      "VulnClaw è nato come progetto secondario — un modo per automatizzare le parti noiose del penetration testing che facevo manualmente. Quello che è iniziato come poche centinaia di righe di Python è cresciuto in un CLI completo di pentesting AI con integrazione MCP.",
      "<strong>Perché CLI-first?</strong>",
      "La maggior parte degli strumenti di sicurezza cerca di fare tutto: web UI, API, CLI, dashboard. Il risultato è di solito mediocre in tutto. Ho scelto CLI-first perché i penetration tester vivono nel terminale.",
      "L'architettura è semplice: un agente LLM orchestra una toolchain di server MCP per ricognizione, scansione e exploitation.",
      "<strong>Lezioni chiave:</strong>",
      "1. Inizia con lo scope più ristretto possibile. VulnClaw v0.1 faceva solo port scanning.",
      "2. Gli agenti LLM sono potenti ma imprevedibili. Valida sempre gli output prima dell'esecuzione.",
      "3. MCP è stato un punto di svolta — disaccoppia l'agente dagli strumenti specifici.",
      "4. L'open source ha guidato la qualità più velocemente di qualsiasi processo QA.",
      "Il progetto è ora alla v0.4.0 con contributi attivi della community."
    ]
  }
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && p.locale === locale);
  const content = postContent[slug];

  if (!post || !content) {
    notFound();
  }

  const isIt = locale === "it";

  return (
    <>
      {/* Back link */}
      <div className="pt-28 md:pt-36">
        <Section className="!pt-0 !pb-0">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              {isIt ? "Torna al blog" : "Back to blog"}
            </Link>
          </div>
        </Section>
      </div>

      {/* Post header */}
      <section className="relative pt-8 pb-8 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/6 blur-[120px]" />
        </div>
        <Section className="!pt-0 !pb-0 relative">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {post.date}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal border border-border/50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Post body */}
      <Section animate className="bg-muted/30 !py-16 md:!py-20">
        <article className="max-w-3xl mx-auto">
          {content.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg leading-relaxed text-muted-foreground mb-6"
              dangerouslySetInnerHTML={paragraph.startsWith("<strong>") ? { __html: paragraph } : undefined}
            >
              {paragraph.startsWith("<strong>") ? undefined : paragraph}
            </p>
          ))}
        </article>
      </Section>

      {/* Contextual CTA */}
      <Section animate>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Sparkles className="size-7 text-accent" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">
              {isIt ? "Ti è piaciuto questo articolo?" : "Enjoyed this post?"}
            </h2>
            <p className="text-muted-foreground">
              {isIt
                ? "Condividilo con un collega o contattami per parlarne."
                : "Share it with a colleague or reach out to discuss."}
            </p>
          </div>

          {/* Contextual product CTA */}
          <div className="flex flex-wrap justify-center gap-3">
            {(slug.includes("ops-security") || slug.includes("operazioni")) && (
              <Link
                href="/freebie"
                className="group inline-flex items-center gap-2 h-11 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/20 px-5 text-sm font-medium text-accent transition-all duration-300 hover:-translate-y-0.5"
              >
                <Download className="size-4" />
                {isIt ? "Scarica il Playbook" : "Download the Playbook"}
              </Link>
            )}
            {(slug.includes("vulnclaw") || slug.includes("costruire")) && (
              <Link
                href="/projects/vulnclaw"
                className="group inline-flex items-center gap-2 h-11 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/20 px-5 text-sm font-medium text-accent transition-all duration-300 hover:-translate-y-0.5"
              >
                <ArrowRight className="size-4" />
                {isIt ? "Scopri VulnClaw" : "Explore VulnClaw"}
              </Link>
            )}
            {(slug.includes("saas") || slug.includes("boilerplate")) && (
              <Link
                href="/trova"
                className="group inline-flex items-center gap-2 h-11 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/20 px-5 text-sm font-medium text-accent transition-all duration-300 hover:-translate-y-0.5"
              >
                <ShoppingCart className="size-4" />
                {isIt ? "Scopri Trova" : "Get Trova (€49)"}
              </Link>
            )}
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-border/50 bg-card shadow-sm hover:border-accent/30 hover:bg-accent/5 px-5 text-sm font-medium transition-all duration-300"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              {isIt ? "Altri articoli" : "More posts"}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}