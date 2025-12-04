import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, getUserBookings } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { formatDate } from '@/lib/utils';
import { getGreeting } from '@/configs/dashboard';
import type { UseDashboardReturn, DashboardStats } from '@/types/dashboard';
import type { Booking } from '@/types';

const RECENT_BOOKINGS_LIMIT = 5;

export function useDashboard(): UseDashboardReturn {
    // Fetch user bookings
    const {
        data: bookingsData,
        isLoading: isLoadingBookings,
        error: bookingsError,
    } = useQuery({
        queryKey: queryKeys.bookings.user({ limit: RECENT_BOOKINGS_LIMIT }),
        queryFn: () => getUserBookings({ limit: RECENT_BOOKINGS_LIMIT }),
    });

    // Fetch current user
    const {
        data: dbUser,
        isLoading: isLoadingUser,
        error: userError,
    } = useQuery({
        queryKey: queryKeys.users.current(),
        queryFn: () => getCurrentUser(),
    });

    // Calculate statistics
    const stats = useMemo((): DashboardStats => {
        const bookings = bookingsData?.bookings || [];
        const totalBookings = bookingsData?.pagination.totalCount || 0;
        const pendingBookings = bookings.filter((b: Booking) => b.status === 'pending').length;
        const completedBookings = bookings.filter((b: Booking) => b.status === 'completed').length;

        return {
            totalBookings,
            pendingBookings,
            completedBookings,
            memberSince: dbUser?.createdAt ? formatDate(dbUser.createdAt) : undefined,
        };
    }, [bookingsData, dbUser]);

    // Get greeting
    const greeting = useMemo(() => getGreeting(), []);

    // Extract recent bookings
    const recentBookings = useMemo(() => {
        return bookingsData?.bookings || [];
    }, [bookingsData]);

    // Determine loading state
    const isLoading = isLoadingBookings || isLoadingUser;

    // Determine error state
    const error = bookingsError || userError || null;

    return {
        isLoading,
        isLoadingUser,
        isLoadingBookings,
        error: error as Error | null,
        data: {
            user: dbUser || null,
            bookings: recentBookings,
            stats,
        },
        greeting,
        recentBookings,
        totalBookings: stats.totalBookings,
        pendingBookings: stats.pendingBookings,
        completedBookings: stats.completedBookings,
        memberSince: stats.memberSince,
    };
}
