"use client";

import { useState } from "react";
import { useAuth } from "@/lib/use-auth";
import {
  Shield,
  Search,
  Loader2,
  AlertCircle,
  LogIn,
  CheckCircle2,
  AlertTriangle,
  Info,
  TrendingUp,
} from "lucide-react";

interface Finding {
  category: string;
  severity: string;
  title: string;
  description: string;
  recommendation: string;
}

interface AuditResult {
  status: string;
  trace_id: string;
  stack_summary: {
    primary_language?: string;
    framework?: string;
    estimated_complexity: string;
    maturity_score: number;
  };
  findings: Finding[];
  recommendations: { priority: string; action: string; impact: string; effort: string }[];
  score_breakdown: {
    architecture: number;
    security: number;
    performance: number;
    maintainability: number;
    overall: number;
  };
}

const SEVERITY_ICONS = {
  critical: AlertTriangle,
  high: AlertTriangle,
  medium: Info,
  low: Info,
  info: CheckCircle2,
};

const SEVERITY_COLORS = {
  critical: "border-red-500/20 bg-red-500/5 text-red-400",
  high: "border-orange-500/20 bg-orange-500/5 text-orange-400",
  medium: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400",
  low: "border-blue-500/20 bg-blue-500/5 text-blue-400",
  info: "border-accent/20 bg-accent/5 text-accent",
};

const EXAMPLE_STACKS = [
  "Next.js with TypeScript, PostgreSQL, no tests, hardcoded API keys",
  "FastAPI + PostgreSQL + React + Docker + CI/CD",
  "Monolith PHP with MySQL, 100K+ users, no monitoring",
  "Microservices on Kubernetes + Python + JWT auth",
];

export default function TechAuditDemo() {
  const { isAuthenticated, isLoading: authLoading, getFetchInit } = useAuth();
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!description.trim()) return;

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/tech-audit", getFetchInit({
        method: "POST",
        body: JSON.stringify({ stack_description: description.trim() }),
      }));

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <Shield className="size-12 mx-auto text-accent" />
          <h1 className="text-2xl font-bold">Tech Audit</h1>
          <p className="text-muted-foreground">Sign in to analyze your tech stack.</p>
          <a
            href="/login?redirect=/demo/tech-audit"
            className="inline-flex items-center gap-2 h-11 rounded-xl bg-accent text-accent-foreground px-6 text-sm font-medium hover:bg-accent/90 transition-all"
          >
            <LogIn className="size-4" />
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
            <Shield className="size-3.5" />
            Tech Business Consulting
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Tech Stack Auditor
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Describe your tech stack and get an instant audit with actionable findings.
          </p>
        </div>

        {/* Examples */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {EXAMPLE_STACKS.map((s) => (
            <button
              key={s}
              onClick={() => setDescription(s)}
              className="text-xs rounded-full border border-border/50 px-3 py-1.5 hover:border-accent/30 hover:bg-accent/5 transition-colors text-muted-foreground hover:text-accent"
            >
              {s.substring(0, 35)}...
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="space-y-3 mb-8">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your tech stack — languages, frameworks, databases, CI/CD, testing, security practices..."
            rows={4}
            className="w-full rounded-xl border border-border/50 bg-card p-4 text-sm resize-none
              focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
              placeholder:text-muted-foreground/40 transition-all"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !description.trim()}
            className="w-full h-11 rounded-xl bg-accent text-accent-foreground font-medium text-sm
              hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Search className="size-4" />
                Run Audit
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 p-4 mb-8 text-sm text-red-400">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Score */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Maturity Score</h2>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="size-4 text-accent" />
                  <span className="text-2xl font-bold text-accent">{result.score_breakdown.overall}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(result.score_breakdown).filter(([k]) => k !== "overall").map(([key, val]) => (
                  <div key={key} className="text-center">
                    <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">{key}</div>
                    <div className={`text-lg font-bold ${val >= 70 ? "text-accent" : val >= 50 ? "text-amber-400" : "text-red-400"}`}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack summary */}
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {result.stack_summary.primary_language && (
                <span className="bg-muted/50 px-2 py-1 rounded">Lang: {result.stack_summary.primary_language}</span>
              )}
              {result.stack_summary.framework && (
                <span className="bg-muted/50 px-2 py-1 rounded">Framework: {result.stack_summary.framework}</span>
              )}
              <span className="bg-muted/50 px-2 py-1 rounded">Complexity: {result.stack_summary.estimated_complexity}</span>
              <code className="text-[10px] font-mono bg-muted px-1.5 py-1 rounded">{result.trace_id}</code>
            </div>

            {/* Findings */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold">Findings ({result.findings.length})</h2>
              {result.findings.map((finding, i) => {
                const SeverityIcon = SEVERITY_ICONS[finding.severity as keyof typeof SEVERITY_ICONS] || Info;
                const colorClass = SEVERITY_COLORS[finding.severity as keyof typeof SEVERITY_COLORS] || SEVERITY_COLORS.info;
                return (
                  <div key={i} className={`rounded-xl border p-4 ${colorClass}`}>
                    <div className="flex items-start gap-2.5">
                      <SeverityIcon className="size-4 shrink-0 mt-0.5" />
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{finding.title}</span>
                          <span className="text-[10px] uppercase px-1.5 py-0.5 rounded-full bg-background/50">
                            {finding.category}
                          </span>
                        </div>
                        <p className="text-sm opacity-80">{finding.description}</p>
                        <p className="text-xs opacity-70 mt-1">
                          <strong>Recommendation:</strong> {finding.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
