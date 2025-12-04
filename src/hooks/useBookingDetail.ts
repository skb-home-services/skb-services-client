'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getUserBookingById } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { BOOKING_DETAIL_CONFIG } from '@/configs/booking-detail';
import type { BookingStatus, PhoneNumber } from '@/types';
import type { UseBookingDetailReturn } from '@/types/booking-detail';

export function useBookingDetail(): UseBookingDetailReturn {
    const params = useParams();
    const id = params.id as string;

    const {
        data: booking,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: queryKeys.bookings.userDetail(id),
        queryFn: () => getUserBookingById(id),
        enabled: !!id,
    });

    // Get status configuration
    const statusConfig = booking ? BOOKING_DETAIL_CONFIG.status[booking.status] : BOOKING_DETAIL_CONFIG.status.pending;

    // Format phone number
    const formatPhone = (phone: string | PhoneNumber | { phoneE164: string }): string => {
        if (typeof phone === 'string') {
            return phone;
        }
        return phone.phoneE164 || '';
    };

    return {
        booking,
        isLoading,
        error: error as Error | null,
        statusConfig,
        formatPhone,
        refetch,
    };
}
