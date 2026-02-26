import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-panel rounded-2xl p-6 transition-all duration-300',
          hoverEffect && 'hover:translate-y-[-4px] hover:shadow-lg',
          className
        )}
        {...props}
      />
    );
  }
);
GlassCard.displayName = 'GlassCard';
