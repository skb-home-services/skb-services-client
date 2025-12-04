'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BOOKING_DETAIL_CONFIG } from '@/configs/booking-detail';

interface ErrorStateProps {
    onRetry?: () => void;
    showRetry?: boolean;
}

export function BookingDetailErrorState({ onRetry, showRetry = false }: ErrorStateProps) {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="rounded-3xl bg-rose-50 p-8">
                <h2 className="text-2xl font-semibold text-rose-800">{BOOKING_DETAIL_CONFIG.messages.notFound.title}</h2>
                <p className="mt-3 max-w-md text-rose-600/80">{BOOKING_DETAIL_CONFIG.messages.notFound.description}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {showRetry && onRetry && (
                        <Button onClick={onRetry} className="rounded-xl" variant="outline">
                            {BOOKING_DETAIL_CONFIG.messages.error.retryButton}
                        </Button>
                    )}
                    <Button asChild className="rounded-xl">
                        <Link href={BOOKING_DETAIL_CONFIG.page.backButtonHref}>{BOOKING_DETAIL_CONFIG.messages.notFound.backButton}</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
