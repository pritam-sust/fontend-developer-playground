'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  announcePolite,
  announceAssertive,
  clearAnnouncementHistory,
} from '@/store/slices/announcementSlice';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';

export const LiveRegionDemoCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.announcement);
  const [customPolite, setCustomPolite] = useState('Voucher A11Y-HERO-50 copied to your clipboard.');
  const [customAssertive, setCustomAssertive] = useState('Flash alert: 50% discount voucher expires in 2 minutes!');

  const handleTriggerPolite = () => {
    dispatch(announcePolite(customPolite));
  };

  const handleTriggerAssertive = () => {
    dispatch(announceAssertive(customAssertive));
  };

  const handleClear = () => {
    dispatch(clearAnnouncementHistory());
  };

  return (
    <Card
      id="feature-live-regions"
      title="Live Regions Demonstration"
      subtitle="Dynamic screen-reader announcements (polite vs. assertive)"
      badge="Feature 3"
      ariaBadge="aria-live"
      icon={<Icon name="volume-2" size={22} isDecorative={true} />}
      footer={
        <div className="d-flex flex-wrap align-items-center gap-2 small text-secondary">
          <span>Attributes:</span>
          <span className="aria-tag">aria-live=&quot;polite&quot;</span>
          <span className="aria-tag">aria-live=&quot;assertive&quot;</span>
          <span className="aria-tag">aria-atomic=&quot;true&quot;</span>
          <span className="aria-tag">role=&quot;status&quot;</span>
          <span className="aria-tag">role=&quot;alert&quot;</span>
        </div>
      }
    >
      <p className="text-secondary small mb-3">
        ARIA live regions notify screen readers of DOM updates without moving focus.
        <strong> Polite</strong> announcements wait for the synthesizer to finish speaking;
        <strong> Assertive</strong> announcements interrupt active speech for high-priority alerts.
      </p>

      {/* Control Triggers */}
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-6">
          <div className="p-3 bg-light rounded border h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small fw-bold text-primary">Polite Announcement</span>
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                aria-live=&quot;polite&quot;
              </span>
            </div>
            <label htmlFor="input-polite-msg" className="visually-hidden">
              Polite message text
            </label>
            <input
              id="input-polite-msg"
              type="text"
              className="form-control form-control-sm mb-2"
              value={customPolite}
              onChange={(e) => setCustomPolite(e.target.value)}
              placeholder="Enter polite announcement"
            />
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleTriggerPolite}
              className="w-100"
              leftIcon={<Icon name="volume-2" size={14} isDecorative={true} />}
            >
              Dispatch Polite Update
            </Button>
            <p className="text-muted small mt-2 mb-0" style={{ fontSize: '0.75rem' }}>
              Used for non-urgent updates (e.g. copying code, filter changes).
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="p-3 bg-light rounded border h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small fw-bold text-danger">Assertive Announcement</span>
              <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                aria-live=&quot;assertive&quot;
              </span>
            </div>
            <label htmlFor="input-assertive-msg" className="visually-hidden">
              Assertive message text
            </label>
            <input
              id="input-assertive-msg"
              type="text"
              className="form-control form-control-sm mb-2"
              value={customAssertive}
              onChange={(e) => setCustomAssertive(e.target.value)}
              placeholder="Enter assertive announcement"
            />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleTriggerAssertive}
              className="w-100"
              leftIcon={<Icon name="alert-triangle" size={14} isDecorative={true} />}
            >
              Dispatch Assertive Alert
            </Button>
            <p className="text-muted small mt-2 mb-0" style={{ fontSize: '0.75rem' }}>
              Used for time-critical messages (e.g. cart timeout, checkout errors).
            </p>
          </div>
        </div>
      </div>

      {/* Screen Reader Output Visualizer */}
      <div className="mt-2">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <span className="small fw-semibold text-dark d-flex align-items-center gap-1">
            <Icon name="volume-2" size={16} className="text-primary" isDecorative={true} />
            Screen Reader Live Log (Simulated Output)
          </span>
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-sm btn-link text-decoration-none text-muted p-0"
              style={{ fontSize: '0.75rem' }}
            >
              Clear Log
            </button>
          )}
        </div>

        <div
          className="live-region-simulator"
          aria-label="Screen reader log feed"
          role="region"
        >
          {history.length === 0 ? (
            <div className="text-muted text-center py-4 small">
              No announcements dispatched yet. Trigger an action above or copy a discount code!
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className={`feed-item ${item.type}`}
                title={`Announced at ${item.timestamp} via ${item.type}`}
              >
                <div className="d-flex justify-content-between small text-secondary mb-1">
                  <span className="badge bg-secondary" style={{ fontSize: '0.65rem' }}>
                    [{item.type.toUpperCase()}]
                  </span>
                  <span style={{ fontSize: '0.7rem' }}>{item.timestamp}</span>
                </div>
                <div>&ldquo;{item.message}&rdquo;</div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
};

