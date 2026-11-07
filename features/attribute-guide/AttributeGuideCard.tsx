'use client';

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';

interface AttributeEntry {
  name: string;
  category: 'react' | 'nextjs' | 'bootstrap' | 'aria';
  syntax: string;
  description: string;
  purpose: string;
  example: string;
}

const ATTRIBUTE_DICTIONARY: AttributeEntry[] = [
  // React Attributes
  {
    name: 'ref',
    category: 'react',
    syntax: 'ref={containerRef}',
    description: 'Provides a mutable reference directly to the underlying DOM node without causing re-renders.',
    purpose: 'Crucial for keyboard focus traps, restoring focus, and isolating legacy jQuery DOM manipulations.',
    example: 'const dialogRef = useRef<HTMLDivElement>(null); <div ref={dialogRef} />',
  },
  {
    name: 'tabIndex',
    category: 'react',
    syntax: 'tabIndex={-1} | tabIndex={0}',
    description: 'Controls whether an element can receive keyboard focus and where it sits in the sequential tab order.',
    purpose: 'tabIndex={-1} enables programmatic focus on dialogs without placing them in the natural tab cycle. Never use positive integers.',
    example: '<div role="dialog" tabIndex={-1} />',
  },
  {
    name: 'forwardRef',
    category: 'react',
    syntax: 'React.forwardRef<HTMLButtonElement, Props>',
    description: 'Passes a ref received by a component down to one of its children in the DOM tree.',
    purpose: 'Enables custom Button components to receive refs for programmatic focus management.',
    example: 'export const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => ...);',
  },
  {
    name: 'useId',
    category: 'react',
    syntax: 'const titleId = React.useId()',
    description: 'React hook for generating unique IDs that are stable across server-side rendering and client hydration.',
    purpose: 'Guarantees unique IDs for aria-labelledby and aria-describedby without hydration mismatches.',
    example: '<h2 id={titleId}>Title</h2> <div aria-labelledby={titleId} />',
  },

  // Next.js Concepts
  {
    name: "'use client'",
    category: 'nextjs',
    syntax: "'use client';",
    description: 'Directs Next.js to treat the module as a Client Component boundary in the App Router.',
    purpose: 'Required for components using React state, hooks (useRef, useEffect), Redux, or browser APIs.',
    example: "'use client'; export default function Counter() { ... }",
  },
  {
    name: 'App Router Layout',
    category: 'nextjs',
    syntax: 'app/layout.tsx',
    description: 'Defines root document structure including <html>, <head>, and global provider wrappers.',
    purpose: 'Hosts the Redux Provider, global skip-navigation link, and persistent live region announcer.',
    example: 'export default function RootLayout({ children }: { children: React.ReactNode }) { ... }',
  },
  {
    name: 'Dynamic Import',
    category: 'nextjs',
    syntax: "import('jquery').then(...)",
    description: 'Asynchronously loads code modules on-demand strictly in the client runtime.',
    purpose: 'Prevents server-side rendering crashes from libraries that depend on the browser window object.',
    example: "useEffect(() => { import('jquery').then(({ default: $ }) => ...); }, []);",
  },

  // Bootstrap 5 Classes
  {
    name: 'container / container-fluid',
    category: 'bootstrap',
    syntax: 'className="container"',
    description: 'Standard responsive layout container setting max-widths at defined responsive breakpoints.',
    purpose: 'Centers application content and applies consistent horizontal gutter padding across devices.',
    example: '<div className="container py-4"> ... </div>',
  },
  {
    name: 'row & col-* (Grid)',
    category: 'bootstrap',
    syntax: 'className="row g-4" / className="col-12 col-md-6 col-xl-4"',
    description: '12-column mobile-first flexbox grid system with responsive breakpoint modifiers.',
    purpose: 'Delivers full responsiveness across mobile (<576px), tablet (768px), desktop (992px), and wide monitors.',
    example: '<div className="row g-4"><div className="col-12 col-lg-6"> ... </div></div>',
  },
  {
    name: 'visually-hidden',
    category: 'bootstrap',
    syntax: 'className="visually-hidden"',
    description: 'Hides content visually via CSS clipping while keeping it available to screen readers.',
    purpose: 'Essential WCAG technique for providing accessible labels on icon-only buttons and form controls.',
    example: '<span className="visually-hidden">Close dialog</span>',
  },
  {
    name: 'table-responsive',
    category: 'bootstrap',
    syntax: 'className="table-responsive"',
    description: 'Creates responsive tables by enabling smooth horizontal scrolling on smaller viewports.',
    purpose: 'Prevents wide compliance data tables from breaking mobile and tablet layouts.',
    example: '<div className="table-responsive"><table className="table"> ... </table></div>',
  },

  // ARIA Attributes
  {
    name: 'aria-modal="true" vs "false"',
    category: 'aria',
    syntax: 'aria-modal="true" | aria-modal="false"',
    description: 'Informs assistive software whether content outside the dialog element is inert or accessible.',
    purpose: '"true" indicates background page is non-interactive; "false" indicates modeless floating panel.',
    example: '<div role="dialog" aria-modal="true" /> vs <aside role="dialog" aria-modal="false" />',
  },
  {
    name: 'aria-hidden="true" vs "false"',
    category: 'aria',
    syntax: 'aria-hidden="true" | aria-hidden="false"',
    description: 'Controls whether an element and all of its descendant nodes exist in the Accessibility Tree.',
    purpose: '"true" hides decorative SVGs/collapsible panels; "false" dynamically exposes revealed content.',
    example: '<svg aria-hidden="true" focusable="false" /> vs <div aria-hidden={isOpen ? "false" : "true"} />',
  },
  {
    name: 'aria-live="polite" vs "assertive"',
    category: 'aria',
    syntax: 'aria-live="polite" | aria-live="assertive"',
    description: 'Creates dynamic live regions that broadcast content updates without moving keyboard focus.',
    purpose: '"polite" waits for idle synthesizer pause; "assertive" interrupts speech immediately for urgent alerts.',
    example: '<div role="status" aria-live="polite" /> vs <div role="alert" aria-live="assertive" />',
  },
  {
    name: 'aria-labelledby & aria-describedby',
    category: 'aria',
    syntax: 'aria-labelledby={titleId} aria-describedby={descId}',
    description: 'Programmatically associates an element with other DOM elements that serve as its title or description.',
    purpose: 'Ensures screen readers announce the exact accessible name and warning text upon opening a dialog.',
    example: '<div role="dialog" aria-labelledby="modal-title" aria-describedby="modal-desc" />',
  },
];

export const AttributeGuideCard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'react' | 'nextjs' | 'bootstrap' | 'aria'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = ATTRIBUTE_DICTIONARY.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Card
      id="attribute-architecture-guide"
      title="Frontend Architecture & Attribute Dictionary"
      subtitle="Comprehensive breakdown of every React, Next.js, Bootstrap, and ARIA attribute"
      badge="Technical Reference"
      ariaBadge="Architecture Spec"
      icon={<Icon name="code" size={22} isDecorative={true} />}
      footer={
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 small text-secondary">
          <span>Total Documented Attributes: {ATTRIBUTE_DICTIONARY.length}</span>
          <span className="badge bg-light text-dark border">Enterprise Code Quality Standard</span>
        </div>
      }
    >
      <p className="text-secondary small mb-3">
        Explore detailed descriptions, architectural rationale, and production examples for all attributes,
        framework patterns, and styling classes used across this application.
      </p>

      {/* Category Tabs & Search Bar */}
      <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-2 mb-3">
        <div className="btn-group btn-group-sm flex-wrap" role="group" aria-label="Attribute categories">
          {(
            [
              { key: 'all', label: 'All Attributes' },
              { key: 'react', label: 'React.js' },
              { key: 'nextjs', label: 'Next.js 14' },
              { key: 'bootstrap', label: 'Bootstrap 5' },
              { key: 'aria', label: 'WAI-ARIA' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`btn ${selectedCategory === tab.key ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setSelectedCategory(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="input-group input-group-sm" style={{ maxWidth: '260px' }}>
          <span className="input-group-text bg-light border-end-0">
            <Icon name="info" size={14} isDecorative={true} />
          </span>
          <input
            type="search"
            className="form-control border-start-0"
            placeholder="Search attributes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter attributes by keyword"
          />
        </div>
      </div>

      {/* Attributes Grid */}
      <div className="row g-3">
        {filtered.map((item, idx) => {
          const categoryBadge = {
            react: 'bg-info-subtle text-info-emphasis border-info-subtle',
            nextjs: 'bg-dark-subtle text-dark-emphasis border-dark-subtle',
            bootstrap: 'bg-primary-subtle text-primary-emphasis border-primary-subtle',
            aria: 'bg-success-subtle text-success-emphasis border-success-subtle',
          }[item.category];

          return (
            <div key={idx} className="col-12 col-md-6">
              <div className="border rounded p-3 h-100 bg-white shadow-sm d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="fw-bold font-monospace text-primary small">
                      {item.name}
                    </span>
                    <span className={`badge border font-monospace text-uppercase ${categoryBadge}`} style={{ fontSize: '0.65rem' }}>
                      {item.category}
                    </span>
                  </div>

                  <p className="small text-secondary mb-2" style={{ fontSize: '0.8rem' }}>
                    {item.description}
                  </p>

                  <div className="p-2 bg-light rounded small mb-2 border" style={{ fontSize: '0.75rem' }}>
                    <strong>Architectural Purpose:</strong> {item.purpose}
                  </div>
                </div>

                <div className="mt-auto pt-2 border-top">
                  <div className="text-muted small" style={{ fontSize: '0.7rem' }}>
                    <strong>Syntax:</strong> <code>{item.syntax}</code>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
