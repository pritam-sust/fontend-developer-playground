'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openAlert, closeAlert, confirmAlert } from '@/store/slices/alertSlice';
import { resetAllDiscounts } from '@/store/slices/discountSlice';
import { announceAssertive } from '@/store/slices/announcementSlice';
import { AlertDialog } from '@/components/dialog/AlertDialog';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';

export const AlertDialogDemoCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const alertState = useAppSelector((state) => state.alert);
  const appliedCount = useAppSelector((state) => state.discount.appliedCodes.length);

  const handleOpenAlert = () => {
    dispatch(
      openAlert({
        title: 'Revoke and Reset All Active Discounts?',
        description:
          'This action will immediately remove all applied discount vouchers and clear your saved clipboard history. This change is permanent.',
        confirmLabel: 'Yes, Revoke All',
        cancelLabel: 'Cancel, Keep Codes',
        actionType: 'reset-discounts',
        isDestructive: true,
      })
    );
  };

  const handleConfirm = () => {
    dispatch(confirmAlert());
    dispatch(resetAllDiscounts());
    dispatch(
      announceAssertive(
        'Critical Update: All active discounts and voucher sessions have been revoked.'
      )
    );
  };

  const handleCancel = () => {
    dispatch(closeAlert());
  };

  return (
    <>
      <Card
        id="feature-alert-dialog"
        title="Alert Dialog Component"
        subtitle="Urgent action confirmation with safe focus containment"
        badge="Feature 2"
        ariaBadge='role="alertdialog"'
        icon={<Icon name="alert-triangle" size={22} isDecorative={true} />}
        footer={
          <div className="d-flex flex-wrap align-items-center gap-2 small text-secondary">
            <span>Attributes:</span>
            <span className="aria-tag">role=&quot;alertdialog&quot;</span>
            <span className="aria-tag">aria-modal=&quot;true&quot;</span>
            <span className="aria-tag">aria-labelledby</span>
            <span className="aria-tag">aria-describedby</span>
          </div>
        }
      >
        <p className="text-secondary small mb-3">
          Unlike standard modal dialogs, an <code>alertdialog</code> interrupts normal workflow
          to demand immediate user confirmation on destructive actions. It is announced with high priority
          by assistive software.
        </p>

        <div className="p-3 bg-light rounded border mb-3">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="small fw-semibold text-dark">Destructive Action Trigger</span>
            <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
              {appliedCount} Applied Code{appliedCount === 1 ? '' : 's'}
            </span>
          </div>

          <Button
            variant="outline-danger"
            onClick={handleOpenAlert}
            aria-haspopup="dialog"
            aria-expanded={alertState.isOpen}
            leftIcon={<Icon name="trash-2" size={16} isDecorative={true} />}
          >
            Reset All Active Discounts
          </Button>

          {alertState.status === 'confirmed' && (
            <div className="alert alert-success mt-2 py-2 px-3 small mb-0" role="status">
              Discounts successfully reset!
            </div>
          )}
        </div>

        <div className="small text-muted">
          <strong>Accessibility Highlights:</strong>
          <ul className="mb-0 ps-3 mt-1">
            <li><code>role=&quot;alertdialog&quot;</code> signals urgent interaction to screen readers.</li>
            <li>Default focus is purposefully set on <strong>Cancel</strong>, preventing accidental confirmation when pressing Space/Enter.</li>
            <li>Fully accessible description connected via <code>aria-describedby</code>.</li>
            <li>Focus is safely returned to the trigger button once resolved.</li>
          </ul>
        </div>
      </Card>

      <AlertDialog
        isOpen={alertState.isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={alertState.title}
        description={alertState.description}
        confirmLabel={alertState.confirmLabel}
        cancelLabel={alertState.cancelLabel}
        isDestructive={alertState.isDestructive}
      />
    </>
  );
};

