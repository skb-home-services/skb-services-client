'use client';

import { cn } from '@/lib/utils';
import type { InfoCardProps } from '@/types/booking-detail';

export function InfoCard({ label, value, icon: Icon, className }: InfoCardProps) {
    return (
        <div className={cn('space-y-1', className)}>
            <p className="text-xs text-slate-400">{label}</p>
            <div className="flex items-center gap-2">
                {Icon && <Icon className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />}
                <div className="text-slate-700">{value}</div>
            </div>
        </div>
    );
}
