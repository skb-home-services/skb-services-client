import { CalendarDays, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import type { BookingStatus } from '@/types';

export const BOOKINGS_CONFIG = {
    itemsPerPage: 10,
    searchDebounceMs: 300,

    page: {
        title: 'My Bookings',
        description: 'View and manage your service bookings',
    },

    header: {
        title: 'My Bookings',
        description: 'View and manage your service bookings',
        refreshButton: 'Refresh',
    },

    stats: {
        total: {
            label: 'Total',
            icon: CalendarDays,
            bgColor: 'bg-primary/10',
            iconColor: 'text-primary',
        },
        pending: {
            label: 'Pending',
            icon: AlertCircle,
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
        },
        confirmed: {
            label: 'Confirmed',
            icon: CheckCircle2,
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        completed: {
            label: 'Completed',
            icon: CheckCircle2,
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600',
        },
    },

    filters: {
        search: {
            placeholder: 'Search by service, city, or date...',
            label: 'Search bookings',
            ariaLabel: 'Search bookings by service, city, or date',
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
            ] as Array<{ value: BookingStatus | 'all'; label: string }>,
        },
    },

    list: {
        title: 'Your Bookings',
        titleIcon: 'Calendar',
        emptyState: {
            noBookings: {
                title: 'No bookings yet',
                description: "You haven't made any bookings yet. Browse our services to get started.",
                actionLabel: 'Browse Services',
                actionHref: '/services',
            },
            noMatches: {
                title: 'No matching bookings',
                description: "Try adjusting your search or filter to find what you're looking for",
            },
        },
    },

    error: {
        title: 'Error loading bookings',
        message: 'Please try again later.',
        retryButton: 'Try Again',
    },

    statusBadges: {
        pending: {
            label: 'Pending',
            className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            icon: AlertCircle,
            iconColor: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
        confirmed: {
            label: 'Confirmed',
            className: 'bg-blue-100 text-blue-800 border-blue-200',
            icon: CheckCircle2,
            iconColor: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        completed: {
            label: 'Completed',
            className: 'bg-green-100 text-green-800 border-green-200',
            icon: CheckCircle2,
            iconColor: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        cancelled: {
            label: 'Cancelled',
            className: 'bg-red-100 text-red-800 border-red-200',
            icon: XCircle,
            iconColor: 'text-red-600',
            bgColor: 'bg-red-100',
        },
    } as Record<
        BookingStatus,
        {
            label: string;
            className: string;
            icon: typeof CheckCircle2;
            iconColor: string;
            bgColor: string;
        }
    >,
} as const;
