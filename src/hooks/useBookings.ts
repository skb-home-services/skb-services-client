'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getUserBookings } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { BOOKINGS_CONFIG } from '@/configs/bookings';
import { formatDate } from '@/lib/utils';
import type { Booking, BookingStatus } from '@/types';
import type { UseBookingsReturn, BookingStats } from '@/types/bookings';

export function useBookings(): UseBookingsReturn {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');

    const currentPage = Number(searchParams.get('page')) || 1;
    const offset = (currentPage - 1) * BOOKINGS_CONFIG.itemsPerPage;

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, BOOKINGS_CONFIG.searchDebounceMs);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch bookings
    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: queryKeys.bookings.user({ limit: BOOKINGS_CONFIG.itemsPerPage, offset }),
        queryFn: () => getUserBookings({ limit: BOOKINGS_CONFIG.itemsPerPage, offset }),
    });

    // Filter bookings based on search and status
    const filteredBookings = useMemo(() => {
        if (!data?.bookings) return [];

        return data.bookings.filter((booking: Booking) => {
            const matchesSearch =
                debouncedSearchQuery === '' ||
                booking.customer.address.city.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                formatDate(booking.date).toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                booking.customer.fullName.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

            const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [data?.bookings, debouncedSearchQuery, statusFilter]);

    // Calculate statistics
    const stats = useMemo<BookingStats>(() => {
        const allBookings = data?.bookings || [];
        return {
            total: data?.pagination.totalCount || 0,
            pending: allBookings.filter((b: Booking) => b.status === 'pending').length,
            confirmed: allBookings.filter((b: Booking) => b.status === 'confirmed').length,
            completed: allBookings.filter((b: Booking) => b.status === 'completed').length,
            cancelled: allBookings.filter((b: Booking) => b.status === 'cancelled').length,
        };
    }, [data]);

    // Clear all filters
    const clearFilters = useCallback(() => {
        setSearchQuery('');
        setStatusFilter('all');
    }, []);

    // Check if any filters are active
    const hasActiveFilters = useMemo(() => searchQuery !== '' || statusFilter !== 'all', [searchQuery, statusFilter]);

    return {
        // Data
        bookings: data?.bookings || [],
        filteredBookings,
        pagination: data?.pagination
            ? {
                  totalCount: data.pagination.totalCount,
                  totalPages: data.pagination.totalPages,
                  currentPage: data.pagination.currentPage,
                  hasMore: data.pagination.hasMore,
              }
            : null,
        stats,

        // Loading states
        isLoading,
        isFetching,
        error: error as Error | null,

        // Filter state
        searchQuery,
        statusFilter,

        // Actions
        setSearchQuery,
        setStatusFilter,
        clearFilters,
        refetch,

        // Computed
        hasActiveFilters,
    };
}
