import type { Booking, User } from './index';
import type { DashboardStats } from '@/configs/dashboard';

export interface DashboardData {
    user: User | null;
    bookings: Booking[];
    stats: DashboardStats;
}

export interface DashboardState {
    isLoading: boolean;
    isLoadingUser: boolean;
    isLoadingBookings: boolean;
    error: Error | null;
    data: DashboardData | null;
}

export interface UseDashboardReturn extends DashboardState {
    greeting: string;
    recentBookings: Booking[];
    totalBookings: number;
    pendingBookings: number;
    completedBookings: number;
    memberSince: string | undefined;
}

export { type DashboardStats } from '@/configs/dashboard';
