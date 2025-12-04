'use client';

import { memo } from 'react';
import { StatsCard } from './StatsCard';
import { DASHBOARD_CONFIG } from '@/configs/dashboard';
import type { DashboardStats } from '@/types/dashboard';

export interface StatsGridProps {
    stats: DashboardStats;
    isLoading?: boolean;
}

function StatsGridComponent({ stats, isLoading = false }: StatsGridProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="region" aria-label="Dashboard statistics">
            {DASHBOARD_CONFIG.statsCards.map((config) => {
                const value = config.getValue(stats);
                return (
                    <StatsCard
                        key={config.key}
                        title={config.label}
                        value={value}
                        icon={config.icon}
                        iconBg={config.iconBg}
                        iconColor={config.iconColor}
                        loading={isLoading}
                        aria-label={`${config.label}: ${value}`}
                    />
                );
            })}
        </div>
    );
}

export const StatsGrid = memo(StatsGridComponent);
