import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'accent' | 'neutral';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--border)] text-[var(--text-primary)]',
  success: 'bg-[var(--accent-soft)] text-[var(--accent)]',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-[var(--danger)]',
  accent: 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium',
  neutral: 'bg-[#f1f5f9] text-[var(--text-secondary)]',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-[999px] px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = 'Badge';
