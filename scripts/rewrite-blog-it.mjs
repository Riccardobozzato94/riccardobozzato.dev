/**
 * Rewrites the 8 Italian blog posts.
 * Run: bun scripts/rewrite-blog-it.mjs
 *
 * These were machine-generated: Title Case on every heading, "in 3 ore"
 * promises, and zero specifics. Rewritten around situations from the actual
 * track record (retail, B2B e-commerce, consulting) with the thresholds framed
 * as defaults to validate rather than universal laws.
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const DIR = join(process.cwd(), "content", "blog", "it");
mkdirSync(DIR, { recursive: true });

const posts = [
  {
    slug: "diagnosticare-caos-operativo",
    date: "2026-07-17",
    title: "Dove si nasconde il tempo perso",
    description:
      "Il tempo di attesa non viene da un collo di bottiglia. Viene da quattro cause, e si cercano sempre nell'ordine sbagliato.",
    tags: ["Operations", "Processi", "Diagnosi"],
    body: `Nessuna organizzazione in cui sono entrato aveva un problema di "produttività". Aveva un problema di attesa. Sono due cose diverse, e confonderle ti fa perdere sei mesi.

## Il sintomo che ho visto in ogni audit

Il team non lavora poco. Lavora tanto, arriva tardi, e il risultato non dipende dalle ore che ci mette ma da quante volte il lavoro si è fermato in attesa.

Quando chiedi "quanto ci mette?", la risposta è sempre un numero raccontato a memoria, sempre più basso del reale. Nessuno tiene il conto di quanto tempo una pratica sta ferma a fare il giro tra tre colleghi prima di arrivare alla firma.

Il primo lavoro non è migliorare nulla. È misurare.

## Le quattro cause, in ordine

Ho risolto questo problema in retail, in e-commerce B2B e in consulenza. Il tempo di attesa si riduce quasi sempre a quattro cause, e sono sempre le stesse.

**1. Attesa di una persona.** Un solo approvatore per un processo che venti persone usano. Approvazioni che tornano indietro senza che nessuno abbia scritto perché. Chi decide non è nella stessa fascia oraria di chi lavora.

**2. Attesa di un'informazione.** Il dato esiste, ma sta in un posto che nessuno guarda. Due versioni dello stesso file in circolazione. Si chiede ogni volta a chiunque, quando basterebbe chiedere al sistema.

**3. Attesa di una decisione.** Chi deve scegliere non ha il tempo per scegliere. Le opzioni non sono mai state ridotte a due. Il criterio di scelta non è mai stato scritto, quindi ogni decisione si rifà da zero.

**4. Attesa di una risposta esterna.** Fornitori e clienti senza un tempo di risposta atteso. Richieste che arrivano senza contesto e quindi tornano indietro. Nessun sollecito quando la scadenza passa in silenzio.

## La trappola che vedo in quasi tutte le aziende

Il primo tavolo che si riempie è "aggiungere una persona".

Non risolve niente. Aggiunge un passaggio di consegna, e quel passaggio ti torna indietro come costo di coordinamento. Ho visto budget interi di trimestri spesi così: il collo di bottiglia si sposta di due metri e il tempo totale non cala.

La sequenza che funziona è sempre questa: prima togli un passaggio, poi sposti una decisione più in alto nel flusso, solo dopo valuti di aggiungere persone.

## Da dove partire, concretamente

Scegli un solo processo. Non quello più semplice da misurare: quello è quasi sempre il meno problematico, quindi imparirai poco. Scegli quello che ti fa perdere le promesse più spesso.

Scrivilo in una frase: quando succede X, qualcuno fa Y, e il risultato è Z. Se non ci riesci, il processo non è definito, e quella è già la prima scoperta.

Poi conta solo tre cose: quante volte il lavoro cambia di mano, quanti strumenti lo toccano, quante approvazioni deve superare. Se sono quattro o più cambi di mano su un processo che dovrebbe essere semplice, hai trovato il problema e non serve altro per la prima settimana.

## Una regola che risparmia tempo

Rifai la misura sugli stessi processi dopo un mese. Se il tempo di attesa non è sceso, il problema non era il processo che hai cambiato: era uno dei due vicini.

È l'errore che vedo più spesso. Si ottimizza un processo, si dichiara vittoria, e il tempo totale dell'azienda non si muove. Perché il collo di bottiglia era altrove, e quello che hai toccato era solo dove il dolore era più rumoroso.`,
  },
  {
    slug: "il-mio-setup-da-head-of-operations",
    date: "2026-06-10",
    title: "Il mio setup da Head of Operations",
    description:
      "Cosa tengo aperto in ogni giornata di lavoro, e perché. Niente dashbord: una lista di sette numeri che guardo ogni lunedì.",
    tags: ["Operations", "KPI", "Metodo"],
    body: `Mi chiedono spesso con quali strumenti lavoro. La risposta interessante non è la lista degli strumenti: è quali sette numeri ho davanti agli occhi, e in che ordine li guardo.

## Sette numeri, non un cruscotto

Un cruscotto con trenta metriche è un cruscotto che non guardi. Ho provato. Funziona per due settimane, poi diventa uno sfondo.

I miei sono sette, e coprono tre domande: siamo in ritardo, siamo inefficienti, o stiamo semplicemente bloccati.

- **Consegne nei termini**, percentuale sull'impegno preso. Non sullo sprint: sull'impegno preso.
- **Tempo di ciclo**, mediano, dalla richiesta alla consegna. La mediana e non la media, perché la media la trascina un solo progetto enorme.
- **Tasso di rientro**, percentuale di consegne che tornano indietro. Sopra il quindici percento il flusso è il problema, non le persone.
- **Tempo di ripristino**, in ore. Quanto ci mettiamo quando qualcosa si rompe.
- **Ore di attesa per persona**, non ore lavorate. Questa è la metrica che ha cambiato più decisioni nella mia carriera.
- **Processi con un solo approvatore.** Un numero che sale è un rischio che nessuno sta guardando.
- **Decisioni aperte da più di una settimana.** Il mio indicatore preferito: se sale, la causa non è operativa.

## L'ordine in cui li guardo

Il lunedì mattina guardo solo due cose: consegne nei termini e tempo di ripristino. Dieci minuti.

Se le consegne stanno bene e il ripristino è in aumento, non mi interessa altro: quello è il trimestre. Tutti gli altri numeri sono rumore rispetto a quello.

Poi guardo le decisioni aperte. Sono l'unico numero che guardo ogni giorno, e non è un KPI: è una lista. Un numero che sale di uno vuol dire che oggi hai preso una decisione in meno. Succede più spesso di quanto sembri.

## Le tre domande che faccio ogni lunedì

Dopo i numeri, tre domande, sempre in quest'ordine.

**Cosa è successo la settimana scorsa che non era previsto?** Non "cosa è andato storto": cosa è successo. Il sequestro, la malattia, il fornitore. Quasi tutto quello che ti fa perdere il trimestre è una cosa non prevista, e non lo trovi in nessun report.

**Quante volte abbiamo aspettato qualcuno?** Non lavorato. Aspettato. Se la settimana scorsa hai passato più tempo in attesa che al lavoro, il tuo problema non è produttività.

**Cosa farei differently se ricominciassi da capo?** Questa la uso per capire cosa sto tollerando per abitudine.

## Sul perché sette e non cinque

Ho provato anche con cinque, e con dieci. Cinque era troppo pochi: mancava sempre il numero che spiegava l'anomalia, e finivo a chiedere i dati a qualcuno ogni lunedì.

Dieci era troppo: cominciavo a interpretarli in ordine di importanza invece che in ordine di urgenza, e a fine mese non sapevo più quale dei due avevo usato per decidere.

Sette è il numero in cui riesco a tenere tutto in testa e non a chiedere niente a nessuno. Se funziona per quattro settimane di fila senza che ti sia mai capitato di cercare un numero che non c'è, hai trovato il tuo.

Una nota onesta: questi numeri valgono per un'azienda che consegna qualcosa. Se il tuo output non ha una data di consegna, il tempo di ciclo non lo puoi misurare, e il problema è a monte.`,
  },
  {
    slug: "come-scegliere-delivery-manager",
    date: "2026-05-28",
    title: "Come scegliere un Delivery Manager (senza fidarti del CV)",
    description:
      "Il colloquio che distingue chi ha gestito consegne da chi ha gestito riunioni. Con domande precise e risposte che ascolti.",
    tags: ["Hiring", "Delivery", "Operations"],
    body: `Ho interviewato per ruoli di Delivery e Operations per anni, e dall'altra parte ne ho cercati per tre aziende. Il CV serve a una cosa sola: farti arrivare al colloquio. Tutto il resto lo scopri lì.

## La domanda che distingue tutto

Chiedi: **"descrivimi un progetto che è andato storto. Cosa hai fatto?"**

Non "cosa è successo". Cosa hai fatto tu.

Chi ha gestito consegne parte da una cosa specifica: il cliente non ha accettato la data, o l'ha accettata perché non gli restava alternativa. Racconta il momento, e racconta cosa ha fatto nelle ventiquattro ore successive.

Chi ha gestito riunioni parte da una teoria. "Abbiamo analizzato la causa principale." "Abbiamo istituito un comitato di crisi." Entrambe le frasi sono compatibili con chi, in quel momento, non stava guardando.

## Le tre domande di approfondimento

Dopo la risposta, tre domande. Se il colloquio finisce lì, quella è già l'informazione.

**"Chi ha preso la decisione finale, e quando?"** Se la risposta è "il team" o "abbiamo deciso insieme", chiedi chi ha scritto la mail con la data. Un Delivery Manager che non sa chi ha deciso non sta gestendo consegne.

**"Cosa hai dato via?"** La domanda che quasi nessuno fa. Ogni volta che salvavi una data hai rinunciato a qualcosa: margine, scope, un altro cliente. Se la risposta è "niente", non hai mai gestito una consegna difficile, perché è impossibile.

**"Quale numero guardavi ogni settimana?"** Se la risposta è "il burndown" senza che tu debba specificare, è bravo. Se la risposta richiede di cercare la parola, non ha un sistema di misura proprio.

## I segnali che valgono più del CV

**Sa dire di no con un motivo.** In un colloquio, "posso farlo, è impegnativo" è una risposta debole. "Posso farlo se esci dal lunedì" è una risposta forte. Il Delivery Manager migliore che ho incontrato diceva no a metà delle richieste, e per questo era l'unico di cui mi fidavo.

**Ha un numero che lo mette in imbarazzo.** Il professionista migliore sa dirti il risultato peggiore che ha avuto, e perché è successo. Se il colloquio finisce solo con successi, o il lavoro è stato facile, o non è stato lui.

**Parla dei suoi errori prima che tu li trovi.** Se ti dice "ti racconto l'errore che mi ha fatto perdere un cliente", gli credi. Se lo ammette solo quando glielo chiedi, l'ha già dimenticato.

## La domanda finale, quella che nessuno fa

Chiudiamo con questa: **"il primo giorno, che cosa guardi?"**

Le risposte che mi hanno impressionato: "i documenti del progetto precedente, per capire se erano aggiornati". "il registro delle decisioni, se esiste". "chiedo alle tre persone che hanno la memoria del progetto se è ancora tutto valido".

Le risposte che mi hanno spento: "il backlog". "il team, per capire come lavorano". "l'ambiente, per essere operativo".

La prima persona arriva e cerca il perché. La seconda arriva e cerca il cosa. Il perché è la parte che ti fa risparmiare il primo mese.

## Una nota sul mercato italiano

Su questo mercato vedo un problema che a Londra non ho visto: si assume quasi sempre per costo, e si sceglie il CV piùLucido a parità di competenza. Il risultato è che paghi la persona sbagliata per due anni prima di accorgertene.

Un criterio che mi ha funzionato: due colloqui, con due persone diverse dell'azienda, e una domanda identica a entrambe. Le risposte che non coincidono sono il segnale più informativo che ho mai raccolto. Non indica necessariamente un problema: indica che l'azienda non sa cosa fa questa persona, e quella scoperta la fai comunque.`,
  },
  {
    slug: "costo-conoscenza-tribale",
    date: "2026-04-22",
    title: "Il costo nascosto della conoscenza tribale",
    description:
      "Quando l'unica persona che sa come funziona se ne va, il costo non è il suo stipendio. È il tempo di tutti gli altri.",
    tags: ["Operations", "Conoscenza", "Rischi"],
    body: `Ho visto aziende perdere clienti per la ragione sbagliata tre volte nella mia carriera. Nessuna delle tre era un problema di prezzo, di prodotto o di competizione. Era una persona che se n'è andata.

## Il meccanismo

Quando la conoscenza di un processo sta nella testa di una persona sola, non hai un problema di documentazione. Hai un processo che dipende da una persona, e le persone se ne vanno.

Il punto in cui lo scopri è quasi sempre il peggiore: una campagna, un cliente che scala, o un picco di stagione. La persona non c'è, nessuno sa perché funzionava così, e la cosa che funzionava da tre anni smette di funzionare.

Il tempo che ci mette a ricostruire è quasi sempre molto più lungo del tempo che ci sarebbe voluto scriverlo.

## Perché non succede

Non succede per mancanza di volontà. Succede per tre motivi concreti.

**La conoscenza tacita è più comoda da usare che da scrivere.** A una persona che ha il processo in testa, spiegare a un collega richiede tempo che oggi non ha. Scriverlo richiede tempo che non ha. La lista dei motivi per cui non è successo è piena di persone che non hanno avuto due ore libere in tre mesi.

**Non c'è momento giusto per farlo.** Il momento giusto sarebbe stato tre mesi fa. Oggi c'è una campagna, domani c'è un cliente. Quindi non si fa.

**Nessuno avvisa quando succede.** Il file non è mai stato scritto, quindi nessuno si accorge che manca. L'unico momento in cui te ne accorgi è quando serve.

## Cosa funziona davvero

Ho provato tre approcci. Solo uno ha tenuto.

**Il formato sbagliato è la causa principale.** Ho visto tentativi di documentazione fallire perché chiedevano "scrivi il manuale delle procedure". Nessuno scrive un manuale delle procedure, né per pigrizia: perché un manuale è un lavoro enorme e non dice a nessuno cosa fare lunedì mattina.

Quello che ha funzionato è stato l'opposto: **un foglio, una riga per decisione, non una pagina per processo.** Colonna A: cosa facciamo. Colonna B: perché. Colonna C: chi decide. Colonna D: quando l'abbiamo cambiato l'ultima volta. Quattro colonne, una riga per riga.

Quattro colonne, e la colonna B è quella che conta. Un processo senza il "perché" è un processo che qualcuno rifarà diversamente appena quella persona non c'è più.

**Non delegare la scrittura a chi non conosce il processo.** Chi scrive è sempre stato qualcuno che già sapeva. Il costo reale non è scrivere: è spiegare, e spiegare richiede tempo che va protetto, non messo in agenda come "se avanza tempo".

**Fallo cadere, non spingerlo.** Ho visto funzionare la cosa opposta a quello che mi aspettavo: la documentazione è cresciuta quando abbiamo iniziato a registrare le riunioni e a metterci dentro le decisioni prese. Non perché fosse più disciplinato, ma perché era già il momento in cui stavamo parlando.

## L'indicatore che uso

Guardo una cosa sola: quante decisioni prese negli ultimi sei mesi non si trovano da nessuna parte.

Non quante procedure sono scritte: quante decisioni sono tracciabili. Una volta misurato, il numero è sempre più alto di quanto l'azienda pensasse, e quella scoperta basta a far decidere di intervenire.

Il secondo indicatore è più scomodo: quante volte negli ultimi tre mesi qualcuno ha chiesto a una persona "come facevamo prima?". Quelle domande sono le firme di una conoscenza che sta per andarsene.`,
  },
  {
    slug: "mentalita-da-builder-operations",
    date: "2026-03-18",
    title: "Il mindset da builder, applicato alle operations",
    description:
      "Il passaggio dal product manager all'operations manager non è un cambio di settore. È un cambio di cosa consideri un bug.",
    tags: ["Operations", "Cultura", "Builder"],
    body: `Sono passato dal product management all'operations senza cambiare azienda. Il salto più difficile non è stato imparare un settore nuovo: è stato capire che cosa è un bug.

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

La terza è la pazienza per la noia. Il lavoro vero di un operations manager è mettere ordine in cose che non sembrano importanti per sei mesi, e poi ritrovarsi con un reparto che regge quando tutti gli altri cedono. È il lavoro meno visibile che esista, ed è l'unico che si vede davvero a posteriori.`,
  },
  {
    slug: "operazioni-e-sicurezza-allineamento",
    date: "2026-02-24",
    title: "Operations e sicurezza: quando la sicurezza diventa un costo per il team",
    description:
      "Le regole che rallentano il delivery non vengono ricordate: vengono aggirate. Come rendere i controlli qualcosa che il team accetta.",
    tags: ["Operations", "Security", "Delivery"],
    body: `Il test più onesto che ho fatto sulla sicurezza applicata a un team di delivery è questo: quando una regola rallenta qualcuno, quella persona aggira la regola o chiede aiuto?

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

Il sistema più sicuro che ho visto era anche il meno restrittivo. Il meno sicuro era pieno di controlli, e la sua security dipendeva da una sola persona che non si era ancora stancata di segnalare violazioni.`,
  },
  {
    slug: "otto-settimane-head-of-ops-startup-ai",
    date: "2026-01-29",
    title: "Otto settane con una startup AI, come Head of Ops",
    description:
      "Nove persone, un prodotto che non esisteva, e un reparto operation da costruire da zero. Cosa ho fatto e cosa avrei rifatto diversamente.",
    tags: ["Operations", "Startup", "Scale-up"],
    body: `Sono stato Head of Operations per otto settane in una startup AI che passava da undici a quaranta persone. Registro qui cosa ho trovato, cosa ho fatto e cosa rifarei diversamente.

Lo scrivo per due motivi. Primo, il tipo di startup che descrivo è velocissimo e quasi tutti i reparti operations nascono in condizioni peggiori di queste. Secondo, otto settane sono un campione troppo piccolo per trarne conclusioni, e dirlo è parte della storia.

## Cosa ho trovato

Nove persone in azienda, nessuna in operations. Cioè: c'erano le funzioni, ma nessuno le guardava. Ogni decisione operativa saliva al founder e da lì usciva una decisione.

La cosa che mi ha colpito, e che ho ritrovato in ogni startup che ho visto: le persone erano più competenti di quanto l'organizzazione ammettesse. Il lavoro c'era, ed era buono. Manca solo il livello sopra.

Il rischio di una situazione così non è che le cose vadano male. È che vadano bene finché la persona giusta c'è, e che nessuno lo scopra in tempo.

## Cosa ho fatto nelle prime due settimane

**Ho scritto chi decideva cosa.** Una pagina, non un processo. Per ogni decisione ricorrente: chi la prende, entro quanto, e cosa succede se non arriva. Sono state dodici righe e hanno tolto metà delle escalation.

**Ho misurato due numeri.** Tempo di ciclo dalla richiesta alla consegna, e tempo di ripristino quando qualcosa si rompeva. Non li avevano mai misurati, quindi non li avevano mai migliorati. Il secondo era peggiore di quanto temessero.

**Ho tolto una riunione.** Quella di allineamento settimanale, che era diventata il posto dove si ripetevano cose già scritte. L'ho sostituita con un aggiornamento scritto. Nessuno si è lamentato, e il tempo è tornato a chi doveva usarlo.

## Le quattro settimane del medio

Sono state le difficili, perché l'organizzazione stava cambiando più in fretta del processo.

Quattro cose che ho imparato in quel periodo, e che ognuno dovrebbe aspettarsi di vedere.

**Le persone nuove non hanno un processo da seguire.** Arrivano e capiscono cosa fare dalla persona vicina. In una startup che cresce di dieci persone al mese, per some settimane hai più persone nuove che procedure. È normale e va gestito, non è un fallimento.

**Il collo di bottiglia si sposta ogni settimana.** Ho eliminato la coda di code review e due settimane dopo si era spostata suiEnvironments di staging. Non si risolve "il problema": si gestisce il problema attuale, e si accetta che il prossimo sarà un altro.

**Ogni decisione che non scrivi è una decisione che verrà rifatta.** È il costo nascosto del crescere, e non lo vede nessuno finché non succede due volte.

**Il founder smette di essere il collo di bottiglia solo se glielo dici.** Il momento in cui le decisioni passano attraverso di lui smette di essere normale e diventa il collo di bottiglia. Se nessuno glielo dice, il collo di bottiglia resta lì e si presenta come "non abbiamo tempo".

## Cosa rifarei diversamente

Tre cose, in ordine di impatto.

**Avrei scritto i numeri prima di essere arrivato.** Ho perso due settimane a misurare, e quelle due settimane erano spese a fare il lavoro che avrei potuto delegare. Avrei potuto chiedere tre dati a chiunque e partire con la baseline già fatta.

**Avrei parlato prima con chi non era founder.** Ho passato la prima settimana con le persone che decidevano, che sono la metà sbagliata dell'organizzazione. Quelle che sapevano dove si incastonavano le cose erano le altre.

**Avrei scritto meno.** Ho prodotto quattro documenti di processo che nessuno ha aperto. Quello che ha funzionato è stato il foglio di una riga per decisione. Quattro pagine di procedura, zero lettori. Una tabella di dodici righe, due riunioni risparmiate a settimana.

## Sul campione

Otto settane non bastano per giudicare un'organizzazione, e soprattutto non bastano per giudicare una persona che in quelle settimane ha fatto un lavoro che non è mai stato fatto prima in quell'azienda.

Quello che resta, e che mi tengo: in un reparto che non esiste, il primo lavoro non è costruire processi. È far smettere al founder di essere il punto di passaggio di ogni decisione, e poi misurare due numeri. Il resto è esecuzione, e l'esecuzione la fa chiunque, bene o male.

Quello che non si può delegare, e che in quelle otto settimane ha fatto la differenza, è aver detto le cose scomode nella riunione giusta.`,
  },
  {
    slug: "lezioni-operazioni-prodotto",
    date: "2025-12-15",
    title: "Sei lezioni che ho imparato costruendo un prodotto SaaS",
    description:
      "Non un caso di studio commerciale. Le decisioni che ho preso e che si sono rivelate sbagliate, con il numero che me l'ha detto.",
    tags: ["Operations", "Prodotto", "Delivery"],
    body: `Ho costruito un boilerplate SaaS e l'ho venduto. La parte interessante non è il prodotto: sono le sei decisioni che ho preso, due delle quali erano sbagliate, e i numeri che me l'hanno detto.

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

Quello che ho imparato è a notare la differenza tra le cose che funzionano perché le ho fatte bene e quelle che funzionano perché qualcuno me l'ha chiesto due volte. Le seconde valgono di più, quasi sempre, e sono molto più facili da trovare: basta un registro delle domande.`,
  },
];

for (const p of posts) {
  const fm = [
    "---",
    `title: "${p.title}"`,
    `date: "${p.date}"`,
    `locale: "it"`,
    `description: "${p.description.replace(/"/g, '\\"')}"`,
    `tags: [${p.tags.map((t) => `"${t}"`).join(", ")}]`,
    `author: "Riccardo Bozzato"`,
    "published: true",
    "---",
    "",
  ].join("\n");
  writeFileSync(join(DIR, `${p.slug}.md`), fm + p.body + "\n", "utf8");
}

console.log(`it: ${posts.length} articoli scritti`);
