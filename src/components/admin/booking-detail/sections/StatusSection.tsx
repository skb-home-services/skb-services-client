'use client';

import { StatusBadge } from '../ui/StatusBadge';
import { SectionSkeleton } from '../ui/LoadingState';
import type { StatusSectionProps } from '@/types/admin-booking-detail';

export function StatusSection({ status, isLoading }: StatusSectionProps) {
    if (isLoading) {
        return <SectionSkeleton />;
    }

    return (
        <div className="flex items-center gap-2" aria-label="Booking status">
            <StatusBadge status={status} size="lg" />
        </div>
    );
}
