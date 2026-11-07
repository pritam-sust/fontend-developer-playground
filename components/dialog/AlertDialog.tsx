'use client';

import React, { useRef } from 'react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useFocusReturn } from '@/hooks/useFocusReturn';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';

interface AlertDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = React.useId();
  const descId = React.useId();

  // WAI-ARIA best practice for alertdialog: focus Cancel by default to prevent accidental destructive action
  useFocusTrap(dialogRef, isOpen, cancelBtnRef);

  // Restore focus to trigger button upon dismissal
  useFocusReturn(isOpen);

  // Allow Escape key to dismiss the alert safely
  useEscapeKey(onCancel, isOpen);

  if (!isOpen) return null;

  return (
    <div
      className="a11y-modal-backdrop"
      onClick={(e) => {
        // For urgent alertdialogs, clicking outside can safely cancel
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="a11y-modal-dialog alert-variant"
      >
        <div className="p-4">
          <div className="d-flex align-items-start gap-3 mb-3">
            <div
              className={`p-2 rounded-circle ${
                isDestructive ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'
              }`}
            >
              <Icon name="alert-triangle" size={24} isDecorative={true} />
            </div>
            <div>
              <h2 id={titleId} className="h5 fw-bold text-dark mb-1">
                {title}
              </h2>
              <p id={descId} className="text-secondary small mb-0">
                {description}
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-2 border-top">
            <Button
              ref={cancelBtnRef}
              variant="outline-secondary"
              onClick={onCancel}
              size="md"
            >
              {cancelLabel}
            </Button>
            <Button
              variant={isDestructive ? 'danger' : 'primary'}
              onClick={onConfirm}
              size="md"
              leftIcon={<Icon name={isDestructive ? 'trash-2' : 'check'} size={16} isDecorative={true} />}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

