'use client';

import { memo } from 'react';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BOOKINGS_CONFIG } from '@/configs/bookings';

interface ErrorStateProps {
    onRetry?: () => void;
}

export const ErrorState = memo(function ErrorState({ onRetry }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">{BOOKINGS_CONFIG.error.title}</h2>
            <p className="text-muted-foreground mb-4">{BOOKINGS_CONFIG.error.message}</p>
            {onRetry && <Button onClick={onRetry}>{BOOKINGS_CONFIG.error.retryButton}</Button>}
        </div>
    );
});
