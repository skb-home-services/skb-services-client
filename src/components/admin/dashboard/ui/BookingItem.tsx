'use client';

import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BookingItemProps } from '@/types/admin-dashboard';
import { cn } from '@/lib/utils';

export function BookingItem({ booking, href }: BookingItemProps) {
    const statusVariant =
        booking.status === 'confirmed'
            ? 'default'
            : booking.status === 'pending'
              ? 'secondary'
              : booking.status === 'completed'
                ? 'default'
                : 'outline';

    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-lg p-2 -mx-2 hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={`View booking for ${booking.customer.fullName}`}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{booking.customer.fullName}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
            </div>
            <Badge variant={statusVariant} className="capitalize shrink-0">
                {booking.status}
            </Badge>
        </Link>
    );
}
