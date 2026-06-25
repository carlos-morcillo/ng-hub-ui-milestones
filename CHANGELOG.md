# Changelog

All notable changes to `ng-hub-ui-milestones` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.0.1] - 2026-06-25

### Fixed

- Design-token consistency pass: aligned inline fallback defaults with the canonical `ng-hub-ui-ds` values and routed hardcoded literals (z-index, font-weight, line-height, radii and theme-aware colours) through their `--hub-sys-*` / `--hub-ref-*` tokens, so they follow the active theme. No visual change when the ds tokens are loaded.

## [22.0.0] - 2026-06-17

### Changed

- Aligned with Angular 22.
- README documentation standardized.


## [21.0.0] - 2026-06-14

### Added

- Initial release: presentational timeline / progress-steps library.
- `hub-milestones` container with `orientation` (`vertical` | `horizontal`); auto-numbers the nodes and draws the connecting rail.
- `hub-milestone` node with `state` (`complete` | `active` | `pending` | `error`), per-node `color` override and a `label` fallback.
- `hubMilestoneNode` directive to project custom content (number, icon, avatar, any markup) inside the circle, plus projected body content beside/below.
- Full CSS-variable theming through `--hub-milestone-*` tokens (node colours, connector gradient, sizes, spacing). Standalone, signal-based, OnPush, SSR-safe.
