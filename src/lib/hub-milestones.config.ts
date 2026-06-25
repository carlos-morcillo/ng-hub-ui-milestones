import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

/**
 * Global options for `ng-hub-ui-milestones`, supplied once at the application root
 * via {@link provideHubMilestones}. Every option can still be overridden per
 * instance with the matching `<hub-milestones>` input.
 */
export interface HubMilestonesConfig {
	/**
	 * When `true` (the default), a `<hub-milestones>` plays a one-shot "completing"
	 * animation — the accent trail fills from the first node up to the active node —
	 * the first time it scrolls into the viewport. Set to `false` to disable it
	 * globally. Always disabled under `prefers-reduced-motion`.
	 */
	reveal?: boolean;
}

/** DI token holding the resolved {@link HubMilestonesConfig}. */
export const HUB_MILESTONES_CONFIG = new InjectionToken<HubMilestonesConfig>('HUB_MILESTONES_CONFIG');

/**
 * Registers global {@link HubMilestonesConfig} defaults. Add it to the application
 * config providers:
 *
 * ```ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideHubMilestones({ reveal: false })]
 * };
 * ```
 */
export function provideHubMilestones(config: HubMilestonesConfig = {}): EnvironmentProviders {
	return makeEnvironmentProviders([{ provide: HUB_MILESTONES_CONFIG, useValue: config }]);
}
