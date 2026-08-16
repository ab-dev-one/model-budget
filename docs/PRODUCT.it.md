# Specifica del prodotto

## Visione

ModelBudget aiuta gli sviluppatori a stimare, confrontare e ottimizzare i costi dei modelli AI prima di scrivere codice di produzione.

## Missione

Offrire uno strumento gratuito, open source e rispettoso della privacy per valutare i trade-off dei costi AI.

## Filosofia del prodotto

- Nessun login
- Nessun backend
- Nessun tracciamento
- Nessun advertising
- Funziona completamente nel browser
- Open source come priorità

## Utenti target

- Sviluppatori indipendenti
- Freelance
- Startup
- Software house
- AI engineer
- Studenti

## Obiettivi

- Stimare costi AI
- Confrontare fino a quattro modelli nello stesso scenario
- Simulare crescita
- Evidenziare il costo selezionato minimo e la differenza mensile
- Salvare snapshot nominati locali al browser
- Rendere visibili freschezza e limiti dei prezzi

## Non obiettivi

- Chiamare API LLM
- Account utente
- Billing
- Dashboard provider

## Stack tecnica

- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- GitHub Actions
- GitHub Pages

## Principi architetturali

- Solo frontend
- Logica di business separata dall'interfaccia
- Nessuna dipendenza da backend
- Privacy by design
- Validare i dati locali del browser prima del caricamento
- Trattare i prezzi provider come snapshot datati per la pianificazione, non come quotazioni live
