'use client';

import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PhoneDisplayProps } from '@/types/booking-detail';
import type { PhoneNumber } from '@/types';

export function PhoneDisplay({ phone, showIcon = true, className }: PhoneDisplayProps) {
    const phoneNumber = typeof phone === 'string' ? phone : phone.phoneE164 || '';

    return (
        <div className={cn('flex items-center gap-2', className)}>
            {showIcon && <Phone className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />}
            <span className="text-slate-700">{phoneNumber}</span>
        </div>
    );
}
