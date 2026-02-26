import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
  hoverEffect?: boolean;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-lg)] transition-all duration-200',
          'shadow-[0_8px_30px_rgba(15,23,42,0.06)]',
          variant === 'default' && 'bg-[var(--surface)]',
          variant === 'glass' && 'bg-white/70 backdrop-blur-xl',
          hoverEffect && 'hover:translate-y-[-2px] hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';
