'use client';

import React from 'react';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/common/Button';

interface NonModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * NonModalDrawer - Implements an accessible Non-Modal (Modeless) Dialog.
 *
 * ARIA Specification:
 * - role="dialog"
 * - aria-modal="false" (CRITICAL: Informs assistive tech that content outside this dialog remains interactive)
 * - aria-labelledby & aria-describedby
 *
 * Key Differences from Modal (aria-modal="true"):
 * 1. NO backdrop overlay blocking page background.
 * 2. NO focus trapping: users can freely press Tab to exit this panel and interact with forms or buttons on the page.
 * 3. Modeless interaction: the user can keep this panel open while continuing their normal workflow.
 */
export const NonModalDrawer: React.FC<NonModalDrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  const titleId = React.useId();
  const descId = React.useId();

  if (!isOpen) return null;

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      className="non-modal-drawer shadow-lg border rounded-3 p-3 bg-white"
      tabIndex={-1}
    >
      <div className="d-flex align-items-center justify-content-between pb-2 mb-2 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle font-monospace">
            aria-modal=&quot;false&quot;
          </span>
          <h3 id={titleId} className="h6 fw-bold mb-0 text-dark">
            {title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-light border rounded-circle p-1 d-inline-flex align-items-center justify-content-center"
          aria-label="Close non-modal discount drawer"
          title="Close drawer"
        >
          <Icon name="x" size={16} isDecorative={true} />
        </button>
      </div>

      {description && (
        <p id={descId} className="text-secondary small mb-2">
          {description}
        </p>
      )}

      <div className="non-modal-drawer-body small">{children}</div>

      <div className="mt-3 pt-2 border-top d-flex align-items-center justify-content-between">
        <span className="text-muted" style={{ fontSize: '0.72rem' }}>
          Background remains clickable &amp; tabbable
        </span>
        <Button variant="outline-secondary" size="sm" onClick={onClose}>
          Dismiss
        </Button>
      </div>
    </aside>
  );
};
