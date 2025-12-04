import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getServices, getBookings, getUsers, getInquiries } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import type { UseAdminDashboardReturn, AdminDashboardStats, DashboardLoadingState, DashboardErrorState } from '@/types/admin-dashboard';

const RECENT_BOOKINGS_LIMIT = 5;
const RECENT_INQUIRIES_LIMIT = 5;
const STATS_LIMIT = 1; // We only need the count, not the data

export function useAdminDashboard(): UseAdminDashboardReturn {
    // Parallel data fetching for optimal performance
    const {
        data: servicesData,
        isLoading: servicesLoading,
        error: servicesError,
        refetch: refetchServices,
    } = useQuery({
        queryKey: queryKeys.services.list({ limit: STATS_LIMIT }),
        queryFn: () => getServices({ limit: STATS_LIMIT }),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    });

    const {
        data: bookingsData,
        isLoading: bookingsLoading,
        error: bookingsError,
        refetch: refetchBookings,
    } = useQuery({
        queryKey: queryKeys.bookings.list({ limit: RECENT_BOOKINGS_LIMIT }),
        queryFn: () => getBookings({ limit: RECENT_BOOKINGS_LIMIT }),
        staleTime: 2 * 60 * 1000, // 2 minutes - bookings change more frequently
        gcTime: 5 * 60 * 1000,
    });

    const {
        data: usersData,
        isLoading: usersLoading,
        error: usersError,
        refetch: refetchUsers,
    } = useQuery({
        queryKey: queryKeys.users.list({ limit: STATS_LIMIT }),
        queryFn: () => getUsers({ limit: STATS_LIMIT }),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000,
    });

    const {
        data: inquiriesData,
        isLoading: inquiriesLoading,
        error: inquiriesError,
        refetch: refetchInquiries,
    } = useQuery({
        queryKey: queryKeys.inquiries.list({ limit: RECENT_INQUIRIES_LIMIT }),
        queryFn: () => getInquiries({ limit: RECENT_INQUIRIES_LIMIT }),
        staleTime: 2 * 60 * 1000, // 2 minutes - inquiries change more frequently
        gcTime: 5 * 60 * 1000,
    });

    // Aggregate statistics
    const stats: AdminDashboardStats = useMemo(
        () => ({
            totalServices: servicesData?.pagination.totalCount ?? 0,
            totalBookings: bookingsData?.pagination.totalCount ?? 0,
            totalUsers: usersData?.pagination.totalCount ?? 0,
            totalInquiries: inquiriesData?.pagination.totalCount ?? 0,
        }),
        [servicesData, bookingsData, usersData, inquiriesData]
    );

    // Get recent bookings (limit to 4 for display)
    const recentBookings = useMemo(() => {
        return bookingsData?.bookings?.slice(0, 4) ?? [];
    }, [bookingsData]);

    // Get pending inquiries (limit to 4 for display)
    const pendingInquiries = useMemo(() => {
        return inquiriesData?.inquiries?.filter((i) => !i.isResolved)?.slice(0, 4) ?? [];
    }, [inquiriesData]);

    // Loading states
    const loadingState: DashboardLoadingState = useMemo(
        () => ({
            stats: servicesLoading || bookingsLoading || usersLoading || inquiriesLoading,
            bookings: bookingsLoading,
            inquiries: inquiriesLoading,
            users: usersLoading,
            services: servicesLoading,
        }),
        [servicesLoading, bookingsLoading, usersLoading, inquiriesLoading]
    );

    const isLoading = loadingState.stats || loadingState.bookings || loadingState.inquiries;

    // Error states
    const errorState: DashboardErrorState = useMemo(
        () => ({
            stats: servicesError || bookingsError || usersError || inquiriesError || null,
            bookings: bookingsError || null,
            inquiries: inquiriesError || null,
            users: usersError || null,
            services: servicesError || null,
        }),
        [servicesError, bookingsError, usersError, inquiriesError]
    );

    const error = errorState.stats;
    const hasError = !!error;

    // Refetch functions
    const refetch = () => {
        refetchServices();
        refetchBookings();
        refetchUsers();
        refetchInquiries();
    };

    const refetchStats = () => {
        refetchServices();
        refetchBookings();
        refetchUsers();
        refetchInquiries();
    };

    return {
        stats,
        recentBookings,
        pendingInquiries,
        isLoading,
        isLoadingStats: loadingState.stats,
        isLoadingBookings: loadingState.bookings,
        isLoadingInquiries: loadingState.inquiries,
        loadingState,
        error,
        errorState,
        hasError,
        refetch,
        refetchStats,
        refetchBookings,
        refetchInquiries,
    };
}
