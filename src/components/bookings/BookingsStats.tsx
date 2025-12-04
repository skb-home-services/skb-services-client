'use client';

import { memo } from 'react';
import { BOOKINGS_CONFIG } from '@/configs/bookings';
import { BookingStatsCard } from './BookingStatsCard';
import type { BookingStats } from '@/types/bookings';
import type { BookingStatus } from '@/types';

interface BookingsStatsProps {
    stats: BookingStats;
    onStatClick?: (status: BookingStatus | 'all') => void;
}

export const BookingsStats = memo(function BookingsStats({ stats, onStatClick }: BookingsStatsProps) {
    return (
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <BookingStatsCard
                label={BOOKINGS_CONFIG.stats.total.label}
                value={stats.total}
                icon={BOOKINGS_CONFIG.stats.total.icon}
                bgColor={BOOKINGS_CONFIG.stats.total.bgColor}
                iconColor={BOOKINGS_CONFIG.stats.total.iconColor}
                onClick={onStatClick ? () => onStatClick('all') : undefined}
            />
            <BookingStatsCard
                label={BOOKINGS_CONFIG.stats.pending.label}
                value={stats.pending}
                icon={BOOKINGS_CONFIG.stats.pending.icon}
                bgColor={BOOKINGS_CONFIG.stats.pending.bgColor}
                iconColor={BOOKINGS_CONFIG.stats.pending.iconColor}
                onClick={onStatClick ? () => onStatClick('pending') : undefined}
            />
            <BookingStatsCard
                label={BOOKINGS_CONFIG.stats.confirmed.label}
                value={stats.confirmed}
                icon={BOOKINGS_CONFIG.stats.confirmed.icon}
                bgColor={BOOKINGS_CONFIG.stats.confirmed.bgColor}
                iconColor={BOOKINGS_CONFIG.stats.confirmed.iconColor}
                onClick={onStatClick ? () => onStatClick('confirmed') : undefined}
            />
            <BookingStatsCard
                label={BOOKINGS_CONFIG.stats.completed.label}
                value={stats.completed}
                icon={BOOKINGS_CONFIG.stats.completed.icon}
                bgColor={BOOKINGS_CONFIG.stats.completed.bgColor}
                iconColor={BOOKINGS_CONFIG.stats.completed.iconColor}
                onClick={onStatClick ? () => onStatClick('completed') : undefined}
            />
        </div>
    );
});
