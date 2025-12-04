'use client';

import { MapPin, Layers } from 'lucide-react';
import { BOOKING_DETAIL_CONFIG } from '@/configs/booking-detail';
import type { BookingDetail } from '@/types/booking';

interface AddressSectionProps {
    address: BookingDetail['customer']['address'];
}

export function AddressSection({ address }: AddressSectionProps) {
    const config = BOOKING_DETAIL_CONFIG.sections.address;

    return (
        <div
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            aria-label={BOOKING_DETAIL_CONFIG.accessibility.sections.address}
        >
            <div className="mb-5 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${config.iconBg}`}>
                    <MapPin className={`h-4 w-4 ${config.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400">{config.title}</h3>
            </div>

            <div className="space-y-3">
                <p className="text-lg font-medium text-slate-900">
                    {address.houseNumber}, {address.line1}
                </p>
                {address.line2 && <p className="text-slate-600">{address.line2}</p>}
                <p className="text-slate-600">
                    {address.city}, {address.state} - {address.pincode}
                </p>
                {address.landmark && (
                    <p className="text-sm text-slate-400">
                        {BOOKING_DETAIL_CONFIG.fields.landmark.prefix} {address.landmark}
                    </p>
                )}
                <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                        <Layers className="h-3 w-3" aria-hidden="true" />
                        {BOOKING_DETAIL_CONFIG.fields.areaCode.label}: {address.pincode}
                    </span>
                </div>
            </div>
        </div>
    );
}
