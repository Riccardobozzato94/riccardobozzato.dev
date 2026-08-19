---
title: "agent0: anatomia di una piattaforma agenti open-source"
date: "2026-07-30"
locale: "it"
description: "LLM locali, MCP server, planner e tool-loop: come ho architettato agent0, dallo scheduler all'eval harness, e le lezioni apprese portando 3 agenti in produzione."
tags: ["AI", "Agenti", "MCP", "Architettura", "Python"]
author: "Riccardo Bozzato"
published: true
---

Gli agenti "pronti all'uso" hanno un problema: non girano nei tuoi server, non vedono i tuoi file e non si possono valutare. Ogni prototipo muore alla prima integrazione.

agent0 è la mia risposta: una piattaforma completa self-hosted per agenti AI. Questo articolo racconta l'anatomia del sistema — LLM locali, server MCP, planner con tool-loop, eval harness — e le lezioni apprese portando 3 agenti in produzione.

### I mattoni

- **LLM locali (Ollama)**: niente dipendenze dal cloud, niente data leak, costi prevedibili
- **Server MCP**: accesso controllato a filesystem, browser e shell
- **Planner con tool-loop**: il modello decide, gli strumenti eseguono, il loop verifica
- **Eval harness**: 10+ golden case che bloccano le regressioni a ogni commit

### Le lezioni

1. L'eval viene prima del deploy, non dopo
2. L'accesso ai tool va progettato come una superficie di attacco, non come un'afterthought
3. Self-hosted non è un lusso: è la condizione per lavorare su documenti veri

Il progetto è descritto nel case study [agent0](/projects/agent0).

_Articolo in arrivo — versione completa in preparazione._