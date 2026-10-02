---
title: "Operations e sicurezza: quando la sicurezza diventa un costo per il team"
date: "2026-02-24"
locale: "it"
description: "Le regole che rallentano il delivery non vengono ricordate: vengono aggirate. Come rendere i controlli qualcosa che il team accetta."
tags: ["Operations", "Security", "Delivery"]
author: "Riccardo Bozzato"
published: true
---
Il test più onesto che ho fatto sulla sicurezza applicata a un team di delivery è questo: quando una regola rallenta qualcuno, quella persona aggira la regola o chiede aiuto?

Se aggira, la regola non è un controllo. È un ostacolo, e gli ostacoli si aggirano.

## Il costo invisibile

Nessun reparto security ama dirlo, ma un controllo che aggiunge due passaggi a ogni deploy non costa due passaggi. Costa il numero di persone che smettono di usare la pipeline.

Il team che aggira la pipeline non è un team che non rispetta la sicurezza. È un team che ha trovato un altro modo per consegnare. E quell'altro modo è quasi sempre peggiore per entrambi: nessuna traccia, nessun audit, nessuna possibilità di rollback.

Ho visto il momento esatto in cui succede. Non è la prima aggiramento: è la terza volta che qualcuno lo fa e nessuno ne parla, perché dirlo significherebbe ammettere che il sistema non funziona.

## La regola che va per prima

Una regola di sicurezza entra in un team solo se sposta un numero che a quel team interessa.

Questo cambia la conversazione da "la sicurezza chiede di rallentare" a "la sicurezza chiede di ridurre il tempo di ripristino". Sono due richieste tecnicamente identiche, ma la seconda ha un sponsor.

Il mio test: per ogni controllo che voglio introdurre, chiedo quale numero migliora. Se non c'è risposta, non lo introduco. Non perché sia sbagliato: perché sarà aggirato, e un controllo aggirato è peggio di nessun controllo, perché dà un senso di sicurezza falso.

## L'ordine che mi ha funzionato

In un reparto operations, in quest'ordine.

**Prima le chiavi.** Uno scanner di segreti in CI. Costa minuti, non toglie autonomia, e quando scopre qualcosa il team ringrazia, perché scopre un problema che già aveva e non sapeva.

**Poi i rollback.** Un flag per ogni modifica rischiosa, con rollback immediato. Questo non è un controllo di sicurezza: è un controllo di delivery, e nessun team lo aggira perché toglie ansia.

**Poi l'osservabilità.** Error budget visibile, alert che arriva a qualcuno che può agire e non a una casella condivisa. Un alert che non ha un nome e un'azione è rumore, e il rumore è ciò che rende le persone insensibili agli alert veri.

**La cifratura e la conformità vengono dopo, e non perché contano meno.** Vengono dopo perché sono quelle che il team non può aggirare facilmente, e quindi quelle su cui si può negoziare. Se le imponi per prime, ti scontri con il muro il primo giorno e poi non hai più credibilità per chiedere le altre.

## L'errore che tutti fanno

Mettere l'allerta su tutto. Trenta alert al giorno, nessuno prioritario.

Il team smette di leggere, e nel momento in cui arriva l'unico alert che contava, non lo legge. Non per pigrizia: perché gli altri ventinove gli hanno già insegnato che gli alert sono rumore.

La regola che uso: se non c'è un'azione chiara da fare, l'alert non esiste. Non è un allarme. È solo un costo.

## Il punto in cui diventa un problema culturale

Il segnale che la sicurezza è diventata un costo, e non è il numero di incidenti: è il numero di volte in cui qualcuno dice "non posso toccare questo perché è bloccato", senza sapere esattamente perché.

Quel "non posso" è il momento in cui la persona ha smesso di chiedere e ha smesso di segnalare. A quel punto il sistema non ti protegge più, perché l'informazione su cosa sta succedendo non arriva più da quella persona.

Il sistema più sicuro che ho visto era anche il meno restrittivo. Il meno sicuro era pieno di controlli, e la sua security dipendeva da una sola persona che non si era ancora stancata di segnalare violazioni.
