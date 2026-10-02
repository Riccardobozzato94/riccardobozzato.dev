---
title: "Il mindset da builder, applicato alle operations"
date: "2026-03-18"
locale: "it"
description: "Il passaggio dal product manager all'operations manager non è un cambio di settore. È un cambio di cosa consideri un bug."
tags: ["Operations", "Cultura", "Builder"]
author: "Riccardo Bozzato"
published: true
---
Sono passato dal product management all'operations senza cambiare azienda. Il salto più difficile non è stato imparare un settore nuovo: è stato capire che cosa è un bug.

## Il bug è un processo che si ripete

Chi arriva dal prodotto cerca il bug nel software. E va benissimo finché non incontra il modulo che funziona con l'override che ha fatto tre mesi fa a mano.

Un processo che funziona perché ognuno ci mette dentro un pezzo non è un processo. È un processo con dentro un bug, e il bug è l'eccezione non documentata.

La domanda del builder, applicata alle operations, è una sola: **se questo passaggio dovesse essere rifatto domani da una persona che non ha mai visto questo processo, funzionerebbe?**

Se la risposta è no, non hai un problema di documentazione. Hai un processo che regge in piedi sulla memoria di qualcuno.

## I tre sintomi che ho imparato a cercare

**L'eccezione con cognome.** Quando un processo funziona solo perché Marianna sa di non fare una certa cosa, il processo ha un owner implicito. Se Marianna va in ferie, il processo si ferma. Quello non è un processo, è una persona con un ruolo non scritto.

**La correzione che nessuno riesce a ripetere.** Un ticket chiuso che funziona e che nessuno sa spiegare. È la forma più insidiosa di conoscenza tribale: il risultato c'è, la causa no. E tra sei mesi quel risultato non si riproduce, e nessuno sa perché.

**Il processo che funziona "nonostante" gli strumenti.** Se la tua gente tiene delle foglie di controllo perché il gestionale non dice quello che serve, non è un problema di disciplina: è un processo che non è mai stato riprogettato intorno a come si lavora davvero.

## Cosa faccio, in pratica

Non documentare. Progettare.

Quando un processo fa acqua, la mia prima mossa non è scrivere come funziona: è capire quale passaggio non serve. Il nove volte su dieci, il passaggio è stato aggiunto per un motivo che nessuno ricorda più.

È la differenza più utile che ho imparato dal lato builder: **la prima mossa non è aggiungere un test, è togliere il codice morto.** In un processo, il codice morto è il passaggio che nessuno sa spiegare e che tutti evitano. Non costa tempo, non fa danno, occupa solo posto nella mente di chi lo incontra.

Poi, e solo poi, scrivo. E quando scrivo, scrivo il perché.

## La differenza che resta comoda

Chi viene dal prodotto è abituato a misurare con una metrica. L'errore classico è volerne trovare una sola per l'operations, e poi non trovarla, e concludere che il lavoro non è misurabile.

Non è vero. L'operations ha misure, ma sono quasi sempre coppie: tempo di attesa e tempo lavorato. Efficienza, che è il primo diviso il secondo. Nessuna delle due da sola dice niente.

Un Delivery Manager con il 95% di efficienza e un collega con il 40% possono avere lo stesso tempo di ciclo, o tempi diversi a seconda di quanto lavoro c'è sotto. Se guardi solo una delle due, prendi decisioni sbagliate con piena confidenza.

## Cosa porto dal lato builder

Tre cose, che mi hanno reso utile in un reparto che non conoscevo.

La prima è la diff: quando qualcosa si rompe, chiedo "cosa è cambiato?". È la domanda che evita metà delle discussioni, perché mette il dito sulla causa senza accusare nessuno.

La seconda è la piccola modifica reversibile. Di fronte a un problema, la prima mossa non è il piano di trasformazione: è la cosa più piccola che posso cambiare oggi e che posso annullare domani se sbagliamo. Nei processi vale più che nel software, perché il costo di un cambiamento non reversibile in un reparto Operations non lo vede l'ingegnere, lo vede il cliente.

La terza è la pazienza per la noia. Il lavoro vero di un operations manager è mettere ordine in cose che non sembrano importanti per sei mesi, e poi ritrovarsi con un reparto che regge quando tutti gli altri cedono. È il lavoro meno visibile che esista, ed è l'unico che si vede davvero a posteriori.
