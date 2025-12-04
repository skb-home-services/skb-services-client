import type { Booking } from './booking';
import type { Inquiry } from './inquiry';
import type { LucideIcon } from 'lucide-react';

export interface AdminDashboardStats {
    totalServices: number;
    totalBookings: number;
    totalUsers: number;
    totalInquiries: number;
}

export interface AdminDashboardData {
    stats: AdminDashboardStats;
    recentBookings: Booking[];
    pendingInquiries: Inquiry[];
}

export interface DashboardLoadingState {
    stats: boolean;
    bookings: boolean;
    inquiries: boolean;
    users: boolean;
    services: boolean;
}

export interface DashboardErrorState {
    stats: Error | null;
    bookings: Error | null;
    inquiries: Error | null;
    users: Error | null;
    services: Error | null;
}

export interface UseAdminDashboardReturn {
    // Data
    stats: AdminDashboardStats;
    recentBookings: Booking[];
    pendingInquiries: Inquiry[];

    // Loading states
    isLoading: boolean;
    isLoadingStats: boolean;
    isLoadingBookings: boolean;
    isLoadingInquiries: boolean;
    loadingState: DashboardLoadingState;

    // Error states
    error: Error | null;
    errorState: DashboardErrorState;
    hasError: boolean;

    // Actions
    refetch: () => void;
    refetchStats: () => void;
    refetchBookings: () => void;
    refetchInquiries: () => void;
}

export interface StatCardProps {
    label: string;
    value: number;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
    loading?: boolean;
    href?: string;
}

export interface PanelProps {
    title: string;
    viewAllHref: string;
    viewAllLabel: string;
    children: React.ReactNode;
    loading?: boolean;
    empty?: boolean;
    emptyState?: {
        icon: LucideIcon;
        title: string;
        description: string;
    };
}

export interface QuickActionProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    href: string;
}

export interface BookingItemProps {
    booking: Booking;
    href: string;
}

export interface InquiryItemProps {
    inquiry: Inquiry;
    href: string;
}

export interface LoadingSkeletonProps {
    count?: number;
    variant?: 'stat' | 'booking' | 'inquiry';
}

export interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
}
