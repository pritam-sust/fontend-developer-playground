import { useEffect, useRef } from 'react';

/**
 * useFocusReturn - Saves the active element before opening an overlay
 * and restores focus to it when the overlay closes.
 * Crucial for keyboard users who need to retain context in the document flow.
 *
 * @param isOpen Whether the overlay is currently open
 */
export function useFocusReturn(isOpen: boolean) {
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Capture the trigger element right before focus transfers into dialog
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
    } else if (previouslyFocusedElementRef.current) {
      // Restore focus on close with microtask tick to let DOM unmount gracefully
      const elementToFocus = previouslyFocusedElementRef.current;
      setTimeout(() => {
        if (elementToFocus && typeof elementToFocus.focus === 'function') {
          elementToFocus.focus();
        }
      }, 0);
    }
  }, [isOpen]);
}

