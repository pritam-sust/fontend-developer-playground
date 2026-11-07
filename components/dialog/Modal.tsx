'use client';

import React, { useRef } from 'react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useFocusReturn } from '@/hooks/useFocusReturn';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { Icon } from '@/components/common/Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement>;
  className?: string;
  headerIcon?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  initialFocusRef,
  className = '',
  headerIcon,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descId = React.useId();

  // Traps keyboard navigation inside modal dialog
  useFocusTrap(modalRef, isOpen, initialFocusRef);

  // Captures trigger button before open and restores focus when modal closes
  useFocusReturn(isOpen);

  // Closes modal on Escape key press
  useEscapeKey(onClose, isOpen);

  if (!isOpen) return null;

  return (
    <div
      className="a11y-modal-backdrop"
      onClick={(e) => {
        // Close when clicking directly on backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      aria-hidden="false"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={`a11y-modal-dialog ${className}`}
      >
        <header className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <div className="d-flex align-items-center gap-2">
            {headerIcon && <div className="text-primary">{headerIcon}</div>}
            <div>
              <h2 id={titleId} className="h5 fw-bold mb-0 text-dark">
                {title}
              </h2>
              {description && (
                <p id={descId} className="text-muted small mb-0 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center"
            onClick={onClose}
            aria-label="Close dialog"
            title="Close dialog (Escape)"
          >
            <Icon name="x" size={18} isDecorative={true} />
          </button>
        </header>

        <main className="p-3">{children}</main>
      </div>
    </div>
  );
};

