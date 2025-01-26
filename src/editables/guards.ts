/**
 * Checks whether the given element is an `HTMLTableElement`.
 *
 * @param element - The element to perform the check on.
 *
 * @internal
 */
export function isValidTableEl(
  element: HTMLElement | null,
): element is HTMLTableElement {
  return !!element && element instanceof HTMLTableElement;
}
