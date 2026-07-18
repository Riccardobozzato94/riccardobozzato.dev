import type { Metadata } from "next";
import Image from "next/image";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Cpu, Users, Gauge, Euro, Check, MapPin, Mail, BarChart3 } from "lucide-react";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("home");
  const site = await getTranslations("site");

  return {
    title: `${site("title")} — ${t("heroRole")}`,
    description: `${t("heroTagline")} €500K+ delivered.`,
    openGraph: {
      title: `${site("title")} — Dal Caos al Controllo Totale.`,
      description: t("heroTagline"),
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
           HERO — Portrait + Copy
         ════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-16 py-[120px] relative">
        <div className="flex flex-col lg:flex-row items-center gap-[64px]">
          {/* Portrait */}
          <div className="w-full lg:w-5/12">
            <div className="aspect-[3/4] bg-surface-container-highest border border-outline-variant relative overflow-hidden group">
              <Image
                src="/images/riccardo-bozzato-photo-hero.jpg"
                alt="Riccardo Bozzato — Delivery Manager & Head of Operations"
                fill
                className="object-cover grayscale opacity-80 mix-blend-luminosity group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>

          {/* Copy */}
          <div className="w-full lg:w-7/12 relative z-10">
            <div className="flex items-center gap-2 mb-8 border-b border-outline-variant pb-4 inline-block">
              <span className="text-xs tracking-[0.1em] text-primary font-semibold">
                {isIt ? "RICCARDO BOZZATO — STRATEGIC OPERATIONS" : "RICCARDO BOZZATO — STRATEGIC OPERATIONS"}
              </span>
            </div>

            <h1 className="text-[56px] lg:text-[72px] leading-[1.05] mb-6 font-bold tracking-tight">
              {isIt ? (
                <>Dal Caos al <br /><span className="text-primary italic">Controllo Totale.</span></>
              ) : (
                <>From Chaos to <br /><span className="text-primary italic">Total Control.</span></>
              )}
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              {isIt
              ? "I leader visionari creano il futuro. Io costruisco l'infrastruttura per raggiungerlo. Come Delivery Manager & Head of Operations (PMP®), trasformo idee ambiziose in esecuzione impeccabile."
              : "Visionary leaders create the future. I build the infrastructure to reach it. As a Delivery Manager & Head of Operations (PMP®), I turn ambitious ideas into flawless execution."}
            </p>

            <div className="flex flex-wrap gap-4 mb-[120px]">
              <Link
                href="/contact"
                className="bg-primary text-black px-8 py-4 text-xs font-bold tracking-widest transition-all hover:brightness-110 luminous-glow"
              >
                {isIt ? "PRENOTA UNA STRATEGY CALL" : "BOOK A STRATEGY CALL"}
              </Link>
              <Link
                href="/#results"
                className="bg-transparent text-foreground border border-outline-variant px-8 py-4 text-xs font-bold tracking-widest hover:bg-surface-container-high transition-all flex items-center gap-2 group"
              >
                {isIt ? "ESPLORA I RISULTATI" : "EXPLORE RESULTS"}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-6 border-t border-outline-variant">
              <div>
                <div className="text-xs text-primary mb-1 font-semibold tracking-wide">
                  {isIt ? "IL PROBLEMA" : "THE PROBLEM"}
                </div>
                <div className="text-lg font-semibold text-foreground line-through opacity-50">
                  {isIt ? "Ritardi & Burnout" : "Delays & Burnout"}
                </div>
              </div>
              <div>
                <div className="text-xs text-primary mb-1 font-semibold tracking-wide">
                  {isIt ? "LA SOLUZIONE" : "THE SOLUTION"}
                </div>
                <div className="text-lg font-semibold text-primary">
                  {isIt ? "-40% Time-to-Market" : "-40% Time-to-Market"}
                </div>
              </div>
              <div>
                <div className="text-xs text-primary mb-1 font-semibold tracking-wide">
                  {isIt ? "L'IMPATTO" : "THE IMPACT"}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {isIt ? "€500K+ Consegnati" : "€500K+ Delivered"}
                </div>
              </div>
            </div>
          </div>
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
            PROJECTS — Side Projects & Prodotti
          ════════════════════════════════════════════ */}
      <section className="py-[120px] bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <div className="text-center mb-[64px]">
            <p className="text-xs tracking-[0.1em] text-primary mb-4 font-semibold">
              {isIt ? "PROGETTI" : "PROJECTS"}
            </p>
            <h2 className="text-[40px] leading-[1.2] tracking-tight font-bold mb-4">
              {isIt ? "Side Projects & Prodotti" : "Side Projects & Products"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isIt
                ? "Strumenti che costruisco quando non costruisco sistemi per altri."
                : "Tools I build when I'm not building systems for others."}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {/* Panificio Da Sergio */}
            <Link
              href="/projects/panificio"
              className="group bg-surface-container border border-outline-variant p-8 hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className="text-xs text-primary mb-2 font-semibold tracking-wide">
                {isIt ? "E-COMMERCE" : "E-COMMERCE"}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {isIt ? "Panificio Da Sergio" : "Panificio Da Sergio"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isIt
                  ? "Piattaforma e-commerce per un panificio tradizionale. Gestione stakeholder, vincoli di budget, delivery."
                  : "E-commerce platform for a traditional bakery. Stakeholder management, budget constraints, delivery."}
              </p>
            </Link>

            {/* VulnClaw */}
            <Link
              href="/projects/vulnclaw"
              className="group bg-surface-container border border-outline-variant p-8 hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className="text-xs text-primary mb-2 font-semibold tracking-wide">
                {isIt ? "OPEN SOURCE" : "OPEN SOURCE"}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                VulnClaw
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isIt
                  ? "CLI open-source per penetration testing con AI. 600+ stelle GitHub, rilasciato v0.4.0."
                  : "AI-powered penetration testing CLI. 600+ GitHub stars, v0.4.0 released."}
              </p>
            </Link>

            {/* Trova */}
            <Link
              href="/trova"
              className="group bg-surface-container border border-outline-variant p-8 hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className="text-xs text-primary mb-2 font-semibold tracking-wide">
                SaaS
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                Trova
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isIt
                  ? "Boilerplate SaaS production-ready (Next.js 16, Stripe, Auth, i18n). €49, una tantum."
                  : "Production-ready SaaS boilerplate (Next.js 16, Stripe, Auth, i18n). €49 one-time."}
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
            {/* Event 4: Ciao Elsa (Current) */}
            <div className="relative pb-16">
              <div className="absolute -left-[41px] md:-left-[73px] top-1 w-5 h-5 bg-primary rounded-full shadow-[0_0_15px_rgba(78,222,163,0.5)] border-4 border-background z-10" />
              <div className="text-xs text-primary mb-1 font-semibold tracking-wide">2026</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {isIt ? "Head of Operations" : "Head of Operations"}
              </h3>
              <div className="text-xs tracking-[0.1em] text-muted-foreground mb-4">
                {isIt ? "CIAO ELSA" : "CIAO ELSA"}
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {isIt
                  ? "Costruzione da zero della governance operativa in una startup in fase di scaling: definizione KPI strategici, sistema di prioritizzazione impatto/urgenza, riduzione rework del 30%. Engagement completato."
                  : "Built operational governance from scratch in a scaling startup: defined strategic KPIs, impact/urgency prioritization system, reduced rework by 30%. Engagement completed."}
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
