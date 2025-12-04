'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useDashboard } from '@/hooks/useDashboard';
import { DashboardLoadingState } from './LoadingState';
import { WelcomeSection } from './WelcomeSection';
import { StatsGrid } from './StatsGrid';
import { QuickActionsGrid } from './QuickActionsGrid';
import { RecentActivity } from './RecentActivity';

export function DashboardPage() {
    const { user: authUser } = useAuth();
    const { isLoading, greeting, recentBookings, totalBookings, data } = useDashboard();

    if (isLoading) {
        return <DashboardLoadingState />;
    }

    return (
        <div className="space-y-8 animate-stagger" role="main" aria-label="User dashboard">
            <WelcomeSection greeting={greeting} user={data?.user || null} authUser={authUser} isLoading={isLoading} />
            <StatsGrid stats={data?.stats || { totalBookings: 0, pendingBookings: 0, completedBookings: 0 }} isLoading={isLoading} />
            <QuickActionsGrid />
            <RecentActivity bookings={recentBookings} totalBookings={totalBookings} isLoading={isLoading} />
        </div>
    );
}
