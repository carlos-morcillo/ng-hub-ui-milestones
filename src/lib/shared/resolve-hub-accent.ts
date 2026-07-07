/**
 * Resolves a user-supplied accent value into a CSS colour usable as a custom
 * property value.
 *
 * A bareword (e.g. `primary`, or any registered/CSS named colour) is mapped to the
 * design-system token `var(--hub-sys-color-<name>, <name>)` — so semantic names work,
 * with the raw word kept as fallback. A literal value (`#hex`, `rgb()`, `oklch()`,
 * `var()`…) is passed through unchanged. Empty/whitespace/nullish input yields `null`
 * so callers can fall back to the built-in state colour.
 *
 * @param value - The raw accent value provided by the consumer.
 * @returns The resolved CSS colour, or `null` when no usable value was given.
 */
export function resolveHubAccent(value: string | null | undefined): string | null {
	const color = value?.trim();
	if (!color) return null;
	return /^[a-zA-Z][\w-]*$/.test(color) ? `var(--hub-sys-color-${color}, ${color})` : color;
}
