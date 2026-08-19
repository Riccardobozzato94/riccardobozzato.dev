---
title: "Ho usato un LLM locale per contestare le cartelle esattoriali"
date: "2026-08-25"
locale: "it"
description: "Come ho costruito un agente che legge PDF burocratici, estrae date e importi e verifica la prescrizione (art. 28 L. 689/1981). Il caso d'uso più concreto dell'anno: un LLM che salva tempo e soldi senza mandare nulla nel cloud."
tags: ["AI", "LLM", "Ollama", "Automazione", "RAG"]
author: "Riccardo Bozzato"
published: true
---

Le cartelle esattoriali sono il peggior formato di comunicazione mai inventato: date e importi sepolti in paragrafi illegibili, enti che si sovrappongono, riferimenti normativi che nessuno legge. Il problema non è la burocrazia in sé — è che nessuno ha mai costruito uno strumento per capirla.

Questo articolo è il caso d'uso più concreto che ho costruito quest'anno: un agente che legge il PDF, estrae le informazioni strutturate e verifica se una cartella è prescritta (art. 28 L. 689/1981). Tutto con LLM locali, zero dati nel cloud.

### Il problema

Una multa, una lettera INPS, una cartella esattoriale: date, importi, ente mittente, termini di prescrizione. In un formato pensato per scoraggiare la lettura. Nessuno sa se una cartella è prescritta — e nessun tool aiuta.

### La soluzione

Un agente Python che:

1. riceve il PDF in ingresso
2. estrae date, importi ed ente con un LLM locale (Ollama)
3. verifica la prescrizione applicando l'art. 28 L. 689/1981
4. produce un report JSON strutturato, pronto per workflow e team

Distribuito anche come workflow n8n per team e commercialisti.

### I risultati

500+ documenti analizzati: estrazione e verifica in secondi, invece che ore. Il dettaglio completo del progetto è nel case study [Bureaucracy Analyzer](/projects/bureaucracy-analyzer).

_Articolo in arrivo — versione completa in preparazione._