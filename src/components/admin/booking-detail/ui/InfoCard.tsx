'use client';

import { cn } from '@/lib/utils';
import type { InfoCardProps } from '@/types/admin-booking-detail';

export function InfoCard({ label, value, icon: Icon, className, iconBg = 'bg-muted', iconColor = 'text-muted-foreground' }: InfoCardProps) {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            {Icon && (
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg shrink-0', iconBg)} aria-hidden="true">
                    <Icon className={cn('h-4 w-4', iconColor)} />
                </div>
            )}
            <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className="text-sm font-medium">{value}</div>
            </div>
        </div>
    );
}
