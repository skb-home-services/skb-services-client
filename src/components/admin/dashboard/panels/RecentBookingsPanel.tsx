'use client';

import { Button } from '@/components/ui/button';
import { DashboardPanel } from '@/components/admin';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import { EmptyState } from '../ui/EmptyState';
import { BookingItem } from '../ui/BookingItem';
import { ADMIN_DASHBOARD_CONFIG } from '@/configs/admin-dashboard';
import type { Booking } from '@/types';

interface RecentBookingsPanelProps {
    bookings: Booking[];
    loading?: boolean;
}

export function RecentBookingsPanel({ bookings, loading }: RecentBookingsPanelProps) {
    const config = ADMIN_DASHBOARD_CONFIG.panels.recentBookings;
    const isEmpty = !loading && bookings.length === 0;

    return (
        <DashboardPanel
            title={config.title}
            headerAction={
                <Button variant="ghost" size="sm" asChild>
                    <Link href={config.viewAllHref} className="flex items-center gap-1">
                        {config.viewAllLabel}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </Button>
            }
        >
            {loading ? (
                <LoadingSkeleton count={ADMIN_DASHBOARD_CONFIG.loading.skeletonCount.bookings} variant="booking" />
            ) : isEmpty ? (
                <EmptyState {...config.emptyState} />
            ) : (
                <div className="space-y-3" role="list" aria-label="Recent bookings">
                    {bookings.map((booking) => (
                        <div key={booking._id} role="listitem">
                            <BookingItem booking={booking} href={`/admin/bookings/${booking._id}`} />
                        </div>
                    ))}
                </div>
            )}
        </DashboardPanel>
    );
}
