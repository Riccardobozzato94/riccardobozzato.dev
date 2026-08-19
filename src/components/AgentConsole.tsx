"use client";

import Avatar from "@/components/Avatar";

/**
 * Console agente — pannello destro della hero.
 * Log finti che scorrono (animazione staggered), stile terminale.
 */
const LOGS: { text: string; kind: "cmd" | "ok" | "muted" | "warn" }[] = [
  { text: "$ agent0 deploy --env prod", kind: "cmd" },
  { text: "[ok] planner init · tools: filesystem, browser, shell", kind: "ok" },
  { text: "[ok] mcp servers connected (3)", kind: "ok" },
  { text: "[ok] eval harness · golden cases: 10/10 PASS", kind: "ok" },
  { text: "[ok] agent0 online — 3 agents in production", kind: "ok" },
  { text: "$ watch automation queue", kind: "cmd" },
  { text: "[15:42:01] doc_4711.pdf → extracted: 2 dates, 1 amount", kind: "muted" },
  { text: "[15:42:03] prescrizione check: art. 28 L.689/1981 → pending", kind: "warn" },
  { text: "[15:42:05] report.json written to output/", kind: "muted" },
  { text: "$ uptime", kind: "cmd" },
  { text: "agents: 3 · automations: 15 · docs: 500+ · status: green", kind: "ok" },
];

export default function AgentConsole({ title }: { title: string }) {
  return (
    <div className="terminal-window relative" aria-hidden>
      {/* Header finestra */}
      <div className="terminal-header">
        <span className="terminal-dot close" />
        <span className="terminal-dot minimize" />
        <span className="terminal-dot maximize" />
        <span className="ml-3 text-[10px] text-muted-foreground tracking-wider uppercase">
          {title}
        </span>
      </div>

      {/* Avatar + logs */}
      <div className="terminal-body relative min-h-[280px]">
        <div className="absolute top-4 right-5 opacity-90">
          <Avatar size={92} ariaHidden />
        </div>
        <div className="pr-24">
          {LOGS.map((line, i) => (
            <div
              key={i}
              className={`console-log font-mono text-[11px] md:text-xs leading-relaxed ${
                line.kind === "ok"
                  ? "console-log-ok"
                  : line.kind === "warn"
                    ? "console-log-warn"
                    : line.kind === "cmd"
                      ? "text-foreground/90"
                      : "console-log-muted"
              }`}
              style={{ animationDelay: `${0.4 + i * 0.35}s` }}
            >
              {line.text}
            </div>
          ))}
          <span className="cursor-blink mt-1" />
        </div>
      </div>
    </div>
  );
}