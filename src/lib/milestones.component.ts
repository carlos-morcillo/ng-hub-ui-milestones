import { ChangeDetectionStrategy, Component, contentChildren, effect, input, ViewEncapsulation } from '@angular/core';
import { HubMilestoneComponent } from './milestone.component';

/** Layout direction of the timeline. */
export type HubMilestonesOrientation = 'vertical' | 'horizontal';

/**
 * A timeline / progress-steps container. Lays out projected `hub-milestone` nodes either
 * vertically or horizontally, draws the connecting rail between them, and numbers the
 * nodes automatically. Everything is themeable via `--hub-milestones-*` CSS variables.
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
		'[class.hub-milestones--horizontal]': "orientation() === 'horizontal'"
	},
	template: `<ng-content select="hub-milestone" />`,
	styleUrl: './milestones.component.scss'
})
export class HubMilestonesComponent {
	/** Layout direction. */
	readonly orientation = input<HubMilestonesOrientation>('vertical');

	/** Projected milestone nodes. */
	private readonly _items = contentChildren(HubMilestoneComponent);

	constructor() {
		// Number the nodes (1, 2, 3 …) in DOM order whenever the set changes.
		effect(() => {
			this._items().forEach((item, index) => item.setAutoIndex(index));
		});
	}
}
