'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';
import type { StatusBadgeProps } from '@/types/admin-booking-detail';

export function StatusBadge({ status, className, showIcon = true, size = 'md' }: StatusBadgeProps) {
    const config = ADMIN_BOOKING_DETAIL_CONFIG.status.config[status];
    const Icon = config.icon;

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-1',
        lg: 'text-base px-3 py-1.5',
    };

    return (
        <Badge className={cn('gap-1', config.badge, sizeClasses[size], className)} aria-label={`Status: ${config.label}`}>
            {showIcon && <Icon className="h-3 w-3" aria-hidden="true" />}
            <span>{config.label}</span>
        </Badge>
    );
}
