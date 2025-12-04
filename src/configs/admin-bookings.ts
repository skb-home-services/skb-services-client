import { CalendarDays, AlertCircle, CheckCircle2, XCircle, LucideIcon } from 'lucide-react';
import type { BookingStatus } from '@/types';

export interface StatusConfig {
    label: string;
    icon: LucideIcon;
    color: string;
    badge: string;
    iconBg: string;
}

export interface StatCardConfig {
    key: string;
    label: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    getValue: (stats: BookingStats) => number;
}

export interface BookingStats {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
}

export interface AdminBookingsConfig {
    page: {
        title: string;
        description: string;
    };
    pagination: {
        itemsPerPage: number;
    };
    status: Record<BookingStatus, StatusConfig>;
    stats: StatCardConfig[];
    filters: {
        search: {
            placeholder: string;
            debounceMs: number;
        };
        status: {
            label: string;
            placeholder: string;
            options: Array<{ value: BookingStatus | 'all'; label: string }>;
        };
    };
    table: {
        title: string;
        emptyState: {
            noResults: {
                icon: LucideIcon;
                title: string;
                description: string;
            };
            noBookings: {
                icon: LucideIcon;
                title: string;
                description: string;
            };
        };
    };
    actions: {
        refresh: {
            label: string;
        };
        view: {
            label: string;
            tooltip: string;
        };
        delete: {
            label: string;
            tooltip: string;
        };
    };
    deleteDialog: {
        title: string;
        description: string;
        cancelLabel: string;
        confirmLabel: string;
        deletingLabel: string;
    };
    messages: {
        deleteSuccess: {
            title: string;
            description: string;
        };
        deleteError: {
            title: string;
            description: string;
        };
        loadError: {
            title: string;
            description: string;
        };
    };
}

export const ADMIN_BOOKINGS_CONFIG: AdminBookingsConfig = {
    page: {
        title: 'Bookings',
        description: 'Manage customer service bookings',
    },
    pagination: {
        itemsPerPage: 10,
    },
    status: {
        pending: {
            label: 'Pending',
            icon: AlertCircle,
            color: 'text-yellow-600',
            badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            iconBg: 'bg-yellow-100',
        },
        confirmed: {
            label: 'Confirmed',
            icon: CheckCircle2,
            color: 'text-blue-600',
            badge: 'bg-blue-100 text-blue-800 border-blue-200',
            iconBg: 'bg-blue-100',
        },
        completed: {
            label: 'Completed',
            icon: CheckCircle2,
            color: 'text-green-600',
            badge: 'bg-green-100 text-green-800 border-green-200',
            iconBg: 'bg-green-100',
        },
        cancelled: {
            label: 'Cancelled',
            icon: XCircle,
            color: 'text-red-600',
            badge: 'bg-red-100 text-red-800 border-red-200',
            iconBg: 'bg-red-100',
        },
    },
    stats: [
        {
            key: 'total',
            label: 'Total',
            icon: CalendarDays,
            iconBg: 'bg-primary/10',
            iconColor: 'text-primary',
            getValue: (stats) => stats.total,
        },
        {
            key: 'pending',
            label: 'Pending',
            icon: AlertCircle,
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            getValue: (stats) => stats.pending,
        },
        {
            key: 'confirmed',
            label: 'Confirmed',
            icon: CheckCircle2,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            getValue: (stats) => stats.confirmed,
        },
        {
            key: 'completed',
            label: 'Completed',
            icon: CheckCircle2,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            getValue: (stats) => stats.completed,
        },
    ],
    filters: {
        search: {
            placeholder: 'Search by name, email, or city...',
            debounceMs: 300,
        },
        status: {
            label: 'Filter by status',
            placeholder: 'Filter by status',
            options: [
                { value: 'all', label: 'All Status' },
                { value: 'pending', label: 'Pending' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
            ],
        },
    },
    table: {
        title: 'All Bookings',
        emptyState: {
            noResults: {
                icon: CalendarDays,
                title: 'No bookings found',
                description: 'Try adjusting your filters',
            },
            noBookings: {
                icon: CalendarDays,
                title: 'No bookings found',
                description: 'Customer bookings will appear here',
            },
        },
    },
    actions: {
        refresh: {
            label: 'Refresh',
        },
        view: {
            label: 'View details',
            tooltip: 'View details',
        },
        delete: {
            label: 'Delete booking',
            tooltip: 'Delete booking',
        },
    },
    deleteDialog: {
        title: 'Delete Booking',
        description: 'Are you sure you want to delete this booking? This action cannot be undone.',
        cancelLabel: 'Cancel',
        confirmLabel: 'Delete',
        deletingLabel: 'Deleting...',
    },
    messages: {
        deleteSuccess: {
            title: 'Booking Deleted',
            description: 'The booking has been deleted successfully.',
        },
        deleteError: {
            title: 'Delete Failed',
            description: 'Could not delete booking.',
        },
        loadError: {
            title: 'Error loading bookings',
            description: 'Please try again later.',
        },
    },
} as const;
