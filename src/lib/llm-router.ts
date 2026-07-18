import { CircuitBreaker } from "./circuit-breaker";

/* -------------------------------------------------------------------------- */
/*  Cost table                                                                */
/* -------------------------------------------------------------------------- */

/** USD per 1M tokens (input/output combined here for simplicity). */
const COST_PER_MILLION_TOKENS: Record<string, { input: number; output: number }> = {
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-4o": { input: 2.5, output: 10 },
  "claude-3-5-sonnet": { input: 3, output: 15 },
  "claude-opus-4": { input: 15, output: 75 },
  // Local Ollama models are free.
  "qwen3.6-35b": { input: 0, output: 0 },
};

export function estimateCost(
  model: string,
  tokensIn: number,
  tokensOut: number
): number {
  const rate = COST_PER_MILLION_TOKENS[model];
  if (!rate) return 0;
  return (tokensIn / 1_000_000) * rate.input + (tokensOut / 1_000_000) * rate.output;
}

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type ProviderKind = "cloud" | "local";

interface Provider {
  name: string;
  kind: ProviderKind;
  model: string;
  baseUrl?: string;
  apiKeyEnv?: string;
  optimizationScore: number;
  breaker: CircuitBreaker;
}

export interface RouteOptions {
  /** Override the default max cost per run (USD). */
  maxCostPerRun?: number;
  /** Per-provider call timeout in ms. */
  timeoutMs?: number;
  /** Max retries before the per-provider circuit breaker trips. */
  maxRetries?: number;
  /** Force a specific provider by name. */
  forceProvider?: string;
  /** Extra context injected into the LLM prompt. */
  systemPrompt?: string;
}

export interface RouteResult {
  provider: string;
  model: string;
  text: string;
  tokensIn: number;
  tokensOut: number;
  costUSD: number;
  latencyMs: number;
  fallbackUsed: boolean;
}

export class AllProvidersFailedError extends Error {
  constructor(public readonly attempts: Array<{ provider: string; error: string }>) {
    super("All LLM providers failed");
    this.name = "AllProvidersFailedError";
  }
}

export class CostCapExceededError extends Error {
  constructor(public readonly provider: string, public readonly estimatedCost: number) {
    super(`Provider ${provider} exceeds max cost cap`);
    this.name = "CostCapExceededError";
  }
}

/* -------------------------------------------------------------------------- */
/*  Configuration                                                             */
/* -------------------------------------------------------------------------- */

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "qwen3.6-35b";

const MAX_COST_PER_RUN_DEFAULT = Number(process.env.LLM_MAX_COST_PER_RUN ?? 0.05);
const DEFAULT_TIMEOUT_MS = 5_000;
const DEFAULT_MAX_RETRIES = 3;

function buildProviders(): Provider[] {
  const providers: Provider[] = [];

  // Cloud (primary) — only registered when a key is present.
  if (process.env.OPENAI_API_KEY) {
    providers.push({
      name: "openai",
      kind: "cloud",
      model: "gpt-4o-mini",
      apiKeyEnv: "OPENAI_API_KEY",
      optimizationScore: 0.85,
      breaker: new CircuitBreaker({ failureThreshold: DEFAULT_MAX_RETRIES, cooldownMs: 60_000 }),
    });
  }
  if (process.env.ANTHROPIC_API_KEY) {
    providers.push({
      name: "anthropic",
      kind: "cloud",
      model: "claude-3-5-sonnet",
      apiKeyEnv: "ANTHROPIC_API_KEY",
      optimizationScore: 0.75,
      breaker: new CircuitBreaker({ failureThreshold: DEFAULT_MAX_RETRIES, cooldownMs: 60_000 }),
    });
  }

  // Local Ollama — always available as the fallback.
  providers.push({
    name: "ollama",
    kind: "local",
    model: OLLAMA_MODEL,
    baseUrl: OLLAMA_BASE_URL,
    optimizationScore: 0.95,
    breaker: new CircuitBreaker({ failureThreshold: DEFAULT_MAX_RETRIES, cooldownMs: 60_000 }),
  });

  // Highest optimization score first.
  return providers.sort((a, b) => b.optimizationScore - a.optimizationScore);
}

/* -------------------------------------------------------------------------- */
/*  Provider callers                                                          */
/* -------------------------------------------------------------------------- */

function withTimeout(ms: number, signal: AbortSignal): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  const onParentAbort = () => controller.abort();
  if (signal.aborted) controller.abort();
  signal.addEventListener("abort", onParentAbort);
  return {
    signal: controller.signal,
    clear: () => {
      clearTimeout(timer);
      signal.removeEventListener("abort", onParentAbort);
    },
  };
}

async function callOpenAI(
  provider: Provider,
  task: string,
  opts: RouteOptions,
  timeoutMs: number,
  parentSignal: AbortSignal
): Promise<{ text: string; tokensIn: number; tokensOut: number }> {
  const { signal, clear } = withTimeout(timeoutMs, parentSignal);
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: provider.model,
        messages: [
          ...(opts.systemPrompt ? [{ role: "system", content: opts.systemPrompt }] : []),
          { role: "user", content: task },
        ],
        temperature: 0.7,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}`);
    const data = await res.json();
    return {
      text: data.choices?.[0]?.message?.content ?? "",
      tokensIn: data.usage?.prompt_tokens ?? 0,
      tokensOut: data.usage?.completion_tokens ?? 0,
    };
  } finally {
    clear();
  }
}

async function callAnthropic(
  provider: Provider,
  task: string,
  opts: RouteOptions,
  timeoutMs: number,
  parentSignal: AbortSignal
): Promise<{ text: string; tokensIn: number; tokensOut: number }> {
  const { signal, clear } = withTimeout(timeoutMs, parentSignal);
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: provider.model,
        max_tokens: 1024,
        system: opts.systemPrompt ?? undefined,
        messages: [{ role: "user", content: task }],
      }),
    });
    if (!res.ok) throw new Error(`Anthropic HTTP ${res.status}`);
    const data = await res.json();
    const text = Array.isArray(data.content)
      ? data.content.map((b: { text?: string }) => b.text ?? "").join("")
      : "";
    return {
      text,
      tokensIn: data.usage?.input_tokens ?? 0,
      tokensOut: data.usage?.output_tokens ?? 0,
    };
  } finally {
    clear();
  }
}

async function callOllama(
  provider: Provider,
  task: string,
  opts: RouteOptions,
  timeoutMs: number,
  parentSignal: AbortSignal
): Promise<{ text: string; tokensIn: number; tokensOut: number }> {
  const { signal, clear } = withTimeout(timeoutMs, parentSignal);
  try {
    const res = await fetch(`${provider.baseUrl}/api/generate`, {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: provider.model,
        prompt: opts.systemPrompt ? `${opts.systemPrompt}\n\n${task}` : task,
        stream: false,
      }),
    });
    if (!res.ok) throw new Error(`Ollama HTTP ${res.status}`);
    const data = await res.json();
    const text: string = data.response ?? "";
    // Ollama does not reliably return token counts; estimate from characters.
    const tokensIn = Math.ceil(task.length / 4);
    const tokensOut = Math.ceil(text.length / 4);
    return { text, tokensIn, tokensOut };
  } finally {
    clear();
  }
}

const CALLERS: Record<string, typeof callOpenAI> = {
  openai: callOpenAI,
  anthropic: callAnthropic,
  ollama: callOllama,
};

/* -------------------------------------------------------------------------- */
/*  Telemetry                                                                 */
/* -------------------------------------------------------------------------- */

function logTelemetry(entry: {
  provider: string;
  latencyMs: number;
  tokensIn: number;
  tokensOut: number;
  costUSD: number;
  fallbackUsed: boolean;
}): void {
  // Production will ship this to a log store; for now console is the sink.
  console.log("[llm-router:telemetry]", JSON.stringify(entry));
}

/* -------------------------------------------------------------------------- */
/*  Router                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Route an LLM task through ranked providers with circuit breaking, timeout,
 * retries, cost-cap enforcement, and local Ollama fallback.
 *
 * @param task  The prompt / task description to send to the model.
 * @param opts  Optional routing controls (see {@link RouteOptions}).
 * @returns A {@link RouteResult} describing the winning provider and output.
 * @throws {AllProvidersFailedError} when every available provider fails.
 * @throws {CostCapExceededError} propagated when forced provider exceeds cap.
 */
export async function routeLLM(
  task: string,
  opts: RouteOptions = {}
): Promise<RouteResult> {
  const maxCostPerRun = opts.maxCostPerRun ?? MAX_COST_PER_RUN_DEFAULT;
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxRetries = opts.maxRetries ?? DEFAULT_MAX_RETRIES;

  const providers = buildProviders();
  const candidates = opts.forceProvider
    ? providers.filter((p) => p.name === opts.forceProvider)
    : providers;

  if (candidates.length === 0) {
    throw new AllProvidersFailedError([]);
  }

  const attempts: Array<{ provider: string; error: string }> = [];
  const primaryProvider = candidates[0];
  let usedFallback = false;

  for (const provider of candidates) {
    if (!provider.breaker.allowRequest()) {
      attempts.push({ provider: provider.name, error: "circuit_open" });
      if (provider.name !== primaryProvider.name) usedFallback = true;
      continue;
    }

    let lastError: unknown = null;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const start = Date.now();
      try {
        const caller = CALLERS[provider.name];
        if (!caller) throw new Error(`No caller for provider ${provider.name}`);

        const out = await caller(provider, task, opts, timeoutMs, new AbortController().signal);

        // Cost-cap check: skip to next provider if estimate exceeds cap.
        const estimated = estimateCost(provider.model, out.tokensIn, out.tokensOut);
        if (estimated > maxCostPerRun) {
          provider.breaker.recordFailure();
          attempts.push({ provider: provider.name, error: "cost_cap_exceeded" });
          lastError = new CostCapExceededError(provider.name, estimated);
          if (provider.name !== primaryProvider.name) usedFallback = true;
          break;
        }

        const latencyMs = Date.now() - start;
        provider.breaker.recordSuccess();

        logTelemetry({
          provider: provider.name,
          latencyMs,
          tokensIn: out.tokensIn,
          tokensOut: out.tokensOut,
          costUSD: estimated,
          fallbackUsed: usedFallback,
        });

        return {
          provider: provider.name,
          model: provider.model,
          text: out.text,
          tokensIn: out.tokensIn,
          tokensOut: out.tokensOut,
          costUSD: estimated,
          latencyMs,
          fallbackUsed: usedFallback,
        };
      } catch (err) {
        lastError = err;
        const latencyMs = Date.now() - start;
        provider.breaker.recordFailure();
        attempts.push({ provider: provider.name, error: String(err) });
        console.warn(
          `[llm-router] ${provider.name} attempt ${attempt + 1}/${maxRetries} failed (${latencyMs}ms):`,
          err instanceof Error ? err.message : err
        );
      }
    }

    if (provider.name !== primaryProvider.name) usedFallback = true;
    if (lastError instanceof CostCapExceededError) continue;

    // Breaker may now be open for this provider; move to the next.
    if (!provider.breaker.allowRequest()) {
      console.warn(`[llm-router] circuit tripped for ${provider.name}; skipping for 60s`);
    }
  }

  throw new AllProvidersFailedError(attempts);
}
