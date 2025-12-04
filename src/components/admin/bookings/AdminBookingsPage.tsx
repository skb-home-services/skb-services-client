'use client';

import { Pagination, PageLoader } from '@/components/common';
import { BookingsHeader } from './BookingsHeader';
import { StatsPanel } from './panels/StatsPanel';
import { FiltersPanel } from './panels/FiltersPanel';
import { BookingsTable } from './BookingsTable';
import { DeleteDialog } from './DeleteDialog';
import { LoadingState } from './ui/LoadingState';
import { ErrorState } from './ui/ErrorState';
import { useAdminBookings } from '@/hooks/useAdminBookings';

export function AdminBookingsPage() {
    const {
        filteredBookings,
        stats,
        pagination,
        isLoading,
        isFetching,
        error,
        searchQuery,
        statusFilter,
        hasActiveFilters,
        setSearchQuery,
        setStatusFilter,
        refetch,
        handleDelete,
        handleRowClick,
        deleteId,
        isDeleting,
        closeDeleteDialog,
        confirmDelete,
    } = useAdminBookings();

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return <ErrorState error={error} onRetry={refetch} />;
    }

    return (
        <div className="space-y-6">
            <BookingsHeader isFetching={isFetching} onRefresh={refetch} />
            <StatsPanel stats={stats} loading={isFetching} />
            <FiltersPanel
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                onSearchChange={setSearchQuery}
                onStatusChange={setStatusFilter}
            />
            <BookingsTable
                bookings={filteredBookings}
                totalCount={pagination?.totalCount ?? 0}
                hasFilters={hasActiveFilters}
                onRowClick={handleRowClick}
                onDelete={handleDelete}
                loading={isFetching}
            />
            {pagination && pagination.totalPages > 1 && <Pagination totalPages={pagination.totalPages} />}
            <DeleteDialog
                open={!!deleteId}
                bookingId={deleteId}
                isDeleting={isDeleting}
                onClose={closeDeleteDialog}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
