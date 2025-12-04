'use client';

import { useBookingDetail } from '@/hooks/useBookingDetail';
import { BookingDetailHeader } from './BookingDetailHeader';
import { BookingHeroSection } from './BookingHeroSection';
import { ScheduleSection } from './sections/ScheduleSection';
import { CustomerSection } from './sections/CustomerSection';
import { AddressSection } from './sections/AddressSection';
import { NotesSection } from './sections/NotesSection';
import { ReferenceSection } from './sections/ReferenceSection';
import { BookingDetailLoadingState } from './ui/LoadingState';
import { BookingDetailErrorState } from './ui/ErrorState';

export function BookingDetailPage() {
    const { booking, isLoading, error, refetch } = useBookingDetail();

    if (isLoading) {
        return <BookingDetailLoadingState />;
    }

    if (error || !booking) {
        return <BookingDetailErrorState onRetry={() => refetch()} showRetry={!!error} />;
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <BookingDetailHeader status={booking.status} />

            {/* Main Content Grid */}
            <div className="grid gap-8 lg:grid-cols-12">
                <BookingHeroSection service={booking.service} />

                {/* Right Column - Booking Details */}
                <div className="space-y-6 lg:col-span-7">
                    <ScheduleSection date={booking.date} time={booking.time} />
                    <CustomerSection customer={booking.customer} />
                    <AddressSection address={booking.customer.address} />
                    {booking.notes && <NotesSection notes={booking.notes} />}
                    <ReferenceSection booking={booking} />
                </div>
            </div>
        </div>
    );
}
