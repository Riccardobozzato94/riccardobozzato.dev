import { NextRequest, NextResponse } from "next/server";

/**
 * Turnkey Solution API — Turnkey Solution MVP
 *
 * Accepts project requirements and returns a structured delivery plan
 * with phases, timelines, deliverables, and pricing estimates.
 */

interface TurnkeyRequest {
  project_name: string;
  description: string;
  requirements: string[];
  timeline?: "urgent" | "normal" | "relaxed";
  budget_range?: string;
  tech_preferences?: string[];
}

interface Phase {
  phase: string;
  duration: string;
  deliverables: string[];
  cost_estimate: string;
}

interface TurnkeyResponse {
  status: "success" | "needs_clarification";
  trace_id: string;
  project_name: string;
  summary: string;
  architecture_approach: string;
  phases: Phase[];
  total_estimated_duration: string;
  total_cost_estimate: string;
  risk_factors: { risk: string; mitigation: string }[];
  next_steps: string[];
}

function generateId(): string {
  return `tk_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

function generatePlan(req: TurnkeyRequest): TurnkeyResponse {
  const isUrgent = req.timeline === "urgent";
  const isRelaxed = req.timeline === "relaxed";

  // Analyze requirements to determine complexity
  const reqCount = req.requirements.length;
  const hasAuth = req.requirements.some((r) => r.toLowerCase().includes("auth") || r.toLowerCase().includes("login"));
  const hasPayment = req.requirements.some((r) => r.toLowerCase().includes("payment") || r.toLowerCase().includes("stripe"));
  const hasAI = req.requirements.some((r) => r.toLowerCase().includes("ai") || r.toLowerCase().includes("agent") || r.toLowerCase().includes("llm"));
  const hasAPI = req.requirements.some((r) => r.toLowerCase().includes("api") || r.toLowerCase().includes("integration"));
  const hasDB = req.requirements.some((r) => r.toLowerCase().includes("database") || r.toLowerCase().includes("storage"));

  const complexityFactors = [hasAuth, hasPayment, hasAI, hasAPI, hasDB].filter(Boolean).length + Math.floor(reqCount / 3);
  const complexity = complexityFactors > 4 ? "high" : complexityFactors > 2 ? "medium" : "low";

  // Generate phases
  const phases: Phase[] = [];

  phases.push({
    phase: "1. Discovery & Requirements",
    duration: isUrgent ? "3 days" : isRelaxed ? "2 weeks" : "1 week",
    deliverables: [
      "Requirements specification document",
      "System architecture diagram",
      "Technology stack recommendation",
      "Fixed-price proposal",
    ],
    cost_estimate: "Included in total — no upfront cost",
  });

  phases.push({
    phase: "2. Architecture & Design",
    duration: isUrgent ? "4 days" : isRelaxed ? "2 weeks" : "1 week",
    deliverables: [
      "Detailed technical specification",
      "Database schema design",
      "API contract definitions",
      "UI/UX wireframes or mockups",
      ...(hasAuth ? ["Authentication flow design"] : []),
    ],
    cost_estimate: complexity === "high" ? "€800 – €1,500" : complexity === "medium" ? "€500 – €800" : "€300 – €500",
  });

  phases.push({
    phase: "3. Core Implementation",
    duration: isUrgent ? "2 weeks" : isRelaxed ? "6 weeks" : "3-4 weeks",
    deliverables: [
      "Project repository with CI/CD",
      "Core backend implementation",
      "Database setup and migrations",
      ...(hasAuth ? ["Authentication system (magic link, OAuth, 2FA)"] : []),
      ...(hasPayment ? ["Payment processing integration (Stripe)"] : []),
      ...(hasAI ? ["AI agent integration / LLM pipeline"] : []),
      ...(hasAPI ? ["REST/GraphQL API endpoints"] : []),
      "Frontend implementation (if applicable)",
    ],
    cost_estimate: complexity === "high" ? "€4,000 – €8,000" : complexity === "medium" ? "€2,500 – €4,000" : "€1,500 – €2,500",
  });

  phases.push({
    phase: "4. Testing & QA",
    duration: isUrgent ? "3 days" : isRelaxed ? "1.5 weeks" : "1 week",
    deliverables: [
      "Integration test suite",
      "Security audit report",
      "Performance benchmarks",
      "Bug fix documentation",
    ],
    cost_estimate: "Included in implementation phase",
  });

  phases.push({
    phase: "5. Deployment & Handover",
    duration: isUrgent ? "2 days" : isRelaxed ? "1 week" : "3-4 days",
    deliverables: [
      "Production deployment",
      "Monitoring & alerting setup",
      "Technical documentation",
      "Admin / user manual",
      "Handover training session (1-2 hours)",
    ],
    cost_estimate: complexity === "high" ? "€500 – €1,000" : "€300 – €500",
  });

  // Total duration
  const totalDays = isUrgent ? 17 : isRelaxed ? 50 : 30;
  const totalWeeks = Math.ceil(totalDays / 7);

  // Total cost
  const baseCost =
    complexity === "high" ? 6000 : complexity === "medium" ? 3500 : 2000;
  const costRange = {
    low: baseCost,
    high: baseCost * 1.5,
  };

  // Risk factors
  const riskFactors: { risk: string; mitigation: string }[] = [];

  if (isUrgent) {
    riskFactors.push({
      risk: "Accelerated timeline may require scope trade-offs",
      mitigation: "We'll define MVP scope vs. future iterations. Critical path first.",
    });
  }

  if (reqCount > 8) {
    riskFactors.push({
      risk: `High number of requirements (${reqCount}) increases complexity`,
      mitigation: "Prioritize requirements into must-have vs. nice-to-have phases.",
    });
  }

  if (hasAI) {
    riskFactors.push({
      risk: "AI/LLM integration introduces variable quality and latency",
      mitigation: "Implement fallback chains, timeout handling, and human-in-the-loop for critical paths.",
    });
  }

  if (!hasDB) {
    riskFactors.push({
      risk: "No database/storage specified — data persistence strategy needed",
      mitigation: "We'll recommend the appropriate storage solution during discovery.",
    });
  }

  riskFactors.push({
    risk: "Third-party API dependencies may change during development",
    mitigation: "Abstract external integrations behind interfaces with mock implementations for testing.",
  });

  return {
    status: "success",
    trace_id: generateId(),
    project_name: req.project_name,
    summary: `Turnkey solution for "${req.project_name}": ${complexity} complexity, ${totalWeeks} weeks estimated delivery. ${reqCount} requirements analyzed.${hasAuth ? " Auth included." : ""}${hasPayment ? " Payments included." : ""}${hasAI ? " AI/LLM integration included." : ""}`,
    architecture_approach: `We'll build this as a ${hasAPI ? "API-first" : "monolith-first"} architecture using ${req.tech_preferences?.join(", ") || "Next.js (fullstack) or FastAPI (backend)"}. ${hasDB ? "PostgreSQL for persistence." : ""} ${hasAuth ? "Better Auth for authentication." : ""} Serverless deployment on ${process.env.VERCEL ? "Vercel" : "Netlify or Cloudflare"} for zero-maintenance infrastructure.`,
    phases,
    total_estimated_duration: `${totalWeeks} weeks (${isUrgent ? "expedited" : isRelaxed ? "relaxed" : "standard"} timeline)`,
    total_cost_estimate: `€${costRange.low.toLocaleString()} – €${costRange.high.toLocaleString()} (fixed price)`,
    risk_factors: riskFactors,
    next_steps: [
      "Schedule a free 30-minute discovery call to refine requirements",
      "Receive detailed architecture document and fixed-price proposal",
      "Review and approve — development starts within 48 hours",
      "Weekly progress updates with live demo at each milestone",
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TurnkeyRequest;

    if (!body.project_name || !body.description || !body.requirements?.length) {
      return NextResponse.json(
        { error: "Missing required fields: project_name, description, requirements[]" },
        { status: 400 }
      );
    }

    // Generate the plan — always succeeds if we have basic info
    const result = generatePlan(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "Turnkey Solution API",
    version: "1.0.0",
    description: "Generate structured delivery plans for full-stack projects",
    docs: "POST /api/turnkey with { project_name, description, requirements[], timeline?, budget_range?, tech_preferences? }",
  });
}
