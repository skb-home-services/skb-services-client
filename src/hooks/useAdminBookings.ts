import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { getBookings, deleteBooking } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { toast } from './useToast';
import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';
import type { UseAdminBookingsReturn, BookingStats } from '@/types/admin-bookings';
import type { Booking, BookingStatus } from '@/types';

export function useAdminBookings(): UseAdminBookingsReturn {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const currentPage = Number(searchParams.get('page')) || 1;
    const offset = (currentPage - 1) * ADMIN_BOOKINGS_CONFIG.pagination.itemsPerPage;

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, ADMIN_BOOKINGS_CONFIG.filters.search.debounceMs);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch bookings data
    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: queryKeys.bookings.list({ limit: ADMIN_BOOKINGS_CONFIG.pagination.itemsPerPage, offset }),
        queryFn: () => getBookings({ limit: ADMIN_BOOKINGS_CONFIG.pagination.itemsPerPage, offset }),
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000,
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
            toast({
                title: ADMIN_BOOKINGS_CONFIG.messages.deleteSuccess.title,
                description: ADMIN_BOOKINGS_CONFIG.messages.deleteSuccess.description,
                variant: 'success',
            });
            setDeleteId(null);
        },
        onError: (error: { message?: string }) => {
            toast({
                title: ADMIN_BOOKINGS_CONFIG.messages.deleteError.title,
                description: error.message || ADMIN_BOOKINGS_CONFIG.messages.deleteError.description,
                variant: 'destructive',
            });
        },
    });

    // Calculate statistics
    const stats: BookingStats = useMemo(() => {
        if (!data?.bookings) {
            return {
                total: 0,
                pending: 0,
                confirmed: 0,
                completed: 0,
                cancelled: 0,
            };
        }

        return {
            total: data.pagination.totalCount,
            pending: data.bookings.filter((b: Booking) => b.status === 'pending').length,
            confirmed: data.bookings.filter((b: Booking) => b.status === 'confirmed').length,
            completed: data.bookings.filter((b: Booking) => b.status === 'completed').length,
            cancelled: data.bookings.filter((b: Booking) => b.status === 'cancelled').length,
        };
    }, [data]);

    // Filter bookings based on search and status
    const filteredBookings = useMemo(() => {
        if (!data?.bookings) return [];

        return data.bookings.filter((booking: Booking) => {
            const matchesSearch =
                debouncedSearchQuery === '' ||
                booking.customer.fullName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                booking.customer.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                booking.customer.address.city.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

            const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [data?.bookings, debouncedSearchQuery, statusFilter]);

    // Handlers
    const handleRowClick = useCallback(
        (id: string) => {
            router.push(`/admin/bookings/${id}`);
        },
        [router]
    );

    const handleDelete = useCallback((id: string) => {
        setDeleteId(id);
    }, []);

    const closeDeleteDialog = useCallback(() => {
        setDeleteId(null);
    }, []);

    const confirmDelete = useCallback(() => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    }, [deleteId, deleteMutation]);

    const clearFilters = useCallback(() => {
        setSearchQuery('');
        setStatusFilter('all');
    }, []);

    const hasActiveFilters = useMemo(() => {
        return searchQuery !== '' || statusFilter !== 'all';
    }, [searchQuery, statusFilter]);

    return {
        bookings: data?.bookings ?? [],
        filteredBookings,
        stats,
        pagination: data?.pagination
            ? {
                  totalCount: data.pagination.totalCount,
                  totalPages: data.pagination.totalPages,
                  currentPage: data.pagination.currentPage,
                  hasMore: data.pagination.hasMore,
              }
            : null,
        isLoading,
        isFetching,
        error: error as Error | null,
        searchQuery,
        statusFilter,
        debouncedSearchQuery,
        setSearchQuery,
        setStatusFilter,
        clearFilters,
        refetch,
        handleDelete,
        handleRowClick,
        deleteId,
        isDeleting: deleteMutation.isPending,
        closeDeleteDialog,
        confirmDelete,
        hasActiveFilters,
    };
}
