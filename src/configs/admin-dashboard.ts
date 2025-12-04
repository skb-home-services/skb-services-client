import { Wrench, Calendar, Users, MessageSquare, LucideIcon } from 'lucide-react';

export interface AdminDashboardStats {
    totalServices: number;
    totalBookings: number;
    totalUsers: number;
    totalInquiries: number;
}

export interface StatCardConfig {
    key: keyof AdminDashboardStats;
    label: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
    getValue: (stats: AdminDashboardStats) => number;
    href?: string;
}

export interface QuickActionConfig {
    key: string;
    title: string;
    description: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    href: string;
}

export interface PanelConfig {
    title: string;
    viewAllHref: string;
    viewAllLabel: string;
    emptyState: {
        icon: LucideIcon;
        title: string;
        description: string;
    };
}

export interface AdminDashboardConfig {
    page: {
        title: string;
        description: string;
    };
    stats: StatCardConfig[];
    panels: {
        recentBookings: PanelConfig;
        pendingInquiries: PanelConfig;
    };
    quickActions: QuickActionConfig[];
    loading: {
        skeletonCount: {
            stats: number;
            bookings: number;
            inquiries: number;
        };
    };
    errors: {
        stats: string;
        bookings: string;
        inquiries: string;
        users: string;
        services: string;
    };
}

export const ADMIN_DASHBOARD_CONFIG: AdminDashboardConfig = {
    page: {
        title: 'Dashboard',
        description: 'Overview of your platform statistics and recent activity',
    },
    stats: [
        {
            key: 'totalServices',
            label: 'Total Services',
            icon: Wrench,
            iconColor: 'text-blue-600',
            iconBg: 'bg-blue-100',
            getValue: (stats) => stats.totalServices,
            href: '/admin/services',
        },
        {
            key: 'totalBookings',
            label: 'Total Bookings',
            icon: Calendar,
            iconColor: 'text-green-600',
            iconBg: 'bg-green-100',
            getValue: (stats) => stats.totalBookings,
            href: '/admin/bookings',
        },
        {
            key: 'totalUsers',
            label: 'Total Users',
            icon: Users,
            iconColor: 'text-purple-600',
            iconBg: 'bg-purple-100',
            getValue: (stats) => stats.totalUsers,
            href: '/admin/users',
        },
        {
            key: 'totalInquiries',
            label: 'Total Inquiries',
            icon: MessageSquare,
            iconColor: 'text-orange-600',
            iconBg: 'bg-orange-100',
            getValue: (stats) => stats.totalInquiries,
            href: '/admin/inquiries',
        },
    ],
    panels: {
        recentBookings: {
            title: 'Recent Bookings',
            viewAllHref: '/admin/bookings',
            viewAllLabel: 'View all',
            emptyState: {
                icon: Calendar,
                title: 'No recent bookings',
                description: 'There are no recent bookings to display.',
            },
        },
        pendingInquiries: {
            title: 'Pending Inquiries',
            viewAllHref: '/admin/inquiries',
            viewAllLabel: 'View all',
            emptyState: {
                icon: MessageSquare,
                title: 'No pending inquiries',
                description: 'All inquiries have been resolved.',
            },
        },
    },
    quickActions: [
        {
            key: 'addService',
            title: 'Add Service',
            description: 'Create new service',
            icon: Wrench,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            href: '/admin/services/new',
        },
        {
            key: 'manageBookings',
            title: 'Manage Bookings',
            description: 'View all bookings',
            icon: Calendar,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            href: '/admin/bookings',
        },
        {
            key: 'manageUsers',
            title: 'Manage Users',
            description: 'View all users',
            icon: Users,
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            href: '/admin/users',
        },
        {
            key: 'viewInquiries',
            title: 'View Inquiries',
            description: 'Respond to inquiries',
            icon: MessageSquare,
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600',
            href: '/admin/inquiries',
        },
    ],
    loading: {
        skeletonCount: {
            stats: 4,
            bookings: 3,
            inquiries: 3,
        },
    },
    errors: {
        stats: 'Failed to load dashboard statistics',
        bookings: 'Failed to load recent bookings',
        inquiries: 'Failed to load pending inquiries',
        users: 'Failed to load user statistics',
        services: 'Failed to load service statistics',
    },
} as const;
