# ModelBudget

> Estimate. Compare. Decide.

ModelBudget is an open-source web app for estimating and comparing AI model costs before shipping production features. It is designed to stay fully client-side, privacy-friendly and free to use.

## What it does

- Estimate cost for prompts and output usage
- Compare multiple models side by side
- Simulate budget growth over time
- Suggest optimization opportunities
- Share scenarios via URL without a backend

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
npm install
npm run dev
```

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
- Security policy and issue templates

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
