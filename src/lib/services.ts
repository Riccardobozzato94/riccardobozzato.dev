// Typed service catalog for Riccardo Bozzato's personal brand consulting.
// Single source of truth for service data — the [locale]/services page and any
// future components should consume this instead of hardcoding copy.
//
// Three consulting pillars (see BRAND-PERSONAL.md):
//   1. Dev Tools Consulting   — build, audit, ship developer-facing products
//   2. AI Integration         — embed AI/agents into real workflows, safely
//   3. Security & DevSecOps   — secure-by-default ops for solo devs & small teams
// Plus an umbrella "Fractional CTO / Ops" engagement model.

export type PriceModel =
  | "fixed"
  | "hourly"
  | "retainer"
  | "custom";

export type ServicePillar =
  | "dev-tools"
  | "ai-integration"
  | "devsecops"
  | "fractional-cto";

export interface Service {
  /** Stable slug for routing / anchor links. */
  slug: string;
  /** Short display name. */
  name: string;
  /** One-line positioning. */
  tagline: string;
  /** Longer description (1-2 sentences). */
  description: string;
  /** Concrete deliverables the client receives. */
  deliverables: string[];
  /** How the engagement is priced. */
  priceModel: PriceModel;
  /** Starting price label, e.g. "From €1,500" or "€200/hr". */
  startingFrom: string;
  /** Consulting pillar this service belongs to. */
  pillar: ServicePillar;
}

export const SERVICE_PILLARS: { key: ServicePillar; label: string; summary: string }[] = [
  {
    key: "dev-tools",
    label: "Dev Tools Consulting",
    summary:
      "Architect and ship developer-facing products and internal tools — from boilerplates to production SaaS foundations.",
  },
  {
    key: "ai-integration",
    label: "AI Integration",
    summary:
      "Embed AI and agentic workflows into real business processes without the hype — measurable, human-in-the-loop where it counts.",
  },
  {
    key: "devsecops",
    label: "Security & DevSecOps for Solo Devs",
    summary:
      "Secure-by-default infrastructure and delivery practices for independents and small teams who can't afford a security hire.",
  },
  {
    key: "fractional-cto",
    label: "Fractional CTO / Ops",
    summary:
      "Senior technical leadership on demand — architecture reviews, roadmap, vendor decisions, and delivery oversight.",
  },
];

export const SERVICES: Service[] = [
  // --- Pillar 1: Dev Tools Consulting ---
  {
    slug: "dev-tools-audit",
    name: "Dev Tools Architecture Audit",
    tagline: "Find the friction before your users do.",
    description:
      "A focused review of your developer tooling, boilerplate, or internal platform — architecture, DX, and cost hotspots mapped with a prioritized fix list.",
    deliverables: [
      "Architecture & DX review",
      "Cost and performance hotspot map",
      "Prioritized remediation backlog",
      "60-min handover walkthrough",
    ],
    priceModel: "fixed",
    startingFrom: "From €1,500",
    pillar: "dev-tools",
  },
  {
    slug: "saas-foundation",
    name: "Production SaaS Foundation",
    tagline: "Ship the boring 80% in days, not months.",
    description:
      "Turnkey foundation for new SaaS products — auth, email, i18n, billing, and CI/CD wired up on a serverless, lowest-cost stack (based on the ShipKit blueprint).",
    deliverables: [
      "Auth, email, i18n, billing scaffolding",
      "Serverless infra + CI/CD",
      "Deployment & docs handover",
      "2 weeks of post-launch support",
    ],
    priceModel: "fixed",
    startingFrom: "From €4,000",
    pillar: "dev-tools",
  },

  // --- Pillar 2: AI Integration ---
  {
    slug: "ai-workflow-build",
    name: "AI Workflow Build",
    tagline: "Agents that do real work, not demos.",
    description:
      "Custom AI agents and orchestration for your actual workflows — support automation, data pipelines, content ops — with human-in-the-loop guardrails and monitoring.",
    deliverables: [
      "Agent architecture design",
      "Integration with your existing tools",
      "Human-in-the-loop safety controls",
      "Performance monitoring & handover",
    ],
    priceModel: "fixed",
    startingFrom: "From €2,500",
    pillar: "ai-integration",
  },
  {
    slug: "ai-readiness",
    name: "AI Readiness Assessment",
    tagline: "Know what AI is worth building before you build it.",
    description:
      "Pragmatic evaluation of where AI actually pays off in your stack — opportunity mapping, risk review, and a phased adoption roadmap with ROI estimates.",
    deliverables: [
      "Opportunity & risk map",
      "Vendor/model evaluation",
      "Phased adoption roadmap",
      "ROI estimate model",
    ],
    priceModel: "fixed",
    startingFrom: "From €1,800",
    pillar: "ai-integration",
  },

  // --- Pillar 3: Security & DevSecOps ---
  {
    slug: "devsecops-hardening",
    name: "DevSecOps Hardening",
    tagline: "Security that fits a team of one.",
    description:
      "Secure-by-default setup for solo devs and small teams — CSP, secrets management, dependency & supply-chain hygiene, and a lightweight CI security gate.",
    deliverables: [
      "Security header & CSP review",
      "Secrets & env management setup",
      "Dependency / supply-chain scan",
      "CI security gate + runbook",
    ],
    priceModel: "fixed",
    startingFrom: "From €2,000",
    pillar: "devsecops",
  },
  {
    slug: "security-audit",
    name: "Solo Dev Security Audit",
    tagline: "A pentest-shaped review you can actually act on.",
    description:
      "Practical security review of your app and infra (threat model + VulnClaw-assisted scan) with a plain-language remediation plan tuned for small teams.",
    deliverables: [
      "Threat model",
      "Automated + manual findings",
      "Prioritized remediation plan",
      "Re-test after fixes",
    ],
    priceModel: "fixed",
    startingFrom: "From €2,500",
    pillar: "devsecops",
  },

  // --- Pillar 4: Fractional CTO / Ops ---
  {
    slug: "fractional-cto",
    name: "Fractional CTO / Ops",
    tagline: "Senior judgment, part-time commitment.",
    description:
      "On-demand technical leadership — architecture reviews, technology and vendor selection, team process design, and delivery oversight via a monthly retainer.",
    deliverables: [
      "Monthly architecture & code reviews",
      "Technology & vendor decisions",
      "Team process & roadmap design",
      "Quarterly strategy check-ins",
    ],
    priceModel: "retainer",
    startingFrom: "From €2,000/mo",
    pillar: "fractional-cto",
  },
  {
    slug: "advisory-hourly",
    name: "Tech Business Consulting",
    tagline: "Advice from someone who has shipped it.",
    description:
      "Hourly strategic advisory — architecture reviews, stack evaluation, vendor negotiation support, and execution roadmaps for founders and small teams.",
    deliverables: [
      "Architecture & code review",
      "Stack / vendor evaluation",
      "Negotiation support",
      "Execution roadmap",
    ],
    priceModel: "hourly",
    startingFrom: "€200–€300 / hr",
    pillar: "fractional-cto",
  },
];

export function getServicesByPillar(pillar: ServicePillar): Service[] {
  return SERVICES.filter((s) => s.pillar === pillar);
}
