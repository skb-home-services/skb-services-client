'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';
import { cn } from '@/lib/utils';

interface BookingsHeaderProps {
    isFetching?: boolean;
    onRefresh: () => void;
}

export function BookingsHeader({ isFetching, onRefresh }: BookingsHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{ADMIN_BOOKINGS_CONFIG.page.title}</h1>
                <p className="text-muted-foreground mt-1">{ADMIN_BOOKINGS_CONFIG.page.description}</p>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={isFetching}
                className="w-fit"
                aria-label={ADMIN_BOOKINGS_CONFIG.actions.refresh.label}
            >
                <RefreshCw className={cn('h-4 w-4 mr-2', isFetching && 'animate-spin')} aria-hidden="true" />
                {ADMIN_BOOKINGS_CONFIG.actions.refresh.label}
            </Button>
        </div>
    );
}
