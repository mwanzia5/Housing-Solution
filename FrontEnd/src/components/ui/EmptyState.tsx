import React from 'react';
import { cn } from '@/lib/utils';
import { FileQuestion } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-6 rounded-[var(--radius-lg)] bg-surface/50 text-center',
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f1f5f9] text-[var(--text-secondary)] mb-4">
        {icon ?? <FileQuestion className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-medium text-[var(--text-primary)]">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-[var(--text-secondary)] max-w-sm">{description}</p>
      )}
      {action && (
        <Button variant="outline" size="sm" className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
