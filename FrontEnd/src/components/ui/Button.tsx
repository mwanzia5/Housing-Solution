import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        'bg-primary text-white hover:bg-[#0a1e32] active:scale-[0.98] shadow-sm hover:shadow-md border border-primary',
      secondary:
        'bg-accent text-white hover:bg-accent-hover active:scale-[0.98] shadow-sm hover:shadow-md border border-accent',
      outline:
        'border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--accent-soft)] hover:border-accent/30',
      ghost: 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-[12px] gap-1.5',
      md: 'px-5 py-2.5 text-sm font-medium rounded-[12px] gap-2',
      lg: 'px-6 py-3 text-base font-medium rounded-[12px] gap-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-[12px] transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[var(--surface)]',
          'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);
Button.displayName = 'Button';
