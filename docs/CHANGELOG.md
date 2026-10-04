# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog.

## [Unreleased]

### Added

- Initial repository scaffolding
- React + TypeScript + Vite application foundation
- Automated tests and build pipeline
- GitHub Actions workflows for CI, Pages and security scanning
- Documentation structure in English and Italian
- Interactive cost-planning MVP screen with scenario controls and live model comparison
- Multi-model comparison workspace (up to four models) with named local snapshots
- Share scenarios via URL, export as JSON or Markdown, and import scenarios from JSON files, all validated client-side

### Changed

- Model catalog and list prices refreshed to October 2026 from official provider pricing pages (19 models; Llama removed, no first-party API price)
- Scorecard workflow pinned to scorecard-action v2.4.4, whose image is hosted on GitHub Container Registry (v2.4.0 pulled from gcr.io and failed)
- Security workflows hardened and aligned with protected-branch checks
- Scorecard workflow updated with valid action pinning and SARIF publication path

### Fixed

- Scorecard workflow verification failures caused by invalid action reference pins
- Vulnerability and workflow policy backlog handled through remediation plus alert-state cleanup

### Removed
