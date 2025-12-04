'use client';

import { Phone } from 'lucide-react';
import { InfoCard } from './InfoCard';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';
import type { PhoneDisplayProps } from '@/types/admin-booking-detail';

export function PhoneDisplay({ phone, showIcon = true, className, label }: PhoneDisplayProps) {
    const phoneNumber = ADMIN_BOOKING_DETAIL_CONFIG.formats.phone.displayFormat(phone);
    const phoneHref = `tel:${phoneNumber}`;

    return (
        <InfoCard
            label={label || ADMIN_BOOKING_DETAIL_CONFIG.customer.phoneLabel}
            value={
                <a href={phoneHref} className="hover:text-primary transition-colors" aria-label={`Call ${phoneNumber}`}>
                    {phoneNumber}
                </a>
            }
            icon={showIcon ? Phone : undefined}
            className={className}
        />
    );
}
