"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/lib/use-auth";
import {
  Bot,
  Send,
  Search,
  Code2,
  FileText,
  Sparkles,
  Loader2,
  AlertCircle,
  ExternalLink,
  LogIn,
} from "lucide-react";

interface ToolCall {
  tool: string;
  input: string;
  output: string;
  duration_ms: number;
}

interface AgentResult {
  status: string;
  trace_id: string;
  task: string;
  reasoning: string;
  tool_calls: ToolCall[];
  result: string;
  confidence: number;
  latency_ms: number;
}

const TOOL_ICONS: Record<string, typeof Search> = {
  web_search: Search,
  web_fetch: Search,
  file_read: FileText,
  file_write: FileText,
  execute_code: Code2,
  analyze_text: FileText,
  summarize: FileText,
  translate: FileText,
};

const SUGGESTED_TASKS = [
  "Search for latest serverless trends and summarize them",
  "Analyze my package.json for security vulnerabilities",
  "Generate a Python script to automate CSV processing",
  "Research best practices for AI agent architecture",
];

export default function AiAgentDemo() {
  const { isAuthenticated, isLoading: authLoading, getFetchInit } = useAuth();
  const [task, setTask] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState<AgentResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!task.trim()) return;

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai-agent", getFetchInit({
        method: "POST",
        body: JSON.stringify({
          task: task.trim(),
          context: context.trim() || undefined,
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
          <Bot className="size-12 mx-auto text-accent" />
          <h1 className="text-2xl font-bold">AI Agent Demo</h1>
          <p className="text-muted-foreground">Sign in to try the AI agent.</p>
          <a
            href="/login?redirect=/demo/ai-agent"
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
            <Bot className="size-3.5" />
            Agentic AI Workflows
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            AI Agent Playground
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Give it a task. The agent selects tools, executes them, and returns results.
            Try one of the examples below or write your own.
          </p>
        </div>

        {/* Suggested tasks */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {SUGGESTED_TASKS.map((t) => (
            <button
              key={t}
              onClick={() => setTask(t)}
              className="text-xs rounded-full border border-border/50 px-3 py-1.5 hover:border-accent/30 hover:bg-accent/5 transition-colors text-muted-foreground hover:text-accent"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="relative">
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe the task for the AI agent..."
              rows={3}
              required
              className="w-full rounded-xl border border-border/50 bg-card p-4 pr-12 text-sm resize-none
                focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
                placeholder:text-muted-foreground/40 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !task.trim()}
              className="absolute right-3 bottom-3 size-9 rounded-lg bg-accent text-accent-foreground
                hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center transition-all"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </button>
          </div>

          <input
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Optional context (e.g., codebase details, constraints)..."
            className="w-full h-10 rounded-xl border border-border/50 bg-card px-4 text-sm
              focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
              placeholder:text-muted-foreground/40 transition-all"
          />
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
            {/* Confidence + Latency */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>Confidence: <strong className={result.confidence > 0.7 ? "text-accent" : "text-amber-400"}>{Math.round(result.confidence * 100)}%</strong></span>
              <span>Latency: <strong>{result.latency_ms}ms</strong></span>
              <span>Trace: <code className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">{result.trace_id}</code></span>
            </div>

            {/* Reasoning */}
            <div className="rounded-xl border border-border/50 bg-card p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Reasoning</h3>
              <p className="text-sm leading-relaxed">{result.reasoning}</p>
            </div>

            {/* Tool calls */}
            {result.tool_calls.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tool Calls ({result.tool_calls.length})
                </h3>
                {result.tool_calls.map((tc, i) => {
                  const Icon = TOOL_ICONS[tc.tool] || Code2;
                  return (
                    <div key={i} className="rounded-xl border border-border/50 bg-card overflow-hidden">
                      <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2.5 bg-muted/30">
                        <Icon className="size-3.5 text-accent" />
                        <span className="text-sm font-medium font-mono">{tc.tool}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{tc.duration_ms}ms</span>
                      </div>
                      <div className="p-4 space-y-2">
                        <div>
                          <span className="text-[10px] font-semibold uppercase text-muted-foreground">Input</span>
                          <p className="text-sm mt-0.5 text-muted-foreground/80">{tc.input}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase text-muted-foreground">Output</span>
                          <p className="text-sm mt-0.5">{tc.output}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Result */}
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="size-4 text-accent" />
                <h3 className="text-sm font-semibold">Final Result</h3>
              </div>
              <p className="text-sm leading-relaxed">{result.result}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
