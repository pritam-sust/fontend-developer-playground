'use client';

import React from 'react';
import { DiscountRevealCard } from '@/features/discount/DiscountRevealCard';
import { AlertDialogDemoCard } from '@/features/alert/AlertDialogDemoCard';
import { LiveRegionDemoCard } from '@/features/live-region/LiveRegionDemoCard';
import { HiddenContentDemoCard } from '@/features/hidden-content/HiddenContentDemoCard';
import { ReduxStateInspectorCard } from '@/features/redux-state/ReduxStateInspectorCard';
import { JQueryDemoCard } from '@/features/jquery/JQueryDemoCard';
import { A11yMatrixCard } from '@/features/a11y-matrix/A11yMatrixCard';
import { AttributeGuideCard } from '@/features/attribute-guide/AttributeGuideCard';
import { Icon } from '@/components/common/Icon';

export default function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="hub-header py-4 shadow-sm" role="banner">
        <div className="container">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-primary text-white font-monospace px-2 py-1">
                  ENTERPRISE ARCHITECTURE
                </span>
                <span className="badge bg-success text-white px-2 py-1 d-inline-flex align-items-center gap-1">
                  <Icon name="shield-check" size={14} isDecorative={true} />
                  WCAG 2.1 AA+
                </span>
              </div>
              <h1 className="h3 fw-bold mb-1 text-white">
                Discount Hub – Frontend &amp; Accessibility Playground
              </h1>
              <p className="text-light opacity-75 mb-0 small">
                Practical demonstration of Senior Frontend Architecture: React.js, Next.js, Redux Toolkit, TypeScript, Bootstrap, SCSS, Isolated jQuery, and WAI-ARIA.
              </p>
            </div>

            {/* Quick Stats / Tech Stack Badges */}
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-dark border text-light py-2 px-3">
                React 18 &amp; Next.js 14
              </span>
              <span className="badge bg-dark border text-light py-2 px-3">
                Redux Toolkit
              </span>
              <span className="badge bg-dark border text-light py-2 px-3">
                TypeScript
              </span>
              <span className="badge bg-dark border text-light py-2 px-3">
                SCSS &amp; Bootstrap 5
              </span>
              <span className="badge bg-dark border text-light py-2 px-3">
                jQuery 4.0 (Quarantined)
              </span>
            </div>
          </div>

          {/* Quick Jump Navigation */}
          <nav aria-label="Feature shortcuts" className="mt-4 pt-3 border-top border-secondary border-opacity-25">
            <ul className="nav nav-pills gap-2 flex-wrap">
              <li className="nav-item">
                <a className="nav-link btn btn-sm btn-outline-light text-white py-1 px-3" href="#feature-discount-reveal">
                  1. Discount Reveal Modal
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-sm btn-outline-light text-white py-1 px-3" href="#feature-alert-dialog">
                  2. Alert Dialog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-sm btn-outline-light text-white py-1 px-3" href="#feature-live-regions">
                  3. Live Regions (Polite/Assertive)
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-sm btn-outline-light text-white py-1 px-3" href="#feature-hidden-content">
                  4. Hidden Content
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-sm btn-outline-light text-white py-1 px-3" href="#feature-redux-state">
                  5. Redux State Inspector
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-sm btn-outline-light text-white py-1 px-3" href="#feature-jquery">
                  6. Isolated jQuery
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-sm btn-outline-light text-white py-1 px-3" href="#a11y-audit-matrix">
                  A11y Audit Matrix
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-sm btn-outline-light text-white py-1 px-3" href="#attribute-architecture-guide">
                  Attribute Dictionary
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="flex-grow-1 py-4" role="main">
        <div className="container">
          {/* Introductory Architecture Banner */}
          <section className="mb-4" aria-labelledby="overview-heading">
            <div className="p-4 bg-white border rounded shadow-sm">
              <h2 id="overview-heading" className="h5 fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                <Icon name="sparkles" size={20} className="text-primary" isDecorative={true} />
                Architecture Overview &amp; Accessibility Standards
              </h2>
              <p className="text-secondary small mb-0">
                This project focuses on <strong>engineering rigor and technical precision</strong>.
                Each card operates as an isolated demonstration of specific modern frontend techniques:
                proper keyboard focus trapping and return, modal and alertdialog distinction, polite vs. assertive ARIA announcements,
                decorative element hiding, central Redux state slices, and safe quarantine of legacy DOM manipulation (jQuery).
              </p>
            </div>
          </section>

          {/* Row 1: Dialogs (Feature 1 & Feature 2) */}
          <section className="row g-4 mb-4" aria-label="Dialog Demonstrations">
            <div className="col-12 col-lg-6">
              <DiscountRevealCard />
            </div>
            <div className="col-12 col-lg-6">
              <AlertDialogDemoCard />
            </div>
          </section>

          {/* Row 2: Assistive & Hidden Content (Feature 3 & Feature 4) */}
          <section className="row g-4 mb-4" aria-label="Assistive Technology Demonstrations">
            <div className="col-12 col-lg-6">
              <LiveRegionDemoCard />
            </div>
            <div className="col-12 col-lg-6">
              <HiddenContentDemoCard />
            </div>
          </section>

          {/* Row 3: State & Legacy Integration (Feature 5 & Feature 6) */}
          <section className="row g-4 mb-4" aria-label="State and Legacy Integration">
            <div className="col-12 col-lg-6">
              <ReduxStateInspectorCard />
            </div>
            <div className="col-12 col-lg-6">
              <JQueryDemoCard />
            </div>
          </section>

          {/* Row 4: Complete A11y Compliance Audit Table */}
          <section className="row g-4 mb-4" aria-label="Accessibility Compliance Matrix">
            <div className="col-12">
              <A11yMatrixCard />
            </div>
          </section>

          {/* Row 5: Attribute & Architecture Dictionary */}
          <section className="row g-4 mb-4" aria-label="Attribute and Framework Architecture Dictionary">
            <div className="col-12">
              <AttributeGuideCard />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto border-top border-secondary border-opacity-25" role="contentinfo">
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
            <div>
              <p className="fw-semibold mb-1">
                Discount Hub – Frontend &amp; Accessibility Playground
              </p>
              <p className="text-secondary small mb-0">
                Built with React 18, Next.js, Redux Toolkit, TypeScript, Bootstrap 5, SCSS, and jQuery.
              </p>
            </div>
            <div className="small text-secondary">
              Designed following WCAG 2.1 AA/AAA Guidelines &amp; WAI-ARIA 1.2 Standards.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

