'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';

/**
 * LiveRegionAnnouncer - Renders persistent ARIA live regions in the DOM.
 * Essential for Screen Reader users (NVDA, JAWS, VoiceOver).
 *
 * Keeping persistent live containers in DOM is an accessibility best practice:
 * dynamically injecting `aria-live` containers at the exact moment of announcement
 * can cause some screen readers to miss the initial text change.
 */
export const LiveRegionAnnouncer: React.FC = () => {
  const { politeMessage, assertiveMessage, politeKey, assertiveKey } = useAppSelector(
    (state) => state.announcement
  );

  return (
    <div className="visually-hidden-custom" aria-hidden="false">
      {/* Polite Live Region: read at next idle moment */}
      <div
        id="a11y-live-polite"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        key={`polite-${politeKey}`}
      >
        {politeMessage}
      </div>

      {/* Assertive Live Region: interrupts immediate speech for urgent updates */}
      <div
        id="a11y-live-assertive"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        key={`assertive-${assertiveKey}`}
      >
        {assertiveMessage}
      </div>
    </div>
  );
};

