# Changelog

Tutte le modifiche rilevanti di questo progetto verranno documentate in questo file.

Il formato segue Keep a Changelog.

## [Unreleased]

### Aggiunto

- Struttura iniziale della repository
- Base applicativa React + TypeScript + Vite
- Test automatici e pipeline di build
- Workflow GitHub Actions per CI, Pages e analisi di sicurezza
- Struttura documentale in inglese e italiano
- Schermata MVP interattiva per pianificazione costi e confronto modelli in tempo reale
- Workspace di confronto multi-modello (fino a quattro) con snapshot locali nominati
- Condivisione scenari via URL, export in JSON o Markdown e import scenari da file JSON, tutto validato lato client

### Modificato

- Catalogo modelli e prezzi di listino aggiornati a ottobre 2026 dalle pagine ufficiali dei provider (19 modelli; Llama rimosso, nessun prezzo API di prima parte)
- Workflow Scorecard aggiornato a scorecard-action v2.4.4, con immagine su GitHub Container Registry (la v2.4.0 la scaricava da gcr.io e falliva)
- Workflow di sicurezza rafforzati e allineati ai check del branch protetto
- Workflow Scorecard aggiornato con pin validi e percorso SARIF compatibile

### Corretto

- Errori di verifica Scorecard causati da reference/pin azioni non validi
- Backlog di alert sicurezza gestito con remediation e pulizia stato alert

### Rimosso
