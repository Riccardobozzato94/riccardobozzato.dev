import { NextRequest, NextResponse } from "next/server";

/**
 * Process Automation API — Process Automation MVP
 *
 * Accepts a workflow description and executes steps sequentially.
 * Demonstrates automation pipeline orchestration with status tracking.
 */

interface Step {
  id: string;
  action: string;
  params: Record<string, string>;
}

interface AutomationRequest {
  workflow: string;
  steps?: Step[];
  input_data?: Record<string, unknown>;
}

interface StepResult {
  step_id: string;
  action: string;
  status: "running" | "completed" | "skipped" | "failed";
  started_at: string;
  completed_at: string;
  duration_ms: number;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  error?: string;
}

interface AutomationResponse {
  status: "completed" | "partial" | "failed";
  workflow: string;
  trace_id: string;
  total_steps: number;
  completed_steps: number;
  failed_steps: number;
  results: StepResult[];
  summary: string;
  total_duration_ms: number;
}

function generateId(): string {
  return `auto_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

function simulateExecution(step: Step): StepResult {
  const startOffset = Math.floor(Math.random() * 200);
  const duration = 100 + Math.floor(Math.random() * 900);

  const startedAt = new Date(Date.now() + startOffset).toISOString();
  const completedAt = new Date(Date.now() + startOffset + duration).toISOString();

  // Simulate different action types
  const output: Record<string, unknown> = {};
  let error: string | undefined;

  switch (step.action) {
    case "http_request":
      output.status_code = 200;
      output.body_length = Math.floor(Math.random() * 10000);
      output.content_type = "application/json";
      break;
    case "transform":
      output.transformed = true;
      output.fields_processed = Math.floor(Math.random() * 20) + 1;
      break;
    case "validate":
      output.valid = Math.random() > 0.1;
      output.errors_found = output.valid ? 0 : Math.floor(Math.random() * 3) + 1;
      break;
    case "notify":
      output.channel = "email";
      output.recipients = 1;
      output.delivered = true;
      break;
    case "store":
      output.stored = true;
      output.target = "database";
      output.record_id = generateId();
      break;
    case "approval":
      output.status = Math.random() > 0.2 ? "auto-approved" : "pending_review";
      output.escalated = output.status === "pending_review";
      break;
    default:
      output.processed = true;
      output.message = `Executed: ${step.action}`;
  }

  // Simulate occasional failure (5% chance)
  if (Math.random() < 0.05) {
    error = `Step ${step.id}: Simulated timeout after ${duration}ms`;
    return {
      step_id: step.id,
      action: step.action,
      status: "failed",
      started_at: startedAt,
      completed_at: completedAt,
      duration_ms: duration + 5000,
      input: step.params as unknown as Record<string, unknown>,
      output: {},
      error,
    };
  }

  return {
    step_id: step.id,
    action: step.action,
    status: "completed",
    started_at: startedAt,
    completed_at: completedAt,
    duration_ms: duration,
    input: step.params as unknown as Record<string, unknown>,
    output,
  };
}

function generateSteps(workflow: string): Step[] {
  // Auto-generate steps from workflow description if not provided
  const wf = workflow.toLowerCase();
  const steps: Step[] = [];

  if (wf.includes("data") || wf.includes("extract") || wf.includes("fetch")) {
    steps.push({ id: "1", action: "http_request", params: { url: "https://api.example.com/data", method: "GET" } });
    steps.push({ id: "2", action: "validate", params: { schema: "incoming_data" } });
    steps.push({ id: "3", action: "transform", params: { mapping: "normalize" } });
    steps.push({ id: "4", action: "store", params: { target: "database", table: "processed" } });
  }

  if (wf.includes("email") || wf.includes("notify") || wf.includes("alert")) {
    if (steps.length === 0) {
      steps.push({ id: "1", action: "http_request", params: { url: "https://api.example.com/check", method: "GET" } });
    }
    steps.push({ id: `${steps.length + 1}`, action: "approval", params: { threshold: "auto", escalate_after: "24h" } });
    steps.push({ id: `${steps.length + 1}`, action: "notify", params: { channel: "email", template: "alert" } });
  }

  if (wf.includes("order") || wf.includes("purchase") || wf.includes("checkout")) {
    steps.push({ id: "1", action: "validate", params: { schema: "order" } });
    steps.push({ id: "2", action: "http_request", params: { url: "https://api.payment.com/charge", method: "POST" } });
    steps.push({ id: "3", action: "store", params: { target: "database", table: "orders" } });
    steps.push({ id: "4", action: "notify", params: { channel: "email", template: "order_confirmation" } });
  }

  if (wf.includes("report") || wf.includes("generate")) {
    steps.push({ id: "1", action: "http_request", params: { url: "https://api.example.com/metrics", method: "GET" } });
    steps.push({ id: "2", action: "transform", params: { mapping: "aggregate" } });
    steps.push({ id: "3", action: "store", params: { target: "storage", format: "pdf" } });
    steps.push({ id: "4", action: "notify", params: { channel: "email", template: "report_ready" } });
  }

  // Default fallback
  if (steps.length === 0) {
    steps.push({ id: "1", action: "http_request", params: { url: "https://api.example.com/start", method: "POST" } });
    steps.push({ id: "2", action: "transform", params: { mapping: "default" } });
    steps.push({ id: "3", action: "store", params: { target: "database" } });
  }

  return steps;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AutomationRequest;

    if (!body.workflow || typeof body.workflow !== "string") {
      return NextResponse.json(
        { error: "Missing required field: workflow" },
        { status: 400 }
      );
    }

    const steps = body.steps && body.steps.length > 0 ? body.steps : generateSteps(body.workflow);
    const traceId = generateId();
    const startTime = Date.now();

    // Execute steps sequentially
    const results: StepResult[] = [];
    let completedSteps = 0;
    let failedSteps = 0;

    for (const step of steps) {
      const result = simulateExecution(step);
      results.push(result);
      if (result.status === "completed") completedSteps++;
      if (result.status === "failed") failedSteps++;
    }

    const overallStatus =
      failedSteps === 0
        ? "completed"
        : completedSteps > 0
        ? "partial"
        : "failed";

    const totalDuration = Date.now() - startTime;

    const summary =
      overallStatus === "completed"
        ? `Workflow "${body.workflow}" completed successfully. ${completedSteps}/${steps.length} steps executed in ${totalDuration}ms.`
        : overallStatus === "partial"
        ? `Workflow "${body.workflow}" completed with ${failedSteps} failed steps. ${completedSteps}/${steps.length} succeeded.`
        : `Workflow "${body.workflow}" failed. All ${steps.length} steps encountered errors.`;

    return NextResponse.json({
      status: overallStatus,
      workflow: body.workflow,
      trace_id: traceId,
      total_steps: steps.length,
      completed_steps: completedSteps,
      failed_steps: failedSteps,
      results,
      summary,
      total_duration_ms: totalDuration,
    } satisfies AutomationResponse);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "Process Automation API",
    version: "1.0.0",
    description: "Orchestrate and execute automated workflow pipelines",
    docs: "POST /api/automation with { workflow: string, steps?: Step[], input_data?: object }",
  });
}
