---
title: "5 Lezioni di Operations da Aver Costruito e Shippato un Prodotto"
date: "2026-06-28"
locale: "it"
description: "Cosa ho imparato costruendo Trova (un boilerplate SaaS) su delivery, scope, e perché l'ultimo 10% prende il 50% del tempo."
tags: ["Delivery", "Prodotto", "Lezioni", "Scoping"]
author: "Riccardo Bozzato"
published: true
---

Ho costruito lo stesso sistema di autenticazione cinque volte. Magic link, OAuth, 2FA, gestione sessioni — ogni volta un progetto nuovo, ogni volta da zero. Alla quinta volta mi sono fermato e ho chiesto: perché non esiste un boilerplate production-ready che funziona e basta?

Così ho costruito Trova. Un boilerplate SaaS con Next.js 16, Better Auth, Drizzle ORM, Resend, Stripe, i18n e shadcn/ui. Ma questo non è un post sul prodotto — è su cosa ho imparato costruendolo: delivery, scope, operations.

**1. L'ultimo 10% prende il 50% del tempo.** Sempre. L'auth system funzionava al giorno 3. I casi limite (session rotation, provider unlinking, race condition) hanno preso altre due settimane. Vedo questo pattern in ogni progetto che ho gestito, dalle piattaforme e-commerce alle integrazioni enterprise. Il traguardo del 90% è un miraggio. Pianifica per quello vero.

**2. Lo scope è una negoziazione, non una specifica.** Sono partito con una lista chiara di funzionalità. A metà strada mi sono ritrovato a costruire un generatore di demo, un sistema di licenze e una pagina changelog. Nessuna di queste era nel piano originale. Ogni feature aveva una giustificazione ragionevole. Il costo aggregato? Due mesi extra. Dire "no" a una buona feature è più difficile che dire "no" a una cattiva — ed è più importante.

**3. Gli strumenti sono moltiplicatori, non soluzioni.** Ho scelto ogni tool con cura: Better Auth per l'auth, Resend per le email, Stripe per i pagamenti. Ognuno mi ha risparmiato settimane. Ma il costo d'integrazione — sincronizzazione dati, gestione errori, idempotenza — è stato più alto del beneficio di ogni singolo tool. Questo è esattamente il pattern che vedo nelle operations: comprare il meglio di ogni categoria, poi soffrire la tassa d'integrazione.

**4. La documentazione è delivery.** Ho scritto guide di setup complete, API reference e documenti di migrazione. Non perché gli utenti le chiedessero, ma perché una buona documentazione è la differenza tra un prodotto che viene adottato e uno che prende polvere. Nelle operations vale lo stesso: un processo ben documentato può essere eseguito, auditato e migliorato. Un processo non documentato è conoscenza tribale con un singolo punto di fallimento.

**5. Non puoi ottimizzare ciò che non misuri.** Ho tracciato ogni tempo di build, ogni deploy, ogni segnalazione utente. I dati hanno mostrato pattern che non avrei notato altrimenti — come il fatto che gli errori dei webhook Stripe si concentravano il lunedì mattina (un problema di cache con il layer di idempotenza). Nelle operations, questo è il gioco. Se non hai metriche, navighi a vista.

Costruire Trova ha preso quattro mesi in più del previsto. Ma le lezioni operative che ho imparato da quel processo mi hanno fatto risparmiare anni di errori in ogni progetto successivo.
