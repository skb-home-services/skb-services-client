import type { LucideIcon } from 'lucide-react';
import type { Inquiry } from './inquiry';

export type InquiryStatusFilter = 'all' | 'pending' | 'resolved' | 'spam';

export type InquirySortColumn = 'fullName' | 'createdAt' | 'status';

export interface InquirySortState {
    column: InquirySortColumn;
    direction: 'asc' | 'desc';
}

export interface InquiryDateRange {
    from: string | null;
    to: string | null;
    preset?: string | null;
}

export interface InquiryFilterState {
    search: string;
    status: InquiryStatusFilter;
    dateRange: InquiryDateRange;
    advanced: boolean;
}

export interface InquiryStats {
    total: number;
    pending: number;
    resolved: number;
    spam: number;
}

export interface InquiryStatusConfig {
    label: string;
    description: string;
    icon: LucideIcon;
    badge: string;
    iconColor: string;
    iconBg: string;
    srLabel: string;
    quickActionLabel: string;
}

export type InquiryTableColumnId = 'selection' | 'fullName' | 'contact' | 'status' | 'createdAt' | 'actions';

export interface InquiryTableColumn {
    id: InquiryTableColumnId;
    label: string;
    ariaLabel: string;
    sortable?: boolean;
    minWidth?: string;
    align?: 'left' | 'center' | 'right';
    isDefaultVisible: boolean;
}

export interface InquiryDeleteState {
    id: string | null;
    name: string | null;
}

export interface InquiryBulkAction {
    key: 'resolve' | 'delete' | 'export' | 'spam';
    label: string;
    icon: LucideIcon;
    intent: 'primary' | 'danger' | 'muted';
    tooltip?: string;
    shortcut?: string;
}

export interface SavedInquiryFilterPreset {
    id: string;
    name: string;
    filters: InquiryFilterState;
    createdAt: string;
}

export interface FilterChip {
    key: string;
    label: string;
}

export interface InquiryBulkState {
    selectedIds: string[];
    isBulkResolving: boolean;
    isBulkDeleting: boolean;
    isBulkSpam: boolean;
}

export interface UseInquiriesFilterReturn {
    filters: InquiryFilterState;
    debouncedSearch: string;
    filterChips: FilterChip[];
    hasActiveFilters: boolean;
    selectedPresetId: string | null;
    savedPresets: SavedInquiryFilterPreset[];
    setSearch: (value: string) => void;
    setStatus: (value: InquiryStatusFilter) => void;
    setDateRange: (range: InquiryDateRange) => void;
    toggleAdvanced: () => void;
    resetFilters: () => void;
    savePreset: (name: string) => void;
    deletePreset: (id: string) => void;
    applyPreset: (id: string) => void;
}

export interface UseAdminInquiriesReturn {
    inquiries: Inquiry[];
    filteredInquiries: Inquiry[];
    sortedInquiries: Inquiry[];
    paginatedInquiries: Inquiry[];
    stats: InquiryStats;
    pagination: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
        hasMore: boolean;
    } | null;
    isLoading: boolean;
    isFetching: boolean;
    error: Error | null;
    lastUpdated: string | null;

    // Filters & sorting
    filters: InquiryFilterState;
    debouncedSearch: string;
    filterChips: FilterChip[];
    hasActiveFilters: boolean;
    selectedPresetId: string | null;
    savedPresets: SavedInquiryFilterPreset[];
    sortState: InquirySortState;
    visibleColumns: Record<InquiryTableColumnId, boolean>;
    tableColumns: InquiryTableColumn[];

    // Actions
    setSearch: (value: string) => void;
    setStatus: (value: InquiryStatusFilter) => void;
    setDateRange: (range: InquiryDateRange) => void;
    toggleAdvancedFilters: () => void;
    resetFilters: () => void;
    savePreset: (name: string) => void;
    deletePreset: (id: string) => void;
    applyPreset: (id: string) => void;
    setSortState: (sort: InquirySortState) => void;
    toggleColumnVisibility: (columnId: InquiryTableColumnId) => void;
    refetch: () => void;
    handleRowClick: (id: string) => void;
    handleResolve: (id: string) => void;
    handleSpam: (id: string) => void;
    handleDelete: (id: string, name?: string) => void;
    closeDeleteDialog: () => void;
    confirmDelete: () => void;

    // Delete dialog
    deleteDialog: InquiryDeleteState;
    isDeleting: boolean;
    isResolving: boolean;
    isSpamming?: boolean;

    // Bulk selection & actions
    selectedIds: string[];
    toggleSelect: (id: string) => void;
    selectAll: () => void;
    clearSelection: () => void;
    isSelected: (id: string) => boolean;
    bulkResolve: () => void;
    bulkDelete: () => void;
    bulkMarkSpam: () => void;
    exportSelected: () => void;
    bulkState: InquiryBulkState;
}

export interface InquiriesHeaderProps {
    isFetching: boolean;
    lastUpdated: string | null;
    selectedCount: number;
    onRefresh: () => void;
    onExport: () => void;
}

export interface InquiriesStatsProps {
    stats: InquiryStats;
    loading?: boolean;
}

export interface InquiriesFiltersProps {
    filters: InquiryFilterState;
    filterChips: FilterChip[];
    hasActiveFilters: boolean;
    savedPresets: SavedInquiryFilterPreset[];
    selectedPresetId: string | null;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: InquiryStatusFilter) => void;
    onDateRangeChange: (range: InquiryDateRange) => void;
    onReset: () => void;
    onToggleAdvanced: () => void;
    onSavePreset: (name: string) => void;
    onDeletePreset: (id: string) => void;
    onApplyPreset: (id: string) => void;
}

export interface InquiriesTableProps {
    inquiries: Inquiry[];
    totalCount: number;
    loading: boolean;
    hasFilters: boolean;
    tableColumns: InquiryTableColumn[];
    visibleColumns: Record<InquiryTableColumnId, boolean>;
    sortState: InquirySortState;
    onSortChange: (sort: InquirySortState) => void;
    onRowClick: (id: string) => void;
    onResolve: (id: string) => void;
    onSpam: (id: string) => void;
    onDelete: (id: string, name?: string) => void;
    selectedIds: string[];
    onSelect: (id: string) => void;
    onSelectAll: () => void;
    onClearSelection: () => void;
    onResetFilters?: () => void;
    onToggleColumn: (columnId: InquiryTableColumnId) => void;
    onBulkResolve: () => void;
    onBulkDelete: () => void;
    onBulkSpam: () => void;
    onExportSelected: () => void;
    bulkState: InquiryBulkState;
    isResolving: boolean;
    isSpamming?: boolean;
}

export interface InquiryRowProps {
    inquiry: Inquiry;
    visibleColumns: Record<InquiryTableColumnId, boolean>;
    isSelected: boolean;
    onSelectChange: (id: string) => void;
    onClick: (id: string) => void;
    onResolve: (id: string) => void;
    onDelete: (id: string) => void;
    onSpam: (id: string) => void;
    disableResolve?: boolean;
    disableSpam?: boolean;
}

export interface ActionButtonsProps {
    inquiry: Inquiry;
    disableResolve?: boolean;
    disableSpam?: boolean;
    onResolve: () => void;
    onView: () => void;
    onDelete: () => void;
    onSpam: () => void;
}

export interface DeleteDialogProps {
    open: boolean;
    inquiryName: string | null;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
