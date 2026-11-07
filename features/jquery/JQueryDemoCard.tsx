'use client';

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';

/**
 * JQueryDemoCard - Demonstrates safe legacy jQuery integration in modern React.
 *
 * Architectural Principle:
 * React's Virtual DOM assumes exclusive ownership of the DOM nodes it renders.
 * When integrating legacy libraries (like jQuery, D3, or legacy plugins), the Senior Architect pattern
 * is to create an "isolated sandbox container" via React useRef, inject the DOM elements,
 * bind jQuery events solely within that scoped boundary, and rigorously clean up handlers
 * on component unmount to prevent memory leaks and VDOM reconciliation corruption.
 */
export const JQueryDemoCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import to ensure jQuery runs exclusively on client-side
    let isMounted = true;

    import('jquery').then(({ default: $ }) => {
      if (!isMounted || !containerRef.current) return;

      const $root = $(containerRef.current);
      const $box = $root.find('.jq-target-box');
      const $toggleBtn = $root.find('.jq-toggle-btn');
      const $colorBtn = $root.find('.jq-color-btn');
      const $statusText = $root.find('.jq-status-badge');
      const $badge = $root.find('.jq-live-counter');

      let clickCount = 0;

      // Event Handler 1: Toggle visibility / fade
      $toggleBtn.on('click', function (e) {
        e.preventDefault();
        $box.slideToggle(200, function () {
          const isVisible = $box.is(':visible');
          $statusText.text(isVisible ? 'Visible (via slideToggle)' : 'Hidden (via slideToggle)');
          $statusText.toggleClass('bg-success bg-secondary');
        });
      });

      // Event Handler 2: Class manipulation and DOM content update
      $colorBtn.on('click', function (e) {
        e.preventDefault();
        clickCount += 1;
        $box.toggleClass('border-primary bg-primary-subtle');
        $badge.text(`Class Toggled: ${clickCount}x`);
      });

      // Cleanup function to prevent memory leaks and dangling listeners
      return () => {
        $toggleBtn.off('click');
        $colorBtn.off('click');
      };
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card
      id="feature-jquery"
      title="Isolated jQuery Demonstration"
      subtitle="Quarantined DOM manipulation & event handling pattern"
      badge="Feature 6"
      ariaBadge="jQuery 4.0 (Isolated)"
      icon={<Icon name="code" size={22} isDecorative={true} />}
      footer={
        <div className="d-flex flex-wrap align-items-center gap-2 small text-secondary">
          <span>Techniques:</span>
          <span className="aria-tag">React.useRef isolation</span>
          <span className="aria-tag">slideToggle()</span>
          <span className="aria-tag">toggleClass()</span>
          <span className="aria-tag">Event Cleanup ($off)</span>
        </div>
      }
    >
      <p className="text-secondary small mb-3">
        Demonstrates safe integration of legacy <strong>jQuery DOM manipulation</strong> inside a React 18 / Next.js application.
        Direct DOM mutations are strictly encapsulated inside an isolated React ref container, with complete cleanup upon unmount.
      </p>

      {/* Scoped jQuery Sandbox Container */}
      <div ref={containerRef} className="jquery-sandbox-box">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-dark jq-toggle-btn d-inline-flex align-items-center gap-1"
            >
              Toggle Slide
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary jq-color-btn"
            >
              Toggle Style Class
            </button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-success jq-status-badge">
              Visible (via slideToggle)
            </span>
            <span className="badge bg-light text-dark border jq-live-counter">
              Class Toggled: 0x
            </span>
          </div>
        </div>

        {/* DOM Target Element operated by jQuery */}
        <div className="jq-target-box p-3 border rounded bg-white shadow-sm transition">
          <div className="d-flex align-items-center gap-2 mb-1">
            <Icon name="sparkles" size={16} className="text-primary" isDecorative={true} />
            <strong className="text-dark small">jQuery-Managed Subtree</strong>
          </div>
          <p className="small text-secondary mb-0">
            This card element is manipulated directly by jQuery&apos;s <code>$(&apos;.jq-target-box&apos;).slideToggle()</code> and <code>toggleClass()</code>.
            Because React leaves this container untouched after initial render, no reconciliation conflicts occur.
          </p>
        </div>
      </div>

      <div className="small text-muted mt-3">
        <strong>Architectural Best Practice:</strong>
        <p className="mb-0" style={{ fontSize: '0.8rem' }}>
          Notice how jQuery only queries within <code>$root = $(containerRef.current)</code> rather than the global <code>$(document)</code>.
          This prevents cross-component side effects and ensures strict boundary isolation.
        </p>
      </div>
    </Card>
  );
};

