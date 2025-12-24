# AGENTS.md — Istruzioni per Codex

## Lingua
- Tutte le risposte, analisi, spiegazioni e review DEVONO essere in italiano.
- Il codice può essere scritto in inglese se necessario.
- Non rispondere in inglese salvo esplicita richiesta.

## Contesto del progetto
Questo progetto serve a realizzare una nuova versione migliorata di un sito web,
da pubblicare in futuro (es. GitHub Pages), partendo da due insiemi di materiali:

- Cartella "Riferimento/":
  contiene screenshot e HTML di un sito esterno che deve essere usato
  ESCLUSIVAMENTE come riferimento di stile, design, layout e animazioni.

- Cartella "Sito attuale/":
  contiene screenshot e HTML del sito attuale.
  I contenuti testuali, le scritte, i link e la struttura concettuale
  DEVONO essere mantenuti come base.

## Obiettivo principale
Migliorare l’interfaccia grafica e l’esperienza utente del sito attuale,
ispirandosi allo stile e al design del sito di riferimento,
senza copiare direttamente codice o asset protetti.

## Regole fondamentali
- Il sito finale deve mantenere:
  - testi e contenuti del "Sito attuale"
  - significato e struttura delle sezioni
- Il sito finale deve migliorare:
  - layout
  - tipografia
  - spaziature
  - colori
  - animazioni
  - esperienza desktop e mobile

## Ruolo dell’agente
Agisci come:
- Frontend Engineer
- Web Designer (UI/UX)

Ragiona come un designer:
- coerenza visiva
- leggibilità
- gerarchia dei contenuti
- attenzione ai dettagli

## Responsive design
- Il sito deve funzionare perfettamente su desktop e mobile.
- Approccio mobile-first, poi miglioramento desktop.
- Breakpoint principali da considerare:
  - Mobile: 360x800, 390x844, 430x932
  - Tablet: 768x1024
  - Desktop: 1024x768, 1440x900

## Animazioni
- Le animazioni devono essere fluide e leggere.
- Devono funzionare bene anche su mobile.
- Evitare effetti pesanti (blur eccessivi, troppe particelle, repaint continui).
- Rispetto di prefers-reduced-motion.

## Modalità di lavoro
- Usa i file in "Riferimento/" SOLO per:
  - stile
  - ispirazione visiva
  - comportamento delle animazioni
- Usa i file in "Sito attuale/" come:
  - fonte dei contenuti
  - base logica del sito

## File e implementazione
- Sei autorizzato a creare e modificare file del progetto localmente.
- Mantieni il codice ordinato e leggibile.
- Spiega sempre cosa stai facendo prima di grandi modifiche.

## Git e pubblicazione
- NON creare repository GitHub.
- NON eseguire push o pubblicazioni.
- Attendere istruzioni esplicite per Git o GitHub.

## Review
Quando richiesto di fare una review:
- Valuta desktop e mobile allo stesso modo.
- Controlla coerenza con il riferimento di stile.
- Segnala problemi senza applicare fix se non richiesto.