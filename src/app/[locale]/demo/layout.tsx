import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://riccardobozzato.dev";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Interactive Demos — Riccardo Bozzato Consulting",
    description:
      "Explore interactive AI tools and demos: AI Agent Playground, Serverless Cost Calculator, Automation Workflow Designer, System Integration Mapper, Tech Audit Analyzer, and Turnkey Project Planner. (Client area — login required.)",
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/demo`,
    },
  };
}

export default async function DemoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === "it";

  return (
    <>
      {/* Server-rendered hidden content for crawlers and no-JS users */}
      <div className="sr-only">
        <h1>{isIt ? "Demo Interattive" : "Interactive Demos"}</h1>

        <section>
          <h2>{isIt ? "AI Agent Playground" : "AI Agent Playground"}</h2>
          <p>
            {isIt
              ? "Prova un agente AI che può cercare sul web, analizzare file, eseguire codice e sintetizzare risultati. Task suggerite: cerca trend serverless, analizza package.json per vulnerabilità, genera script Python per automazione CSV."
              : "Test an AI agent that can search the web, analyze files, execute code, and synthesize results. Suggested tasks: search for serverless trends, analyze package.json for vulnerabilities, generate Python scripts for CSV automation."}
          </p>
        </section>

        <section>
          <h2>{isIt ? "Calcolatore Costi Serverless" : "Serverless Cost Calculator"}</h2>
          <p>
            {isIt
              ? "Confronta i costi di AWS Lambda, Cloudflare Workers, Google Cloud Functions e Azure Functions. Calcola il risparmio stimato in base a richieste/mese, durata esecuzione e memoria allocata."
              : "Compare costs across AWS Lambda, Cloudflare Workers, Google Cloud Functions, and Azure Functions. Estimate savings based on requests/month, execution duration, and allocated memory."}
          </p>
        </section>

        <section>
          <h2>{isIt ? "Designer Workflow Automazione" : "Automation Workflow Designer"}</h2>
          <p>
            {isIt
              ? "Costruisci e testa pipeline di automazione multi-step con azioni come webhook, trasformazione dati, notifiche email, scrittura database e chiamate API esterne."
              : "Build and test multi-step automation pipelines with actions like webhook, data transformation, email notifications, database writes, and external API calls."}
          </p>
        </section>

        <section>
          <h2>{isIt ? "Mappatore Integrazione Sistemi" : "System Integration Mapper"}</h2>
          <p>
            {isIt
              ? "Simula la trasformazione di payload tra sistemi diversi (ERP ↔ CRM, eCommerce ↔ PIM). Definisci regole di mapping, trasforma dati e visualizza il log di esecuzione."
              : "Simulate payload transformation between different systems (ERP ↔ CRM, eCommerce ↔ PIM). Define mapping rules, transform data, and review the execution log."}
          </p>
        </section>

        <section>
          <h2>{isIt ? "Analisi Tech Audit" : "Tech Audit Analyzer"}</h2>
          <p>
            {isIt
              ? "Analizza uno stack tecnologico (linguaggio, framework, database, provider cloud, strumenti CI/CD) e ricevi un report con criticità, vulnerabilità e raccomandazioni."
              : "Analyze a technology stack (language, framework, database, cloud provider, CI/CD tools) and receive a report with issues, vulnerabilities, and recommendations."}
          </p>
        </section>

        <section>
          <h2>{isIt ? "Pianificatore Progetti Chiavi in Mano" : "Turnkey Project Planner"}</h2>
          <p>
            {isIt
              ? "Descrivi il tuo progetto e ricevi un piano dettagliato con fasi, durata, deliverable e stima dei costi. Include architettura consigliata e tempistiche."
              : "Describe your project and receive a detailed plan with phases, duration, deliverables, and cost estimates. Includes recommended architecture and timeline."}
          </p>
        </section>

        <p>
          {isIt
            ? "Le demo richiedono l'autenticazione. Contatta Riccardo per ottenere le credenziali di accesso."
            : "Demos require authentication. Contact Riccardo to get access credentials."}
        </p>
      </div>
      {children}
    </>
  );
}
