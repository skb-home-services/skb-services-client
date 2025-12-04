import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from '@/hooks/useToast';
import { getBookingById, updateBookingStatus } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';
import type { BookingStatus } from '@/types';
import type { UseAdminBookingDetailReturn } from '@/types/admin-booking-detail';

export function useAdminBookingDetail(): UseAdminBookingDetailReturn {
    const params = useParams();
    const queryClient = useQueryClient();
    const id = params.id as string;

    const {
        data: booking,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: queryKeys.bookings.detail(id),
        queryFn: () => getBookingById(id),
        enabled: !!id,
    });

    const statusMutation = useMutation({
        mutationFn: (status: BookingStatus) => updateBookingStatus({ id, status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.detail(id) });
            toast({
                title: ADMIN_BOOKING_DETAIL_CONFIG.messages.statusUpdated.title,
                description: ADMIN_BOOKING_DETAIL_CONFIG.messages.statusUpdated.description,
                variant: 'success',
            });
        },
        onError: (error: { message?: string }) => {
            toast({
                title: ADMIN_BOOKING_DETAIL_CONFIG.messages.statusUpdateFailed.title,
                description: error.message || ADMIN_BOOKING_DETAIL_CONFIG.messages.statusUpdateFailed.description,
                variant: 'destructive',
            });
        },
    });

    const formatPhone = (phone: string | { phoneE164: string }): string => {
        return ADMIN_BOOKING_DETAIL_CONFIG.formats.phone.displayFormat(phone);
    };

    const updateStatus = (status: BookingStatus) => {
        statusMutation.mutate(status);
    };

    const currentStatus = booking
        ? ADMIN_BOOKING_DETAIL_CONFIG.status.config[booking.status]
        : ADMIN_BOOKING_DETAIL_CONFIG.status.config.pending;

    return {
        booking,
        isLoading,
        error: error as Error | null,
        statusConfig: currentStatus,
        formatPhone,
        updateStatus,
        isUpdatingStatus: statusMutation.isPending,
        refetch,
    };
}
