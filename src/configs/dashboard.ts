import {
    CalendarDays,
    AlertCircle,
    CheckCircle2,
    TrendingUp,
    Wrench,
    Calendar,
    MessageSquare,
    Clock,
    Sparkles,
    ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { BookingStatus } from '@/types';

export interface GreetingConfig {
    morning: string;
    afternoon: string;
    evening: string;
}

export interface StatsCardConfig {
    key: string;
    label: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    getValue: (stats: DashboardStats) => string | number;
}

export interface QuickActionConfig {
    key: string;
    title: string;
    description: string;
    icon: LucideIcon;
    iconBg: string;
    iconBgHover: string;
    iconColor: string;
    gradient: string;
    href: string;
    buttonText: string;
    buttonHoverClass: string;
}

export interface StatusBadgeConfig {
    label: string;
    badge: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

export interface DashboardConfig {
    greetings: GreetingConfig;
    statsCards: StatsCardConfig[];
    quickActions: QuickActionConfig[];
    statusBadges: Record<BookingStatus, StatusBadgeConfig>;
    welcome: {
        description: string;
        ctaText: string;
        ctaHref: string;
    };
    recentActivity: {
        title: string;
        titleIcon: LucideIcon;
        viewAllText: string;
        emptyState: {
            icon: LucideIcon;
            title: string;
            description: string;
            ctaText: string;
            ctaHref: string;
        };
    };
}

export interface DashboardStats {
    totalBookings: number;
    pendingBookings: number;
    completedBookings: number;
    memberSince?: string;
}

export const DASHBOARD_CONFIG: DashboardConfig = {
    greetings: {
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening',
    },
    statsCards: [
        {
            key: 'total',
            label: 'Total Bookings',
            icon: CalendarDays,
            iconBg: 'bg-primary/10',
            iconColor: 'text-primary',
            getValue: (stats) => stats.totalBookings,
        },
        {
            key: 'pending',
            label: 'Pending',
            icon: AlertCircle,
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            getValue: (stats) => stats.pendingBookings,
        },
        {
            key: 'completed',
            label: 'Completed',
            icon: CheckCircle2,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            getValue: (stats) => stats.completedBookings,
        },
        {
            key: 'memberSince',
            label: 'Member Since',
            icon: TrendingUp,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            getValue: (stats) => (stats.memberSince ? new Date(stats.memberSince).getFullYear() : 'N/A'),
        },
    ],
    quickActions: [
        {
            key: 'browseServices',
            title: 'Browse Services',
            description: 'Explore our range of professional home services and book instantly.',
            icon: Wrench,
            iconBg: 'bg-primary/10',
            iconBgHover: 'group-hover:bg-primary/20',
            iconColor: 'text-primary',
            gradient: 'from-primary to-primary/50',
            href: '/services',
            buttonText: 'View Services',
            buttonHoverClass: 'group-hover:bg-primary group-hover:text-white',
        },
        {
            key: 'myBookings',
            title: 'My Bookings',
            description: 'View and manage all your service bookings in one place.',
            icon: Calendar,
            iconBg: 'bg-blue-100',
            iconBgHover: 'group-hover:bg-blue-200',
            iconColor: 'text-blue-600',
            gradient: 'from-blue-500 to-blue-400',
            href: '/user/bookings',
            buttonText: 'View Bookings',
            buttonHoverClass: 'group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
        },
        {
            key: 'needHelp',
            title: 'Need Help?',
            description: 'Have questions? Get in touch with our support team.',
            icon: MessageSquare,
            iconBg: 'bg-green-100',
            iconBgHover: 'group-hover:bg-green-200',
            iconColor: 'text-green-600',
            gradient: 'from-green-500 to-green-400',
            href: '/inquiry',
            buttonText: 'Contact Us',
            buttonHoverClass: 'group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600',
        },
    ],
    statusBadges: {
        pending: {
            label: 'Pending',
            badge: 'bg-yellow-100 text-yellow-800',
            icon: AlertCircle,
            color: 'text-yellow-600',
            bg: 'bg-yellow-100',
        },
        confirmed: {
            label: 'Confirmed',
            badge: 'bg-blue-100 text-blue-800',
            icon: CheckCircle2,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
        },
        completed: {
            label: 'Completed',
            badge: 'bg-green-100 text-green-800',
            icon: CheckCircle2,
            color: 'text-green-600',
            bg: 'bg-green-100',
        },
        cancelled: {
            label: 'Cancelled',
            badge: 'bg-red-100 text-red-800',
            icon: AlertCircle,
            color: 'text-red-600',
            bg: 'bg-red-100',
        },
    },
    welcome: {
        description: 'Manage your bookings, explore services, and keep track of your home service needs all in one place.',
        ctaText: 'Browse Services',
        ctaHref: '/services',
    },
    recentActivity: {
        title: 'Recent Bookings',
        titleIcon: Clock,
        viewAllText: 'View All',
        emptyState: {
            icon: CalendarDays,
            title: 'No bookings yet',
            description: "You haven't made any bookings yet. Browse our services to get started with your first booking.",
            ctaText: 'Book your first service',
            ctaHref: '/services',
        },
    },
} as const;

/**
 * Get greeting message based on current time
 */
export function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return DASHBOARD_CONFIG.greetings.morning;
    if (hour < 18) return DASHBOARD_CONFIG.greetings.afternoon;
    return DASHBOARD_CONFIG.greetings.evening;
}
