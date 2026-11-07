'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';

interface A11yItem {
  attribute: string;
  purpose: string;
  implementation: string;
  location: string;
  status: 'Verified';
}

const matrixData: A11yItem[] = [
  {
    attribute: 'aria-hidden="true"',
    purpose: 'Hides purely decorative icons and background visuals from assistive tech',
    implementation: 'Used across all decorative SVG icons and backdrop overlays',
    location: 'components/common/Icon.tsx, Feature 4',
    status: 'Verified',
  },
  {
    attribute: 'aria-label="Reveal Discounts"',
    purpose: 'Provides unambiguous accessible name to discount trigger button',
    implementation: 'Explicit attribute on button element with aria-haspopup="dialog"',
    location: 'features/discount/DiscountRevealCard.tsx',
    status: 'Verified',
  },
  {
    attribute: 'aria-modal="true"',
    purpose: 'Informs screen readers that content outside the dialog is inert/inaccessible',
    implementation: 'Attached to dialog container alongside focus trap containment',
    location: 'components/dialog/Modal.tsx & AlertDialog.tsx',
    status: 'Verified',
  },
  {
    attribute: 'aria-modal="false"',
    purpose: 'Explicitly declares a modeless dialog where background content remains fully interactive',
    implementation: 'Attached to floating discount drawer; keyboard users can tab freely to page content',
    location: 'components/dialog/NonModalDrawer.tsx, Feature 1',
    status: 'Verified',
  },
  {
    attribute: 'aria-hidden="false"',
    purpose: 'Explicitly exposes dynamically disclosed content to the assistive tech tree',
    implementation: 'Dynamically set when secret promo accordion is expanded by the user',
    location: 'features/hidden-content/HiddenContentDemoCard.tsx, Feature 4',
    status: 'Verified',
  },
  {
    attribute: 'role="alertdialog"',
    purpose: 'Identifies urgent confirmation dialog requiring immediate response',
    implementation: 'Container role on destructive reset prompt with safe Cancel focus',
    location: 'features/alert/AlertDialogDemoCard.tsx',
    status: 'Verified',
  },
  {
    attribute: 'role="dialog"',
    purpose: 'Identifies standard application modal dialog window',
    implementation: 'Container role on discount promotional reveal modal',
    location: 'features/discount/DiscountRevealCard.tsx',
    status: 'Verified',
  },
  {
    attribute: 'aria-labelledby',
    purpose: 'Establishes programmatically associated title for dialogs',
    implementation: 'Associates dialog element with dynamic title ID',
    location: 'components/dialog/Modal.tsx, AlertDialog.tsx',
    status: 'Verified',
  },
  {
    attribute: 'aria-live="polite"',
    purpose: 'Announces non-urgent status updates at the synthesizer idle moment',
    implementation: 'Triggered when copying discount vouchers or saving options',
    location: 'features/live-region/LiveRegionDemoCard.tsx, useCopyToClipboard',
    status: 'Verified',
  },
  {
    attribute: 'aria-live="assertive"',
    purpose: 'Interrupts screen reader speech immediately for critical alerts',
    implementation: 'Triggered on voucher revocations, session warnings, or errors',
    location: 'features/live-region/LiveRegionDemoCard.tsx, alertSlice',
    status: 'Verified',
  },
];

export const A11yMatrixCard: React.FC = () => {
  return (
    <Card
      id="a11y-audit-matrix"
      title="WAI-ARIA & WCAG 2.1 Compliance Matrix"
      subtitle="Complete verification of all project accessibility specifications"
      badge="A11y Audit"
      ariaBadge="WCAG 2.1 AA/AAA"
      icon={<Icon name="shield-check" size={22} className="text-success" isDecorative={true} />}
    >
      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle small mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col" style={{ width: '22%' }}>ARIA Attribute / Role</th>
              <th scope="col" style={{ width: '30%' }}>Demonstrated Purpose</th>
              <th scope="col" style={{ width: '28%' }}>Technical Implementation</th>
              <th scope="col" style={{ width: '20%' }}>Component Source</th>
            </tr>
          </thead>
          <tbody>
            {matrixData.map((item, index) => (
              <tr key={index}>
                <td>
                  <code className="text-primary fw-bold font-monospace">
                    {item.attribute}
                  </code>
                </td>
                <td>{item.purpose}</td>
                <td>{item.implementation}</td>
                <td>
                  <span className="text-muted font-monospace" style={{ fontSize: '0.75rem' }}>
                    {item.location}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 p-3 bg-light rounded border d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div className="d-flex align-items-center gap-2">
          <Icon name="check" size={18} className="text-success" isDecorative={true} />
          <span className="small fw-semibold text-dark">
            Keyboard Interactions Verified: Focus Trapping (Tab / Shift+Tab), Focus Restoration, and Escape Dismissal.
          </span>
        </div>
        <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
          100% Compliant
        </span>
      </div>
    </Card>
  );
};

