import { NextRequest, NextResponse } from "next/server";

/**
 * Serverless Cost Calculator — Serverless Architecture MVP
 *
 * Compares costs across AWS Lambda, Cloudflare Workers, and traditional EC2.
 * No external API needed — all pricing is hardcoded and regularly updated.
 */

interface CostRequest {
  requests_per_month: number;
  avg_execution_ms: number;
  memory_mb: number;
  provider?: "aws" | "cloudflare" | "all";
}

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

interface CostResponse {
  status: "success";
  input: CostRequest;
  comparisons: ProviderComparison[];
  recommendation: string;
}

// AWS Lambda pricing (us-east-1, as of 2026)
const AWS_LAMBDA = {
  price_per_1ms_128mb: 0.0000000021, // per 1ms for 128MB
  requests_per_1m: 0.20, // $0.20 per 1M requests
  free_tier_requests: 1000000,
  free_tier_compute_ms: 400000, // 400,000 GB-seconds
};

// Cloudflare Workers pricing (as of 2026)
const CF_WORKERS = {
  price_per_1m_requests: 0.30, // $0.30 per 1M requests (bundled pricing)
  included_requests: 100000, // free tier
  duration_included: true, // no separate duration cost
  cpu_ms_included: 30000, // 30s CPU per request included
};

// EC2 comparison baseline (t3a.nano)
const EC2_BASELINE = {
  monthly_cost: 8.50, // reserved instance pricing
  max_requests_per_month: 5000000, // rough estimate
};

function calculateAwsCost(req: CostRequest): CostBreakdown {
  const computePerRequest = req.avg_execution_ms * (req.memory_mb / 128) * AWS_LAMBDA.price_per_1ms_128mb;
  const computeMonthly = Math.max(0, computePerRequest * req.requests_per_month - AWS_LAMBDA.free_tier_compute_ms * AWS_LAMBDA.price_per_1ms_128mb);
  const requestMonthly = Math.max(0, (req.requests_per_month / 1000000) * AWS_LAMBDA.requests_per_1m - (AWS_LAMBDA.free_tier_requests / 1000000) * AWS_LAMBDA.requests_per_1m);

  return {
    compute_cost: Math.round(computeMonthly * 100) / 100,
    request_cost: Math.round(requestMonthly * 100) / 100,
    storage_cost: 0, // excluding external storage
    total_monthly: Math.round((computeMonthly + requestMonthly) * 100) / 100,
    total_yearly: Math.round((computeMonthly + requestMonthly) * 12 * 100) / 100,
  };
}

function calculateCfCost(req: CostRequest): CostBreakdown {
  const overage = Math.max(0, (req.requests_per_month - CF_WORKERS.included_requests) / 1000000);
  const requestCost = overage * CF_WORKERS.price_per_1m_requests;

  return {
    compute_cost: 0, // included
    request_cost: Math.round(requestCost * 100) / 100,
    storage_cost: 0,
    total_monthly: Math.round(requestCost * 100) / 100,
    total_yearly: Math.round(requestCost * 12 * 100) / 100,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CostRequest;

    // Validate
    if (!body.requests_per_month || body.requests_per_month < 0) {
      return NextResponse.json(
        { error: "Missing or invalid: requests_per_month" },
        { status: 400 }
      );
    }
    if (!body.avg_execution_ms || body.avg_execution_ms < 1) {
      return NextResponse.json(
        { error: "Missing or invalid: avg_execution_ms" },
        { status: 400 }
      );
    }
    if (!body.memory_mb || body.memory_mb < 128) {
      body.memory_mb = 128;
    }

    const comparisons: ProviderComparison[] = [];
    const providers = body.provider === "all" || !body.provider
      ? ["aws", "cloudflare"]
      : [body.provider];

    for (const p of providers) {
      if (p === "aws") {
        const aws = calculateAwsCost(body);
        const ec2Monthly = EC2_BASELINE.monthly_cost;
        const savings = Math.round(((ec2Monthly - aws.total_monthly) / ec2Monthly) * 100);
        comparisons.push({
          provider: "AWS Lambda",
          plan: "Pay-as-you-go",
          monthly: aws,
          yearly_total: aws.total_yearly,
          estimated_savings_vs_ec2: `${savings > 0 ? `~${savings}% cheaper` : `${Math.abs(savings)}% more expensive`}`,
          highlights: [
            "Auto-scales to zero — no idle cost",
            "Widest ecosystem integration",
            "Best for bursty, variable workloads",
          ],
        });
      }

      if (p === "cloudflare") {
        const cf = calculateCfCost(body);
        comparisons.push({
          provider: "Cloudflare Workers",
          plan: "Pay-as-you-go",
          monthly: cf,
          yearly_total: cf.total_yearly,
          estimated_savings_vs_ec2: "~90-99% cheaper at low volume",
          highlights: [
            "Sub-millisecond cold starts",
            "Global edge deployment (330+ cities)",
            "No duration cost — pay per request only",
          ],
        });
      }
    }

    // Generate recommendation
    let recommendation = "";
    if (comparisons.length >= 2) {
      const [a, b] = comparisons;
      if (a.monthly.total_monthly < b.monthly.total_monthly) {
        recommendation = `${a.provider} is the most cost-effective option at ${formatMoney(a.monthly.total_monthly)}/mo vs ${b.provider} at ${formatMoney(b.monthly.total_monthly)}/mo.`;
      } else {
        recommendation = `${b.provider} is the most cost-effective option at ${formatMoney(b.monthly.total_monthly)}/mo vs ${a.provider} at ${formatMoney(a.monthly.total_monthly)}/mo.`;
      }
      recommendation += " Both are serverless — no servers to manage, auto-scaling included.";
    } else {
      recommendation = `At ${body.requests_per_month.toLocaleString()} requests/mo with ${body.avg_execution_ms}ms execution time, serverless saves 60-99% vs traditional hosting.`;
    }

    return NextResponse.json({
      status: "success",
      input: body,
      comparisons,
      recommendation,
    } satisfies CostResponse);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export async function GET() {
  return NextResponse.json({
    service: "Serverless Cost Calculator",
    version: "1.0.0",
    description: "Compare serverless costs across AWS Lambda and Cloudflare Workers",
    pricing_basis: "Current as of July 2026 (us-east-1)",
    docs: "POST /api/cost-calculator with { requests_per_month, avg_execution_ms, memory_mb, provider? }",
  });
}
