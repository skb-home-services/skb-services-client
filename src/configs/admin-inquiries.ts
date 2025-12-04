import { MessageSquare, Filter, CheckCircle2, Clock3, ShieldAlert, Trash2, Download, Inbox, LucideIcon } from 'lucide-react';
import type { InquiryStatusConfig, InquiryTableColumn, InquiryStatusFilter } from '@/types/admin-inquiries';

export interface StatCardConfig {
    key: 'total' | 'pending' | 'resolved' | 'spam';
    label: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
}

export interface FilterOption<T = string> {
    value: T;
    label: string;
    description?: string;
}

export interface AdminInquiriesConfig {
    page: {
        title: string;
        description: string;
        subtitle: string;
    };
    search: {
        placeholder: string;
        ariaLabel: string;
        debounceMs: number;
    };
    pagination: {
        itemsPerPage: number;
        virtualizedRowHeight: number;
        virtualizedContainerHeight: number;
        overscan: number;
        virtualizationThreshold: number;
    };
    status: Record<'pending' | 'resolved' | 'spam', InquiryStatusConfig>;
    filters: {
        status: {
            label: string;
            options: FilterOption<InquiryStatusFilter>[];
        };
        dateRange: {
            label: string;
            helperText: string;
            presets: FilterOption[];
        };
        chips: {
            clearLabel: string;
            heading: string;
        };
        advancedLabel: string;
        savePresetLabel: string;
    };
    actions: {
        refresh: {
            label: string;
            tooltip: string;
        };
        resolve: {
            label: string;
            tooltip: string;
            confirmLabel: string;
        };
        view: {
            label: string;
            tooltip: string;
        };
        delete: {
            label: string;
            tooltip: string;
        };
        spam: {
            label: string;
            tooltip: string;
        };
        export: {
            label: string;
            tooltip: string;
        };
    };
    bulk: {
        toolbarLabel: string;
        selectionLabel: string;
        clearLabel: string;
        actions: Array<{
            key: 'resolve' | 'delete' | 'export' | 'spam';
            label: string;
            icon: LucideIcon;
            intent: 'primary' | 'danger' | 'muted';
            tooltip?: string;
        }>;
    };
    deleteDialog: {
        title: string;
        description: string;
        confirmLabel: string;
        cancelLabel: string;
        deletingLabel: string;
        successMessage: string;
        errorMessage: string;
    };
    table: {
        title: string;
        columnVisibilityLabel: string;
        emptyState: {
            default: {
                icon: typeof MessageSquare;
                title: string;
                description: string;
            };
            filtered: {
                icon: typeof Filter;
                title: string;
                description: string;
            };
        };
        columns: InquiryTableColumn[];
    };
    stats: StatCardConfig[];
    messages: {
        markResolvedSuccess: string;
        markResolvedError: string;
        bulkResolveSuccess: string;
        bulkResolveError: string;
        bulkDeleteSuccess: string;
        bulkDeleteError: string;
        exportSuccess: string;
        exportError: string;
        spamSuccess: string;
        spamError: string;
    };
    errors: {
        load: {
            title: string;
            description: string;
        };
    };
}

export const ADMIN_INQUIRIES_CONFIG: AdminInquiriesConfig = {
    page: {
        title: 'Inquiries',
        description: 'Manage customer inquiries and response workflows',
        subtitle: 'Track resolution performance, prioritize outreach, and respond faster.',
    },
    search: {
        placeholder: 'Search by name, email, phone, or message…',
        ariaLabel: 'Search inquiries',
        debounceMs: 300,
    },
    pagination: {
        itemsPerPage: 15,
        virtualizedRowHeight: 112,
        virtualizedContainerHeight: 640,
        overscan: 6,
        virtualizationThreshold: 25,
    },
    status: {
        pending: {
            label: 'Pending',
            description: 'Awaiting response',
            icon: Clock3,
            badge: 'bg-amber-100 text-amber-800 border-amber-200',
            dot: 'bg-amber-500',
            iconColor: 'text-amber-600',
            iconBg: 'bg-amber-100',
            srLabel: 'Pending inquiry',
            quickActionLabel: 'Resolve',
        },
        resolved: {
            label: 'Resolved',
            description: 'Responded & closed',
            icon: CheckCircle2,
            badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            dot: 'bg-emerald-500',
            iconColor: 'text-emerald-600',
            iconBg: 'bg-emerald-100',
            srLabel: 'Resolved inquiry',
            quickActionLabel: 'View',
        },
        spam: {
            label: 'Spam',
            description: 'Marked as spam',
            icon: ShieldAlert,
            badge: 'bg-rose-100 text-rose-800 border-rose-200',
            dot: 'bg-rose-500',
            iconColor: 'text-rose-600',
            iconBg: 'bg-rose-100',
            srLabel: 'Spam inquiry',
            quickActionLabel: 'Review',
        },
    },
    filters: {
        status: {
            label: 'Status',
            options: [
                { value: 'all', label: 'All statuses' },
                { value: 'pending', label: 'Pending' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'spam', label: 'Spam' },
            ],
        },
        dateRange: {
            label: 'Date range',
            helperText: 'Filter inquiries by created date',
            presets: [
                { value: '7d', label: 'Last 7 days' },
                { value: '30d', label: 'Last 30 days' },
                { value: '90d', label: 'Last 90 days' },
                { value: 'ytd', label: 'Year to date' },
            ],
        },
        chips: {
            clearLabel: 'Clear all',
            heading: 'Active filters',
        },
        advancedLabel: 'Advanced search',
        savePresetLabel: 'Save preset',
    },
    actions: {
        refresh: {
            label: 'Refresh',
            tooltip: 'Refresh inquiries',
        },
        resolve: {
            label: 'Resolve',
            tooltip: 'Mark as resolved',
            confirmLabel: 'Mark resolved',
        },
        view: {
            label: 'View details',
            tooltip: 'Open inquiry detail page',
        },
        delete: {
            label: 'Delete',
            tooltip: 'Delete inquiry',
        },
        spam: {
            label: 'Mark as spam',
            tooltip: 'Move to spam',
        },
        export: {
            label: 'Export CSV',
            tooltip: 'Export selected to CSV',
        },
    },
    bulk: {
        toolbarLabel: 'Bulk actions',
        selectionLabel: 'selected',
        clearLabel: 'Clear selection',
        actions: [
            { key: 'resolve', label: 'Mark resolved', icon: CheckCircle2, intent: 'primary', tooltip: 'Mark selected as resolved' },
            { key: 'spam', label: 'Mark spam', icon: ShieldAlert, intent: 'muted', tooltip: 'Move selected to spam' },
            { key: 'delete', label: 'Delete', icon: Trash2, intent: 'danger', tooltip: 'Delete selected inquiries' },
            { key: 'export', label: 'Export CSV', icon: Download, intent: 'muted', tooltip: 'Export selected inquiries' },
        ],
    },
    deleteDialog: {
        title: 'Delete inquiry',
        description: 'Are you sure you want to delete this inquiry? This action cannot be undone.',
        confirmLabel: 'Delete inquiry',
        cancelLabel: 'Cancel',
        deletingLabel: 'Deleting…',
        successMessage: 'Inquiry deleted successfully.',
        errorMessage: 'Could not delete inquiry.',
    },
    table: {
        title: 'All inquiries',
        columnVisibilityLabel: 'Columns',
        emptyState: {
            default: {
                icon: Inbox,
                title: 'No inquiries yet',
                description: 'Customer inquiries will appear here as soon as they are received.',
            },
            filtered: {
                icon: Filter,
                title: 'No inquiries match your filters',
                description: 'Try adjusting or clearing filters to see more inquiries.',
            },
        },
        columns: [
            { id: 'selection', label: 'Select', ariaLabel: 'Select inquiry', isDefaultVisible: true, minWidth: '40px', align: 'center' },
            {
                id: 'fullName',
                label: 'Customer',
                ariaLabel: 'Customer information',
                sortable: true,
                isDefaultVisible: true,
                minWidth: '240px',
            },
            { id: 'contact', label: 'Contact', ariaLabel: 'Contact details', isDefaultVisible: true, minWidth: '220px' },
            { id: 'status', label: 'Status', ariaLabel: 'Status', sortable: true, isDefaultVisible: true, minWidth: '140px' },
            { id: 'createdAt', label: 'Received', ariaLabel: 'Created date', sortable: true, isDefaultVisible: true, minWidth: '140px' },
            { id: 'actions', label: 'Actions', ariaLabel: 'Row actions', isDefaultVisible: true, minWidth: '140px', align: 'right' },
        ],
    },
    stats: [
        {
            key: 'total',
            label: 'Total inquiries',
            description: 'All time',
            icon: MessageSquare,
            iconColor: 'text-primary',
            iconBg: 'bg-primary/10',
        },
        {
            key: 'pending',
            label: 'Pending',
            description: 'Awaiting response',
            icon: Clock3,
            iconColor: 'text-amber-600',
            iconBg: 'bg-amber-100',
        },
        {
            key: 'resolved',
            label: 'Resolved',
            description: 'Closed inquiries',
            icon: CheckCircle2,
            iconColor: 'text-emerald-600',
            iconBg: 'bg-emerald-100',
        },
        {
            key: 'spam',
            label: 'Spam',
            description: 'Marked as spam',
            icon: ShieldAlert,
            iconColor: 'text-rose-600',
            iconBg: 'bg-rose-100',
        },
    ],
    messages: {
        markResolvedSuccess: 'Inquiry marked as resolved.',
        markResolvedError: 'Unable to mark inquiry as resolved.',
        bulkResolveSuccess: 'Selected inquiries marked as resolved.',
        bulkResolveError: 'Unable to mark selected inquiries as resolved.',
        bulkDeleteSuccess: 'Selected inquiries deleted.',
        bulkDeleteError: 'Unable to delete selected inquiries.',
        exportSuccess: 'Export started for selected inquiries.',
        exportError: 'Unable to export selected inquiries.',
        spamSuccess: 'Inquiry marked as spam.',
        spamError: 'Unable to mark inquiry as spam.',
    },
    errors: {
        load: {
            title: 'Error loading inquiries',
            description: 'Please try again or contact support if the problem persists.',
        },
    },
} as const;
