# Changelog

All notable changes to `ng-hub-ui-milestones` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.2.0] - 2026-07-07

### Added

- **`hub-milestones-theme(...)` SCSS mixin** — one-call token theming for `<hub-milestones>`, covering the full `--hub-milestone-*` surface: completed steps (`$node-color`, `$node-text`, `$node-size`, `$node-font-size`, `$connector-bg`, `$connector-thickness`), upcoming steps (`$pending-bg`, `$pending-border`, `$pending-color`, `$connector-pending-bg`), the error state (`$error-bg`), the step body (`$body-color`, `$body-muted`) and layout (`$gap`, `$spacing`). Every parameter is null-defaulted and additive. (The component tokens are singular `--hub-milestone-*`; the library and mixin are plural.)

### Changed

- **Packaging — the library now ships its SCSS at `/styles`.** `src/lib/styles` is emitted to `dist/milestones/styles`, exposing `hub-milestones-theme` as a first-class package entry: `@use 'ng-hub-ui-milestones/styles' as *;`.

## [22.1.0] - 2026-07-07

### Changed

- **`<hub-milestone>` `color` accepts ANY colour.** On top of the built-in semantic accents, the input now also accepts a **registered custom accent** and a **literal colour** (`#ff0000`, `rgb(...)`, `oklch(...)`, a CSS named colour), resolved through the shared `resolveHubAccent` resolver (a local copy of the canonical `ng-hub-ui-utils` helper): a bareword becomes `var(--hub-sys-color-<name>, <name>)`; a literal is used as-is. The single `--hub-<comp>-accent` slot derives the rest of the family, so built-in colours are unchanged.
- **Internal — host bindings moved to the `host` metadata object.** `@HostBinding` / `@HostListener` decorators were replaced by the `host` object in the component/directive metadata (Angular style guide). No public API or behaviour change.

## [22.0.3] - 2026-06-25

### Changed

- Widened the Angular peer dependency range from `^22.0.0` to `>=21.0.0`, so the library installs on Angular 21 projects as well (aligning it with the rest of the `ng-hub-ui` family). No code changes — every API used is available since Angular ≤21.

## [22.0.2] - 2026-06-25

### Added

- **Viewport reveal** — when a `<hub-milestones>` scrolls into view it plays a one-shot animation, filling the accent trail from the first node up to the active node. **On by default**; set it globally with `provideHubMilestones({ reveal: false })` (add the provider to the app config) or per instance with `[reveal]`. Tunable via `--hub-milestone-reveal-duration` / `--hub-milestone-reveal-stagger`, SSR-safe (renders the full trail without JS), and disabled under `prefers-reduced-motion`.
- `provideHubMilestones()` provider + `HubMilestonesConfig` for app-wide defaults.
- `[pulse]` input on `<hub-milestones>` — opt-in soft wave animation on the `active` node to highlight the current step. The wave colour follows the node accent by default (including a per-node `color` override) and is overridable via `--hub-milestone-pulse-color` / `--hub-milestone-pulse-duration` / `--hub-milestone-pulse-spread`. Disabled automatically under `prefers-reduced-motion`.

### Fixed

- **Connectors now reach from node to node.** Previously the connector lived in the node's flex flow so it stopped at the node's content, leaving a gap before the next node (the inter-node spacing sits in the milestone's padding, outside the rail). It is now absolutely positioned and always spans node-edge to next-node-edge, in both vertical and horizontal layouts.
- The connector colour now follows the theme accent (`--hub-milestone-node-color`) instead of a hardcoded purple→orange gradient that clashed with the themed (accent) nodes and rendered as a muddy line in the horizontal layout. Also aligned the node-colour fallback with the canonical `--hub-sys-color-primary` value (`#0d6efd`).
- The accent trail now stops at the active (current) node — connectors from the active node onward are muted, so the timeline reads as a real progress indicator.
- **Full RTL support**: layout, connector positioning and the reveal animation flip correctly under `dir="rtl"` via CSS logical properties (`inset-inline-*`, `padding-inline-end`) and a direction-aware reveal.

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
