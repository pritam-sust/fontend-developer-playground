import React from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  ariaBadge?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  badge,
  ariaBadge,
  icon,
  children,
  footer,
  className = '',
  id,
}) => {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <article
      id={id}
      className={`demo-card ${className}`}
      aria-labelledby={headingId}
    >
      <header className="demo-card-header d-flex align-items-start justify-content-between gap-2">
        <div className="d-flex align-items-start gap-2">
          {icon && <div className="mt-1 text-primary">{icon}</div>}
          <div>
            <h2 id={headingId} className="h5 fw-bold mb-1 text-dark">
              {title}
            </h2>
            {subtitle && (
              <p className="text-secondary small mb-0">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="d-flex flex-column align-items-end gap-1">
          {badge && (
            <span className="badge bg-light text-dark border">{badge}</span>
          )}
          {ariaBadge && <span className="aria-tag">{ariaBadge}</span>}
        </div>
      </header>

      <div className="demo-card-body">{children}</div>

      {footer && <footer className="demo-card-footer">{footer}</footer>}
    </article>
  );
};

