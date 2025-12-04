'use client';

import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';
import type { BookingStatus } from '@/types';
import type { StatusSelectorProps } from '@/types/admin-booking-detail';

export function StatusSelector({
    value,
    onChange,
    disabled = false,
    options = ADMIN_BOOKING_DETAIL_CONFIG.status.options,
    className,
}: StatusSelectorProps) {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            <span className="text-sm font-medium text-muted-foreground">{ADMIN_BOOKING_DETAIL_CONFIG.status.updateLabel}</span>
            <Select
                value={value}
                onValueChange={(val) => onChange(val as BookingStatus)}
                disabled={disabled}
                aria-label="Update booking status"
            >
                <SelectTrigger className="w-40" aria-label={`Current status: ${ADMIN_BOOKING_DETAIL_CONFIG.status.config[value].label}`}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((status) => {
                        const config = ADMIN_BOOKING_DETAIL_CONFIG.status.config[status];
                        const Icon = config.icon;
                        return (
                            <SelectItem key={status} value={status} aria-label={config.label}>
                                <div className="flex items-center gap-2">
                                    <Icon className={cn('h-4 w-4', config.color)} aria-hidden="true" />
                                    <span>{config.label}</span>
                                </div>
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
