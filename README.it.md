# ModelBudget

> Stimare. Confrontare. Decidere.

ModelBudget è un'applicazione web open source per stimare e confrontare i costi dei modelli AI prima di distribuire funzionalità di produzione. È progettata per restare completamente lato client, rispettare la privacy e rimanere gratuita.

## Cosa fa

- Stima il costo di prompt e output
- Confronta fino a quattro modelli affiancati
- Simula sei mesi di crescita del budget per ogni modello selezionato
- Salva fino a dodici scenari nominati nel browser
- Evidenzia una raccomandazione di costo nel confronto selezionato
- Mantiene tutti i dati dello scenario sul dispositivo corrente

## Schermata MVP attuale

L'interfaccia corrente include un workspace di pianificazione interattivo:

- Controlli scenario per token di input, token di output e volume mensile di richieste
- Nove modelli attuali di OpenAI, Anthropic, Google e Mistral AI
- Selezione per il confronto, grafico di crescita multi-serie e riepilogo del modello principale
- Snapshot locali nominati, caricabili ed eliminabili
- Data dello snapshot dei prezzi e avvertenza visibile per decisioni di acquisto consapevoli

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- GitHub Actions
- GitHub Pages

## Documentazione

- [docs/README.it.md](docs/README.it.md)
- [docs/PRODUCT.it.md](docs/PRODUCT.it.md)
- [docs/ROADMAP.it.md](docs/ROADMAP.it.md)
- [docs/CHANGELOG.it.md](docs/CHANGELOG.it.md)
- [docs/COMMANDS.it.md](docs/COMMANDS.it.md)

## Sviluppo locale

```bash
nvm use
npm install
npm run dev
```

Il progetto supporta Node `^20.19.0 || ^22.13.0`. Il file `.nvmrc` seleziona Node 22 ed elimina gli avvisi dovuti alla release non-LTS Node 23.

## Dati di prezzo

I prezzi dei modelli sono stime statiche di listino, non quotazioni live. Sono adatti alla pianificazione iniziale: modifiche dei prezzi provider, cache, tariffe regionali, batch e funzionalita opzionali possono incidere sensibilmente sul costo in produzione. Verifica sempre la documentazione del provider prima di prendere decisioni di acquisto.

## Controlli di qualità

```bash
npm run lint
npm run test
npm run build
```

## CI/CD

La repository include:

- workflow CI per lint, test e build su ogni push e pull request
- workflow di deployment su GitHub Pages
- analisi di sicurezza CodeQL
- workflow OpenSSF Scorecard
- policy di sicurezza e issue templates

## Contribuire

Leggi [CONTRIBUTING.md](CONTRIBUTING.md) e [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
