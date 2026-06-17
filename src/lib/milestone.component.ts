import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, input, signal, ViewEncapsulation } from '@angular/core';
import { HubMilestoneNodeDirective } from './milestone-node.directive';

/** Visual state of a milestone node. */
export type HubMilestoneState = 'complete' | 'active' | 'pending' | 'error';

/**
 * A single node in a `hub-milestones` timeline. Renders a circular node (with optional
 * custom content via `hubMilestoneNode`, an auto-incremented number otherwise) plus its
 * projected body content. Fully themeable per node through `color` and `--hub-milestone-*`.
 */
@Component({
	selector: 'hub-milestone',
	standalone: true,
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'hub-milestone',
		'[class.hub-milestone--complete]': "state() === 'complete'",
		'[class.hub-milestone--active]': "state() === 'active'",
		'[class.hub-milestone--pending]': "state() === 'pending'",
		'[class.hub-milestone--error]': "state() === 'error'",
		'[style.--hub-milestone-node-color]': 'color() || null'
	},
	template: `
		<div class="hub-milestone__rail" aria-hidden="true">
			<span class="hub-milestone__node">
				@if (nodeTemplate()) {
					<ng-container [ngTemplateOutlet]="nodeTemplate()!.template" />
				} @else if (label()) {
					{{ label() }}
				} @else {
					{{ displayNumber() }}
				}
			</span>
			<span class="hub-milestone__connector"></span>
		</div>
		<div class="hub-milestone__body">
			<ng-content />
		</div>
	`
})
export class HubMilestoneComponent {
	/** Visual state, drives the node/connector colors. */
	readonly state = input<HubMilestoneState>('pending');

	/** Per-node color override (any CSS color). Wins over the state color. */
	readonly color = input<string>('');

	/** Fallback content shown inside the node when no `hubMilestoneNode` template is given. */
	readonly label = input<string>('');

	/** Custom node content projected as `<ng-template hubMilestoneNode>`. */
	readonly nodeTemplate = contentChild(HubMilestoneNodeDirective);

	/** Zero-based position assigned by the parent `hub-milestones`. */
	private readonly _autoIndex = signal(0);

	/** 1-based number shown when the node has neither custom template nor label. */
	readonly displayNumber = computed(() => this._autoIndex() + 1);

	/** Called by the parent container to number the nodes automatically. */
	setAutoIndex(index: number): void {
		this._autoIndex.set(index);
	}
}
