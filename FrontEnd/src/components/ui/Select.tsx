import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, id: idProp, wrapperClassName, children, ...props }, ref) => {
    const id = idProp ?? React.useId();
    return (
      <div className={cn('space-y-1.5', wrapperClassName)}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[var(--text-primary)]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-[12px] border bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)]',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[var(--surface)] focus:border-accent/50',
            error
              ? 'border-[var(--danger)] focus:ring-[var(--danger)]/30'
              : 'border-[var(--border)] hover:border-[#cbd5e1]',
            className
          )}
          {...props}
        >
          {children}
        </select>
        {hint && !error && <p className="text-xs text-[var(--text-secondary)]">{hint}</p>}
        {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
