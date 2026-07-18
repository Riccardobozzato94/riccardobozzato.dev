import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { blogPosts } from "@/content/blog";
import { CalendarDays, ArrowLeft, ArrowRight, Sparkles, Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const baseUrl = SITE_URL;

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
  "diagnose-operational-chaos": {
    body: [
      "Every organization I've walked into has operational debt. The question is never \"is there chaos?\" — it's \"how much and where?\" The answer determines whether you're weeks away from a smooth quarter or months away from a fire drill.",
      "Over the years I've developed a diagnostic framework that cuts through the noise. It takes about three hours and gives you a prioritized map of exactly what needs fixing. Here's how it works.",
      "<strong>Phase 1: The Process Map (60 min)</strong>",
      "Grab a whiteboard (or Miro) and map every business process end-to-end. Start from the trigger (a customer signup, an order, a support ticket) and trace it until the outcome (revenue recognized, ticket closed, product shipped). Mark every handoff, every approval gate, every tool change.",
      "You're looking for three things: handoff density (how many times does work change hands?), tool switches (how many tools touch one process?), and approval bottlenecks (where does work wait for a person?).",
      "<strong>Phase 2: The Metric Baseline (60 min)</strong>",
      "For each process, measure three numbers: lead time (trigger to outcome), active time (actual work), and wait time (queues). The ratio of active to total is your process efficiency. Anything under 40% means your team spends more time waiting than working.",
      "Pull your system of record (CRM, Jira, ERP) and export cycle times for the last 90 days. If you can't get this data in 10 minutes, that's your first finding — your process is invisible, which means it's unmanageable.",
      "<strong>Phase 3: The Priority Matrix (60 min)</strong>",
      "Score each process on two axes: operational impact (how much does this affect revenue or delivery?) and fixability (how much effort to improve?). Priority 1 = high impact, easy fix. Those are your quick wins. Priority 4 = low impact, hard fix. Ignore those.",
      "Ruthlessly prioritize. Most teams I've worked with find 3-5 P1 items that can be resolved in 2-4 weeks. Fixing those alone typically recovers 15-25% of team capacity.",
      "The framework is deliberately simple because operational complexity is the problem, not the solution. You don't need a tool or a consultant — you need a whiteboard, three hours, and the willingness to look at your own processes honestly."
    ]
  },
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
  "saas-boilerplate-lessons": {
    body: [
      "I've built the same auth system five times. Magic links, OAuth, 2FA, session management — every time a new project, every time from scratch. The fifth time, I stopped and asked: why isn't there a production-ready boilerplate that just works?",
      "So I built Trova. It's a Next.js 16 SaaS boilerplate with Better Auth, Drizzle ORM, Resend, Stripe billing, i18n, and shadcn/ui. But this isn't a post about the product — it's about what building it taught me about delivery, scope, and operations.",
      "<strong>1. The last 10% takes 50% of the time.</strong> Every time. The auth system worked on day 3. The edge cases (session rotation, provider unlinking, race conditions) took two more weeks. I've seen this pattern in every project I've managed, from e-commerce platforms to enterprise integrations. The 90% milestone is a mirage. Plan for it.",
      "<strong>2. Scope is a negotiation, not a specification.</strong> I started with a clear feature list. Halfway through, I found myself building a demo generator, a license key system, and a changelog page. None of these were in the original plan. Every feature had a reasonable justification. The aggregate cost was two extra months. Saying \"no\" to a good feature is harder than saying \"no\" to a bad one — and more important.",
      "<strong>3. Tools are multipliers, not solutions.</strong> I chose each tool carefully: Better Auth for auth, Resend for email, Stripe for billing. Each saved me weeks. But the integration cost between them — data synchronization, error handling, idempotency — was higher than any individual tool's overhead. This is exactly the pattern I see in operations: buying best-in-class tools for each function, then suffering the integration tax. The toolchain is only as strong as its weakest interface.",
      "<strong>4. Documentation is delivery.</strong> I wrote comprehensive setup guides, API references, and migration documents. Not because users asked for them, but because good documentation is the difference between a product that ships and one that sits on a shelf. In operations, the same applies: a well-documented process is one that can be executed, audited, and improved. An undocumented process is tribal knowledge with a single point of failure.",
      "<strong>5. You can't optimize what you don't measure.</strong> I tracked every build time, every deploy cycle, every customer issue. The data showed patterns I wouldn't have noticed otherwise — like the fact that Stripe webhook failures clustered around Monday mornings (a caching issue with the idempotency layer). In operations, this is the whole game. If you don't have metrics, you're navigating by anecdote.",
      "Building Trova took four months longer than I expected. But the operational lessons I learned from that process have saved me years of mistakes in every project since."
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
  "lezioni-operazioni-prodotto": {
    body: [
      "Ho costruito lo stesso sistema di autenticazione cinque volte. Magic link, OAuth, 2FA, gestione sessioni — ogni volta un progetto nuovo, ogni volta da zero. Alla quinta volta mi sono fermato e ho chiesto: perché non esiste un boilerplate production-ready che funziona e basta?",
      "Così ho costruito Trova. Un boilerplate SaaS con Next.js 16, Better Auth, Drizzle ORM, Resend, Stripe, i18n e shadcn/ui. Ma questo non è un post sul prodotto — è su cosa ho imparato costruendolo: delivery, scope, operations.",
      "<strong>1. L'ultimo 10% prende il 50% del tempo.</strong> Sempre. L'auth system funzionava al giorno 3. I casi limite (session rotation, provider unlinking, race condition) hanno preso altre due settimane. Vedo questo pattern in ogni progetto che ho gestito, dalle piattaforme e-commerce alle integrazioni enterprise. Il traguardo del 90% è un miraggio. Pianifica per quello vero.",
      "<strong>2. Lo scope è una negoziazione, non una specifica.</strong> Sono partito con una lista chiara di funzionalità. A metà strada mi sono ritrovato a costruire un generatore di demo, un sistema di licenze e una pagina changelog. Nessuna di queste era nel piano originale. Ogni feature aveva una giustificazione ragionevole. Il costo aggregato? Due mesi extra. Dire \"no\" a una buona feature è più difficile che dire \"no\" a una cattiva — ed è più importante.",
      "<strong>3. Gli strumenti sono moltiplicatori, non soluzioni.</strong> Ho scelto ogni tool con cura: Better Auth per l'auth, Resend per le email, Stripe per i pagamenti. Ognuno mi ha risparmiato settimane. Ma il costo d'integrazione — sincronizzazione dati, gestione errori, idempotenza — è stato più alto del beneficio di ogni singolo tool. Questo è esattamente il pattern che vedo nelle operations: comprare il meglio di ogni categoria, poi soffrire la tassa d'integrazione.",
      "<strong>4. La documentazione è delivery.</strong> Ho scritto guide di setup complete, API reference e documenti di migrazione. Non perché gli utenti le chiedessero, ma perché una buona documentazione è la differenza tra un prodotto che viene adottato e uno che prende polvere. Nelle operations vale lo stesso: un processo ben documentato può essere eseguito, auditato e migliorato. Un processo non documentato è conoscenza tribale con un singolo punto di fallimento.",
      "<strong>5. Non puoi ottimizzare ciò che non misuri.</strong> Ho tracciato ogni tempo di build, ogni deploy, ogni segnalazione utente. I dati hanno mostrato pattern che non avrei notato altrimenti — come il fatto che gli errori dei webhook Stripe si concentravano il lunedì mattina (un problema di cache con il layer di idempotenza). Nelle operations, questo è il gioco. Se non hai metriche, navighi a vista.",
      "Costruire Trova ha preso quattro mesi in più del previsto. Ma le lezioni operative che ho imparato da quel processo mi hanno fatto risparmiare anni di errori in ogni progetto successivo."
    ]
  },
  "diagnosticare-caos-operativo": {
    body: [
      "Ogni organizzazione in cui sono entrato aveva debito operativo. La domanda non è mai \"c'è caos?\" — è \"quanto e dove?\" La risposta determina se sei a settimane da un trimestre fluido o a mesi da un incendio.",
      "Negli anni ho sviluppato un framework diagnostico che taglia il rumore. Richiede circa tre ore e ti dà una mappa prioritizzata di esattamente cosa sistemare. Ecco come funziona.",
      "<strong>Fase 1: La Mappa dei Processi (60 min)</strong>",
      "Prendi una lavagna (o Miro) e mappa ogni processo end-to-end. Parti dal trigger (un cliente che si iscrive, un ordine, un ticket di supporto) e traccia fino all'outcome (ricavi riconosciuti, ticket chiuso, prodotto rilasciato). Segna ogni passaggio di mano, ogni gate di approvazione, ogni cambio di strumento.",
      "Cerca tre cose: densità di passaggi (quante volte il lavoro cambia mano?), cambi di strumento (quanti tool toccano un processo?) e colli di bottiglia di approvazione (dove il lavoro aspetta una persona?).",
      "<strong>Fase 2: La Baseline delle Metriche (60 min)</strong>",
      "Per ogni processo, misura tre numeri: lead time (dal trigger all'outcome), active time (lavoro effettivo) e wait time (code). Il rapporto tra active e totale è la tua efficienza di processo. Sotto il 40% significa che il team passa più tempo ad aspettare che a lavorare.",
      "Esporta dal tuo sistema di registrazione (CRM, Jira, ERP) i cycle time degli ultimi 90 giorni. Se non riesci a ottenere questi dati in 10 minuti, questa è la tua prima scoperta — il tuo processo è invisibile, quindi è ingestibile.",
      "<strong>Fase 3: La Matrice di Priorità (60 min)</strong>",
      "Valuta ogni processo su due assi: impatto operativo (quanto influisce su ricavi o delivery?) e risolvibilità (quanto sforzo per migliorare?). Priorità 1 = alto impatto, facile da risolvere. Questi sono i tuoi quick win. Priorità 4 = basso impatto, difficile. Ignorali.",
      "Sii spietato nelle priorità. La maggior parte dei team con cui ho lavorato ha trovato 3-5 item P1 risolvibili in 2-4 settimane. Sistemare solo quelli recupera tipicamente il 15-25% della capacità del team.",
      "Il framework è deliberatamente semplice perché la complessità operativa è il problema, non la soluzione. Non ti serve un tool o un consulente — ti servono una lavagna, tre ore, e la volontà di guardare onestamente ai tuoi processi."
    ]
  },
  "eight-weeks-head-of-ops-ai-startup": {
    body: [
      "Last month, I completed an 8-week engagement as Head of Operations at Ciao Elsa, an AI-native startup. It was short, intense, and by design. Here's the full story — the good, the messy, and why walking away was the right call.",
      "When Ciao Elsa reached out, they had a familiar problem: a great product, early traction, and operational chaos. Processes were ad-hoc. Decisions were made in Slack threads. The team was talented but spent more time firefighting than building.",
      "The ask was clear: build an operations function from zero. Not a report. Not a recommendation. A functioning system that the team could run without me.",
      "The first week was pure diagnosis. I mapped every process I could find — customer onboarding, support tickets, internal workflows, delivery cycles. The gaps were predictable: no clear ownership, no KPIs, no escalation paths. What surprised me was how hungry the team was for structure. They weren't resisting process — they were drowning without it.",
      "By week 3, we had a framework. By week 5, the first dashboard was live. By week 7, the team was running the new processes autonomously. Week 8 was handover: documentation, training, success metrics.",
      "<strong>So why leave?</strong>",
      "Every engagement has a natural lifespan. This one was designed to be short from the start — build the system, prove it works, hand it over. The team at Ciao Elsa didn't need a permanent Head of Operations. They needed someone to build the runway so they could take off.",
      "Not every engagement needs to be a multi-year commitment. Some of the most impactful work I've done happened in 8 weeks. The key is knowing when to build and when to hand over.",
      "This experience confirmed two things for me: the operational playbook works at any stage — from enterprise to startup speed — and clean handovers are the ultimate sign of a job well done."
    ]
  },
  "otto-settimane-head-of-ops-startup-ai": {
    body: [
      "Il mese scorso ho completato un engagement di 8 settimane come Head of Operations in Ciao Elsa, una startup AI-native. Breve, intenso e per scelta. Ecco la storia completa — la parte buona, quella complicata, e perché andarmene è stata la decisione giusta.",
      "Quando Ciao Elsa mi ha contattato, avevano un problema familiare: un buon prodotto, trazione iniziale e caos operativo. I processi erano ad-hoc. Le decisioni venivano prese nei thread di Slack. Il team era talentuoso ma passava più tempo a spegnere incendi che a costruire.",
      "La richiesta era chiara: costruire una funzione operations da zero. Non un report. Non una raccomandazione. Un sistema funzionante che il team potesse gestire senza di me.",
      "La prima settimana è stata pura diagnosi. Ho mappato ogni processo che ho trovato — onboarding clienti, ticket di supporto, flussi interni, cicli di delivery. Le lacune erano prevedibili: nessuna proprietà chiara, nessun KPI, nessun percorso di escalation. Quello che mi ha sorpreso è quanto il team avesse fame di struttura. Non stavano resistendo ai processi — stavano annegando senza.",
      "Alla settimana 3 avevamo un framework. Alla settimana 5 la prima dashboard era live. Alla settimana 7 il team gestiva i nuovi processi in autonomia. La settimana 8 è stata la consegna: documentazione, formazione, metriche di successo.",
      "<strong>Perché andarsene?</strong>",
      "Ogni engagement ha un ciclo di vita naturale. Questo è stato progettato per essere breve dall'inizio — costruire il sistema, dimostrare che funziona, consegnarlo. Il team di Ciao Elsa non aveva bisogno di un Head of Operations permanente. Aveva bisogno di qualcuno che costruisse la pista in modo che potessero decollare.",
      "Non tutti gli engagement devono essere impegni pluriennali. Alcuni dei lavori più impattanti che ho fatto sono durati 8 settimane. La chiave è sapere quando costruire e quando consegnare.",
      "Questa esperienza ha confermato due cose per me: il playbook operativo funziona a qualsiasi stadio — dall'enterprise alla velocità startup — e le consegne pulite sono il segno definitivo di un lavoro ben fatto."
    ]
  },
  "builder-mindset-operations-leaders": {
    body: [
      "People sometimes ask why I spend my evenings and weekends building tools like Trova (a SaaS boilerplate) and VulnClaw (an AI pen-testing CLI). Isn't operations about processes, not products?",
      "My answer: building products makes me better at building operations. Here's why.",
      "<strong>1. Scope teaches you everything.</strong> When you build a product from scratch, you learn scope management the hard way. Every feature request seems reasonable. Every edge case needs handling. The discipline of saying \"no\" to good ideas — to ship the essential ones — is exactly the same skill you need in operations. A project with 50 priorities has zero priorities.",
      "<strong>2. You feel the pain of bad processes.</strong> When you're the one waiting for a CI pipeline, debugging a webhook failure, or chasing down a deployment approval, you experience operational friction firsthand. That changes how you design systems. You stop creating processes that look good on paper and start creating processes that actually work.",
      "<strong>3. Metrics are not abstract.</strong> I track build times, deploy cycles, error rates, and customer issues for every tool I build. These are real numbers that bite back when they're bad. Operations leaders who build products don't just talk about KPIs — they live under them.",
      "<strong>4. Documentation is not optional.</strong> Every tool I release comes with comprehensive docs — setup guides, API references, troubleshooting. Not because users demand it, but because I've learned that undocumented systems don't scale. Same truth applies to operations. A process that isn't documented is a single point of failure wearing tribal knowledge as armor.",
      "The best operations leaders I know share this trait: they build things. Not because they need to — because understanding the act of creation makes you better at designing the systems that support it."
    ]
  },
  "mentalita-da-builder-operations": {
    body: [
      "A volte le persone mi chiedono perché passo serate e weekend a costruire strumenti come Trova (un boilerplate SaaS) e VulnClaw (un CLI di penetration testing AI). Le operations non riguardano processi, non prodotti?",
      "La mia risposta: costruire prodotti mi rende migliore nel costruire operations. Ecco perché.",
      "<strong>1. Lo scope ti insegna tutto.</strong> Quando costruisci un prodotto da zero, impari la gestione dello scope nel modo più duro. Ogni richiesta di funzionalità sembra ragionevole. Ogni caso limite va gestito. La disciplina di dire \"no\" alle buone idee — per ship quelle essenziali — è esattamente la stessa competenza che ti serve nelle operations. Un progetto con 50 priorità ha zero priorità.",
      "<strong>2. Senti il dolore dei processi inefficienti.</strong> Quando sei tu ad aspettare una CI pipeline, a debuggerare un fallimento di webhook, o a inseguire un'approvazione di deploy, provi l'attrito operativo in prima persona. Questo cambia il modo in cui progetti i sistemi. Smetti di creare processi che sembrano belli sulla carta e inizi a creare processi che funzionano davvero.",
      "<strong>3. Le metriche non sono astratte.</strong> Traccio tempi di build, cicli di deploy, tassi di errore e segnalazioni utenti per ogni strumento che costruisco. Sono numeri reali che mordono quando sono sbagliati. I leader di operations che costruiscono prodotti non parlano solo di KPI — ci vivono sotto.",
      "<strong>4. La documentazione non è opzionale.</strong> Ogni strumento che rilascio include documentazione completa — guide di setup, API reference, troubleshooting. Non perché gli utenti la richiedano, ma perché ho imparato che i sistemi non documentati non scalano. La stessa verità vale per le operations. Un processo non documentato è un singolo punto di fallimento vestito di conoscenza tribale.",
      "I migliori operations leader che conosco condividono questo tratto: costruiscono cose. Non perché ne abbiano bisogno — perché capire l'atto della creazione ti rende migliore nel progettare i sistemi che la supportano."
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
        <Section className="pt-0! pb-0!">
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
        <Section className="pt-0! pb-0! relative">
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
      <Section animate className="bg-muted/30 py-16! md:!py-20">
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

          {/* Contextual CTA */}
          <div className="flex flex-wrap justify-center gap-3">
            {(slug.includes("chaos") || slug.includes("caos") || slug.includes("ops-security") || slug.includes("operazioni") || slug.includes("head-of-ops") || slug.includes("builder")) && (
              <Link
                href="/freebie"
                className="group inline-flex items-center gap-2 h-11 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/20 px-5 text-sm font-medium text-accent transition-all duration-300 hover:-translate-y-0.5"
              >
                <Download className="size-4" />
                {isIt ? "Scarica il Playbook" : "Download the Playbook"}
              </Link>
            )}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 h-11 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/20 px-5 text-sm font-medium text-accent transition-all duration-300 hover:-translate-y-0.5"
            >
              <ArrowRight className="size-4" />
              {isIt ? "Parlami del tuo progetto" : "Tell me about your project"}
            </Link>
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