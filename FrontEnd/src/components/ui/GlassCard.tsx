import React from 'react';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

/** @deprecated Use Card with variant="glass" instead. Kept for backward compatibility. */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = false, ...props }, ref) => (
    <Card
      ref={ref}
      variant="glass"
      hoverEffect={hoverEffect}
      className={cn(className)}
      {...props}
    />
  )
);
GlassCard.displayName = 'GlassCard';
