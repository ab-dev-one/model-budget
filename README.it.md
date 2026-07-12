# ModelBudget

> Stimare. Confrontare. Decidere.

ModelBudget è un'applicazione web open source per stimare e confrontare i costi dei modelli AI prima di distribuire funzionalità di produzione. È progettata per restare completamente lato client, rispettare la privacy e rimanere gratuita.

## Cosa fa

- Stima il costo di prompt e output
- Confronta più modelli tra loro
- Simula crescita e impatto sul budget
- Suggerisce opportunità di ottimizzazione
- Condivide scenari senza backend

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
npm install
npm run dev
```

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
- policy di sicurezza e issue templates

## Contribuire

Leggi [CONTRIBUTING.md](CONTRIBUTING.md) e [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
