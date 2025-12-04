'use client';

import Link from 'next/link';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';

interface ErrorStateProps {
    onRetry?: () => void;
    showRetry?: boolean;
}

export function AdminBookingDetailErrorState({ onRetry, showRetry = false }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16" role="alert" aria-live="polite">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4" aria-hidden="true">
                <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{ADMIN_BOOKING_DETAIL_CONFIG.messages.bookingNotFound.title}</h2>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
                {ADMIN_BOOKING_DETAIL_CONFIG.messages.bookingNotFound.description}
            </p>
            <div className="flex gap-3">
                {showRetry && onRetry && (
                    <Button onClick={onRetry} variant="outline">
                        Try Again
                    </Button>
                )}
                <Button asChild>
                    <Link href="/admin/bookings">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {ADMIN_BOOKING_DETAIL_CONFIG.messages.bookingNotFound.backLabel}
                    </Link>
                </Button>
            </div>
        </div>
    );
}
