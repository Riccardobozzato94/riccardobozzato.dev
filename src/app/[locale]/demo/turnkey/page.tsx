"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/lib/use-auth";
import {
  Package,
  Loader2,
  AlertCircle,
  LogIn,
  Calendar,
  Euro,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface Phase {
  phase: string;
  duration: string;
  deliverables: string[];
  cost_estimate: string;
}

interface TurnkeyResult {
  status: string;
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

const EXAMPLE_PROJECTS = [
  "E-commerce Platform with AI recommendations",
  "Internal SaaS for inventory management",
  "Customer portal with payment integration",
  "Automated reporting and analytics dashboard",
];

export default function TurnkeyDemo() {
  const { isAuthenticated, isLoading: authLoading, getFetchInit } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [requirementsText, setRequirementsText] = useState("");
  const [timeline, setTimeline] = useState("normal");
  const [result, setResult] = useState<TurnkeyResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !requirementsText.trim()) return;

    setError("");
    setLoading(true);
    setResult(null);

    const requirements = requirementsText
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    try {
      const res = await fetch("/api/turnkey", getFetchInit({
        method: "POST",
        body: JSON.stringify({
          project_name: name.trim(),
          description: description.trim(),
          requirements,
          timeline: timeline || undefined,
        }),
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
          <Package className="size-12 mx-auto text-accent" />
          <h1 className="text-2xl font-bold">Turnkey Solution</h1>
          <p className="text-muted-foreground">Sign in to generate delivery plans.</p>
          <a
            href="/login?redirect=/demo/turnkey"
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
            <Package className="size-3.5" />
            Turnkey Solution
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Project Planner
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Define your project requirements and get a structured delivery plan
            with timeline, phases, and cost estimates.
          </p>
        </div>

        {/* Examples */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {EXAMPLE_PROJECTS.map((p) => (
            <button
              key={p}
              onClick={() => setName(p)}
              className="text-xs rounded-full border border-border/50 px-3 py-1.5 hover:border-accent/30 hover:bg-accent/5 transition-colors text-muted-foreground hover:text-accent"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-xl border border-border/50 bg-card p-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Project Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., E-commerce Platform"
                  required
                  className="w-full h-10 rounded-lg border border-border/50 bg-background px-3 text-sm
                    focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>

              <div className="rounded-xl border border-border/50 bg-card p-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you're building..."
                  rows={3}
                  required
                  className="w-full rounded-lg border border-border/50 bg-background p-3 text-sm resize-none
                    focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>

              <div className="rounded-xl border border-border/50 bg-card p-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Requirements (one per line)
                </label>
                <textarea
                  value={requirementsText}
                  onChange={(e) => setRequirementsText(e.target.value)}
                  placeholder={`user authentication\npayment processing\nadmin dashboard\nemail notifications`}
                  rows={5}
                  required
                  className="w-full rounded-lg border border-border/50 bg-background p-3 text-sm resize-none
                    focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>

              <div className="rounded-xl border border-border/50 bg-card p-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Timeline Preference
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full h-10 rounded-lg border border-border/50 bg-background px-3 text-sm
                    focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="relaxed">Relaxed — quality first</option>
                  <option value="normal">Normal — balanced</option>
                  <option value="urgent">Urgent — ship fast</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-accent text-accent-foreground font-medium text-sm
                  hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <Package className="size-4" />
                    Generate Plan
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="md:col-span-3 space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {result && (
              <>
                {/* Summary */}
                <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 space-y-2">
                  <h2 className="font-bold text-lg">{result.project_name}</h2>
                  <p className="text-sm text-muted-foreground">{result.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                    <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {result.total_estimated_duration}</span>
                    <span className="flex items-center gap-1"><Euro className="size-3.5" /> {result.total_cost_estimate}</span>
                  </div>
                </div>

                {/* Architecture */}
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Architecture Approach</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.architecture_approach}</p>
                </div>

                {/* Phases */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Delivery Phases</h3>
                  {result.phases.map((phase, i) => (
                    <div key={i} className="rounded-xl border border-border/50 bg-card p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-semibold">{phase.phase}</h4>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">{phase.duration}</span>
                      </div>
                      <ul className="space-y-1 mb-2">
                        {phase.deliverables.map((d, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="size-3 text-accent shrink-0 mt-0.5" />
                            {d}
                          </li>
                        ))}
                      </ul>
                      {phase.cost_estimate && !phase.cost_estimate.includes("Included") && (
                        <div className="text-xs text-accent font-medium">{phase.cost_estimate}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Risks */}
                {result.risk_factors.length > 0 && (
                  <div className="rounded-xl border border-border/50 bg-card p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Shield className="size-3" /> Risk Factors
                    </h3>
                    <div className="space-y-2">
                      {result.risk_factors.map((rf, i) => (
                        <div key={i} className="text-xs">
                          <span className="text-red-400 font-medium">⚠ {rf.risk}</span>
                          <p className="text-muted-foreground mt-0.5 ml-4">{rf.mitigation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Next Steps
                  </h3>
                  <div className="space-y-2">
                    {result.next_steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <ArrowRight className="size-3 text-accent shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!result && !error && (
              <div className="rounded-xl border border-border/50 bg-card p-8 text-center text-sm text-muted-foreground">
                <Package className="size-8 mx-auto mb-3 text-muted-foreground/30" />
                Fill in the form and click "Generate Plan" to see a structured delivery plan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
