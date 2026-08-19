---
title: "Quality gates for GenAI projects: the metrics that matter"
date: "2026-08-11"
locale: "en"
description: "Most GenAI projects fail because nobody defines what \"works\" means. Eval harnesses, golden cases, regressions: the quality system I use in production and how to replicate it."
tags: ["GenAI", "Quality", "Eval", "Engineering"]
author: "Riccardo Bozzato"
published: true
---

Most GenAI projects don't fail because of the model. They fail because nobody defined what "works" means.

An impressive demo is not a system. A system responds predictably to unknown inputs and doesn't regress when you change something. This article covers the quality system I use in production: eval harnesses, golden cases and regressions.

### The "vibes" problem

Without eval, decisions are made by feel: "seems to work", "I like the answer", "let's try it this way". It's the most expensive way to build software.

### Golden cases

A golden case is an input with an expected, verifiable answer. Ten well-chosen golden cases are worth more than a thousand vague tests. Any commit that breaks a golden case is blocked before deploy.

### Regressions

The eval harness isn't used once: it's used on every commit. It's the quality gate that keeps agents in production without surprises.

The full system is described in the [agent0](/projects/agent0) case study.

_Full version coming soon._