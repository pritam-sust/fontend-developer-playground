'use client';

import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openModal, closeModal } from '@/store/slices/modalSlice';
import { Modal } from '@/components/dialog/Modal';
import { NonModalDrawer } from '@/components/dialog/NonModalDrawer';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';
import { DiscountModalContent } from './DiscountModalContent';

/**
 * DiscountRevealCard - Demonstrates both Modal (aria-modal="true") and
 * Non-Modal (aria-modal="false") dialog architectures.
 *
 * Architectural Deep Dive:
 * - aria-modal="true": Tells screen readers that the entire page outside this dialog
 *   is inert and inaccessible. Must be paired with a keyboard focus trap.
 * - aria-modal="false": Tells screen readers that this is a modeless dialog (like a floating
 *   inspector, tool palette, or discount drawer). The background document remains fully
 *   interactive, and keyboard users can freely tab out of the dialog into page content.
 */
export const DiscountRevealCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
  const [isNonModalOpen, setIsNonModalOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const nonModalTriggerRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Card
        id="feature-discount-reveal"
        title="Discount Dialogs (Modal vs. Non-Modal)"
        subtitle="Practical comparison of aria-modal='true' vs. aria-modal='false'"
        badge="Feature 1"
        ariaBadge='role="dialog"'
        icon={<Icon name="ticket" size={22} isDecorative={true} />}
        footer={
          <div className="d-flex flex-wrap align-items-center gap-2 small text-secondary">
            <span>Attributes:</span>
            <span className="aria-tag">aria-label=&quot;Reveal Discounts&quot;</span>
            <span className="aria-tag">aria-modal=&quot;true&quot;</span>
            <span className="aria-tag">aria-modal=&quot;false&quot;</span>
            <span className="aria-tag">role=&quot;dialog&quot;</span>
          </div>
        }
      >
        <p className="text-secondary small mb-3">
          This component showcases the crucial accessibility difference between <strong>modal dialogs</strong> (which trap focus and block background interaction) and <strong>non-modal dialogs</strong> (which allow concurrent interaction with the rest of the application).
        </p>

        {/* Dual Trigger Buttons */}
        <div className="p-3 bg-light rounded border mb-3">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="small fw-semibold text-dark">Interactive Demonstrations</span>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
              WCAG 2.1.2 &amp; 2.4.3
            </span>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <Button
              ref={triggerButtonRef}
              variant="primary"
              onClick={handleOpenModal}
              aria-label="Reveal Discounts"
              aria-haspopup="dialog"
              aria-expanded={isModalOpen}
              leftIcon={<Icon name="sparkles" size={16} isDecorative={true} />}
            >
              Open Modal (aria-modal=&quot;true&quot;)
            </Button>

            <Button
              ref={nonModalTriggerRef}
              variant="outline-primary"
              onClick={() => setIsNonModalOpen(!isNonModalOpen)}
              aria-label="Toggle floating non-modal discount drawer"
              aria-haspopup="dialog"
              aria-expanded={isNonModalOpen}
              leftIcon={<Icon name="layers" size={16} isDecorative={true} />}
            >
              {isNonModalOpen ? 'Close Modeless Drawer' : 'Open Modeless (aria-modal="false")'}
            </Button>
          </div>
        </div>

        {/* Technical Comparison Table */}
        <div className="table-responsive small mb-2">
          <table className="table table-bordered table-sm mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col" style={{ width: '25%' }}>Criterion</th>
                <th scope="col" style={{ width: '37.5%' }}>
                  <code>aria-modal=&quot;true&quot;</code> (Modal)
                </th>
                <th scope="col" style={{ width: '37.5%' }}>
                  <code>aria-modal=&quot;false&quot;</code> (Non-Modal)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-semibold">Background Document</td>
                <td>Inert; clicks &amp; typing blocked by backdrop</td>
                <td><span className="text-success fw-semibold">Fully interactive</span>; user can click &amp; type</td>
              </tr>
              <tr>
                <td className="fw-semibold">Keyboard Focus</td>
                <td>Trapped inside (<kbd>Tab</kbd> cycles inside dialog)</td>
                <td><span className="text-primary fw-semibold">Untrapped</span>; <kbd>Tab</kbd> exits to page elements</td>
              </tr>
              <tr>
                <td className="fw-semibold">Use Case</td>
                <td>Urgent prompts, checkouts, confirmations</td>
                <td>Floating tools, coupon docks, chat widgets</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Standard Modal Dialog (aria-modal="true") */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Exclusive Architecture & Development Discounts"
        description="Modal Dialog Mode: Keyboard focus is trapped within dialog boundaries until dismissed."
        headerIcon={<Icon name="ticket" size={22} isDecorative={true} />}
      >
        <DiscountModalContent />
      </Modal>

      {/* Non-Modal Floating Drawer (aria-modal="false") */}
      <NonModalDrawer
        isOpen={isNonModalOpen}
        onClose={() => setIsNonModalOpen(false)}
        title="Floating Discount Dock"
        description="Modeless Dialog Mode (aria-modal='false'). Try clicking buttons on the main page while keeping this open!"
      >
        <DiscountModalContent />
      </NonModalDrawer>
    </>
  );
};
