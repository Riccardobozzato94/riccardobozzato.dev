---
title: "Quality gate per progetti GenAI: le metriche che contano"
date: "2026-08-11"
locale: "it"
description: "La maggior parte dei progetti GenAI fallisce perché nessuno definisce cosa significa \"funziona\". Eval harness, golden case, regressioni: il sistema di qualità che uso in produzione e come replicarlo."
tags: ["GenAI", "Quality", "Eval", "Engineering"]
author: "Riccardo Bozzato"
published: true
---

La maggior parte dei progetti GenAI non fallisce per colpa del modello. Fallisce perché nessuno ha definito cosa significa "funziona".

Una demo impressionante non è un sistema. Un sistema è qualcosa che risponde in modo prevedibile a input sconosciuti, e che non regredisce quando cambi qualcosa. Questo articolo spiega il sistema di qualità che uso in produzione: eval harness, golden case e regressioni.

### Il problema delle "vibes"

Senza eval, le decisioni si prendono a sensazione: "sembra funzionare", "mi piace la risposta", "proviamo così". È il modo più costoso di costruire software.

### Golden case

Un golden case è un input con una risposta attesa, verificabile. Dieci golden case ben scelti valgono più di mille test vaghi. Ogni commit che rompe un golden case viene bloccato prima del deploy.

### Regressioni

L'eval harness non si usa una volta: si usa a ogni commit. È il quality gate che tiene in produzione gli agenti senza sorprese.

Il sistema completo è descritto nel case study [agent0](/projects/agent0).

_Articolo in arrivo — versione completa in preparazione._