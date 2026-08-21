# ModelBudget

> Estimate. Compare. Decide.

ModelBudget is an open-source web app for estimating and comparing AI model costs before shipping production features. It is designed to stay fully client-side, privacy-friendly and free to use.

## What it does

- Estimate cost for prompts and output usage
- Compare up to four models side by side
- Simulate six-month budget growth for every selected model
- Save up to twelve named scenarios locally in the browser
- See a cost recommendation from the selected comparison set
- Keep all scenario data on the current device

## Current MVP screen

The current UI includes an interactive planning workspace:

- Scenario controls for input tokens, output tokens and monthly request volume
- Fourteen current models across OpenAI, Anthropic, Google, xAI, Mistral AI, DeepSeek and Meta
- Comparison selection, multi-series growth chart and a primary-model cost summary
- Named local snapshots with loading and deletion controls
- A visible list-price snapshot date and pricing caveat for sound purchasing decisions

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- GitHub Actions
- GitHub Pages

## Repository structure

- src/components: UI building blocks
- src/features: product features and business logic
- src/data: pricing and scenario data
- src/pages: route-level screens
- src/test: test setup and shared helpers

## Development

```bash
nvm use
npm install
npm run dev
```

The project supports Node `^20.19.0 || ^22.13.0`. `.nvmrc` selects Node 22, avoiding warnings from the non-LTS Node 23 release.

## Pricing data

Model prices are static list-price estimates, not live quotes. They are suitable for early planning only; provider price changes, caching, regional rates, batch processing and optional features can materially change a production bill. Check the relevant provider documentation before making a purchasing decision.

## Quality gates

```bash
npm run lint
npm run test
npm run build
```

## CI/CD

The repository includes:

- CI workflow for lint, tests and build on every push and pull request
- GitHub Pages deployment workflow for public hosting
- CodeQL security analysis
- OpenSSF Scorecard workflow
- Security policy and issue templates

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
