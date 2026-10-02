"use client";

/**
 * Site assistant.
 *
 * Deliberately NOT a language model. It answers from a fixed fact base built
 * from what the site actually says, and when the question is outside that base
 * it says so and offers contact. A chat widget that invents an answer about
 * pricing, availability or deliverables is worse than no widget at all: this
 * site sells trust.
 *
 * Answers are matched on keyword overlap with a small local index. No API key,
 * no cost, no request leaves the visitor's browser, and it cannot leak data.
 */
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Msg = { from: "bot" | "user"; text: string };

type Entry = {
  keys: string[];
  it: string;
  en: string;
};

const KB: Entry[] = [
  {
    keys: ["cosa fai", "di cosa ti occupi", "chi sei", "presentazione", "about", "what do you do", "background"],
    it: "Sono un Delivery Manager e Head of Operations. Sette anni fra retail (In's Mercato, Aldi), consulenza (Accenture) ed e-commerce B2B (Esse Solutions), dove ho gestito un portfolio da €500K su Magento, Shopware e Pimcore. Ho introdotto Agile in un'organizzazione che non lo usava: +25% di produttività e -40% di time-to-market.",
    en: "I am a Delivery Manager and Head of Operations. Seven years across retail (In's Mercato, Aldi), consulting (Accenture) and B2B e-commerce (Esse Solutions), where I ran a €500K portfolio on Magento, Shopware and Pimcore. I introduced Agile to an organisation that did not use it: +25% productivity and -40% time-to-market.",
  },
  {
    keys: ["servizi", "consulenza", "audit", "operational audit", "services", "consulting", "work with you"],
    it: "Tre livelli: Operational Audit (7 giorni, la fotografia onesta delle operations con i top-5 sprechi quantificati), Operations Overhaul (6-8 settimane, sistema operativo completo) e Fractional Head of Operations (funzione part-time per aziende post-PMF). I prezzi si concordano in call e non sono pubblicati sul sito.",
    en: "Three tiers: Operational Audit (7 days, an honest picture of your operations with the top five quantified leaks), Operations Overhaul (6-8 weeks, a complete operating system) and Fractional Head of Operations (a part-time function for post-PMF companies). Prices are agreed on a call and are not published on the site.",
  },
  {
    keys: ["gratis", "gratuito", "playbook", "foglio", "diagnosi", "scaricare", "free", "download", "worksheet", "diagnostic"],
    it: "La Diagnosi del Time-to-Market: un foglio di lavoro in tre passi che ti fa uscire con tre azioni con un responsabile e una data. Novanta minuti, un processo alla volta. Si scarica dalla pagina /freebie, e con l'email ricevi una sequenza di 6 email su operations.",
    en: "The Time-to-Market Diagnostic: a three-step worksheet that gets you out with three actions, each with an owner and a date. Ninety minutes, one process at a time. Download it from the /freebie page; with your email you also get a six-email sequence on operations.",
  },
  {
    keys: ["disponibile", "quando", "lavoro con me", "disponibilità", "available", "hire", "when can you"],
    it: "Sono disponibile da subito, come Delivery Manager, Head of Ops o PM Senior. Padova, Milano, oppure completamente da remoto.",
    en: "I am available immediately, as Delivery Manager, Head of Ops or Senior PM. Padua, Milan, or fully remote.",
  },
  {
    keys: ["prezzo", "costi", "quanto costa", "tariffa", "price", "cost", "how much"],
    it: "Non pubblico prezzi sul sito, e non è un vezzo: le tariffe cambiano molto in base a dove sei e a cosa hai già provato. In una call di trenta minuti capisco il caso e ti dico un numero. Se vuoi partire dal piccolo, l'Operational Audit è il modo più economico per avere un parere onesto.",
    en: "I do not publish prices, and it is not affectation: rates move a lot depending on where you are and what you have already tried. On a thirty-minute call I understand the case and give you a number. If you want to start small, the Operational Audit is the cheapest way to get an honest opinion.",
  },
  {
    keys: ["sponsor", "pubblicita", "advertising", "sponsorizza", "media kit", "inserzione"],
    it: "C'è una pagina /advertise con il media kit: audience, formati e prezzi indicativi. Rispondo entro due giorni lavorativi.",
    en: "There is an /advertise page with the media kit: audience, formats and indicative pricing. I reply within two business days.",
  },
  {
    keys: ["progetti", "case study", "lavori", "projects", "case study", "panificio", "vulnclaw", "shipkit", "synapse"],
    it: "Il progetto con cliente è Panificio da Sergio: e-commerce per un panificio di famiglia, ancora online, consegnato sotto budget. Gli altri tre sono miei e aperti: VulnClaw (CLI open source per penetration testing), Synapse (il mio vault con ricerca semantica) e ShipKit (boilerplate SaaS). La pagina /projects racconta il percorso operativo per intero.",
    en: "The client project is Panificio da Sergio: e-commerce for a family bakery, still online, delivered under budget. The other three are mine and open: VulnClaw (an open source pentesting CLI), Synapse (my vault with semantic search) and ShipKit (a SaaS boilerplate). The /projects page covers the operational track in full.",
  },
  {
    keys: ["blog", "articoli", "scritto", "articles", "posts", "write"],
    it: "Otto articoli, in italiano e in inglese. I tre che vedo raccomandare di più: dove si nasconde il tempo perso, il mio setup da Head of Operations, e come scegliere un Delivery Manager senza fidarti del CV.",
    en: "Eight articles, in Italian and English. The three I recommend most: where the lost time hides, my setup as Head of Operations, and how to hire a Delivery Manager without trusting the CV.",
  },
  {
    keys: ["libri", "letture", "books", "reading", "libreria", "bookshelf"],
    it: "Due mensole: una di lavoro e una personale. Quindici titoli, con quello che mi hanno cambiato. I link sono di affiliazione Amazon, dichiarati anche nella pagina.",
    en: "Two shelves: one work, one personal. Fifteen titles, with what each of them changed. The links are Amazon affiliate links, disclosed on the page too.",
  },
  {
    keys: ["contatto", "email", "scrivimi", "parliamo", "contact", "email", "get in touch", "reach out"],
    it: "Scrivimi a riccardobozzato@gmail.com, oppure usa il modulo nella pagina /contatti. Rispondo entro un giorno lavorativo.",
    en: "Write to riccardobozzato@gmail.com, or use the form on the /contact page. I reply within one business day.",
  },
  {
    keys: ["privacy", "cookie", "dati", "gdpr", "privacy", "cookies", "data", "gdpr"],
    it: "Il sito usa cookie tecnici sempre attivi, e con il tuo consenso Google Analytics 4 e gli annunci. Puoi scegliere cosa accettare e cambiare idea in qualsiasi momento dal link 'Impostazioni cookie' nel footer. La privacy policy completa è su /privacy.",
    en: "The site uses strictly necessary cookies always on, and with your consent Google Analytics 4 and advertising. You choose what to accept and can change your mind at any time via 'Cookie settings' in the footer. The full privacy policy is on /privacy.",
  },
];

const SUGGESTIONS = {
  it: ["Cosa fai?", "Quanto costa un audit?", "Che cos'è la Diagnosi?", "Progetti", "Prezzi dei servizi"],
  en: ["What do you do?", "How much is an audit?", "What is the Diagnostic?", "Projects", "Service pricing"],
};

function answer(question: string, locale: string): string {
  const q = question.toLowerCase();
  let best: Entry | null = null;
  let bestScore = 0;

  for (const entry of KB) {
    let score = 0;
    for (const k of entry.keys) if (q.includes(k)) score += k.length;
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  const fallback =
    locale === "it"
      ? "Non lo so rispondere con sicurezza, e preferisco dirti questo invece di inventare. Prova una domanda fra quelle sotto, o scrivimi a riccardobozzato@gmail.com: rispondo entro un giorno lavorativo."
      : "I cannot answer that with confidence, and I would rather say so than make something up. Try one of the questions below, or write to riccardobozzato@gmail.com: I reply within one business day.";

  if (!best) return fallback;
  return locale === "it" ? best.it : best.en;
}

export function SiteChatbot() {
  const locale = useLocale();
  const isIt = locale === "it";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setBusy(true);
    // Small delay so the reply does not snap in instantly and look canned.
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: answer(q, locale) }]);
      setBusy(false);
    }, 380);
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-chat-panel"
        className="fixed bottom-5 right-5 z-[90] size-12 rounded-full bg-primary text-primary-foreground shadow-xl shadow-black/30 transition-transform hover:scale-105 flex items-center justify-center"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        <span className="sr-only">{isIt ? "Apri l'assistente" : "Open the assistant"}</span>
      </button>

      {open && (
        <div
          id="site-chat-panel"
          role="dialog"
          aria-label={isIt ? "Assistente del sito" : "Site assistant"}
          className="fixed bottom-20 right-5 z-[90] w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
            <span className="text-sm font-semibold">
              {isIt ? "Assistente" : "Assistant"}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isIt ? "Risposte dai contenuti del sito" : "Answers from site content"}
            </span>
          </div>

          <div className="flex-1 max-h-72 overflow-y-auto p-4 space-y-3" aria-live="polite">
            {msgs.length === 0 && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isIt
                  ? "Posso rispondere a domande su quello che trovi sul sito: servizi, prezzi, progetti, libri, contatti. Se non lo so, te lo dico."
                  : "I can answer questions about what is on this site: services, pricing, projects, books, contact details. If I do not know, I will say so."}
              </p>
            )}

            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "user"
                    ? "ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                    : "max-w-[92%] rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-muted-foreground leading-relaxed"
                }
              >
                {m.text}
              </div>
            ))}

            {busy && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="size-3 animate-spin" />
                …
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(isIt ? SUGGESTIONS.it : SUGGESTIONS.en).map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="text-[11px] rounded-full border border-border/60 px-2.5 py-1 hover:bg-muted/50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isIt ? "Scrivi una domanda" : "Ask a question"}
                aria-label={isIt ? "Scrivi una domanda" : "Ask a question"}
                className="flex-1 h-9 rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-accent/50"
              />
              <button
                type="submit"
                className="size-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
                disabled={!input.trim()}
              >
                <Send className="size-4" />
                <span className="sr-only">{isIt ? "Invia" : "Send"}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
