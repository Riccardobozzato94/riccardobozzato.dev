"use client";

import { useState } from "react";
import { useAuth } from "@/lib/use-auth";
import {
  GitMerge,
  ArrowRight,
  Loader2,
  AlertCircle,
  LogIn,
  CheckCircle2,
  FileInput,
  FileOutput,
} from "lucide-react";

interface MappingRule {
  from: string;
  to: string;
  transform?: string;
  default?: string;
}

interface IntegrationResult {
  status: string;
  trace_id: string;
  source: string;
  transformed_payload: Record<string, unknown>;
  execution_log: { step: string; status: string; duration_ms: number }[];
  total_duration_ms: number;
}

const PRESET_MAPPINGS = [
  {
    name: "Shopify → CRM",
    source: "shopify",
    payload: { customer: { first_name: "John", last_name: "Doe", email: "john@example.com" }, total_price: "99.99" },
    mapping: [
      { from: "customer.first_name", to: "contact.firstName" },
      { from: "customer.last_name", to: "contact.lastName" },
      { from: "customer.email", to: "contact.email" },
      { from: "total_price", to: "deal.amount", transform: "number_format" },
    ],
  },
  {
    name: "Webhook → Database",
    source: "webhook",
    payload: { event: "user.created", data: { id: 123, name: "Alice", created_at: "2026-07-15T10:00:00Z" } },
    mapping: [
      { from: "data.id", to: "user_id" },
      { from: "data.name", to: "user_name", transform: "uppercase" },
      { from: "data.created_at", to: "created_at", transform: "date_format" },
    ],
  },
];

export default function IntegrationDemo() {
  const { isAuthenticated, isLoading: authLoading, getFetchInit } = useAuth();
  const [source, setSource] = useState("shopify");
  const [payloadText, setPayloadText] = useState(JSON.stringify(PRESET_MAPPINGS[0].payload, null, 2));
  const [mappingText, setMappingText] = useState(JSON.stringify(PRESET_MAPPINGS[0].mapping, null, 2));
  const [target, setTarget] = useState("https://api.example.com/webhook");
  const [result, setResult] = useState<IntegrationResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonError, setJsonError] = useState("");

  function loadPreset(index: number) {
    const preset = PRESET_MAPPINGS[index];
    setSource(preset.source);
    setPayloadText(JSON.stringify(preset.payload, null, 2));
    setMappingText(JSON.stringify(preset.mapping, null, 2));
    setJsonError("");
  }

  async function handleExecute() {
    setError("");
    setJsonError("");
    setLoading(true);
    setResult(null);

    // Validate JSON inputs
    let payload: Record<string, unknown>;
    let mapping: MappingRule[];

    try {
      payload = JSON.parse(payloadText);
    } catch {
      setJsonError("Invalid JSON in Payload");
      setLoading(false);
      return;
    }

    try {
      mapping = JSON.parse(mappingText);
    } catch {
      setJsonError("Invalid JSON in Mapping Rules");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/integration", getFetchInit({
        method: "POST",
        body: JSON.stringify({
          source,
          payload,
          mapping,
          target: target || undefined,
          options: { validate: true, enrich: true },
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
          <GitMerge className="size-12 mx-auto text-accent" />
          <h1 className="text-2xl font-bold">System Integration</h1>
          <p className="text-muted-foreground">Sign in to test data integration.</p>
          <a
            href="/login?redirect=/demo/integration"
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
            <GitMerge className="size-3.5" />
            System Integration
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Integration Playground
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Define source, payload, and mapping rules. The integration engine
            transforms and enriches your data.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {PRESET_MAPPINGS.map((p, i) => (
            <button
              key={i}
              onClick={() => loadPreset(i)}
              className="text-xs rounded-full border border-border/50 px-3 py-1.5 hover:border-accent/30 hover:bg-accent/5 transition-colors text-muted-foreground hover:text-accent"
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 bg-card p-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Source System
              </label>
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full h-10 rounded-lg border border-border/50 bg-background px-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <FileInput className="size-3" /> Payload (JSON)
              </label>
              <textarea
                value={payloadText}
                onChange={(e) => { setPayloadText(e.target.value); setJsonError(""); }}
                rows={8}
                className="w-full rounded-lg border border-border/50 bg-background p-3 text-xs font-mono resize-none
                  focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <GitMerge className="size-3" /> Mapping Rules (JSON)
              </label>
              <textarea
                value={mappingText}
                onChange={(e) => { setMappingText(e.target.value); setJsonError(""); }}
                rows={6}
                className="w-full rounded-lg border border-border/50 bg-background p-3 text-xs font-mono resize-none
                  focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Target URL (optional)
              </label>
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full h-10 rounded-lg border border-border/50 bg-background px-3 text-sm font-mono
                  focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>

            {jsonError && (
              <p className="text-xs text-red-400">{jsonError}</p>
            )}

            <button
              onClick={handleExecute}
              disabled={loading}
              className="w-full h-11 rounded-xl bg-accent text-accent-foreground font-medium text-sm
                hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <ArrowRight className="size-4" />
                  Transform & Forward
                </>
              )}
            </button>
          </div>

          {/* Output */}
          <div className="space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {result && (
              <>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-3.5 text-accent" />
                  <span>{result.execution_log.length} steps</span>
                  <span>{result.total_duration_ms}ms</span>
                  <code className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">{result.trace_id}</code>
                </div>

                <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <FileOutput className="size-3" /> Transformed Payload
                  </label>
                  <pre className="text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(result.transformed_payload, null, 2)}
                  </pre>
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
                    Execution Log
                  </label>
                  <div className="space-y-1.5">
                    {result.execution_log.map((log, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="text-accent">▸</span>
                        <span className="font-mono text-muted-foreground">{log.step}</span>
                        <span className="text-muted-foreground/50 ml-auto">{log.duration_ms}ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!result && !error && (
              <div className="rounded-xl border border-border/50 bg-card p-8 text-center text-sm text-muted-foreground">
                <GitMerge className="size-8 mx-auto mb-3 text-muted-foreground/30" />
                Configure the integration and click "Transform & Forward" to see results.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
