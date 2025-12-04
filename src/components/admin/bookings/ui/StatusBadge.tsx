'use client';

import { Badge } from '@/components/ui/badge';
import type { StatusBadgeProps } from '@/types/admin-bookings';
import { cn } from '@/lib/utils';
import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
    const config = ADMIN_BOOKINGS_CONFIG.status?.[status as keyof typeof ADMIN_BOOKINGS_CONFIG.status];
    if (!config) {
        return null;
    }
    const Icon = config.icon;

    return (
        <Badge className={cn('shrink-0 gap-1', config.badge)} aria-label={`Status: ${config.label}`}>
            {showIcon && <Icon className="h-3 w-3" aria-hidden="true" />}
            {config.label}
        </Badge>
    );
}
