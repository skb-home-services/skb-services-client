'use client';

import Link from 'next/link';
import { StatCard } from '@/components/admin';
import { LoadingSkeleton } from './ui/LoadingSkeleton';
import { ADMIN_DASHBOARD_CONFIG } from '@/configs/admin-dashboard';
import type { AdminDashboardStats } from '@/types/admin-dashboard';

interface StatsGridProps {
    stats: AdminDashboardStats;
    loading?: boolean;
}

export function StatsGrid({ stats, loading }: StatsGridProps) {
    if (loading) {
        return <LoadingSkeleton count={ADMIN_DASHBOARD_CONFIG.loading.skeletonCount.stats} variant="stat" />;
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="region" aria-label="Dashboard statistics">
            {ADMIN_DASHBOARD_CONFIG.stats.map((statConfig) => {
                const value = statConfig.getValue(stats);
                const Icon = statConfig.icon;

                const content = (
                    <StatCard
                        title={statConfig.label}
                        value={value}
                        icon={Icon}
                        iconColor={statConfig.iconColor}
                        iconBg={statConfig.iconBg}
                        loading={false}
                    />
                );

                if (statConfig.href) {
                    return (
                        <Link
                            key={statConfig.key}
                            href={statConfig.href}
                            className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                            aria-label={`${statConfig.label}: ${value}. Click to view details.`}
                        >
                            {content}
                        </Link>
                    );
                }

                return <div key={statConfig.key}>{content}</div>;
            })}
        </div>
    );
}
