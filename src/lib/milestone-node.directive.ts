import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Marks an `<ng-template>` as the custom content rendered INSIDE a milestone node
 * (the circle) — a number, an icon, an avatar, anything.
 *
 * ```html
 * <hub-milestone>
 *   <ng-template hubMilestoneNode>★</ng-template>
 *   <h4>Shipped</h4>
 * </hub-milestone>
 * ```
 */
@Directive({
	selector: '[hubMilestoneNode]',
	standalone: true
})
export class HubMilestoneNodeDirective {
	/** The projected node template. */
	readonly template = inject<TemplateRef<unknown>>(TemplateRef);
}
