# riccardobozzato.dev — Brand Guidelines (FACELESS)

> Documento sorgente per il personal brand di Riccardo Bozzato.
> Configurazione: **100% faceless** (nessun volto umano, solo mark astratti, terminali e motion).

---

## 1. CONCEPT FACELESS

**Idea centrale:** "The builder behind the terminal."
Riccardo non mostra il volto — il brand è incarnato da un **avatar astratto** (mark RB + terminale + mascotte hex a circuito). La persona emerge attraverso:
- Voce fuori campo / commentary nei video
- Mani sulla tastiera (B-roll, opzionale, no volto)
- Codice, output, terminali, demo live
- Storytelling testuale (post, thread, newsletter)

**Perché faceless:**
- Scalabile: l'avatar non invecchia, non serve grooming, si adatta a tutti i formati
- Coerente: stesso mark su sito, Twitch, YouTube, Instagram, PDF
- Mistero/autorevolezza: focus sulla competenza, non sull'estetica
- Produttività: niente camera, luci, montaggio volto → più contenuti

---

## 2. IDENTITY

| Attributo | Valore |
|-----------|--------|
| **Nome brand** | riccardobozzato.dev |
| **Tagline** | `> building tools, breaking limits` |
| **Sottotagline** | code · security · ship |
| **Ruolo** | Operations & Delivery Consultant + Security Tool Builder + SaaS Creator |
| **Vibe** | Midnight precision with a spark of innovation |
| **Tono** | Tecnico, diretto, pragmatico, un filo ironico |
| **Lingua** | IT primario, EN per reach internazionale (VulnClaw/OmniVoice) |

---

## 3. LOGO & AVATAR (faceless)

| File | Uso |
|------|-----|
| `logo/rb-logo-faceless.svg` | Profile pic universale (Twitch/IG/YT/sito) |
| `logo/rb-mascot-hex.svg` | Watermark video, intro/outro, sticker |

**Regole:**
- Mai usare foto umane come logo
- Su sfondo chiaro: usare variante con halo emerald su bianco (da generare)
- Minimum clear space = 25% del mark
- Non distorto, non ruotato, non su sfondi rumorosi

---

## 4. COLOR SYSTEM (allineato a MASTER.md esistente)

```
--background:  #0A0A0B   (midnight)
--card:        #121214
--foreground:  #F4F4F5
--muted:       #A1A1AA
--border:      #27272A
--accent:      #22C55E   (emerald — il "spark")
--accent-2:    #16A34A
--destructive: #EF4444
```

**Uso accent:** solo per CTA, cursor, glow, dettagli. Mai riempire aree large.

---

## 5. TYPOGRAPHY

```
Heading: Space Grotesk   (tech, bold)
Body:    Inter           (clean, readable)
Mono:    JetBrains Mono  (code, terminal, tagline `>`)
```

**Regola faceless:** la tagline e i titoli usano sempre il prefisso `>` in mono per evocare il terminale (es. `> building tools, breaking limits`).

---

## 6. SOCIAL KIT

| Piattaforma | Formato | File | Note |
|-------------|---------|------|------|
| Twitch | 1920×480 | `social/twitch-banner.svg` | Banner profilo |
| YouTube | 2560×1440 | `social/youtube-banner.svg` | Channel art (safe zone centrale) |
| Instagram | 1080×1080 | `social/instagram-profile.svg` | Profile pic + story bg |

**Integrazione nel sito (già implementata):**
- Sorgente unica: `src/lib/social.ts` (SOCIAL_PROFILES + FACELESS_CHANNELS)
- Footer: 6 icone (IG / YT / Twitch / GitHub / LinkedIn / Email)
- Navbar desktop (lg+): IG / YT / Twitch compatti a destra
- Handle placeholder da sostituire con quelli reali in `src/lib/social.ts`
- Vedi `SOCIAL-PROFILES.md` per bio pronte + asset avatar/banner

**Template contenuti (da replicare):**
- **YouTube Thumb:** 1280×720, sfondo midnight, mark RB grande, testo giallo/emerald, niente volto. Es. "I built an AI pentester" / "SaaS in 7 days"
- **IG Reel cover:** 1080×1920, stessa griglia, titolo in Space Grotesk 64px
- **Twitch offline screen:** terminale animato "back soon >" + link social

---

## 7. VOICE & MESSAGING

**Pilastri editoriali (3-4 per piattaforma):**
1. **Build in public** — mostra il processo (VulnClaw, Trova, OmniVoice)
2. **Security demos** — pentest AI, bug bounty mindset
3. **Ops & Delivery** — come gestire team/produttività da Head of Ops
4. **Tooling & automation** — script, bot, boilerplate

**Tono social:**
- IT: "Costruisco tool, rompo limiti. Senza faccia, solo codice."
- EN: "I build tools and break limits. Faceless, just code."

**Hashtag:**
- IT: #buildinpublic #devlife #cybersecurity #saas
- EN: #buildinpublic #devtools #aisecurity #indiehacker

---

## 8. CONTENT PILLARS (faceless production)

| Formato | Piattaforma | Frequenza | Faceless method |
|---------|-------------|-----------|-----------------|
| Live coding | Twitch | 2×/settimana | Schermo + voce, no cam |
| Long-form tutorial | YouTube | 1×/settimana | Screenrec + voiceover |
| Reels/Shorts | IG/YT | 3×/settimana | Code clips + sottotitoli |
| Thread/caroselli | IG/LinkedIn | 2×/settimana | Graphic SVG da brand kit |
| Newsletter | sito/blog | 1×/settimana | Testo + code blocks |

---

## 9. BRAND GUARDRAILS

- ❌ Nessun volto umano nei asset di marca
- ❌ Nessun emojì come icona strutturale (usare Lucide/Heroicons)
- ✅ Sempre dark-first, accent emerald
- ✅ Tagline con `>` mono
- ✅ Avatar RB su ogni piattaforma

---

*Generato da AgentsOrchestrator · 2026-07-17*
