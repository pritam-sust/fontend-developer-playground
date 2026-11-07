/**
 * Accessibility utility functions
 */

let idCounter = 0;

/**
 * Generates an accessible, guaranteed unique DOM element ID.
 */
export function generateA11yId(prefix = 'a11y'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Math.random().toString(36).substring(2, 7)}`;
}

/**
 * Returns whether an element is currently visible to assistive tech
 */
export function isElementAccessible(element: HTMLElement): boolean {
  if (element.getAttribute('aria-hidden') === 'true') return false;
  if (element.hasAttribute('hidden')) return false;
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

