---
title: "I used a local LLM to dispute tax collection notices"
date: "2026-08-25"
locale: "en"
description: "How I built an agent that reads bureaucratic PDFs, extracts dates and amounts, and checks prescription (art. 28 L. 689/1981). The most concrete use case of the year: an LLM saving time and money without sending anything to the cloud."
tags: ["AI", "LLM", "Ollama", "Automation", "RAG"]
author: "Riccardo Bozzato"
published: true
---

Tax collection notices are the worst communication format ever invented: dates and amounts buried in unreadable paragraphs, overlapping agencies, legal references nobody reads. The problem isn't bureaucracy itself — it's that nobody ever built a tool to understand it.

This article covers the most concrete use case I built this year: an agent that reads the PDF, extracts structured information and checks whether a notice is prescribed (art. 28 L. 689/1981). All with local LLMs, zero data in the cloud.

### The problem

A fine, an INPS letter, a tax notice: dates, amounts, sending agency, prescription deadlines. In a format designed to discourage reading. Nobody knows whether a notice is prescribed — and no tool helps.

### The solution

A Python agent that:

1. takes the PDF in
2. extracts dates, amounts and agency with a local LLM (Ollama)
3. checks prescription under art. 28 L. 689/1981
4. produces a structured JSON report, ready for workflows and teams

Also distributed as an n8n workflow for teams and accountants.

### Results

500+ documents analyzed: extraction and verification in seconds, not hours. Full project details are in the [Bureaucracy Analyzer](/projects/bureaucracy-analyzer) case study.

_Full version coming soon._