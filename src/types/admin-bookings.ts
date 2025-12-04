import type { Booking } from './booking';
import { BookingStatus } from './common';

export interface BookingStats {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
}

export interface BookingFilterState {
    search: string;
    status: BookingStatus | 'all';
}

export interface UseAdminBookingsReturn {
    // Data
    bookings: Booking[];
    filteredBookings: Booking[];
    stats: BookingStats;
    pagination: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
        hasMore: boolean;
    } | null;

    // Loading states
    isLoading: boolean;
    isFetching: boolean;
    error: Error | null;

    // Filter state
    searchQuery: string;
    statusFilter: BookingStatus | 'all';
    debouncedSearchQuery: string;

    // Actions
    setSearchQuery: (query: string) => void;
    setStatusFilter: (status: BookingStatus | 'all') => void;
    clearFilters: () => void;
    refetch: () => void;
    handleDelete: (id: string) => void;
    handleRowClick: (id: string) => void;

    // Delete state
    deleteId: string | null;
    isDeleting: boolean;
    closeDeleteDialog: () => void;
    confirmDelete: () => void;

    // Computed
    hasActiveFilters: boolean;
}

export interface BookingRowProps {
    booking: Booking;
    onRowClick: (id: string) => void;
    onDelete: (id: string) => void;
}

export interface BookingsTableProps {
    bookings: Booking[];
    onRowClick: (id: string) => void;
    onDelete: (id: string) => void;
    loading?: boolean;
}

export interface BookingsFiltersProps {
    searchQuery: string;
    statusFilter: BookingStatus | 'all';
    onSearchChange: (query: string) => void;
    onStatusChange: (status: BookingStatus | 'all') => void;
}

export interface BookingsStatsProps {
    stats: BookingStats;
    loading?: boolean;
}

export interface DeleteDialogProps {
    open: boolean;
    bookingId: string | null;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface StatusBadgeProps {
    status: BookingStatus;
    showIcon?: boolean;
}

export interface AdminBookingsEmptyStateProps {
    hasFilters: boolean;
}
