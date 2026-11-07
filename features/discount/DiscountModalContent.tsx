'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { applyDiscountCode } from '@/store/slices/discountSlice';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Icon } from '@/components/common/Icon';
import { DiscountCode } from '@/types/discount';

export const DiscountModalContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, appliedCodes, copyStats } = useAppSelector((state) => state.discount);
  const { copiedText, copy } = useCopyToClipboard();

  const handleApply = (code: string) => {
    dispatch(applyDiscountCode(code));
  };

  return (
    <div className="discount-modal-list">
      <div className="alert alert-info py-2 px-3 small d-flex align-items-center gap-2 mb-3">
        <Icon name="info" size={16} isDecorative={true} />
        <span>
          Press <kbd>Tab</kbd> to cycle between codes, <kbd>Escape</kbd> to close. Copying a code announces polite screen reader feedback.
        </span>
      </div>

      <div className="d-flex flex-column gap-3">
        {items.map((item: DiscountCode) => {
          const isCopied = copiedText === item.code;
          const isApplied = appliedCodes.includes(item.code);
          const copiesCount = copyStats[item.code] || 0;

          return (
            <div
              key={item.id}
              className="discount-item-card d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 p-3"
            >
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="fw-bold font-monospace text-primary fs-6">
                    {item.code}
                  </span>
                  <Badge variant={item.category === 'architect' ? 'info' : 'success'}>
                    {item.discountPercentage}% OFF
                  </Badge>
                  {item.isPopular && (
                    <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">
                      Popular
                    </span>
                  )}
                </div>
                <p className="small text-secondary mb-1">{item.description}</p>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  Expires in {item.expiresInDays} days • Copied {copiesCount} {copiesCount === 1 ? 'time' : 'times'}
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button
                  variant={isCopied ? 'outline-primary' : 'outline-secondary'}
                  size="sm"
                  onClick={() => copy(item.code, `${item.discountPercentage}% discount code`)}
                  aria-label={`Copy discount code ${item.code}`}
                  leftIcon={
                    <Icon
                      name={isCopied ? 'check' : 'copy'}
                      size={14}
                      className={isCopied ? 'text-success' : ''}
                      isDecorative={true}
                    />
                  }
                >
                  {isCopied ? 'Copied!' : 'Copy Code'}
                </Button>

                <Button
                  variant={isApplied ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleApply(item.code)}
                  disabled={isApplied}
                  aria-label={`Apply discount code ${item.code} to cart`}
                  leftIcon={
                    <Icon
                      name={isApplied ? 'check' : 'ticket'}
                      size={14}
                      isDecorative={true}
                    />
                  }
                >
                  {isApplied ? 'Applied' : 'Apply'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

