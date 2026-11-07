'use client';

import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openModal, closeModal } from '@/store/slices/modalSlice';
import { Modal } from '@/components/dialog/Modal';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';
import { DiscountModalContent } from './DiscountModalContent';

export const DiscountRevealCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Card
        id="feature-discount-reveal"
        title="Discount Reveal Dialog"
        subtitle="Accessible dialog demonstration with focus trapping & return"
        badge="Feature 1"
        ariaBadge='role="dialog"'
        icon={<Icon name="ticket" size={22} isDecorative={true} />}
        footer={
          <div className="d-flex flex-wrap align-items-center gap-2 small text-secondary">
            <span>Attributes:</span>
            <span className="aria-tag">aria-label=&quot;Reveal Discounts&quot;</span>
            <span className="aria-tag">aria-modal=&quot;true&quot;</span>
            <span className="aria-tag">role=&quot;dialog&quot;</span>
            <span className="aria-tag">aria-labelledby</span>
          </div>
        }
      >
        <p className="text-secondary small mb-3">
          Clicking the trigger button opens a modal displaying exclusive promotional codes.
          The modal features <strong>focus containment</strong> (preventing tabbing to the page background),
          <strong>Escape key listener</strong>, and <strong>focus restoration</strong> back to this exact button when closed.
        </p>

        <div className="p-3 bg-light rounded border mb-3">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="small fw-semibold text-dark">Interactive Trigger</span>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
              WCAG 2.1.2 &amp; 2.4.3
            </span>
          </div>

          <Button
            ref={triggerButtonRef}
            variant="primary"
            onClick={handleOpen}
            aria-label="Reveal Discounts"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            leftIcon={<Icon name="sparkles" size={16} isDecorative={true} />}
          >
            Reveal Discounts
          </Button>
        </div>

        <div className="small text-muted">
          <strong>Accessibility Highlights:</strong>
          <ul className="mb-0 ps-3 mt-1">
            <li>Trigger features explicit <code>aria-label=&quot;Reveal Discounts&quot;</code> and <code>aria-haspopup=&quot;dialog&quot;</code>.</li>
            <li>Traps <kbd>Tab</kbd> and <kbd>Shift + Tab</kbd> within dialog boundaries.</li>
            <li>Pressing <kbd>Esc</kbd> or clicking outside gracefully dismisses the dialog.</li>
            <li>Returns document focus back to the trigger button immediately on close.</li>
          </ul>
        </div>
      </Card>

      {/* Reusable Accessible Modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Exclusive Architecture & Development Discounts"
        description="Select a discount code below to copy to clipboard or apply directly to your cart session."
        headerIcon={<Icon name="ticket" size={22} isDecorative={true} />}
      >
        <DiscountModalContent />
      </Modal>
    </>
  );
};

