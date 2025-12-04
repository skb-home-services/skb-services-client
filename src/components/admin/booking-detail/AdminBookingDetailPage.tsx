'use client';

import { ServiceCard } from './ServiceCard';
import { BookingDetailHeader } from './BookingDetailHeader';
import { CustomerInfoSection } from './sections/CustomerInfoSection';
import { ScheduleSection } from './sections/ScheduleSection';
import { AddressSection } from './sections/AddressSection';
import { NotesSection } from './sections/NotesSection';
import { AdminBookingDetailLoadingState } from './ui/LoadingState';
import { AdminBookingDetailErrorState } from './ui/ErrorState';
import { useAdminBookingDetail } from '@/hooks/useAdminBookingDetail';

export function AdminBookingDetailPage() {
    const { booking, isLoading, error, updateStatus, isUpdatingStatus, refetch } = useAdminBookingDetail();

    if (isLoading) {
        return <AdminBookingDetailLoadingState />;
    }

    if (error || !booking) {
        return <AdminBookingDetailErrorState onRetry={() => refetch()} showRetry={!!error} />;
    }

    return (
        <div className="space-y-6">
            <BookingDetailHeader
                bookingId={booking._id}
                status={booking.status}
                createdAt={booking.createdAt}
                onStatusChange={updateStatus}
                isUpdatingStatus={isUpdatingStatus}
            />

            <ServiceCard service={booking.service} />

            <div className="grid gap-6 lg:grid-cols-2">
                <CustomerInfoSection customer={booking.customer} />
                <ScheduleSection date={booking.date} time={booking.time} status={booking.status} />
            </div>

            <AddressSection address={booking.customer.address} />

            {booking.notes && <NotesSection notes={booking.notes} />}
        </div>
    );
}
