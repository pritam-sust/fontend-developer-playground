import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { announcePolite } from '@/store/slices/announcementSlice';
import { recordCodeCopied } from '@/store/slices/discountSlice';

interface UseCopyToClipboardResult {
  copiedText: string | null;
  copy: (text: string, accessibleLabel?: string) => Promise<boolean>;
  reset: () => void;
}

/**
 * useCopyToClipboard - Copies text with cross-browser fallback and sends
 * polite screen-reader announcements to keep non-sighted users informed.
 */
export function useCopyToClipboard(timeoutMs = 2500): UseCopyToClipboardResult {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const copy = useCallback(
    async (text: string, accessibleLabel?: string): Promise<boolean> => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers or constrained test environments
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        setCopiedText(text);
        dispatch(recordCodeCopied(text));

        // Screen-reader announcement using ARIA live="polite"
        const announcement = accessibleLabel
          ? `Copied: ${accessibleLabel} (${text}) to clipboard.`
          : `Copied ${text} to clipboard.`;
        dispatch(announcePolite(announcement));

        setTimeout(() => {
          setCopiedText(null);
        }, timeoutMs);

        return true;
      } catch (err) {
        console.error('Failed to copy to clipboard', err);
        dispatch(announcePolite(`Failed to copy ${text} to clipboard.`));
        return false;
      }
    },
    [dispatch, timeoutMs]
  );

  const reset = useCallback(() => {
    setCopiedText(null);
  }, []);

  return { copiedText, copy, reset };
}

