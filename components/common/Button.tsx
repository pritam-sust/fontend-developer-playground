import React from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-danger'
  | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';

    const variantClass = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      danger: 'btn-danger',
      'outline-primary': 'btn-outline-primary',
      'outline-secondary': 'btn-outline-secondary',
      'outline-danger': 'btn-outline-danger',
      ghost: 'btn-link text-decoration-none',
    }[variant];

    return (
      <button
        ref={ref}
        type="button"
        className={`btn ${variantClass} ${sizeClass} d-inline-flex align-items-center justify-content-center gap-2 fw-medium ${className}`}
        disabled={disabled || isLoading}
        aria-busy={isLoading ? 'true' : undefined}
        {...props}
      >
        {isLoading ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

