import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, id: idProp, ...props }, ref) => {
    const id = idProp ?? React.useId();
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[var(--text-primary)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-[var(--radius)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] shadow-sm',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[var(--surface)]',
            error && 'ring-2 ring-[var(--danger)]/30',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-[var(--text-secondary)]">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-[var(--danger)]">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
