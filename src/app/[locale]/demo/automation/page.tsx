"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/lib/use-auth";
import {
  Workflow,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Loader2,
  AlertCircle,
  LogIn,
  Sparkles,
} from "lucide-react";

interface StepResult {
  step_id: string;
  action: string;
  status: "completed" | "failed" | "running" | "skipped";
  duration_ms: number;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  error?: string;
}

interface AutomationResult {
  status: string;
  workflow: string;
  trace_id: string;
  total_steps: number;
  completed_steps: number;
  failed_steps: number;
  results: StepResult[];
  summary: string;
  total_duration_ms: number;
}

const SUGGESTED_WORKFLOWS = [
  "daily report generation",
  "process new orders",
  "data extraction and email notification",
  "user onboarding flow",
];

export default function AutomationDemo() {
  const { isAuthenticated, isLoading: authLoading, getFetchInit } = useAuth();
  const [workflow, setWorkflow] = useState("");
  const [result, setResult] = useState<AutomationResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!workflow.trim()) return;

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/automation", getFetchInit({
        method: "POST",
        body: JSON.stringify({ workflow: workflow.trim() }),
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="size-4 text-accent" />;
      case "failed":
        return <XCircle className="size-4 text-red-400" />;
      default:
        return <Clock className="size-4 text-muted-foreground" />;
    }
  };

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
          <Workflow className="size-12 mx-auto text-accent" />
          <h1 className="text-2xl font-bold">Process Automation</h1>
          <p className="text-muted-foreground">Sign in to test workflow automation.</p>
          <a
            href="/login?redirect=/demo/automation"
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
            <Workflow className="size-3.5" />
            Process Automation
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Workflow Automation Demo
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Describe a workflow and watch it execute step by step.
          </p>
        </div>

        {/* Suggested */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {SUGGESTED_WORKFLOWS.map((w) => (
            <button
              key={w}
              onClick={() => setWorkflow(w)}
              className="text-xs rounded-full border border-border/50 px-3 py-1.5 hover:border-accent/30 hover:bg-accent/5 transition-colors text-muted-foreground hover:text-accent"
            >
              {w}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="relative mb-8">
          <input
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            placeholder="Describe the workflow to execute..."
            className="w-full h-12 rounded-xl border border-border/50 bg-card pl-4 pr-12 text-sm
              focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
              placeholder:text-muted-foreground/40 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !workflow.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 size-9 rounded-lg bg-accent text-accent-foreground
              hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center transition-all"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 p-4 mb-8 text-sm text-red-400">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className={`inline-flex items-center gap-1.5 ${result.status === "completed" ? "text-accent" : result.status === "partial" ? "text-amber-400" : "text-red-400"}`}>
                <Sparkles className="size-3.5" />
                {result.status === "completed" ? "Completed" : result.status === "partial" ? "Partial" : "Failed"}
              </span>
              <span>{result.completed_steps}/{result.total_steps} steps</span>
              <span>{result.total_duration_ms}ms</span>
              <code className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">{result.trace_id}</code>
            </div>

            <p className="text-sm text-muted-foreground bg-muted/30 rounded-xl p-4">
              {result.summary}
            </p>

            {/* Steps */}
            <div className="space-y-2">
              {result.results.map((step, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-4 transition-all ${
                    step.status === "completed"
                      ? "border-border/50 bg-card"
                      : "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    {getStatusIcon(step.status)}
                    <span className="text-sm font-medium">
                      Step {step.step_id}: {step.action}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {step.duration_ms}ms
                    </span>
                  </div>

                  {step.status === "failed" && step.error && (
                    <p className="text-xs text-red-400 mt-1">{step.error}</p>
                  )}

                  {step.output && Object.keys(step.output).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {Object.entries(step.output).map(([key, val]) => (
                        <span
                          key={key}
                          className="text-[10px] bg-muted/50 px-2 py-0.5 rounded-full text-muted-foreground"
                        >
                          {key}: {String(val)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
