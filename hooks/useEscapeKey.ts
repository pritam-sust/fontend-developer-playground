import { useEffect } from 'react';

/**
 * useEscapeKey - Listens to Escape key press and triggers a callback.
 * Required for WCAG modal dismissibility.
 *
 * @param onEscape Callback to invoke
 * @param isActive Whether listener should be attached
 */
export function useEscapeKey(onEscape: () => void, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEscape, isActive]);
}

