'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './ui/StatusBadge';
import { StatusSelector } from './ui/StatusSelector';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';
import { formatDate } from '@/lib/utils';
import type { BookingStatus } from '@/types';
import type { BookingDetailHeaderProps } from '@/types/admin-booking-detail';

export function BookingDetailHeader({ bookingId, status, createdAt, onStatusChange, isUpdatingStatus = false }: BookingDetailHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild className="shrink-0" aria-label={ADMIN_BOOKING_DETAIL_CONFIG.page.backLabel}>
                    <Link href="/admin/bookings">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight">{ADMIN_BOOKING_DETAIL_CONFIG.page.title}</h1>
                        <StatusBadge status={status} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                        {ADMIN_BOOKING_DETAIL_CONFIG.page.bookedOnLabel} {formatDate(createdAt)}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 pl-12 sm:pl-0">
                <StatusSelector value={status} onChange={onStatusChange} disabled={isUpdatingStatus} />
            </div>
        </div>
    );
}
