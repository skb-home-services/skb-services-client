'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';
import type { BookingsStatsProps } from '@/types/admin-bookings';
import { Skeleton } from '@/components/ui/skeleton';

export function StatsPanel({ stats, loading }: BookingsStatsProps) {
    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="border-0 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-8 w-12" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-4" role="region" aria-label="Booking statistics">
            {ADMIN_BOOKINGS_CONFIG.stats.map((statConfig) => {
                const Icon = statConfig.icon;
                const value = statConfig.getValue(stats);

                return (
                    <Card key={statConfig.key} className="border-0 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${statConfig.iconBg}`}>
                                    <Icon className={`h-6 w-6 ${statConfig.iconColor}`} aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{statConfig.label}</p>
                                    <p className="text-2xl font-bold" aria-live="polite">
                                        {value}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
