'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './ui/StatusBadge';
import { BOOKING_DETAIL_CONFIG } from '@/configs/booking-detail';
import type { BookingStatus } from '@/types';

interface BookingDetailHeaderProps {
    status: BookingStatus;
}

export function BookingDetailHeader({ status }: BookingDetailHeaderProps) {
    return (
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <Button
                variant="ghost"
                asChild
                className="w-fit rounded-xl text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground"
                aria-label={BOOKING_DETAIL_CONFIG.accessibility.buttons.back}
            >
                <Link href={BOOKING_DETAIL_CONFIG.page.backButtonHref}>
                    <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                    {BOOKING_DETAIL_CONFIG.page.backButton}
                </Link>
            </Button>

            <StatusBadge status={status} />
        </div>
    );
}
