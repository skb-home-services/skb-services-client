'use client';

import { Badge } from '@/components/ui/badge';
import { BOOKING_DETAIL_CONFIG } from '@/configs/booking-detail';
import type { BookingStatus } from '@/types';
import type { StatusBadgeProps } from '@/types/booking-detail';

export function StatusBadge({ status, className, showIcon = false }: StatusBadgeProps) {
    const config = BOOKING_DETAIL_CONFIG.status[status as BookingStatus];

    return (
        <Badge
            variant={config.variant}
            className={className}
            aria-label={BOOKING_DETAIL_CONFIG.accessibility.statusBadge.ariaLabel(status)}
        >
            {config.label}
        </Badge>
    );
}
