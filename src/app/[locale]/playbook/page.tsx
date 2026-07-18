import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import {
  Shield,
  Check,
  Download,
  ArrowRight,
  Star,
  Zap,
  BarChart3,
  Sparkles,
} from "lucide-react";
import Section from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const site = await getTranslations("site");
  const isIt = locale === "it";

  return {
    title: isIt
      ? "Playbook di Eccellenza Operativa — Riccardo Bozzato"
      : "Operational Excellence Playbook — Riccardo Bozzato",
    description: isIt
      ? "Il framework completo per trasformare il caos operativo in eccellenza misurabile. Crisis Management, SLA Design, Process Optimization e KPI Dashboard."
      : "The complete framework to transform operational chaos into measurable excellence. Crisis Management, SLA Design, Process Optimization, and KPI Dashboards.",
    openGraph: {
      title: isIt ? "Playbook di Eccellenza Operativa" : "Operational Excellence Playbook",
      description: isIt
        ? "4 moduli premium per Operations Manager, Delivery Lead e Head of Operations."
        : "4 premium modules for Operations Managers, Delivery Leads, and Heads of Operations.",
      url: `${baseUrl}/${locale}/playbook`,
    },
  };
}

const features = [
  {
    icon: Shield,
    titleKey: "crisis",
    titleEn: "Crisis Management Framework",
    titleIt: "Framework di Crisis Management",
    descEn:
      "A step-by-step incident response playbook: detection, escalation, triage, resolution, and post-mortem. Includes communication templates and RACI matrices for every scenario.",
    descIt:
      "Un playbook completo per la gestione degli incidenti: rilevamento, escalation, triage, risoluzione e post-mortem. Include template di comunicazione e matrici RACI per ogni scenario.",
  },
  {
    icon: BarChart3,
    titleKey: "sla",
    titleEn: "SLA Design Toolkit",
    titleIt: "Toolkit per la Progettazione di SLA",
    descEn:
      "Design service-level agreements that actually work. Templates for uptime guarantees, response times, escalation policies, and penalty/credit structures.",
    descIt:
      "Progetta Service Level Agreement che funzionano davvero. Template per garanzie di uptime, tempi di risposta, policy di escalation e strutture di penalty/credit.",
  },
  {
    icon: Zap,
    titleKey: "process",
    titleEn: "Process Optimization Canvas",
    titleIt: "Canvas di Ottimizzazione dei Processi",
    descEn:
      "A visual framework for mapping, analyzing, and optimizing operational workflows. Identify bottlenecks, eliminate waste, and measure cycle time improvements.",
    descIt:
      "Un framework visivo per mappare, analizzare e ottimizzare i flussi di lavoro operativi. Identifica colli di bottiglia, elimina sprechi e misura i miglioramenti.",
  },
  {
    icon: Shield,
    titleKey: "kpi",
    titleEn: "KPI Dashboard Template",
    titleIt: "Template di KPI Dashboard",
    descEn:
      "Pre-built metrics framework for operations health: lead time, throughput, error rates, MTTR, customer satisfaction, and team velocity. With Excel/Google Sheets templates.",
    descIt:
      "Framework di metriche pre-costruito per la salute operativa: lead time, throughput, tassi di errore, MTTR, soddisfazione clienti e velocity del team. Con template Excel/Google Sheets.",
  },
];

const freeVsPremium = [
  { feature: "Operational Chaos Diagnostic (PDF)", free: true, premium: true },
  { feature: "Self-assessment checklist", free: true, premium: true },
  { feature: "Crisis Management Framework", free: false, premium: true },
  { feature: "SLA Design Toolkit", free: false, premium: true },
  { feature: "Process Optimization Canvas", free: false, premium: true },
  { feature: "KPI Dashboard Template (Excel/Sheets)", free: false, premium: true },
  { feature: "Email support & updates", free: false, premium: true },
];

const faqs = [
  {
    qEn: "What's the difference between the free and premium playbook?",
    qIt: "Qual è la differenza tra il playbook gratuito e quello premium?",
    aEn:
      "The free diagnostic is a self-assessment tool to identify operational gaps. The premium playbook is a complete execution framework with templates, canvases, and dashboards you can immediately apply.",
    aIt:
      "La diagnostica gratuita è uno strumento di auto-valutazione per identificare gap operativi. Il playbook premium è un framework di esecuzione completo con template, canvas e dashboard da applicare immediatamente.",
  },
  {
    qEn: "Who is this playbook for?",
    qIt: "A chi è rivolto questo playbook?",
    aEn:
      "Operations Managers, Delivery Leads, Heads of Operations, COOs, and anyone responsible for keeping complex systems running smoothly.",
    aIt:
      "Operations Manager, Delivery Lead, Head of Operations, COO e chiunque sia responsabile di mantenere sistemi complessi funzionanti senza intoppi.",
  },
  {
    qEn: "Is this based on real experience?",
    qIt: "È basato su esperienza reale?",
    aEn:
      "Yes. Every framework in this playbook has been battle-tested in real delivery environments — from startups to enterprise — and refined through years of hands-on operations management.",
    aIt:
      "Sì. Ogni framework in questo playbook è stato testato sul campo in ambienti di delivery reali — dalle startup all'enterprise — e perfezionato attraverso anni di operations management.",
  },
  {
    qEn: "Can I get a refund?",
    qIt: "Posso ottenere un rimborso?",
    aEn:
      "Absolutely. If the playbook doesn't deliver value within 30 days, I'll refund your purchase — no questions asked.",
    aIt:
      "Assolutamente. Se il playbook non ti porta valore entro 30 giorni, ti rimborso l'acquisto — senza fare domande.",
  },
];

export default async function PlaybookPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === "it";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-accent/8 blur-[150px]" />
        </div>
        <Section className="pt-0! pb-0! text-center relative">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-xs font-normal border-accent/20 bg-accent/10 text-accent">
              <Star className="size-3 mr-1 fill-accent" />
              {isIt ? "Edizione Premium" : "Premium Edition"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {isIt ? (
                <>
                  Operational Excellence
                  <br />
                  <span className="text-accent">Playbook</span>
                </>
              ) : (
                <>
                  Operational Excellence
                  <br />
                  <span className="text-accent">Playbook</span>
                </>
              )}
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed mb-8">
              {isIt
                ? "Trasforma il caos operativo in eccellenza misurabile. 4 moduli premium con template pronti all'uso, framework decisionali e dashboard KPI."
                : "Transform operational chaos into measurable excellence. 4 premium modules with ready-to-use templates, decision frameworks, and KPI dashboards."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <a href="#pricing">
                  {isIt ? "Acquista Ora — €19" : "Buy Now — €19"}
                  <ArrowRight className="size-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/freebie">
                  <Download className="size-4 mr-2" />
                  {isIt ? "Prova la Versione Gratuita" : "Try the Free Version"}
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground/50">
              <span className="flex items-center gap-1">
                <Check className="size-3 text-accent" />
                {isIt ? "Consegna immediata" : "Instant delivery"}
              </span>
              <span className="flex items-center gap-1">
                <Check className="size-3 text-accent" />
                {isIt ? "Garanzia 30 giorni" : "30-day guarantee"}
              </span>
              <span className="flex items-center gap-1">
                <Check className="size-3 text-accent" />
                {isIt ? "Aggiornamenti inclusi" : "Updates included"}
              </span>
            </div>
          </div>
        </Section>
      </section>

      {/* Free vs Premium comparison */}
      <Section animate className="bg-muted/30 py-16!">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 tracking-tight">
            {isIt ? "Gratuito vs Premium" : "Free vs Premium"}
          </h2>
          <div className="rounded-2xl border border-border/50 overflow-hidden">
            <div className="grid grid-cols-3 gap-0">
              <div className="p-4 font-semibold text-sm border-r border-b border-border/30 bg-muted/40">
                {isIt ? "Cosa include" : "What's included"}
              </div>
              <div className="p-4 font-semibold text-sm text-center border-b border-border/30 bg-muted/40">
                {isIt ? "Gratuito" : "Free"}
              </div>
              <div className="p-4 font-semibold text-sm text-center border-b border-border/30 bg-accent/10 text-accent">
                Premium
              </div>
              {freeVsPremium.map((item, i) => (
                <>
                  <div
                    key={i}
                    className="p-4 text-sm text-muted-foreground border-r border-b border-border/20"
                  >
                    {item.feature}
                  </div>
                  <div className="p-4 text-sm text-center border-b border-border/20 flex items-center justify-center">
                    {item.free ? (
                      <Check className="size-4 text-accent" />
                    ) : (
                      <span className="text-muted-foreground/30">&mdash;</span>
                    )}
                  </div>
                  <div className="p-4 text-sm text-center border-b border-border/20 flex items-center justify-center">
                    {item.premium ? (
                      <Check className="size-4 text-accent" />
                    ) : (
                      <span className="text-muted-foreground/30">&mdash;</span>
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* What's Inside */}
      <Section animate>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 tracking-tight">
            {isIt ? "Cosa Troverai" : "What's Inside"}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            {isIt
              ? "4 moduli operativi progettati per essere applicati immediatamente. Ogni modulo include template, checklist, e framework decisionali."
              : "4 operational modules designed to be applied immediately. Each module includes templates, checklists, and decision frameworks."}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feat, i) => (
              <Card key={i} className="border-border/50 hover:border-accent/20 transition-colors">
                <CardContent className="p-6">
                  <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <feat.icon className="size-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {isIt ? feat.titleIt : feat.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isIt ? feat.descIt : feat.descEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section animate id="pricing" className="bg-muted/30 py-16!">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 tracking-tight">
            {isIt ? "Scegli il Tuo Piano" : "Choose Your Plan"}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            {isIt
              ? "Investi nella tua eccellenza operativa. Tutti i prezzi sono una tantum, aggiornamenti inclusi."
              : "Invest in your operational excellence. All prices are one-time, updates included."}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Standard */}
            <Card className="border-border/50 relative">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-bold mb-2">
                  {isIt ? "Playbook" : "Playbook"}
                </h3>
                <div className="text-4xl font-bold text-accent mb-2">€19</div>
                <p className="text-xs text-muted-foreground/60 mb-6">
                  {isIt ? "Una tantum" : "One-time payment"}
                </p>
                <ul className="text-left space-y-3 mb-8">
                  {[
                    isIt ? "4 moduli premium in PDF" : "4 premium modules (PDF)",
                    isIt ? "Template Excel/KPI inclusi" : "Excel/KPI templates included",
                    isIt ? "Aggiornamenti gratuiti a vita" : "Free lifetime updates",
                    isIt ? "Garanzia 30 giorni" : "30-day money-back guarantee",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" asChild>
                  <a href="/contact?subject=Playbook%20Premium">
                    {isIt ? "Acquista Ora" : "Buy Now"}
                    <ArrowRight className="size-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Premium + Coaching */}
            <Card className="border-accent/40 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-black text-xs font-bold px-4 py-1">
                  {isIt ? "Più richiesto" : "Most popular"}
                </Badge>
              </div>
              <CardContent className="p-8 text-center pt-10">
                <h3 className="text-lg font-bold mb-2">
                  {isIt ? "Playbook + Coaching" : "Playbook + Coaching"}
                </h3>
                <div className="text-4xl font-bold text-accent mb-2">€49</div>
                <p className="text-xs text-muted-foreground/60 mb-6">
                  {isIt ? "Una tantum — edizione limitata" : "One-time — limited edition"}
                </p>
                <ul className="text-left space-y-3 mb-8">
                  {[
                    isIt ? "Tutto del piano Playbook" : "Everything in Playbook plan",
                    isIt ? "Sessione di coaching 1:1 (60 min)" : "1:1 coaching session (60 min)",
                    isIt ? "Review personalizzata del tuo stack operativo" : "Personalized ops stack review",
                    isIt ? "Priorità nelle risposte email" : "Priority email support",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="secondary" asChild>
                  <a href="/contact?subject=Playbook%20Premium%20%2B%20Coaching">
                    {isIt ? "Acquista Ora" : "Buy Now"}
                    <ArrowRight className="size-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-xs text-muted-foreground/40 mt-6">
            {isIt
              ? "Pagamento tramite bonifico o PayPal. Contattami per ricevere la fattura."
              : "Payment via bank transfer or PayPal. Contact me to receive the invoice."}
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section animate>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 tracking-tight">
            FAQ
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-border/30 rounded-xl overflow-hidden">
                <summary className="p-5 font-medium text-sm cursor-pointer hover:bg-accent/5 transition-colors list-none flex items-center justify-between">
                  <span>{isIt ? faq.qIt : faq.qEn}</span>
                  <span className="text-accent opacity-60 group-open:rotate-180 transition-transform text-xs">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/20 pt-4">
                  {isIt ? faq.aIt : faq.aEn}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section animate delay={100} className="pb-16!">
        <div className="max-w-2xl mx-auto text-center space-y-5 px-4">
          <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Sparkles className="size-6 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {isIt ? "Pronto a Passare al Livello Successivo?" : "Ready to Level Up?"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {isIt
              ? "Il playbook è solo l'inizio. Se vuoi portare la tua operations a un livello superiore, prenota una call."
              : "The playbook is just the beginning. If you want to take your operations to the next level, book a call."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <a href="/contact?subject=Playbook%20Premium">
                {isIt ? "Contattami Ora" : "Contact Me Now"}
                <ArrowRight className="size-4 ml-2" />
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/freebie">
                <Download className="size-4 mr-2" />
                {isIt ? "Scarica la Versione Gratuita" : "Download Free Version"}
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
