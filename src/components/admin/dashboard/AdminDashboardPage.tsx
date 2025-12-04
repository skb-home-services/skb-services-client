'use client';

import { DashboardHeader } from './DashboardHeader';
import { StatsGrid } from './StatsGrid';
import { RecentActivityPanels } from './RecentActivityPanels';
import { QuickActionsGrid } from './panels/QuickActionsGrid';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';

export function AdminDashboardPage() {
    const { stats, recentBookings, pendingInquiries, isLoading, isLoadingStats, isLoadingBookings, isLoadingInquiries } =
        useAdminDashboard();

    return (
        <div className="space-y-8">
            <DashboardHeader />
            <StatsGrid stats={stats} loading={isLoadingStats} />
            <RecentActivityPanels
                bookings={recentBookings}
                inquiries={pendingInquiries}
                bookingsLoading={isLoadingBookings}
                inquiriesLoading={isLoadingInquiries}
            />
            <QuickActionsGrid />
        </div>
    );
}
