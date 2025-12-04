'use client';

import { User, Mail } from 'lucide-react';
import { BOOKING_DETAIL_CONFIG } from '@/configs/booking-detail';
import { PhoneDisplay } from '../ui/PhoneDisplay';
import { InfoCard } from '../ui/InfoCard';
import type { BookingDetail } from '@/types/booking';

interface CustomerSectionProps {
    customer: BookingDetail['customer'];
}

export function CustomerSection({ customer }: CustomerSectionProps) {
    const config = BOOKING_DETAIL_CONFIG.sections.customer;

    return (
        <div
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            aria-label={BOOKING_DETAIL_CONFIG.accessibility.sections.customer}
        >
            <div className="mb-5 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${config.iconBg}`}>
                    <User className={`h-4 w-4 ${config.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400">{config.title}</h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <InfoCard label={BOOKING_DETAIL_CONFIG.fields.fullName.label} value={customer.fullName} />
                <InfoCard label={BOOKING_DETAIL_CONFIG.fields.email.label} value={customer.email} icon={Mail} />
                <div className="space-y-1">
                    <p className="text-xs text-slate-400">{BOOKING_DETAIL_CONFIG.fields.primaryPhone.label}</p>
                    <PhoneDisplay phone={customer.phone} />
                </div>
                {customer.secondaryPhone && (
                    <div className="space-y-1">
                        <p className="text-xs text-slate-400">{BOOKING_DETAIL_CONFIG.fields.secondaryPhone.label}</p>
                        <PhoneDisplay phone={customer.secondaryPhone} />
                    </div>
                )}
            </div>
        </div>
    );
}
