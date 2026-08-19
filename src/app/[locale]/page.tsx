import type { Metadata } from "next";
import Image from "next/image";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Cpu, Users, Gauge, Euro, Check, MapPin, Mail, BarChart3, Download } from "lucide-react";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("home");
  const site = await getTranslations("site");

  return {
    title: `${site("title")} — Head of Operations | Delivery Manager | PMP® | Open to Work`,
    description: `${t("heroTagline")} €500K+ consegnati, -40% time-to-market. Disponibile da subito.`,
    openGraph: {
      title: `${site("title")} — Operations, delivery ed execution con risultati misurabili.`,
      description: `${t("heroTagline")} €500K+ consegnati, -40% TtM, +25% produttività.`,
      url: `${baseUrl}/${locale}`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        it: `${baseUrl}/it`,
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const isIt = locale === "it";

  const modelIcon = (name: string) => {
    switch (name) {
      case "cpu": return <Cpu className="size-6" />;
      case "users": return <Users className="size-6" />;
      case "speed": return <Gauge className="size-6" />;
      case "euro": return <Euro className="size-6" />;
      default: return <Cpu className="size-6" />;
    }
  };

  return (
    <>

      {/* ════════════════════════════════════════════
           HERO — Portrait + Copy (Open to Work)
         ════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-16 pt-28 pb-20 md:pt-32 md:pb-24 relative">
        <div className="flex flex-col lg:flex-row items-center gap-[64px]">
          {/* Logo / Photo */}
          <div className="w-full lg:w-5/12 flex items-center justify-center">
            <div className="relative w-full max-w-[400px] aspect-square">
              <Image
                src="/assets/logo.svg"
                alt="Riccardo Bozzato — Operations & Delivery"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Copy */}
          <div className="w-full lg:w-7/12 relative z-10">
            {/* Available Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-wide">
                {isIt ? "Disponibile da subito" : "Available immediately"}
              </span>
            </div>

            <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.05] mb-6 font-bold tracking-tight">
              {isIt ? (
                <>Operations, delivery ed execution —<br />con <span className="text-primary">risultati misurabili.</span></>
              ) : (
                <>Operations, delivery, and execution —<br />with <span className="text-primary">measurable results.</span></>
              )}
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              {isIt
              ? "Senior Delivery Manager & Head of Operations (PMP®). Costruisco l'architettura operativa che trasforma il caos in esecuzione prevedibile. €500K+ portfolio gestito, team 8-12, -40% time-to-market."
              : "Senior Delivery Manager & Head of Operations (PMP®). I build the operational architecture that turns chaos into predictable execution. €500K+ portfolio managed, teams of 8-12, -40% time-to-market."}
            </p>

            {/* Badge Numerici */}
            <div className="flex flex-wrap gap-4 sm:gap-8 mb-8">
              {[
                { num: "€500K+", label: isIt ? "Portfolio" : "Portfolio" },
                { num: "-40%", label: isIt ? "Time-to-Market" : "Time-to-Market" },
                { num: "+25%", label: isIt ? "Produttività" : "Productivity" },
                { num: "7+", label: isIt ? "Anni di esperienza" : "Years experience" },
              ].map((badge) => (
                <div key={badge.num} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{badge.num}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground tracking-wide">{badge.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/contact"
                className="bg-primary text-black px-8 py-4 text-xs font-bold tracking-widest transition-all hover:brightness-110 luminous-glow"
              >
                {isIt ? "PARLIAMONE" : "LET'S TALK"}
              </Link>
              <a
                href="/files/CV-Riccardo-Bozzato.pdf"
                download
                className="bg-transparent text-foreground border border-outline-variant px-8 py-4 text-xs font-bold tracking-widest hover:bg-surface-container-high transition-all flex items-center gap-2 group"
              >
                {isIt ? "SCARICA CV" : "DOWNLOAD CV"}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Line */}
            <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{isIt ? "Trust:" : "Trust:"}</span>
              <span>PMP®</span>
              <span className="text-outline-variant">·</span>
              <span>{isIt ? "Ex Accenture" : "Ex Accenture"}</span>
              <span className="text-outline-variant">·</span>
              <span>{isIt ? "Ex Head of Ops AI Startup" : "Ex Head of Ops AI Startup"}</span>
              <span className="text-outline-variant">·</span>
              <span className="text-primary font-semibold">{isIt ? "Disponibile subito" : "Available now"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           OPEN TO WORK — Cerco il prossimo ruolo
         ════════════════════════════════════════════ */}
      <section className="bg-surface-container-low border-y border-outline-variant py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-primary animate-pulse" />
            <div>
              <div className="text-sm font-bold text-foreground">
                {isIt ? "🟢 Cerco il prossimo ruolo" : "🟢 Looking for my next role"}
              </div>
              <div className="text-xs text-muted-foreground">
                {isIt
                  ? "Head of Operations · Delivery Manager · Program Manager · PM Senior"
                  : "Head of Operations · Delivery Manager · Program Manager · Senior PM"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            <span>{isIt ? "Padova · Venezia · Milano · Remote Italia" : "Padua · Venice · Milan · Remote Italy"}</span>
            <span className="text-outline-variant mx-1">|</span>
            <a
              href="/files/CV-Riccardo-Bozzato.pdf"
              download
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              {isIt ? "Scarica CV" : "Download CV"}
              <ArrowRight className="size-3" />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           SOCIAL PROOF — Hanno lavorato con me
         ════════════════════════════════════════════ */}
      <section className="py-16 bg-background border-b border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <p className="text-xs tracking-[0.1em] text-center text-muted-foreground mb-8 font-semibold uppercase">
            {isIt ? "Hanno lavorato con me" : "Trusted by"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
            {["Accenture", "Esse Solutions", "Ciao Elsa", "In's Mercato", "Aldi"].map((name) => (
              <div key={name} className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                {name}
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground/40 mt-6">
            {isIt
              ? "Dal retail alla consulenza IT, passando per startup AI-native."
              : "From retail to IT consulting, through AI-native startups."}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           VISION — La Visione
         ════════════════════════════════════════════ */}
      <section id="vision" className="bg-surface-container-lowest py-[120px] border-y border-outline-variant relative overflow-hidden">
        <div className="absolute -left-64 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 md:px-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-[64px] items-center">
            <div className="md:w-1/2">
              <p className="text-xs tracking-[0.1em] text-primary mb-4 font-semibold">
                {isIt ? "LA VISIONE" : "THE VISION"}
              </p>
              <h2 className="text-[40px] leading-[1.2] tracking-tight font-bold mb-6">
                {isIt
                  ? "Le aziende non falliscono per mancanza di idee. Falliscono nell'esecuzione."
                  : "Companies don't fail from lack of ideas. They fail at execution."}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isIt
                  ? "Ho visto startup brillanti implodere sotto il peso della loro stessa crescita e dipartimenti enterprise paralizzati dalla burocrazia. In 7+ anni, dal retail management alla consulenza IT, ho affinato un'unica ossessione: rendere l'operatività invisibile ed efficiente."
                  : "I've seen brilliant startups implode under their own growth and enterprise departments paralyzed by bureaucracy. In 7+ years, from retail management to IT consulting, I've honed a single obsession: making operations invisible and efficient."}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isIt
                  ? "Non porto solo metodologie Agile o framework complessi. Porto chiarezza. Allineo i team, elimino i colli di bottiglia e costruisco sistemi scalabili. Il mio lavoro inizia quando la strategia finisce e la realtà colpisce."
                  : "I don't just bring Agile methodologies or complex frameworks. I bring clarity. I align teams, eliminate bottlenecks, and build scalable systems. My work begins when strategy ends and reality hits."}
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Metric Cards */}
              {[
                { icon: "cpu", label: isIt ? "ARCHITETTURA DEI PROCESSI" : "PROCESS ARCHITECTURE", title: isIt ? "Design & Governance" : "Design & Governance" },
                { icon: "users", label: isIt ? "ALLINEAMENTO TEAM" : "TEAM ALIGNMENT", title: isIt ? "Leadership Cross-funzionale" : "Cross-functional Leadership" },
                { icon: "speed", label: isIt ? "EFFICIENZA SCALABILE" : "SCALABLE EFFICIENCY", title: isIt ? "Automazione & AI Ops" : "Automation & AI Ops" },
                { icon: "euro", label: isIt ? "GESTIONE DEL VALORE" : "VALUE MANAGEMENT", title: isIt ? "Portfolio & P&L Control" : "Portfolio & P&L Control" },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-surface-container border border-outline-variant p-6 hover:border-primary/50 transition-colors group cursor-default"
                >
                  <div className="text-primary mb-4">{modelIcon(card.icon)}</div>
                  <div className="text-xs text-muted-foreground mb-1 font-semibold tracking-wide">{card.label}</div>
                  <div className="text-lg font-semibold text-foreground">{card.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           RESULTS — Risultati Misurabili
         ════════════════════════════════════════════ */}
      <section id="results" className="py-[120px]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <div className="mb-[64px] max-w-3xl">
            <p className="text-xs tracking-[0.1em] text-primary mb-4 font-semibold">
              {isIt ? "IMPATTO REALE" : "REAL IMPACT"}
            </p>
            <h2 className="text-[40px] leading-[1.2] tracking-tight font-bold mb-4">
              {isIt ? "Risultati Misurabili, Non Teoria." : "Measurable Results, Not Theory."}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isIt
                ? "Ogni intervento è progettato per risolvere un problema di business specifico: costi fuori controllo, time-to-market lento o qualità instabile."
                : "Every engagement is designed to solve a specific business problem: out-of-control costs, slow time-to-market, or unstable quality."}
            </p>
          </div>

          <div className="space-y-6">
            {/* Enterprise Case: Esse Solutions */}
            <div className="bg-surface-container-low border border-outline-variant p-6 md:p-[64px] flex flex-col md:flex-row gap-8 items-start group hover:border-primary/30 transition-colors">
              <div className="md:w-1/3 shrink-0">
                <div className="text-xs text-primary mb-2 font-semibold tracking-wide">
                  {isIt ? "IL PROBLEMA: RITARDI ENTERPRISE" : "THE PROBLEM: ENTERPRISE DELAYS"}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {isIt ? "Gestione Portfolio €500K+" : "Managing a €500K+ Portfolio"}
                </h3>
                <div className="text-xs tracking-[0.1em] text-muted-foreground mb-6">
                  {isIt ? "ESSE SOLUTIONS | 19 MESI" : "ESSE SOLUTIONS | 19 MONTHS"}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-primary text-2xl font-bold w-16">-40%</div>
                    <div className="text-sm text-muted-foreground">
                      {isIt ? "Time-to-market su e-commerce complessi" : "Faster time-to-market on complex e-commerce"}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-primary text-2xl font-bold w-16">+25%</div>
                    <div className="text-sm text-muted-foreground">
                      {isIt ? "Produttività team distribuiti (8-12 pax)" : "Distributed team productivity (8-12 people)"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-outline-variant pt-6 md:pt-0 md:pl-8">
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  {isIt
                    ? "Un portfolio di progetti complessi (Pimcore, Magento, Shopware) soffriva di ritardi nelle consegne e frammentazione della comunicazione. Ho introdotto un framework Agile su misura, ripristinando la visibilità sullo stato di avanzamento e allineando le aspettative degli stakeholder enterprise."
                    : "A portfolio of complex projects (Pimcore, Magento, Shopware) suffered from delivery delays and communication fragmentation. I introduced a tailored Agile framework, restoring visibility into progress and aligning enterprise stakeholder expectations."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[isIt ? "Agile / Scrum" : "Agile / Scrum", "PIM/DAM", isIt ? "Stakeholder Management" : "Stakeholder Management"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-surface-container-highest text-xs text-muted-foreground font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Consulting Case: Accenture */}
            <div className="bg-surface-container-low border border-outline-variant p-6 md:p-[64px] flex flex-col md:flex-row gap-8 items-start group hover:border-primary/30 transition-colors">
              <div className="md:w-1/3 shrink-0">
                <div className="text-xs text-primary mb-2 font-semibold tracking-wide">
                  {isIt ? "IL PROBLEMA: INEFFICIENZA OPERATIVA" : "THE PROBLEM: OPERATIONAL INEFFICIENCY"}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {isIt ? "Automazione Processi IT" : "IT Process Automation"}
                </h3>
                <div className="text-xs tracking-[0.1em] text-muted-foreground mb-6">
                  {isIt ? "ACCENTURE | 2022-2024" : "ACCENTURE | 2022-2024"}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-primary text-2xl font-bold w-16">+30%</div>
                    <div className="text-sm text-muted-foreground">
                      {isIt ? "Efficienza operativa nei processi core" : "Operational efficiency in core processes"}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-primary text-2xl font-bold w-16">-15%</div>
                    <div className="text-sm text-muted-foreground">
                      {isIt ? "Tasso di errore manuale" : "Manual error rate reduction"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-outline-variant pt-6 md:pt-0 md:pl-8">
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  {isIt
                    ? "Nel settore banking/insurance, i processi manuali generavano costi occulti e rischi di compliance. Come IT Systems Specialist, ho mappato e automatizzato i flussi critici utilizzando SAP UI5, creando interfacce più intuitive e riducendo drasticamente i colli di bottiglia operativi."
                    : "In the banking/insurance sector, manual processes generated hidden costs and compliance risks. As an IT Systems Specialist, I mapped and automated critical flows using SAP UI5, creating more intuitive interfaces and drastically reducing operational bottlenecks."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[isIt ? "Process Automation" : "Process Automation", "SAP UI5", isIt ? "Banking / Insurance" : "Banking / Insurance"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-surface-container-highest text-xs text-muted-foreground font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
            PROJECTS — Progetti & Delivery
          ════════════════════════════════════════════ */}
      <section className="py-[120px] bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <div className="text-center mb-[64px]">
            <p className="text-xs tracking-[0.1em] text-primary mb-4 font-semibold">
              {isIt ? "PROGETTI & DELIVERY" : "PROJECTS & DELIVERY"}
            </p>
            <h2 className="text-[40px] leading-[1.2] tracking-tight font-bold mb-4">
              {isIt ? "Progetti & Delivery" : "Projects & Delivery"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isIt
                ? "Stakeholder management, product delivery, e-commerce — progetti reali con risultati concreti."
                : "Stakeholder management, product delivery, e-commerce — real projects with concrete results."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {/* Panificio Da Sergio */}
            <Link
              href="/projects/panificio"
              className="group bg-surface-container border border-outline-variant p-8 hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className="text-xs text-primary mb-2 font-semibold tracking-wide">
                {isIt ? "STAKEHOLDER DELIVERY" : "STAKEHOLDER DELIVERY"}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {isIt ? "Panificio Da Sergio" : "Panificio Da Sergio"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isIt
                  ? "Delivery di un e-commerce sotto vincoli di budget. Negoziazione scope, multi-lingua, SEO locale, consegnato in tempo."
                  : "E-commerce delivery under budget constraints. Scope negotiation, multi-language, local SEO, delivered on time."}
              </p>
            </Link>

            {/* VulnClaw */}
            <Link
              href="/projects/vulnclaw"
              className="group bg-surface-container border border-outline-variant p-8 hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className="text-xs text-primary mb-2 font-semibold tracking-wide">
                {isIt ? "PRODUCT DELIVERY" : "PRODUCT DELIVERY"}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                VulnClaw
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isIt
                  ? "Da zero a community open-source (600+ ⭐). Gestione scope, roadmap, prioritizzazione, shipping v0.4.0."
                  : "From zero to open-source community (600+ ⭐). Scope management, roadmap, prioritization, shipping v0.4.0."}
              </p>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-semibold group"
            >
              {isIt ? "Vedi tutti i progetti" : "View all projects"}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
            BLOG — Ultimi articoli
          ════════════════════════════════════════════ */}
      <section className="py-[120px]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16 text-center">
          <p className="text-xs tracking-[0.1em] text-primary mb-4 font-semibold">
            {isIt ? "BLOG" : "BLOG"}
          </p>
          <h2 className="text-[40px] leading-[1.2] tracking-tight font-bold mb-4">
            {isIt ? "Approfondimenti & Tactical Advice" : "Insights & Tactical Advice"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            {isIt
              ? "Operations, delivery, process design — senza gergo. Cose che funzionano."
              : "Operations, delivery, process design — no jargon. Things that work."}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 text-xs font-bold tracking-widest transition-all hover:brightness-110 luminous-glow"
          >
            {isIt ? "LEGGI IL BLOG" : "READ THE BLOG"}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════
            JOURNEY — Il Viaggio Strategico (Timeline)
          ════════════════════════════════════════════ */}
      <section id="journey" className="bg-surface-container-lowest py-[120px] border-y border-outline-variant relative">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <div className="mb-[120px] text-center">
            <p className="text-xs tracking-[0.1em] text-primary mb-4 font-semibold">
              {isIt ? "IL VIAGGIO STRATEGICO" : "THE STRATEGIC JOURNEY"}
            </p>
            <h2 className="text-[40px] leading-[1.2] tracking-tight font-bold">
              {isIt ? "L'evoluzione di un Operation Leader" : "The Evolution of an Operations Leader"}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto relative pl-8 md:pl-16 timeline-line">
            {/* Event 4: Ciao Elsa (Interim Engagement) */}
            <div className="relative pb-16">
              <div className="absolute -left-[41px] md:-left-[73px] top-1 w-5 h-5 bg-primary rounded-full shadow-[0_0_15px_rgba(78,222,163,0.5)] border-4 border-background z-10" />
              <div className="text-xs text-primary mb-1 font-semibold tracking-wide">2026</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {isIt ? "Head of Operations — Interim" : "Head of Operations — Interim"}
              </h3>
              <div className="text-xs tracking-[0.1em] text-muted-foreground mb-4">
                {isIt ? "CIAO ELSA | 8 SETTIMANE" : "CIAO ELSA | 8 WEEKS"}
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {isIt
                  ? "Incarico a termine: costruire l'architettura operativa da zero in 8 settimane. Processi, KPI strategici, dashboard real-time, governance. Risultato: -30% rework interfunzionale. Documentazione completa, team formato, handover consegnato. Mandato: costruire il sistema, non restare a gestirlo."
                  : "Fixed-term engagement: build operational architecture from scratch in 8 weeks. Processes, strategic KPIs, real-time dashboards, governance. Result: -30% cross-functional rework. Full documentation, trained team, handover delivered. Mandate: build the system, not stay to run it."}
              </p>
            </div>

            {/* Event 3: Esse Solutions */}
            <div className="relative pb-16">
              <div className="absolute -left-[41px] md:-left-[73px] top-1 w-5 h-5 bg-surface-container-high rounded-full border-4 border-background z-10" />
              <div className="text-xs text-muted-foreground mb-1 font-semibold tracking-wide">2024 — 2026</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {isIt ? "Delivery Manager" : "Delivery Manager"}
              </h3>
              <div className="text-xs tracking-[0.1em] text-muted-foreground mb-4">
                {isIt ? "ESSE SOLUTIONS" : "ESSE SOLUTIONS"}
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {isIt
                  ? "Gestione portfolio enterprise, leadership su team multidisciplinari e trasformazione Agile per accelerare il time-to-market."
                  : "Managed enterprise portfolio, led multidisciplinary teams, and drove Agile transformation to accelerate time-to-market."}
              </p>
            </div>

            {/* Event 2: Accenture */}
            <div className="relative pb-16">
              <div className="absolute -left-[41px] md:-left-[73px] top-1 w-5 h-5 bg-surface-container-high rounded-full border-4 border-background z-10" />
              <div className="text-xs text-muted-foreground mb-1 font-semibold tracking-wide">2022 — 2024</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {isIt ? "IT Systems Specialist" : "IT Systems Specialist"}
              </h3>
              <div className="text-xs tracking-[0.1em] text-muted-foreground mb-4">
                {isIt ? "ACCENTURE" : "ACCENTURE"}
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {isIt
                  ? "Ottimizzazione e automazione dei processi in ambito bancario e assicurativo, migliorando efficienza e riducendo il margine d'errore."
                  : "Optimized and automated processes in banking and insurance, improving efficiency and reducing error margins."}
              </p>
            </div>

            {/* Event 1: Retail */}
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[73px] top-1 w-5 h-5 bg-surface-container-high rounded-full border-4 border-background z-10" />
              <div className="text-xs text-muted-foreground mb-1 font-semibold tracking-wide">2018 — 2021</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {isIt ? "Le Fondamenta nel Retail" : "Foundations in Retail"}
              </h3>
              <div className="text-xs tracking-[0.1em] text-muted-foreground mb-4">
                IN'S, ALDI, TERRANOVA
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {isIt
                  ? "La palestra per la leadership operativa: gestione di store, team fisici, controllo KPI e operations sul campo ad alto ritmo."
                  : "The training ground for operational leadership: managing stores, physical teams, KPI control, and high-tempo field operations."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           LEAD MAGNET — Operational Chaos Diagnostic
         ════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-16 py-[120px]">
        <div className="bg-surface-container p-6 md:p-[64px] border-l-4 border-primary relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-xs text-primary mb-4 font-semibold tracking-wider">
                {isIt ? "RISORSA STRATEGICA GRATUITA" : "FREE STRATEGIC RESOURCE"}
              </div>
              <h2 className="text-[40px] leading-[1.2] tracking-tight font-bold mb-4">
                {isIt ? "Operational Chaos Diagnostic" : "Operational Chaos Diagnostic"}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isIt
                  ? "Prima di scalare, devi sapere cosa sta frenando il tuo team. Scarica il framework in 10 punti per mappare, misurare e prioritizzare il debito operativo nascosto nella tua azienda."
                  : "Before scaling, you need to know what's holding your team back. Download the 10-point framework to map, measure, and prioritize the hidden operational debt in your company."}
              </p>
              <div className="flex flex-wrap gap-6 mt-6 opacity-80">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Check className="size-4 text-primary" /> {isIt ? "Assessment Rapido" : "Quick Assessment"}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Check className="size-4 text-primary" /> {isIt ? "Framework Azionabile" : "Actionable Framework"}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Check className="size-4 text-primary" /> Zero Fluff
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto mt-8 md:mt-0">
              <Link
                href="/freebie"
                className="w-full bg-primary text-black px-12 py-5 text-xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 luminous-glow"
              >
                <BarChart3 className="size-6" />
                {isIt ? "Ottieni l'Accesso" : "Get Access"}
              </Link>
              <p className="text-center text-xs text-muted-foreground mt-3 opacity-50">
                {isIt ? "PDF Immediato. No spam." : "Instant PDF. No spam."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
