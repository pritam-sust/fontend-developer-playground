'use client';

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

/**
 * HiddenContentDemoCard - Demonstrates aria-hidden="true" vs. aria-hidden="false"
 * and clarifies the architectural distinction between aria-hidden and aria-modal.
 *
 * Key Concepts:
 * 1. aria-hidden="true":
 *    Removes the target element and ALL its children from the assistive technology
 *    accessibility tree. Sighted users may see it (if not display:none), but screen
 *    readers act as if the element does not exist. Crucial for purely decorative icons.
 *
 * 2. aria-hidden="false":
 *    Explicitly exposes the element and its children to the accessibility tree.
 *    Used dynamically when unveiling collapsible drawers, revealable vouchers,
 *    or overriding an inherited hidden state on a specific interactive component.
 *
 * 3. Crucial Difference from aria-modal:
 *    - aria-hidden affects SUBTREES (a specific node and its children).
 *    - aria-modal affects SIBLING/ANCESTOR CONTEXT (whether the rest of the document
 *      outside the dialog is inert).
 */
export const HiddenContentDemoCard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'visual' | 'screenReader'>('visual');
  const [isSecretVoucherVisible, setIsSecretVoucherVisible] = useState(false);

  return (
    <Card
      id="feature-hidden-content"
      title="Hidden Content & Visibility Architecture"
      subtitle="Comprehensive demonstration of aria-hidden='true' vs. aria-hidden='false'"
      badge="Feature 4"
      ariaBadge='aria-hidden'
      icon={<Icon name="eye-off" size={22} isDecorative={true} />}
      footer={
        <div className="d-flex flex-wrap align-items-center gap-2 small text-secondary">
          <span>Attributes:</span>
          <span className="aria-tag">aria-hidden=&quot;true&quot;</span>
          <span className="aria-tag">aria-hidden=&quot;false&quot;</span>
          <span className="aria-tag">aria-modal=&quot;false&quot;</span>
          <span className="aria-tag">focusable=&quot;false&quot;</span>
        </div>
      }
    >
      <p className="text-secondary small mb-3">
        Assistive technologies parse the <strong>Accessibility Tree</strong>.
        Use <code>aria-hidden=&quot;true&quot;</code> to remove decorative or collapsed elements, and <code>aria-hidden=&quot;false&quot;</code> to dynamically expose content once activated.
      </p>

      {/* Interactive Mode Switcher */}
      <div className="d-flex align-items-center justify-content-between p-2 bg-light rounded border mb-3">
        <span className="small fw-semibold text-dark">A11y Inspector Perspective:</span>
        <div className="btn-group btn-group-sm" role="group" aria-label="Perspective View Toggle">
          <button
            type="button"
            className={`btn ${viewMode === 'visual' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setViewMode('visual')}
          >
            Sighted User View
          </button>
          <button
            type="button"
            className={`btn ${viewMode === 'screenReader' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setViewMode('screenReader')}
          >
            Screen Reader Tree
          </button>
        </div>
      </div>

      {/* Dynamic Demonstration: aria-hidden="false" vs aria-hidden="true" */}
      <div className="border rounded p-3 mb-3 bg-white">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="fw-semibold small text-dark d-flex align-items-center gap-2">
            <Icon name="sparkles" size={16} className="text-warning" isDecorative={true} />
            Interactive Dynamic Disclosure (aria-hidden state switch)
          </span>
          <span
            className={`badge font-monospace ${
              isSecretVoucherVisible
                ? 'bg-success text-white'
                : 'bg-secondary text-white'
            }`}
          >
            aria-hidden=&quot;{isSecretVoucherVisible ? 'false' : 'true'}&quot;
          </span>
        </div>

        <p className="small text-muted mb-2">
          Toggle below to dynamically flip between <code>aria-hidden=&quot;true&quot;</code> and <code>aria-hidden=&quot;false&quot;</code>.
        </p>

        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setIsSecretVoucherVisible(!isSecretVoucherVisible)}
          aria-expanded={isSecretVoucherVisible}
          aria-controls="dynamic-secret-voucher"
          className="mb-2"
        >
          {isSecretVoucherVisible ? 'Collapse & Hide Voucher' : 'Reveal Secret Voucher (Set aria-hidden="false")'}
        </Button>

        {/* Dynamic target container */}
        <div
          id="dynamic-secret-voucher"
          aria-hidden={isSecretVoucherVisible ? 'false' : 'true'}
          className={`p-3 rounded border transition ${
            isSecretVoucherVisible
              ? 'bg-success-subtle border-success text-success-emphasis'
              : 'bg-light text-muted d-none'
          }`}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <strong className="font-monospace">SECRET-ARCHITECT-90</strong>
              <div className="small">90% off Frontend System Design Certification</div>
            </div>
            <span className="badge bg-success">Exposed to Accessibility Tree</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side: Sighted vs Screen Reader */}
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-6">
          <div className="border rounded p-2 h-100 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="fw-semibold small">1. Decorative SVG Icon</span>
              <span className="badge bg-primary-subtle text-primary border">aria-hidden=&quot;true&quot;</span>
            </div>
            {viewMode === 'visual' ? (
              <div className="p-2 border rounded bg-light d-flex align-items-center gap-2">
                <Icon name="ticket" size={18} isDecorative={true} className="text-primary" />
                <span className="small fw-medium">Frontend Discount Hub</span>
              </div>
            ) : (
              <div className="p-2 border rounded bg-dark text-white font-monospace small">
                <span className="text-secondary">[SVG ignored by a11y tree]</span>
                <br />
                <strong>Spoken:</strong> &ldquo;Frontend Discount Hub&rdquo;
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="border rounded p-2 h-100 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="fw-semibold small">2. Screen-Reader-Only Text</span>
              <span className="badge bg-success-subtle text-success border">.visually-hidden</span>
            </div>
            {viewMode === 'visual' ? (
              <div className="p-2 border rounded bg-light d-flex align-items-center justify-content-between">
                <span className="small">Action: Copy Code</span>
                <span className="btn btn-sm btn-outline-secondary py-0 px-2">
                  <Icon name="copy" size={14} isDecorative={true} />
                </span>
              </div>
            ) : (
              <div className="p-2 border rounded bg-dark text-white font-monospace small">
                <span>Action: Copy Code</span>
                <br />
                <strong>Button Name:</strong> &ldquo;Copy code to clipboard&rdquo;
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Architectural Deep-Dive Table: aria-modal vs aria-hidden */}
      <div className="table-responsive small">
        <table className="table table-bordered table-sm mb-0 align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col" style={{ width: '22%' }}>Attribute</th>
              <th scope="col" style={{ width: '18%' }}>Values</th>
              <th scope="col" style={{ width: '30%' }}>Scope &amp; Target</th>
              <th scope="col" style={{ width: '30%' }}>Assistive Tech Reaction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>aria-modal</code></td>
              <td><code>&quot;true&quot; | &quot;false&quot;</code></td>
              <td>Dialog Containers (<code>role=&quot;dialog&quot;</code>)</td>
              <td>
                If <code>true</code>, treats outside page as inert. If <code>false</code>, allows full interaction with background.
              </td>
            </tr>
            <tr>
              <td><code>aria-hidden</code></td>
              <td><code>&quot;true&quot; | &quot;false&quot;</code></td>
              <td>Any DOM element / Subtree</td>
              <td>
                If <code>true</code>, completely hides that element &amp; descendants from screen reader. If <code>false</code>, exposes them.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};
