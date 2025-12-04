'use client';

import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';

interface ErrorStateProps {
    error?: Error | null;
    onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
    const errorMessage = (error as { message?: string })?.message || ADMIN_BOOKINGS_CONFIG.messages.loadError.description;

    return (
        <div className="flex flex-col items-center justify-center py-16" role="alert">
            <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" aria-hidden="true" />
            <h2 className="text-xl font-semibold mb-2">{ADMIN_BOOKINGS_CONFIG.messages.loadError.title}</h2>
            <p className="text-muted-foreground mb-4">{errorMessage}</p>
            <Button onClick={onRetry} aria-label="Retry loading bookings">
                Try Again
            </Button>
        </div>
    );
}
