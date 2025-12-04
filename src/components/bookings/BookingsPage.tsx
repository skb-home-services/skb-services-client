'use client';

import { useBookings } from '@/hooks/useBookings';
import { BookingsHeader } from './BookingsHeader';
import { BookingsStats } from './BookingsStats';
import { BookingsFilters } from './BookingsFilters';
import { BookingsList } from './BookingsList';
import { BookingsPagination } from './BookingsPagination';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export function BookingsPage() {
    const {
        filteredBookings,
        pagination,
        stats,
        isLoading,
        isFetching,
        error,
        searchQuery,
        statusFilter,
        setSearchQuery,
        setStatusFilter,
        clearFilters,
        refetch,
        hasActiveFilters,
    } = useBookings();

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState onRetry={refetch} />;
    }

    return (
        <div className="space-y-6">
            <BookingsHeader isFetching={isFetching} onRefresh={refetch} />
            <BookingsStats stats={stats} onStatClick={setStatusFilter} />
            <BookingsFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                totalCount={pagination?.totalCount || 0}
            />
            <BookingsList bookings={filteredBookings} totalCount={pagination?.totalCount || 0} hasActiveFilters={hasActiveFilters} />
            {pagination && <BookingsPagination totalPages={pagination.totalPages} />}
        </div>
    );
}
