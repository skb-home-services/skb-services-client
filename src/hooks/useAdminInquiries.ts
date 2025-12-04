'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getInquiries, deleteInquiry, updateInquiry } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { ADMIN_INQUIRIES_CONFIG } from '@/configs/admin-inquiries';
import { toast } from './useToast';
import { formatDate } from '@/lib/utils';
import type {
    UseAdminInquiriesReturn,
    UseInquiriesFilterReturn,
    InquiryFilterState,
    InquiryStatusFilter,
    InquiryDateRange,
    InquirySortState,
    InquiryTableColumnId,
    SavedInquiryFilterPreset,
} from '@/types/admin-inquiries';
import type { Inquiry } from '@/types';

const FILTER_PRESETS_KEY = 'admin-inquiries-presets';

const defaultFilters: InquiryFilterState = {
    search: '',
    status: 'all',
    dateRange: {
        from: null,
        to: null,
        preset: null,
    },
    advanced: false,
};

const parseFiltersFromParams = (params: ReadonlyURLSearchParams): Partial<InquiryFilterState> => {
    const status = params.get('status') as InquiryStatusFilter | null;
    const search = params.get('search') ?? '';
    const from = params.get('from');
    const to = params.get('to');
    const preset = params.get('preset');
    const advanced = params.get('advanced') === 'true';

    return {
        search,
        status: status && ['all', 'pending', 'resolved', 'spam'].includes(status) ? status : 'all',
        dateRange: {
            from,
            to,
            preset,
        },
        advanced,
    };
};

const getPresetStorage = (): SavedInquiryFilterPreset[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const raw = window.localStorage.getItem(FILTER_PRESETS_KEY);
        return raw ? (JSON.parse(raw) as SavedInquiryFilterPreset[]) : [];
    } catch {
        return [];
    }
};

const persistPresets = (presets: SavedInquiryFilterPreset[]) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(FILTER_PRESETS_KEY, JSON.stringify(presets));
    } catch {
        // ignore persistence errors
    }
};

export function useInquiriesFilter(initial?: Partial<InquiryFilterState>): UseInquiriesFilterReturn {
    const mergedInitial: InquiryFilterState = {
        ...defaultFilters,
        ...initial,
        dateRange: {
            ...defaultFilters.dateRange,
            ...(initial?.dateRange ?? {}),
        },
    };

    const [filters, setFilters] = useState<InquiryFilterState>(mergedInitial);
    const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
    const [savedPresets, setSavedPresets] = useState<SavedInquiryFilterPreset[]>([]);
    const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

    // Load presets once on mount
    useEffect(() => {
        setSavedPresets(getPresetStorage());
    }, []);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(filters.search), ADMIN_INQUIRIES_CONFIG.search.debounceMs);
        return () => clearTimeout(timer);
    }, [filters.search]);

    const setSearch = useCallback((value: string) => {
        setFilters((prev) => ({ ...prev, search: value }));
        setSelectedPresetId(null);
    }, []);

    const setStatus = useCallback((value: InquiryStatusFilter) => {
        setFilters((prev) => ({ ...prev, status: value }));
        setSelectedPresetId(null);
    }, []);

    const setDateRange = useCallback((range: InquiryDateRange) => {
        setFilters((prev) => ({ ...prev, dateRange: range }));
        setSelectedPresetId(null);
    }, []);

    const toggleAdvanced = useCallback(() => {
        setFilters((prev) => ({ ...prev, advanced: !prev.advanced }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(defaultFilters);
        setSelectedPresetId(null);
    }, []);

    const savePreset = useCallback(
        (name: string) => {
            if (!name.trim()) {
                return;
            }

            const newPreset: SavedInquiryFilterPreset = {
                id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
                name: name.trim(),
                filters,
                createdAt: new Date().toISOString(),
            };

            setSavedPresets((prev) => {
                const next = [...prev, newPreset];
                persistPresets(next);
                return next;
            });
            setSelectedPresetId(newPreset.id);
        },
        [filters]
    );

    const deletePreset = useCallback((id: string) => {
        setSavedPresets((prev) => {
            const next = prev.filter((preset) => preset.id !== id);
            persistPresets(next);
            return next;
        });
        setSelectedPresetId((current) => (current === id ? null : current));
    }, []);

    const applyPreset = useCallback((id: string) => {
        setSavedPresets((prev) => {
            const preset = prev.find((item) => item.id === id);
            if (preset) {
                setFilters(preset.filters);
                setSelectedPresetId(id);
            }
            return prev;
        });
    }, []);

    const filterChips = useMemo(() => {
        const chips = [];

        if (filters.search) {
            chips.push({ key: 'search', label: `Search: ${filters.search}` });
        }

        if (filters.status !== 'all') {
            const statusLabel =
                ADMIN_INQUIRIES_CONFIG.filters.status.options.find((option) => option.value === filters.status)?.label || filters.status;
            chips.push({ key: 'status', label: `Status: ${statusLabel}` });
        }

        if (filters.dateRange.preset) {
            const presetLabel =
                ADMIN_INQUIRIES_CONFIG.filters.dateRange.presets.find((preset) => preset.value === filters.dateRange.preset)?.label ||
                filters.dateRange.preset;
            chips.push({ key: 'datePreset', label: `Date: ${presetLabel}` });
        } else if (filters.dateRange.from || filters.dateRange.to) {
            const from = filters.dateRange.from ? formatDate(filters.dateRange.from) : 'Any';
            const to = filters.dateRange.to ? formatDate(filters.dateRange.to) : 'Any';
            chips.push({ key: 'dateRange', label: `Date: ${from} → ${to}` });
        }

        return chips;
    }, [filters]);

    const hasActiveFilters =
        filters.search !== defaultFilters.search ||
        filters.status !== defaultFilters.status ||
        !!filters.dateRange.from ||
        !!filters.dateRange.to ||
        !!filters.dateRange.preset;

    return {
        filters,
        debouncedSearch,
        filterChips,
        hasActiveFilters,
        selectedPresetId,
        savedPresets,
        setSearch,
        setStatus,
        setDateRange,
        toggleAdvanced,
        resetFilters,
        savePreset,
        deletePreset,
        applyPreset,
    };
}

export function useAdminInquiries(): UseAdminInquiriesReturn {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const currentPage = Number(searchParams.get('page')) || 1;
    const offset = (currentPage - 1) * ADMIN_INQUIRIES_CONFIG.pagination.itemsPerPage;

    const initialFiltersRef = useRef<Partial<InquiryFilterState>>(parseFiltersFromParams(searchParams));
    const {
        filters,
        debouncedSearch,
        filterChips,
        hasActiveFilters,
        savedPresets,
        selectedPresetId,
        setSearch,
        setStatus,
        setDateRange,
        toggleAdvanced,
        resetFilters,
        savePreset,
        deletePreset,
        applyPreset,
    } = useInquiriesFilter(initialFiltersRef.current);

    const [sortState, setSortState] = useState<InquirySortState>({
        column: 'createdAt',
        direction: 'desc',
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<InquiryTableColumnId, boolean>>(() =>
        ADMIN_INQUIRIES_CONFIG.table.columns.reduce(
            (acc, column) => {
                acc[column.id] = column.isDefaultVisible;
                return acc;
            },
            {} as Record<InquiryTableColumnId, boolean>
        )
    );

    const [deleteDialog, setDeleteDialog] = useState({ id: null, name: null } as { id: string | null; name: string | null });
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isBulkResolving, setIsBulkResolving] = useState(false);
    const [isBulkDeleting, setIsBulkDeleting] = useState(false);
    const [isBulkSpam, setIsBulkSpam] = useState(false);

    const filterSignature = JSON.stringify(filters);
    const prevFilterSignature = useRef(filterSignature);
    const searchParamsString = searchParams.toString();

    useEffect(() => {
        const params = new URLSearchParams();

        if (filters.search) {
            params.set('search', filters.search);
        }
        if (filters.status && filters.status !== 'all') {
            params.set('status', filters.status);
        }
        if (filters.dateRange.from) {
            params.set('from', filters.dateRange.from);
        }
        if (filters.dateRange.to) {
            params.set('to', filters.dateRange.to);
        }
        if (filters.dateRange.preset) {
            params.set('preset', filters.dateRange.preset);
        }
        if (filters.advanced) {
            params.set('advanced', 'true');
        }

        const shouldResetPage = prevFilterSignature.current !== filterSignature;
        prevFilterSignature.current = filterSignature;

        const pageToUse = shouldResetPage ? 1 : currentPage;
        if (pageToUse > 1) {
            params.set('page', String(pageToUse));
        }

        const next = params.toString();
        if (next === searchParamsString) {
            return;
        }

        router.replace(`${pathname}?${next}`, { scroll: false });
    }, [filters, filterSignature, currentPage, pathname, router, searchParamsString]);

    const { data, isLoading, error, refetch, isFetching, dataUpdatedAt } = useQuery({
        queryKey: queryKeys.inquiries.list({ limit: ADMIN_INQUIRIES_CONFIG.pagination.itemsPerPage, offset }),
        queryFn: () => getInquiries({ limit: ADMIN_INQUIRIES_CONFIG.pagination.itemsPerPage, offset }),
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });

    const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toISOString() : null;

    const deleteMutation = useMutation({
        mutationFn: deleteInquiry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.all });
            toast({
                title: ADMIN_INQUIRIES_CONFIG.deleteDialog.title,
                description: ADMIN_INQUIRIES_CONFIG.deleteDialog.successMessage,
                variant: 'success',
            });
            setDeleteDialog({ id: null, name: null });
            setSelectedIds([]);
        },
        onError: (mutationError: { message?: string }) => {
            toast({
                title: ADMIN_INQUIRIES_CONFIG.deleteDialog.title,
                description: mutationError.message || ADMIN_INQUIRIES_CONFIG.deleteDialog.errorMessage,
                variant: 'destructive',
            });
        },
    });

    const resolveMutation = useMutation({
        mutationFn: (id: string) => updateInquiry({ id, isResolved: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.all });
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.resolve.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.markResolvedSuccess,
                variant: 'success',
            });
        },
        onError: () => {
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.resolve.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.markResolvedError,
                variant: 'destructive',
            });
        },
    });

    const spamMutation = useMutation({
        mutationFn: (id: string) => updateInquiry({ id, isSpam: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.all });
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.spam.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.spamSuccess,
                variant: 'success',
            });
        },
        onError: () => {
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.spam.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.spamError,
                variant: 'destructive',
            });
        },
    });

    const inquiries = useMemo(() => data?.inquiries ?? [], [data?.inquiries]);

    const filteredInquiries = useMemo(() => {
        if (!inquiries.length) return [];

        const searchTerm = debouncedSearch.toLowerCase();

        return inquiries.filter((inquiry: Inquiry) => {
            const matchesSearch =
                searchTerm === '' ||
                inquiry.fullName.toLowerCase().includes(searchTerm) ||
                inquiry.email.toLowerCase().includes(searchTerm) ||
                inquiry.message.toLowerCase().includes(searchTerm) ||
                (typeof inquiry.phone === 'string'
                    ? inquiry.phone.toLowerCase().includes(searchTerm)
                    : inquiry.phone.nationalNumber?.toLowerCase().includes(searchTerm));

            const matchesStatus =
                filters.status === 'all' ||
                (filters.status === 'resolved' && inquiry.isResolved) ||
                (filters.status === 'pending' && !inquiry.isResolved && !inquiry.isSpam) ||
                (filters.status === 'spam' && inquiry.isSpam);

            const createdAt = new Date(inquiry.createdAt).getTime();
            const fromTime = filters.dateRange.from ? new Date(filters.dateRange.from).getTime() : null;
            const toTime = filters.dateRange.to ? new Date(filters.dateRange.to).getTime() : null;
            const matchesDate = (!fromTime || createdAt >= fromTime) && (!toTime || createdAt <= toTime);

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [inquiries, debouncedSearch, filters.status, filters.dateRange]);

    const sortedInquiries = useMemo(() => {
        const sortRank: Record<string, number> = { pending: 1, resolved: 2, spam: 3 };
        const copy = [...filteredInquiries];
        copy.sort((a, b) => {
            let comparison = 0;

            switch (sortState.column) {
                case 'fullName':
                    comparison = a.fullName.localeCompare(b.fullName);
                    break;
                case 'status': {
                    const aKey = a.isSpam ? 'spam' : a.isResolved ? 'resolved' : 'pending';
                    const bKey = b.isSpam ? 'spam' : b.isResolved ? 'resolved' : 'pending';
                    comparison = sortRank[aKey] - sortRank[bKey];
                    break;
                }
                case 'createdAt':
                default:
                    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    break;
            }

            return sortState.direction === 'asc' ? comparison : -comparison;
        });
        return copy;
    }, [filteredInquiries, sortState]);

    const paginatedInquiries = sortedInquiries;

    useEffect(() => {
        setSelectedIds((prev) => prev.filter((id) => paginatedInquiries.some((inquiry) => inquiry._id === id)));
    }, [paginatedInquiries]);

    const stats = useMemo(() => {
        const total = data?.pagination?.totalCount ?? inquiries.length;
        const pending = inquiries.filter((item) => !item.isResolved && !item.isSpam).length;
        const resolved = inquiries.filter((item) => item.isResolved).length;
        const spam = inquiries.filter((item) => item.isSpam).length;

        return { total, pending, resolved, spam };
    }, [data?.pagination?.totalCount, inquiries]);

    const pagination = data?.pagination
        ? {
              totalCount: data.pagination.totalCount,
              totalPages: data.pagination.totalPages,
              currentPage: data.pagination.currentPage,
              hasMore: data.pagination.hasMore,
          }
        : null;

    const handleRowClick = useCallback(
        (id: string) => {
            router.push(`/admin/inquiries/${id}`);
        },
        [router]
    );

    const handleResolve = useCallback(
        (id: string) => {
            resolveMutation.mutate(id);
        },
        [resolveMutation]
    );

    const handleSpam = useCallback(
        (id: string) => {
            spamMutation.mutate(id);
        },
        [spamMutation]
    );

    const handleDelete = useCallback((id: string, name?: string) => {
        setDeleteDialog({ id, name: name ?? null });
    }, []);

    const closeDeleteDialog = useCallback(() => {
        setDeleteDialog({ id: null, name: null });
    }, []);

    const confirmDelete = useCallback(() => {
        if (deleteDialog.id) {
            deleteMutation.mutate(deleteDialog.id);
        }
    }, [deleteDialog.id, deleteMutation]);

    const toggleColumnVisibility = useCallback((columnId: InquiryTableColumnId) => {
        if (columnId === 'selection' || columnId === 'actions') {
            return;
        }

        setVisibleColumns((prev) => ({ ...prev, [columnId]: !prev[columnId] }));
    }, []);

    const toggleSelect = useCallback((id: string) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]));
    }, []);

    const selectAll = useCallback(() => {
        setSelectedIds(paginatedInquiries.map((item) => item._id));
    }, [paginatedInquiries]);

    const clearSelection = useCallback(() => {
        setSelectedIds([]);
    }, []);

    const isSelected = useCallback((id: string) => selectedIds.includes(id), [selectedIds]);

    const runBulkMutation = useCallback(
        async (ids: string[], mutation: (id: string) => Promise<unknown>) => {
            await Promise.all(ids.map((id) => mutation(id)));
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.all });
            clearSelection();
        },
        [clearSelection, queryClient]
    );

    const bulkResolve = useCallback(async () => {
        if (!selectedIds.length) return;
        setIsBulkResolving(true);
        try {
            await runBulkMutation(selectedIds, (id) => updateInquiry({ id, isResolved: true }));
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.resolve.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.bulkResolveSuccess,
                variant: 'success',
            });
        } catch {
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.resolve.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.bulkResolveError,
                variant: 'destructive',
            });
        } finally {
            setIsBulkResolving(false);
        }
    }, [runBulkMutation, selectedIds]);

    const bulkDelete = useCallback(async () => {
        if (!selectedIds.length) return;
        setIsBulkDeleting(true);
        try {
            await runBulkMutation(selectedIds, (id) => deleteInquiry(id));
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.delete.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.bulkDeleteSuccess,
                variant: 'success',
            });
        } catch {
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.delete.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.bulkDeleteError,
                variant: 'destructive',
            });
        } finally {
            setIsBulkDeleting(false);
        }
    }, [runBulkMutation, selectedIds]);

    const bulkMarkSpam = useCallback(async () => {
        if (!selectedIds.length) return;
        setIsBulkSpam(true);
        try {
            await runBulkMutation(selectedIds, (id) => updateInquiry({ id, isSpam: true }));
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.spam.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.spamSuccess,
                variant: 'success',
            });
        } catch {
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.spam.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.spamError,
                variant: 'destructive',
            });
        } finally {
            setIsBulkSpam(false);
        }
    }, [runBulkMutation, selectedIds]);

    const exportSelected = useCallback(() => {
        if (!selectedIds.length) {
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.export.label,
                description: 'Select inquiries to export.',
                variant: 'default',
            });
            return;
        }

        try {
            const selectedRecords = sortedInquiries.filter((inquiry) => selectedIds.includes(inquiry._id));
            const headers = ['Full Name', 'Email', 'Phone', 'Status', 'Created At', 'Message'];
            const rows = selectedRecords.map((inquiry) => [
                inquiry.fullName,
                inquiry.email,
                typeof inquiry.phone === 'string' ? inquiry.phone : inquiry.phone.nationalNumber,
                inquiry.isSpam ? 'Spam' : inquiry.isResolved ? 'Resolved' : 'Pending',
                formatDate(inquiry.createdAt),
                inquiry.message.replace(/\n/g, ' '),
            ]);
            const csv = [headers, ...rows]
                .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
                .join('\n');

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `admin-inquiries-${new Date().toISOString()}.csv`;
            anchor.click();
            URL.revokeObjectURL(url);

            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.export.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.exportSuccess,
                variant: 'success',
            });
        } catch {
            toast({
                title: ADMIN_INQUIRIES_CONFIG.actions.export.label,
                description: ADMIN_INQUIRIES_CONFIG.messages.exportError,
                variant: 'destructive',
            });
        }
    }, [selectedIds, sortedInquiries]);

    const tableColumns = useMemo(() => ADMIN_INQUIRIES_CONFIG.table.columns, []);

    return {
        inquiries,
        filteredInquiries,
        sortedInquiries,
        paginatedInquiries,
        stats,
        pagination,
        isLoading,
        isFetching,
        error: error as Error | null,
        lastUpdated,

        filters,
        debouncedSearch,
        filterChips,
        hasActiveFilters,
        selectedPresetId,
        savedPresets,
        sortState,
        visibleColumns,
        tableColumns,

        setSearch,
        setStatus,
        setDateRange,
        toggleAdvancedFilters: toggleAdvanced,
        resetFilters,
        savePreset,
        deletePreset,
        applyPreset,
        setSortState,
        toggleColumnVisibility,
        refetch,
        handleRowClick,
        handleResolve,
        handleSpam,
        handleDelete,
        closeDeleteDialog,
        confirmDelete,

        deleteDialog,
        isDeleting: deleteMutation.isPending,
        isResolving: resolveMutation.isPending,
        isSpamming: spamMutation.isPending,

        selectedIds,
        toggleSelect,
        selectAll,
        clearSelection,
        isSelected,
        bulkResolve,
        bulkDelete,
        bulkMarkSpam,
        exportSelected,
        bulkState: {
            selectedIds,
            isBulkResolving,
            isBulkDeleting,
            isBulkSpam,
        },
    };
}
