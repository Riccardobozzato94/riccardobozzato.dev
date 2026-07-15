import { NextRequest, NextResponse } from "next/server";

/**
 * System Integration API — System Integration MVP
 *
 * Accepts a payload with transformation rules and demonstrates
 * data mapping, enrichment, validation, and forwarding.
 */

interface MappingRule {
  from: string;
  to: string;
  transform?: "passthrough" | "uppercase" | "lowercase" | "date_format" | "number_format" | "concat" | "template";
  default?: string;
}

interface IntegrationRequest {
  source: string;
  payload: Record<string, unknown>;
  mapping: MappingRule[];
  target?: string;
  options?: {
    validate?: boolean;
    enrich?: boolean;
    dry_run?: boolean;
  };
}

interface IntegrationResponse {
  status: "success" | "partial" | "error";
  trace_id: string;
  source: string;
  target: string;
  transformed_payload: Record<string, unknown>;
  validation_results: { field: string; valid: boolean; error?: string }[];
  enrichment_added: string[];
  target_response?: Record<string, unknown>;
  execution_log: { step: string; status: string; duration_ms: number }[];
  total_duration_ms: number;
}

function generateId(): string {
  return `int_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

function applyTransform(
  value: unknown,
  transform?: MappingRule["transform"],
  rule?: MappingRule
): unknown {
  if (value === null || value === undefined) {
    return rule?.default ?? null;
  }

  const strVal = String(value);

  switch (transform) {
    case "uppercase":
      return strVal.toUpperCase();
    case "lowercase":
      return strVal.toLowerCase();
    case "date_format":
      return new Date(strVal).toISOString();
    case "number_format":
      const num = parseFloat(strVal);
      return isNaN(num) ? (rule?.default ?? value) : num;
    case "concat":
      return `${rule?.default ?? ""}${strVal}`;
    case "template":
      return (rule?.default ?? "").replace(/\{\{value\}\}/g, strVal);
    default:
      return value;
  }
}

function deepGet(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

function deepSet(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]] || typeof current[parts[i]] !== "object") {
      current[parts[i]] = {};
    }
    current = current[parts[i]] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IntegrationRequest;
    const log: { step: string; status: string; duration_ms: number }[] = [];
    const startTime = Date.now();

    if (!body.source || !body.payload || !body.mapping) {
      return NextResponse.json(
        { error: "Missing required fields: source, payload, mapping" },
        { status: 400 }
      );
    }

    // Step 1: Parse & validate input schema
    log.push({ step: "validate_input", status: "completed", duration_ms: 12 });

    // Step 2: Apply mapping rules
    const transformed: Record<string, unknown> = {};
    const validationResults: { field: string; valid: boolean; error?: string }[] = [];
    const enrichmentAdded: string[] = [];

    for (const rule of body.mapping) {
      const value = deepGet(body.payload, rule.from);
      const transformedValue = applyTransform(value, rule.transform, rule);

      deepSet(transformed, rule.to, transformedValue);

      // Validate
      if (body.options?.validate && transformedValue === null) {
        validationResults.push({
          field: rule.to,
          valid: false,
          error: `Field ${rule.from} is required but missing or null`,
        });
      } else if (body.options?.validate) {
        validationResults.push({
          field: rule.to,
          valid: true,
        });
      }

      const transformName = rule.transform || "passthrough";
      log.push({
        step: `map: ${rule.from} → ${rule.to} (${transformName})`,
        status: "completed",
        duration_ms: Math.floor(Math.random() * 10) + 2,
      });
    }

    // Step 3: Enrichment
    if (body.options?.enrich) {
      transformed._enriched = {
        timestamp: new Date().toISOString(),
        source: body.source,
        integration_id: generateId(),
        environment: process.env.NODE_ENV || "production",
      };
      enrichmentAdded.push("_enriched.timestamp", "_enriched.source", "_enriched.integration_id", "_enriched.environment");
      log.push({ step: "enrich_payload", status: "completed", duration_ms: 8 });
    }

    // Step 4: Forward simulation
    let targetResponse: Record<string, unknown> | undefined;
    if (!body.options?.dry_run && body.target) {
      targetResponse = {
        status: "received",
        target: body.target,
        payload_size: JSON.stringify(transformed).length,
        timestamp: new Date().toISOString(),
      };
      log.push({ step: `forward_to: ${body.target}`, status: "completed", duration_ms: 45 });
    } else {
      log.push({ step: "dry_run (no forward)", status: "completed", duration_ms: 3 });
    }

    const totalDuration = Date.now() - startTime;

    return NextResponse.json({
      status: "success",
      trace_id: generateId(),
      source: body.source,
      target: body.target || "(dry run)",
      transformed_payload: transformed,
      validation_results: validationResults,
      enrichment_added: enrichmentAdded,
      target_response: targetResponse,
      execution_log: log,
      total_duration_ms: totalDuration,
    } satisfies IntegrationResponse);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "System Integration API",
    version: "1.0.0",
    description: "Transform, validate, enrich, and forward data between systems",
    docs: "POST /api/integration with { source, payload, mapping, target?, options? }",
  });
}
