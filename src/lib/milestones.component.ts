import {
	afterNextRender,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	DestroyRef,
	effect,
	ElementRef,
	inject,
	input,
	signal,
	ViewEncapsulation
} from '@angular/core';
import { HUB_MILESTONES_CONFIG } from './hub-milestones.config';
import { HubMilestoneComponent } from './milestone.component';

/** Layout direction of the timeline. */
export type HubMilestonesOrientation = 'vertical' | 'horizontal';

/**
 * A timeline / progress-steps container. Lays out projected `hub-milestone` nodes either
 * vertically or horizontally, draws the connecting rail between them, and numbers the
 * nodes automatically. Everything is themeable via `--hub-milestone-*` CSS variables.
 *
 * ```html
 * <hub-milestones orientation="vertical">
 *   <hub-milestone state="complete"><ng-template hubMilestoneNode>1</ng-template>…</hub-milestone>
 *   <hub-milestone state="active">…</hub-milestone>
 *   <hub-milestone>…</hub-milestone>
 * </hub-milestones>
 * ```
 */
@Component({
	selector: 'hub-milestones',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'hub-milestones',
		role: 'list',
		'[class.hub-milestones--vertical]': "orientation() === 'vertical'",
		'[class.hub-milestones--horizontal]': "orientation() === 'horizontal'",
		'[class.hub-milestones--pulse]': 'pulse()',
		'[class.hub-milestones--reveal]': '_armed()',
		'[class.hub-milestones--revealed]': '_revealed()'
	},
	template: `<ng-content select="hub-milestone" />`,
	styleUrl: './milestones.component.scss'
})
export class HubMilestonesComponent {
	/** Layout direction. */
	readonly orientation = input<HubMilestonesOrientation>('vertical');

	/**
	 * When `true`, the `active` node emits a soft pulsing wave to draw attention to
	 * the current step. Opt-in, themeable via `--hub-milestone-pulse-*`, and disabled
	 * automatically under `prefers-reduced-motion`.
	 */
	readonly pulse = input(false, { transform: booleanAttribute });

	/**
	 * Overrides the global `reveal` option ({@link provideHubMilestones}) for this
	 * instance. When enabled, the accent trail fills from the first node up to the
	 * active node the first time the timeline scrolls into view. `undefined` inherits
	 * the global config (default `true`).
	 */
	readonly reveal = input<boolean | undefined>(undefined);

	private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly _config = inject(HUB_MILESTONES_CONFIG, { optional: true });

	/** Projected milestone nodes. */
	private readonly _items = contentChildren(HubMilestoneComponent);

	/** Resolved reveal flag: per-instance input → global config → built-in default (`true`). */
	private readonly _revealEnabled = computed(() => this.reveal() ?? this._config?.reveal ?? true);

	/** `true` once the reveal is armed in the browser (collapses the trail, ready to fill). */
	protected readonly _armed = signal(false);

	/** `true` once the timeline has entered the viewport and the fill animation runs. */
	protected readonly _revealed = signal(false);

	constructor() {
		// Number the nodes (1, 2, 3 …) and expose the index for the reveal stagger.
		effect(() => {
			this._items().forEach((item, index) => item.setAutoIndex(index));
		});

		const destroyRef = inject(DestroyRef);
		// Browser-only (afterNextRender is a no-op on the server, so SSR/no-JS renders
		// the full trail). Arm before paint, then fill in when scrolled into view.
		afterNextRender(() => {
			if (!this._revealEnabled()) return;
			this._armed.set(true);
			const io = new IntersectionObserver(
				(entries) => {
					if (entries.some((entry) => entry.isIntersecting)) {
						this._revealed.set(true);
						io.disconnect();
					}
				},
				{ threshold: 0.25 }
			);
			io.observe(this._host.nativeElement);
			destroyRef.onDestroy(() => io.disconnect());
		});
	}
}
