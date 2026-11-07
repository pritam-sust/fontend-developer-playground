import { useEffect, RefObject } from 'react';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * useFocusTrap - Traps keyboard navigation inside a modal container
 * Ensures full WCAG 2.1 compliance (Success Criterion 2.1.2: No Keyboard Trap outside modal).
 *
 * @param containerRef Reference to the dialog DOM element
 * @param isActive Whether the focus trap should be engaged
 * @param initialFocusRef Optional specific element inside to focus first
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  isActive: boolean,
  initialFocusRef?: RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Find all focusable descendants within the container
    const getFocusableElements = (): HTMLElement[] => {
      const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      return Array.from(elements).filter(
        (el) => el.offsetParent !== null && !el.hasAttribute('disabled')
      );
    };

    // Set initial focus
    const focusable = getFocusableElements();
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      container.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const currentFocusable = getFocusableElements();
      if (currentFocusable.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = currentFocusable[0];
      const lastElement = currentFocusable[currentFocusable.length - 1];

      // Shift + Tab on first element -> cycle to last element
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      // Tab on last element -> cycle to first element
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, isActive, initialFocusRef]);
}

