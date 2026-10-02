---
title: "Sei lezioni che ho imparato costruendo un prodotto SaaS"
date: "2025-12-15"
locale: "it"
description: "Non un caso di studio commerciale. Le decisioni che ho preso e che si sono rivelate sbagliate, con il numero che me l'ha detto."
tags: ["Operations", "Prodotto", "Delivery"]
author: "Riccardo Bozzato"
published: true
---
Ho costruito un boilerplate SaaS e l'ho venduto. La parte interessante non è il prodotto: sono le sei decisioni che ho preso, due delle quali erano sbagliate, e i numeri che me l'hanno detto.

## Lezione 1 — lo scope ideale va in un documento, non nella testa

Ho passato quattro mesi su un progetto che poteva fare trenta cose. Ne ha fatte sei. E la parte che mi ha salvato è stata banale: ho scritto, alla terza settimana, la lista di cosa il prodotto non avrebbe mai fatto.

Non è stato un documento per gli altri. È stato un documento per me, perché il me del mese quattro non ricordava più il perché di ogni scelta fatta al mese uno.

Da allora è la prima cosa che scrivo in ogni progetto, prima del codice. Non perché sia completo: perché quando, al mese sei, compare l'idea buona, ho qualcosa con cui confrontarla.

## Lezione 2 — "veloce" non è un requisito, è una scusa

Per sei mesi ho chiamato "semplice" tutto quello che non avevo progettato. Poi un cliente mi ha chiesto perché una cosa che avevo detto essere banale richiedeva tre settimane.

Aveva ragione. Non era banale: era non progettato, e "banale" era il modo che avevo trovato per non ancora progettarlo.

La conseguenza pratica: il tempo che perdi a chiamare semplice una cosa non progettata lo perdi due volte. Una volta a costruirla, una volta a rifarla.

## Lezione 3 — la prima versione di un'integrazione è quasi sempre inutile

Ho costruito un'integrazione completa con un sistema di pagamenti: webhook, idempotenza, gestione dei pagamenti falliti, riconciliazione. Testata, documentata, pubblicata.

Il primo cliente l'ha usata in un modo che il codice non prevedeva, e mi ha scritto che gli conveniva fare a mano. Aveva ragione lui: per lui il volume non giustificava l'automazione.

Quella integrazione mi ha fatto perdere cinque settimane per un caso d'uso che il cliente successivo ha ripetuto con volumi dieci volte più alti. La lezione non è "non costruire le integrazioni": è che l'integrazione giusta la definisce il secondo cliente, e il primo cliente non è abbastanza grande per averla.

Quello che ho imparato a fare: costruire la via manuale per prima, e automatizzare alla seconda occorrenza dello stesso gesto. Costa un po' di fatica ripetuta all'inizio e ti risparmia l'automazione di un caso che non si ripete.

## Lezione 4 — la documentazione è una deliverable, non un extra

Ho rilasciato un prodotto con una documentazione scritta per me. Quattro pagine, scritte in tre giorni, piene di assunzioni che solo io avevo.

Due clienti mi hanno fatto la stessa domanda nella stessa settimana. La stessa. Ho riscritto quella pagina e sono passate le domande. Non perché la documentazione fosse scritta male: perché era scritta nell'ordine in cui avevo costruito il prodotto, non nell'ordine in cui lo si usa.

La regola che mi resta: **quando qualcuno fa una domanda, la risposta va nella documentazione prima che nella mail**. Se l'hai scritta una volta sola, la seconda persona che chiede è un costo che ti è già costato una volta.

## Lezione 5 — vendere prima della terza feature

Ho tenuto un prezzo "in uscita" per sei settimane. Il ragionamento era sensato: se qualcuno lo compra, il prodotto è reale.

Nessuno l'ha comprato. Ho continuato a costruire, a correggere, a rifinire, e i sei mesi successivi non hanno cambiato la domanda di una persona. Il prezzo non era il problema. Il problema era che chiedevo a qualcuno di pagare prima di avergli dato un motivo, e quel motivo era una terza feature che a me sembrava importante.

Quella lezione mi è costata sei mesi di tempo che oggi non userei così.

## Lezione 6 — il supporto dice cosa il prodotto dovrebbe fare

Ho tenuto un registro di ogni domanda che mi facevano i clienti. Non dei bug: delle domande.

Sei mesi di domande, ventitré voci. Quindici erano la stessa domanda con parole diverse. E sette indicavano cose che il prodotto non aveva, che però nessuno aveva chiesto esplicitamente.

Le sette sono finite nel prodotto. Le quindici sono finite in una pagina che si chiama "è già previsto, e funziona così". E la seconda è quella che ha prodotto più valore, perché non aggiungevo niente: eliminavo una domanda che si faceva ogni settimana.

## Quello che non ho imparato

Non ho imparato a prevedere cosawould funzionare. Non l'ho capito e credo che non si capisca.

Quello che ho imparato è a notare la differenza tra le cose che funzionano perché le ho fatte bene e quelle che funzionano perché qualcuno me l'ha chiesto due volte. Le seconde valgono di più, quasi sempre, e sono molto più facili da trovare: basta un registro delle domande.
