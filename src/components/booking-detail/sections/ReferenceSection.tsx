'use client';

import { Hash } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { BOOKING_DETAIL_CONFIG } from '@/configs/booking-detail';
import type { BookingDetail } from '@/types/booking';

interface ReferenceSectionProps {
    booking: BookingDetail;
}

export function ReferenceSection({ booking }: ReferenceSectionProps) {
    const config = BOOKING_DETAIL_CONFIG.sections.reference;

    return (
        <div className="rounded-3xl bg-slate-50/80 p-6" aria-label={BOOKING_DETAIL_CONFIG.accessibility.sections.reference}>
            <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${config.iconBg}`}>
                    <Hash className={`h-4 w-4 ${config.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400">{config.title}</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1">
                    <p className="text-xs text-slate-400">{BOOKING_DETAIL_CONFIG.fields.bookingId.label}</p>
                    <p className="truncate font-mono text-xs text-slate-500" title={booking._id}>
                        {booking._id}
                    </p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-slate-400">{BOOKING_DETAIL_CONFIG.fields.serviceId.label}</p>
                    <p className="truncate font-mono text-xs text-slate-500" title={booking.service._id}>
                        {booking.service._id}
                    </p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-slate-400">{BOOKING_DETAIL_CONFIG.fields.bookedOn.label}</p>
                    <p className="text-sm text-slate-600">{formatDate(booking.createdAt)}</p>
                </div>
            </div>
        </div>
    );
}
