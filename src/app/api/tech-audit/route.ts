import { NextRequest, NextResponse } from "next/server";

/**
 * Tech Business Consulting API — Tech Audit MVP
 *
 * Analyzes a tech stack description, code snippet, or package manifest
 * and returns architecture assessment, risks, and recommendations.
 * No external API needed — runs local analysis rules.
 */

interface AuditRequest {
  stack_description?: string;
  package_json?: string;
  code_snippet?: string;
  requirements?: string;
}

interface Finding {
  category: "architecture" | "security" | "performance" | "maintainability" | "cost" | "best_practice";
  severity: "critical" | "high" | "medium" | "low" | "info";
  title: string;
  description: string;
  recommendation: string;
}

interface AuditResponse {
  status: "success";
  trace_id: string;
  stack_summary: {
    primary_language?: string;
    framework?: string;
    estimated_complexity: "low" | "medium" | "high";
    estimated_team_size: string;
    maturity_score: number; // 0-100
  };
  findings: Finding[];
  recommendations: {
    priority: "immediate" | "short_term" | "long_term";
    action: string;
    impact: string;
    effort: "low" | "medium" | "high";
  }[];
  score_breakdown: {
    architecture: number;
    security: number;
    performance: number;
    maintainability: number;
    overall: number;
  };
}

function generateId(): string {
  return `audit_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

function analyzeStack(description?: string, pkg?: string, code?: string, req?: string): AuditResponse {
  const findings: Finding[] = [];
  const textToAnalyze = [description, pkg, code, req].filter(Boolean).join(" ").toLowerCase();

  // Architecture analysis
  if (textToAnalyze.includes("monolith") || textToAnalyze.includes("spaghetti")) {
    findings.push({
      category: "architecture",
      severity: "high",
      title: "Monolithic Architecture Detected",
      description: "The codebase shows signs of tightly coupled components. This limits scalability and makes independent deployments difficult.",
      recommendation: "Consider strangler fig pattern to gradually extract bounded contexts into independent services.",
    });
  } else if (textToAnalyze.includes("microservice") || textToAnalyze.includes("serverless")) {
    findings.push({
      category: "architecture",
      severity: "info",
      title: "Distributed Architecture",
      description: "The system uses a distributed architecture, which provides scalability benefits but adds complexity in observability and data consistency.",
      recommendation: "Ensure you have distributed tracing (OpenTelemetry), circuit breakers, and eventual consistency patterns in place.",
    });
  }

  // Check for common tech stack
  if (textToAnalyze.includes("next.js") || textToAnalyze.includes("nextjs")) {
    findings.push({
      category: "best_practice",
      severity: "medium",
      title: "Next.js Version Check Recommended",
      description: "Next.js projects benefit from keeping up with major versions for performance and security improvements.",
      recommendation: "Verify you're on Next.js 16+ for Turbopack, React 19 support, and latest security patches.",
    });
  }

  // Check for TypeScript
  if (!textToAnalyze.includes("typescript") && !textToAnalyze.includes(".ts")) {
    findings.push({
      category: "best_practice",
      severity: "medium",
      title: "TypeScript Not Detected",
      description: "The stack appears to use plain JavaScript. TypeScript reduces production bugs by 15-30% according to industry studies.",
      recommendation: "Gradually migrate to TypeScript starting with core business logic and API layers.",
    });
  }

  // Security checks
  if (textToAnalyze.includes("password") || textToAnalyze.includes("secret") || textToAnalyze.includes("api_key")) {
    findings.push({
      category: "security",
      severity: "critical",
      title: "Hardcoded Secrets Detected",
      description: "Sensitive credentials appear in the codebase. This is a critical security risk.",
      recommendation: "Move all secrets to environment variables or a vault solution (HashiCorp Vault, AWS Secrets Manager).",
    });
  }

  if (!textToAnalyze.includes("auth") && !textToAnalyze.includes("jwt") && !textToAnalyze.includes("session")) {
    findings.push({
      category: "security",
      severity: "high",
      title: "Authentication Not Detected",
      description: "No authentication mechanism was identified in the stack description.",
      recommendation: "Implement authentication (Better Auth, Auth.js, Clerk) before exposing any endpoints to production users.",
    });
  }

  // Performance
  if (textToAnalyze.includes("database") || textToAnalyze.includes("sql") || textToAnalyze.includes("postgres")) {
    findings.push({
      category: "performance",
      severity: "low",
      title: "Database Query Optimization Opportunity",
      description: "Database-backed applications benefit from query analysis and index optimization.",
      recommendation: "Run EXPLAIN ANALYZE on slow queries. Consider adding connection pooling (PgBouncer) and read replicas for high-traffic scenarios.",
    });
  }

  // Maintainability
  if (!textToAnalyze.includes("test") && !textToAnalyze.includes("jest") && !textToAnalyze.includes("vitest") && !textToAnalyze.includes("pytest")) {
    findings.push({
      category: "maintainability",
      severity: "high",
      title: "No Test Framework Detected",
      description: "The stack appears to lack automated testing, which increases regression risk and slows development velocity.",
      recommendation: "Start with critical path integration tests. Aim for coverage of core business logic (not arbitrary line coverage targets).",
    });
  }

  // CI/CD
  if (!textToAnalyze.includes("ci") && !textToAnalyze.includes("github actions") && !textToAnalyze.includes("gitlab")) {
    findings.push({
      category: "best_practice",
      severity: "low",
      title: "CI/CD Pipeline Not Detected",
      description: "No continuous integration/deployment system was identified.",
      recommendation: "Set up GitHub Actions or equivalent for automated testing and deployment. Start simple: lint → test → build → deploy.",
    });
  }

  // If no findings, add generic assessment
  if (findings.length === 0) {
    findings.push({
      category: "architecture",
      severity: "info",
      title: "Stack Assessment Complete",
      description: "The provided stack doesn't match common risk patterns. A deeper review would require more context.",
      recommendation: "Schedule a 1-hour architecture review call for a comprehensive assessment.",
    });
  }

  // Calculate scores
  const categoryScores: Record<string, number[]> = {
    architecture: [],
    security: [],
    performance: [],
    maintainability: [],
  };

  for (const f of findings) {
    if (categoryScores[f.category]) {
      const severityScore = { critical: 20, high: 40, medium: 60, low: 80, info: 95 }[f.severity];
      categoryScores[f.category].push(severityScore);
    }
  }

  const scoreBreakdown = {
    architecture: categoryScores.architecture.length > 0
      ? Math.round(categoryScores.architecture.reduce((a, b) => a + b, 0) / categoryScores.architecture.length)
      : 85,
    security: categoryScores.security.length > 0
      ? Math.round(categoryScores.security.reduce((a, b) => a + b, 0) / categoryScores.security.length)
      : 85,
    performance: categoryScores.performance.length > 0
      ? Math.round(categoryScores.performance.reduce((a, b) => a + b, 0) / categoryScores.performance.length)
      : 85,
    maintainability: categoryScores.maintainability.length > 0
      ? Math.round(categoryScores.maintainability.reduce((a, b) => a + b, 0) / categoryScores.maintainability.length)
      : 85,
    overall: 0,
  };
  scoreBreakdown.overall = Math.round(
    (scoreBreakdown.architecture + scoreBreakdown.security + scoreBreakdown.performance + scoreBreakdown.maintainability) / 4
  );

  // Generate prioritized recommendations
  const recommendations = findings
    .filter((f) => f.severity !== "info")
    .map((f) => ({
      priority: (f.severity === "critical" || f.severity === "high" ? "immediate" : f.severity === "medium" ? "short_term" : "long_term") as "immediate" | "short_term" | "long_term",
      action: f.recommendation,
      impact: `${f.category} — ${f.severity} severity`,
      effort: (f.severity === "critical" ? "high" : f.severity === "high" ? "medium" : "low") as "low" | "medium" | "high",
    }));

  return {
    status: "success",
    trace_id: generateId(),
    stack_summary: {
      primary_language: textToAnalyze.includes("python") ? "Python" : textToAnalyze.includes("typescript") ? "TypeScript" : textToAnalyze.includes("javascript") ? "JavaScript" : undefined,
      framework: textToAnalyze.includes("next.js") ? "Next.js" : textToAnalyze.includes("react") ? "React" : textToAnalyze.includes("fastapi") ? "FastAPI" : undefined,
      estimated_complexity: findings.length > 5 ? "high" : findings.length > 2 ? "medium" : "low",
      estimated_team_size: findings.filter((f) => f.severity === "critical").length > 0 ? "3-5 engineers recommended" : "1-2 engineers",
      maturity_score: scoreBreakdown.overall,
    },
    findings,
    recommendations,
    score_breakdown: scoreBreakdown,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AuditRequest;

    if (!body.stack_description && !body.package_json && !body.code_snippet && !body.requirements) {
      return NextResponse.json(
        { error: "Provide at least one: stack_description, package_json, code_snippet, or requirements" },
        { status: 400 }
      );
    }

    const result = analyzeStack(body.stack_description, body.package_json, body.code_snippet, body.requirements);
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
    service: "Tech Audit API",
    version: "1.0.0",
    description: "Analyze tech stacks for architecture, security, performance, and maintainability issues",
    docs: "POST /api/tech-audit with { stack_description?, package_json?, code_snippet?, requirements? }",
  });
}
