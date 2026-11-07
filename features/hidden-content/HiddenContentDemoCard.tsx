'use client';

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/common/Badge';

export const HiddenContentDemoCard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'visual' | 'screenReader'>('visual');

  return (
    <Card
      id="feature-hidden-content"
      title="Hidden Content & Decorative Elements"
      subtitle="Correct application of aria-hidden and visually-hidden techniques"
      badge="Feature 4"
      ariaBadge='aria-hidden="true"'
      icon={<Icon name="eye-off" size={22} isDecorative={true} />}
      footer={
        <div className="d-flex flex-wrap align-items-center gap-2 small text-secondary">
          <span>Attributes:</span>
          <span className="aria-tag">aria-hidden=&quot;true&quot;</span>
          <span className="aria-tag">focusable=&quot;false&quot;</span>
          <span className="aria-tag">.visually-hidden</span>
          <span className="aria-tag">role=&quot;img&quot;</span>
        </div>
      }
    >
      <p className="text-secondary small mb-3">
        Assistive software announces all DOM elements unless explicitly instructed.
        Use <code>aria-hidden=&quot;true&quot;</code> exclusively on <strong>decorative visuals</strong> (icons, spacers, background graphics).
        <strong> Never hide interactive elements</strong> (buttons, links, inputs).
      </p>

      {/* Interactive Mode Switcher */}
      <div className="d-flex align-items-center justify-content-between p-2 bg-light rounded border mb-3">
        <span className="small fw-semibold text-dark">A11y Inspector Mode:</span>
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
            Screen Reader Perception
          </button>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="row g-3 mb-3">
        {/* Example A: Decorative Icon with visible text */}
        <div className="col-12 col-md-6">
          <div className="border rounded p-3 h-100 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="fw-semibold small">1. Decorative Icon</span>
              <Badge variant="success">Recommended</Badge>
            </div>

            {viewMode === 'visual' ? (
              <div className="p-3 border rounded bg-light d-flex align-items-center gap-2">
                {/* Decorative icon hidden from screen reader */}
                <Icon name="ticket" size={20} isDecorative={true} className="text-primary" />
                <span className="fw-medium">Discount Hub Dashboard</span>
              </div>
            ) : (
              <div className="p-3 border rounded bg-dark text-white font-monospace small">
                <span className="text-muted">[Icon ignored by a11y tree]</span>
                <br />
                <strong>Spoken:</strong> &ldquo;Discount Hub Dashboard&rdquo;
              </div>
            )}

            <p className="small text-muted mt-2 mb-0" style={{ fontSize: '0.78rem' }}>
              <code>aria-hidden=&quot;true&quot;</code> prevents screen readers from redundantly announcing &ldquo;graphic, unlabelled image&rdquo;.
            </p>
          </div>
        </div>

        {/* Example B: Icon-Only Action with Accessible Name */}
        <div className="col-12 col-md-6">
          <div className="border rounded p-3 h-100 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="fw-semibold small">2. Icon-Only Button</span>
              <Badge variant="info">Dual Pattern</Badge>
            </div>

            {viewMode === 'visual' ? (
              <div className="p-3 border rounded bg-light d-flex align-items-center justify-content-between">
                <span>Copy Coupon Code</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  aria-label="Copy coupon code A11Y-HERO-50 to clipboard"
                >
                  <Icon name="copy" size={16} isDecorative={true} />
                </button>
              </div>
            ) : (
              <div className="p-3 border rounded bg-dark text-white font-monospace small">
                <span>Copy Coupon Code</span>
                <br />
                <strong>Button Label:</strong> &ldquo;Copy coupon code A11Y-HERO-50 to clipboard&rdquo;
              </div>
            )}

            <p className="small text-muted mt-2 mb-0" style={{ fontSize: '0.78rem' }}>
              The icon is decorative (<code>aria-hidden=&quot;true&quot;</code>), while the button receives an explicit <code>aria-label</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Contrast Best Practice Table */}
      <div className="table-responsive small">
        <table className="table table-bordered table-sm mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Pattern</th>
              <th scope="col">HTML / ARIA Implementation</th>
              <th scope="col">Verdict</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Decorative SVG</td>
              <td><code>&lt;svg aria-hidden=&quot;true&quot; focusable=&quot;false&quot;&gt;</code></td>
              <td><span className="text-success fw-bold">✓ Best Practice</span></td>
            </tr>
            <tr>
              <td>Screen-Reader-Only Text</td>
              <td><code>&lt;span className=&quot;visually-hidden&quot;&gt;Details&lt;/span&gt;</code></td>
              <td><span className="text-success fw-bold">✓ Best Practice</span></td>
            </tr>
            <tr>
              <td>Hidden Interactive Button</td>
              <td><code>&lt;button aria-hidden=&quot;true&quot;&gt;Click&lt;/button&gt;</code></td>
              <td><span className="text-danger fw-bold">✗ Anti-Pattern (Focusable but invisible)</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

