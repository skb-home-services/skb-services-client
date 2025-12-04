'use client';

import { memo } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BOOKINGS_CONFIG } from '@/configs/bookings';
import { cn } from '@/lib/utils';

interface BookingsHeaderProps {
    isFetching?: boolean;
    onRefresh?: () => void;
}

export const BookingsHeader = memo(function BookingsHeader({ isFetching, onRefresh }: BookingsHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{BOOKINGS_CONFIG.header.title}</h1>
                <p className="text-muted-foreground mt-1">{BOOKINGS_CONFIG.header.description}</p>
            </div>
            {onRefresh && (
                <Button variant="outline" size="sm" onClick={onRefresh} disabled={isFetching} className="w-fit">
                    <RefreshCw className={cn('h-4 w-4 mr-2', isFetching && 'animate-spin')} />
                    {BOOKINGS_CONFIG.header.refreshButton}
                </Button>
            )}
        </div>
    );
});
