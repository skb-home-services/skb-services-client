import type { Booking } from './booking';
import { BookingStatus } from './common';

export interface BookingFilterState {
    search: string;
    status: BookingStatus | 'all';
}

export interface BookingStats {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
}

export interface BookingPaginationParams {
    page: number;
    limit: number;
    offset: number;
}

export interface BookingFilterOptions {
    status: BookingStatus | 'all';
}

export interface BookingSearchParams {
    query: string;
    status: BookingStatus | 'all';
}

export type BookingStatusFilter = BookingStatus | 'all';

export interface UseBookingsReturn {
    // Data
    bookings: Booking[];
    filteredBookings: Booking[];
    pagination: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
        hasMore: boolean;
    } | null;
    stats: BookingStats;

    // Loading states
    isLoading: boolean;
    isFetching: boolean;
    error: Error | null;

    // Filter state
    searchQuery: string;
    statusFilter: BookingStatusFilter;

    // Actions
    setSearchQuery: (query: string) => void;
    setStatusFilter: (status: BookingStatusFilter) => void;
    clearFilters: () => void;
    refetch: () => void;

    // Computed
    hasActiveFilters: boolean;
}
