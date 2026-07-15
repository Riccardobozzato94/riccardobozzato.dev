"use client";

import { useState } from "react";
import { useAuth } from "@/lib/use-auth";
import {
  Calculator,
  DollarSign,
  Loader2,
  AlertCircle,
  LogIn,
  TrendingDown,
  Server,
  Cloud,
} from "lucide-react";

interface CostBreakdown {
  compute_cost: number;
  request_cost: number;
  storage_cost: number;
  total_monthly: number;
  total_yearly: number;
}

interface ProviderComparison {
  provider: string;
  plan: string;
  monthly: CostBreakdown;
  yearly_total: number;
  estimated_savings_vs_ec2: string;
  highlights: string[];
}

interface CostResult {
  status: string;
  input: { requests_per_month: number; avg_execution_ms: number; memory_mb: number };
  comparisons: ProviderComparison[];
  recommendation: string;
}

export default function CostCalculatorDemo() {
  const { isAuthenticated, isLoading: authLoading, getFetchInit } = useAuth();
  const [requests, setRequests] = useState(1000000);
  const [execMs, setExecMs] = useState(200);
  const [memory, setMemory] = useState(512);
  const [result, setResult] = useState<CostResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCalculate() {
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/cost-calculator", getFetchInit({
        method: "POST",
        body: JSON.stringify({
          requests_per_month: requests,
          avg_execution_ms: execMs,
          memory_mb: memory,
          provider: "all",
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

  function formatMoney(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
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
          <Calculator className="size-12 mx-auto text-accent" />
          <h1 className="text-2xl font-bold">Cost Calculator</h1>
          <p className="text-muted-foreground">Sign in to compare serverless costs.</p>
          <a
            href="/login?redirect=/demo/cost-calculator"
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
            <Calculator className="size-3.5" />
            Serverless Architecture
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Serverless Cost Calculator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare AWS Lambda vs Cloudflare Workers costs. Adjust the sliders
            to match your workload.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Controls */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm">
                  <span>Requests / month</span>
                  <span className="font-mono text-accent font-bold">
                    {requests.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min={10000}
                  max={50000000}
                  step={100000}
                  value={requests}
                  onChange={(e) => setRequests(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>10K</span>
                  <span>50M</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm">
                  <span>Avg execution (ms)</span>
                  <span className="font-mono text-accent font-bold">{execMs}ms</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={5000}
                  step={10}
                  value={execMs}
                  onChange={(e) => setExecMs(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>10ms</span>
                  <span>5000ms</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm">
                  <span>Memory (MB)</span>
                  <span className="font-mono text-accent font-bold">{memory}MB</span>
                </label>
                <input
                  type="range"
                  min={128}
                  max={10240}
                  step={128}
                  value={memory}
                  onChange={(e) => setMemory(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>128</span>
                  <span>10240</span>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full h-11 rounded-xl bg-accent text-accent-foreground font-medium text-sm
                  hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <TrendingDown className="size-4" />
                    Calculate
                  </>
                )}
              </button>
            </div>
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
                {result.comparisons.map((comp, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border/50 bg-card overflow-hidden"
                  >
                    <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3 bg-muted/30">
                      {comp.provider.includes("Cloudflare") ? (
                        <Cloud className="size-4 text-accent" />
                      ) : (
                        <Server className="size-4 text-accent" />
                      )}
                      <span className="font-semibold text-sm">{comp.provider}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{comp.plan}</span>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[10px] font-semibold uppercase text-muted-foreground">Compute</span>
                        <p className="font-bold mt-0.5">{formatMoney(comp.monthly.compute_cost)}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase text-muted-foreground">Requests</span>
                        <p className="font-bold mt-0.5">{formatMoney(comp.monthly.request_cost)}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase text-muted-foreground">Total / mo</span>
                        <p className="font-bold mt-0.5 text-accent">{formatMoney(comp.monthly.total_monthly)}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase text-muted-foreground">Total / yr</span>
                        <p className="font-bold mt-0.5">{formatMoney(comp.yearly_total)}</p>
                      </div>
                    </div>
                    <div className="border-t border-border/50 px-4 py-2.5 bg-muted/20">
                      <span className="text-xs text-muted-foreground">{comp.estimated_savings_vs_ec2}</span>
                    </div>
                  </div>
                ))}

                {/* Recommendation */}
                <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                  <div className="flex items-start gap-2.5">
                    <DollarSign className="size-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Recommendation</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
