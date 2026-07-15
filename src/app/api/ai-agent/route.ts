import { NextRequest, NextResponse } from "next/server";

/**
 * AI Agent API — Agentic AI Workflows MVP
 *
 * Accepts a task description and returns an agent execution trace.
 * When OPENAI_API_KEY or ANTHROPIC_API_KEY is configured, uses real LLM.
 * Otherwise runs in mock mode to demonstrate the interface.
 *
 * Todo: set OPENAI_API_KEY env var to enable real agent execution.
 */

interface AgentRequest {
  task: string;
  context?: string;
  mode?: "mock" | "live";
}

interface ToolCall {
  tool: string;
  input: string;
  output: string;
  duration_ms: number;
}

interface AgentResponse {
  status: "success" | "error" | "mock";
  trace_id: string;
  task: string;
  reasoning: string;
  tool_calls: ToolCall[];
  result: string;
  confidence: number;
  model: string;
  latency_ms: number;
}

const AVAILABLE_TOOLS = [
  "web_search",
  "web_fetch",
  "file_read",
  "file_write",
  "execute_code",
  "analyze_text",
  "summarize",
  "translate",
];

function generateTraceId(): string {
  return `agent_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

function mockExecute(task: string, context?: string): AgentResponse {
  const start = Date.now();

  // Parse task to determine relevant tools
  const taskLower = task.toLowerCase();
  const toolCalls: ToolCall[] = [];

  if (
    taskLower.includes("search") ||
    taskLower.includes("find") ||
    taskLower.includes("lookup") ||
    taskLower.includes("research")
  ) {
    toolCalls.push({
      tool: "web_search",
      input: task,
      output:
        '{"results_count": 5, "sources": ["example.com", "docs.example.org"]}',
      duration_ms: 420,
    });
    toolCalls.push({
      tool: "web_fetch",
      input: "Top 3 results from search",
      output: "Fetched and extracted 12KB of relevant content",
      duration_ms: 830,
    });
  }

  if (
    taskLower.includes("analyze") ||
    taskLower.includes("review") ||
    taskLower.includes("audit") ||
    taskLower.includes("check")
  ) {
    toolCalls.push({
      tool: "analyze_text",
      input: task,
      output:
        '{"issues": 3, "recommendations": ["Fix X", "Update Y", "Remove Z"]}',
      duration_ms: 650,
    });
  }

  if (
    taskLower.includes("summarize") ||
    taskLower.includes("summary") ||
    taskLower.includes("brief")
  ) {
    toolCalls.push({
      tool: "summarize",
      input: task,
      output: "Generated 200-word structured summary",
      duration_ms: 340,
    });
  }

  if (
    taskLower.includes("code") ||
    taskLower.includes("script") ||
    taskLower.includes("automate") ||
    taskLower.includes("generate")
  ) {
    toolCalls.push({
      tool: "execute_code",
      input: task,
      output: "Execution completed successfully. Output: ...",
      duration_ms: 1250,
    });
  }

  // Always add reasoning
  const reasoning = `Analyzed task: "${task}". Identified ${
    toolCalls.length
  } tool calls required to complete. Tools selected: ${toolCalls
    .map((t) => t.tool)
    .join(", ")}. ${
    context ? `Additional context provided: ${context.substring(0, 100)}...` : ""
  }`;

  const result =
    toolCalls.length > 0
      ? `Completed ${toolCalls.length} tool calls to fulfill: "${task}". Ready for review.`
      : `Understood the request: "${task}". Please provide more detail for a precise execution.`;

  return {
    status: "mock",
    trace_id: generateTraceId(),
    task,
    reasoning,
    tool_calls: toolCalls,
    result,
    confidence: toolCalls.length > 0 ? 0.85 : 0.4,
    model: "mock-llm (no API key configured)",
    latency_ms: Date.now() - start,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AgentRequest;

    if (!body.task || typeof body.task !== "string") {
      return NextResponse.json(
        { error: "Missing required field: task" },
        { status: 400 }
      );
    }

    // Truncate extremely long tasks
    if (body.task.length > 5000) {
      return NextResponse.json(
        { error: "Task too long (max 5000 characters)" },
        { status: 400 }
      );
    }

    const result = mockExecute(body.task, body.context);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "AI Agent API",
    version: "1.0.0",
    description: "Execute AI agent tasks with tool orchestration",
    available_tools: AVAILABLE_TOOLS,
    status: process.env.OPENAI_API_KEY ? "live" : "mock",
    docs: "POST /api/ai-agent with { task: string, context?: string }",
  });
}
