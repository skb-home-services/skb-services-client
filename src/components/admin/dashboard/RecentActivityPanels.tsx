'use client';

import { RecentBookingsPanel } from './panels/RecentBookingsPanel';
import { PendingInquiriesPanel } from './panels/PendingInquiriesPanel';
import type { Booking, Inquiry } from '@/types';

interface RecentActivityPanelsProps {
    bookings: Booking[];
    inquiries: Inquiry[];
    bookingsLoading?: boolean;
    inquiriesLoading?: boolean;
}

export function RecentActivityPanels({ bookings, inquiries, bookingsLoading, inquiriesLoading }: RecentActivityPanelsProps) {
    return (
        <div className="grid gap-6 lg:grid-cols-2" role="region" aria-label="Recent activity">
            <RecentBookingsPanel bookings={bookings} loading={bookingsLoading} />
            <PendingInquiriesPanel inquiries={inquiries} loading={inquiriesLoading} />
        </div>
    );
}
