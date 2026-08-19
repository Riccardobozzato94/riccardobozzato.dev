---
title: "agent0: anatomy of an open-source agent platform"
date: "2026-07-30"
locale: "en"
description: "Local LLMs, MCP servers, planner and tool-loop: how I architected agent0, from scheduler to eval harness, and the lessons from bringing 3 agents to production."
tags: ["AI", "Agents", "MCP", "Architecture", "Python"]
author: "Riccardo Bozzato"
published: true
---

"Ready-to-use" agents have a problem: they don't run on your servers, they can't see your files, and they can't be evaluated. Every prototype dies at the first integration.

agent0 is my answer: a complete self-hosted platform for AI agents. This article walks through the anatomy of the system — local LLMs, MCP servers, planner with tool-loop, eval harness — and the lessons from bringing 3 agents to production.

### The building blocks

- **Local LLMs (Ollama)**: no cloud dependency, no data leaks, predictable costs
- **MCP servers**: controlled access to filesystem, browser and shell
- **Planner with tool-loop**: the model decides, tools execute, the loop verifies
- **Eval harness**: 10+ golden cases blocking regressions on every commit

### Lessons learned

1. Eval comes before deploy, not after
2. Tool access must be designed as an attack surface, not an afterthought
3. Self-hosted isn't a luxury: it's the precondition for working on real documents

The project is described in the [agent0](/projects/agent0) case study.

_Full version coming soon._