'use client';

import type { EmptyStateProps } from '@/types/admin-dashboard';
import { cn } from '@/lib/utils';

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-8 text-center" role="status" aria-live="polite">
            <Icon className={cn('h-12 w-12 text-muted-foreground/50 mb-3')} aria-hidden="true" />
            <p className="text-sm font-medium text-foreground mb-1">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
}
