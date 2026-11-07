'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { resetAllDiscounts } from '@/store/slices/discountSlice';
import { clearAnnouncements } from '@/store/slices/announcementSlice';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/common/Button';

export const ReduxStateInspectorCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  return (
    <Card
      id="feature-redux-state"
      title="Redux Toolkit State Management"
      subtitle="Centralized, reactive state architecture with TypeScript slices"
      badge="Feature 5"
      ariaBadge="Redux Toolkit"
      icon={<Icon name="layers" size={22} isDecorative={true} />}
      footer={
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 small text-secondary">
          <div className="d-flex align-items-center gap-2">
            <span>Hooks:</span>
            <span className="aria-tag">useAppSelector</span>
            <span className="aria-tag">useAppDispatch</span>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => dispatch(clearAnnouncements())}
              leftIcon={<Icon name="refresh-cw" size={12} isDecorative={true} />}
            >
              Reset Announcements
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => dispatch(resetAllDiscounts())}
              leftIcon={<Icon name="trash-2" size={12} isDecorative={true} />}
            >
              Purge Applied Codes
            </Button>
          </div>
        </div>
      }
    >
      <p className="text-secondary small mb-3">
        The application state is managed by <strong>Redux Toolkit (RTK)</strong>, split cleanly across modular feature slices.
        Below is the <strong>live reactive state snapshot</strong>, automatically synchronizing as you open dialogs, trigger alerts, and copy codes.
      </p>

      {/* Slices Grid */}
      <div className="row g-2 mb-3">
        {/* Modal Slice */}
        <div className="col-12 col-md-3">
          <div className="p-2 border rounded bg-light h-100">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="fw-bold small text-primary">modalSlice</span>
              <span className={`badge ${state.modal.isOpen ? 'bg-success' : 'bg-secondary'}`}>
                {state.modal.isOpen ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
            <div className="font-monospace small text-muted" style={{ fontSize: '0.72rem' }}>
              <div>isOpen: {String(state.modal.isOpen)}</div>
              <div>selectedCodeId: {state.modal.selectedCodeId || 'null'}</div>
              <div>openedAt: {state.modal.openedAt ? 'timestamp' : 'null'}</div>
            </div>
          </div>
        </div>

        {/* Alert Slice */}
        <div className="col-12 col-md-3">
          <div className="p-2 border rounded bg-light h-100">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="fw-bold small text-danger">alertSlice</span>
              <span className={`badge ${state.alert.isOpen ? 'bg-danger' : 'bg-secondary'}`}>
                {state.alert.isOpen ? 'ACTIVE' : 'IDLE'}
              </span>
            </div>
            <div className="font-monospace small text-muted" style={{ fontSize: '0.72rem' }}>
              <div>isOpen: {String(state.alert.isOpen)}</div>
              <div>actionType: {state.alert.actionType}</div>
              <div>status: {state.alert.status}</div>
            </div>
          </div>
        </div>

        {/* Discount Slice */}
        <div className="col-12 col-md-3">
          <div className="p-2 border rounded bg-light h-100">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="fw-bold small text-success">discountSlice</span>
              <span className="badge bg-success-subtle text-success border border-success-subtle">
                {state.discount.appliedCodes.length} Applied
              </span>
            </div>
            <div className="font-monospace small text-muted" style={{ fontSize: '0.72rem' }}>
              <div>itemsCount: {state.discount.items.length}</div>
              <div>appliedCodes: [{state.discount.appliedCodes.join(', ') || 'none'}]</div>
              <div>copiedKeys: {Object.keys(state.discount.copyStats).length}</div>
            </div>
          </div>
        </div>

        {/* Announcement Slice */}
        <div className="col-12 col-md-3">
          <div className="p-2 border rounded bg-light h-100">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="fw-bold small text-info">announcementSlice</span>
              <span className="badge bg-info-subtle text-info border border-info-subtle">
                {state.announcement.history.length} Logs
              </span>
            </div>
            <div className="font-monospace small text-muted" style={{ fontSize: '0.72rem' }}>
              <div>politeSeq: #{state.announcement.politeKey}</div>
              <div>assertiveSeq: #{state.announcement.assertiveKey}</div>
              <div>latest: {state.announcement.history[0]?.type || 'none'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Raw JSON View */}
      <details className="mt-2">
        <summary className="small text-secondary fw-semibold cursor-pointer">
          Inspect Full Redux State Tree (JSON)
        </summary>
        <pre
          className="p-3 bg-dark text-white rounded mt-2 font-monospace small mb-0"
          style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '0.75rem' }}
        >
          {JSON.stringify(state, null, 2)}
        </pre>
      </details>
    </Card>
  );
};

