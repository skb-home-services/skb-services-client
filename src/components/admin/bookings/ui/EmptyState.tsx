'use client';

import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';
import type { AdminBookingsEmptyStateProps } from '@/types/admin-bookings';

export function EmptyState({ hasFilters }: AdminBookingsEmptyStateProps) {
    const config = hasFilters ? ADMIN_BOOKINGS_CONFIG.table.emptyState.noResults : ADMIN_BOOKINGS_CONFIG.table.emptyState.noBookings;
    const Icon = config.icon;

    return (
        <div className="flex flex-col items-center justify-center py-16 text-center" role="status" aria-live="polite">
            <Icon className="h-12 w-12 text-muted-foreground/30 mb-4" aria-hidden="true" />
            <h3 className="font-semibold text-lg mb-1">{config.title}</h3>
            <p className="text-muted-foreground text-sm">{config.description}</p>
        </div>
    );
}
