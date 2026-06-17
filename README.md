# ng-hub-ui-milestones

[Español](./README.es.md) | **English**

[![npm version](https://img.shields.io/npm/v/ng-hub-ui-milestones.svg)](https://www.npmjs.com/package/ng-hub-ui-milestones)
[![license](https://img.shields.io/npm/l/ng-hub-ui-milestones.svg)](https://github.com/carlos-morcillo/ng-hub-ui-milestones/blob/main/LICENSE)

A lightweight, presentational timeline / progress-steps component for Angular: lay out milestone nodes vertically or horizontally, project any content into each node, and theme everything with CSS variables.

## Documentation and Live Examples

This package is part of [Hub UI](https://hubui.dev/), a collection of Angular component libraries for standalone apps.

- Docs: https://hubui.dev/milestones/overview/
- Live examples: https://hubui.dev/milestones/examples/
- Hub UI: https://hubui.dev/

## 🧩 Library Family `ng-hub-ui`

This library is part of the **Hub UI** ecosystem:

- [**ng-hub-ui-accordion**](https://www.npmjs.com/package/ng-hub-ui-accordion) (deprecated — use ng-hub-ui-panels)
- [**ng-hub-ui-action-sheet**](https://www.npmjs.com/package/ng-hub-ui-action-sheet)
- [**ng-hub-ui-avatar**](https://www.npmjs.com/package/ng-hub-ui-avatar)
- [**ng-hub-ui-board**](https://www.npmjs.com/package/ng-hub-ui-board)
- [**ng-hub-ui-breadcrumbs**](https://www.npmjs.com/package/ng-hub-ui-breadcrumbs)
- [**ng-hub-ui-calendar**](https://www.npmjs.com/package/ng-hub-ui-calendar)
- [**ng-hub-ui-dropdown**](https://www.npmjs.com/package/ng-hub-ui-dropdown)
- [**ng-hub-ui-ds**](https://www.npmjs.com/package/ng-hub-ui-ds)
- [**ng-hub-ui-forms**](https://www.npmjs.com/package/ng-hub-ui-forms)
- [**ng-hub-ui-history**](https://www.npmjs.com/package/ng-hub-ui-history)
- [**ng-hub-ui-milestones**](https://www.npmjs.com/package/ng-hub-ui-milestones) ← You are here
- [**ng-hub-ui-modal**](https://www.npmjs.com/package/ng-hub-ui-modal)
- [**ng-hub-ui-nav**](https://www.npmjs.com/package/ng-hub-ui-nav)
- [**ng-hub-ui-paginable**](https://www.npmjs.com/package/ng-hub-ui-paginable)
- [**ng-hub-ui-panels**](https://www.npmjs.com/package/ng-hub-ui-panels)
- [**ng-hub-ui-portal**](https://www.npmjs.com/package/ng-hub-ui-portal)
- [**ng-hub-ui-skeleton**](https://www.npmjs.com/package/ng-hub-ui-skeleton)
- [**ng-hub-ui-sortable**](https://www.npmjs.com/package/ng-hub-ui-sortable)
- [**ng-hub-ui-stepper**](https://www.npmjs.com/package/ng-hub-ui-stepper)
- [**ng-hub-ui-utils**](https://www.npmjs.com/package/ng-hub-ui-utils)

## 📑 Table of Contents

- [Description](#-description)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Styling](#-styling)
- [Changelog](#-changelog)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

## 📖 Description

`ng-hub-ui-milestones` renders a timeline (also known as progress steps) made of milestone nodes connected by a rail. It is purely presentational and unopinionated about your data: you compose the timeline declaratively with two components and one directive.

- `hub-milestones` is the container. It lays out its child nodes either vertically or horizontally, draws the connecting rail, and numbers the nodes automatically in DOM order.
- `hub-milestone` is a single node. It exposes a visual `state` (`complete` · `active` · `pending` · `error`), an optional per-node `color` override, and a `label` fallback. Any markup placed inside it is projected as the node's body (title, description, dates, etc.).
- `hubMilestoneNode` is a structural directive that lets you project custom content **inside** the node circle — a number, an icon, an avatar, or any markup. When omitted, the node shows the `label` or the auto-generated 1-based index.

Components are standalone, signal-based, use `OnPush` change detection, and are SSR-safe.

## ✨ Features

- **Two orientations**: `vertical` and `horizontal` layouts from a single input.
- **Automatic numbering**: nodes are numbered (1, 2, 3 …) in DOM order, with no manual bookkeeping.
- **Visual states**: `complete`, `active`, `pending`, and `error` states drive node and connector colors.
- **Custom node content**: project numbers, icons, or avatars into the circle via `hubMilestoneNode`.
- **Per-node color override**: set any CSS color on an individual node with the `color` input.
- **Full CSS-variable theming**: customize colors, sizes, spacing, and the connector gradient through `--hub-milestone-*` tokens.
- **Standalone & modern**: standalone components, Angular Signals, `OnPush`, SSR-safe.
- **Zero runtime dependencies** beyond Angular and `tslib`.

## 📦 Installation

```bash
npm install ng-hub-ui-milestones
```

## 🚀 Usage

Import the standalone components (and the directive when projecting custom node content) into your component:

```typescript
import { Component } from '@angular/core';
import { HubMilestonesComponent, HubMilestoneComponent, HubMilestoneNodeDirective } from 'ng-hub-ui-milestones';

@Component({
	selector: 'app-roadmap',
	standalone: true,
	imports: [HubMilestonesComponent, HubMilestoneComponent, HubMilestoneNodeDirective],
	template: `
		<hub-milestones orientation="vertical">
			<hub-milestone state="complete">
				<h4>Project kickoff</h4>
				<p>Requirements gathered and approved.</p>
			</hub-milestone>

			<hub-milestone state="active">
				<h4>Development</h4>
				<p>Building the core features.</p>
			</hub-milestone>

			<hub-milestone state="pending">
				<ng-template hubMilestoneNode>★</ng-template>
				<h4>Release</h4>
				<p>Ship to production.</p>
			</hub-milestone>
		</hub-milestones>
	`
})
export class RoadmapComponent {}
```

### Horizontal orientation

```html
<hub-milestones orientation="horizontal">
	<hub-milestone state="complete"><h4>Step 1</h4></hub-milestone>
	<hub-milestone state="active"><h4>Step 2</h4></hub-milestone>
	<hub-milestone state="pending"><h4>Step 3</h4></hub-milestone>
</hub-milestones>
```

### Labels and per-node color

```html
<hub-milestones orientation="vertical">
	<hub-milestone state="complete" label="A">
		<h4>Phase A</h4>
	</hub-milestone>

	<hub-milestone state="active" color="#0d6efd">
		<h4>Phase B</h4>
	</hub-milestone>

	<hub-milestone state="error">
		<h4>Phase C</h4>
		<p>Something went wrong here.</p>
	</hub-milestone>
</hub-milestones>
```

When a node has neither a `hubMilestoneNode` template nor a `label`, it falls back to its auto-generated 1-based number.

## 📚 API Reference

### `HubMilestonesComponent` — `<hub-milestones>`

#### Inputs

| Input         | Type                       | Default      | Description                                       |
| ------------- | -------------------------- | ------------ | ------------------------------------------------- |
| `orientation` | `HubMilestonesOrientation` | `'vertical'` | Layout direction: `'vertical'` or `'horizontal'`. |

> The container also auto-numbers its projected `hub-milestone` nodes in DOM order; no input is required for this.

### `HubMilestoneComponent` — `<hub-milestone>`

#### Inputs

| Input   | Type                | Default     | Description                                                                                       |
| ------- | ------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `state` | `HubMilestoneState` | `'pending'` | Visual state: `'complete'` · `'active'` · `'pending'` · `'error'`. Drives node/connector colors.  |
| `color` | `string`            | `''`        | Per-node color override (any CSS color). Wins over the state color.                               |
| `label` | `string`            | `''`        | Fallback content shown inside the node when no `hubMilestoneNode` template is given.              |

> Projected (non-template) content placed inside `<hub-milestone>` is rendered as the node body, beside (vertical) or below (horizontal) the node circle.

### `HubMilestoneNodeDirective` — `[hubMilestoneNode]`

A structural directive applied to an `<ng-template>` to project custom content **inside** the node circle (a number, icon, avatar, or any markup). It has no inputs or outputs.

```html
<hub-milestone state="complete">
	<ng-template hubMilestoneNode>✓</ng-template>
	<h4>Done</h4>
</hub-milestone>
```

### Exported types

| Type                       | Values                                           |
| -------------------------- | ------------------------------------------------ |
| `HubMilestonesOrientation` | `'vertical' \| 'horizontal'`                     |
| `HubMilestoneState`        | `'complete' \| 'active' \| 'pending' \| 'error'` |

## 🎨 Styling

The library is themed entirely through `--hub-milestone-*` CSS variables, with safe fallbacks so it works standalone and re-themes at runtime. Override them on `:root`, on a `hub-milestones` selector, or per node via the `color` input.

| CSS Variable                           | Default                                        | Description                                |
| -------------------------------------- | ---------------------------------------------- | ------------------------------------------ |
| `--hub-milestone-node-size`            | `2.75rem`                                      | Diameter of the node circle.               |
| `--hub-milestone-node-font-size`       | `1.05rem`                                      | Font size of the node content.             |
| `--hub-milestone-node-color`           | `var(--hub-sys-color-primary, #7c3aed)`        | Node background color (default/active).    |
| `--hub-milestone-node-text`            | `#ffffff`                                      | Node text/content color.                   |
| `--hub-milestone-pending-bg`           | `var(--hub-sys-surface-elevated, #f1f3f5)`     | Background of a pending node.              |
| `--hub-milestone-pending-color`        | `var(--hub-sys-text-muted, #6c757d)`           | Text color of a pending node.              |
| `--hub-milestone-pending-border`       | `var(--hub-sys-border-color-default, #dee2e6)` | Border of a pending node.                  |
| `--hub-milestone-error-bg`             | `var(--hub-sys-color-danger, #dc3545)`         | Background of an error node.               |
| `--hub-milestone-connector-thickness`  | `3px`                                          | Thickness of the connecting rail.          |
| `--hub-milestone-connector-bg`         | `linear-gradient(180deg, #7c3aed, #f97316)`    | Connector background (completed segments). |
| `--hub-milestone-connector-pending-bg` | `var(--hub-sys-border-color-default, #dee2e6)` | Connector background for pending segments. |
| `--hub-milestone-gap`                  | `1rem`                                         | Gap between the node and its body.         |
| `--hub-milestone-spacing`              | `1.75rem`                                      | Spacing between consecutive milestones.    |
| `--hub-milestone-body-color`           | `var(--hub-sys-text-primary, #212529)`         | Body text color.                           |
| `--hub-milestone-body-muted`           | `var(--hub-sys-text-muted, #6c757d)`           | Muted body text color.                     |

Framework-agnostic customization example:

```scss
hub-milestones {
	--hub-milestone-node-size: 3rem;
	--hub-milestone-node-color: #2563eb;
	--hub-milestone-connector-bg: linear-gradient(180deg, #2563eb, #22c55e);
	--hub-milestone-spacing: 2rem;
}
```

Bootstrap integration example (optional):

```scss
hub-milestones {
	--hub-milestone-node-color: var(--bs-primary);
	--hub-milestone-error-bg: var(--bs-danger);
	--hub-milestone-pending-bg: var(--bs-secondary-bg);
	--hub-milestone-body-color: var(--bs-body-color);
}
```

## 📝 Changelog

See the full [CHANGELOG.md](./CHANGELOG.md) for the complete version history.

## 🤝 Contributing

Contributions are welcome. Please open an issue to discuss significant changes before submitting a pull request, and follow the existing code style and conventions.

- Repository: https://github.com/carlos-morcillo/ng-hub-ui-milestones
- Issues: https://github.com/carlos-morcillo/ng-hub-ui/issues

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/carlos-morcillo/ng-hub-ui/issues)
- **Author**: [Carlos Morcillo](https://www.carlosmorcillo.com)

## 📄 License

MIT © [Carlos Morcillo](https://www.carlosmorcillo.com)

---

Made with ❤️ by the Hub UI team
