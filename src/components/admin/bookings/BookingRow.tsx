'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, User, ExternalLink, Trash2 } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';
import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';
import { formatDate, cn } from '@/lib/utils';
import type { BookingRowProps } from '@/types/admin-bookings';

export function BookingRow({ booking, onRowClick, onDelete }: BookingRowProps) {
    return (
        <div
            onClick={() => onRowClick(booking._id)}
            className="flex items-center gap-4 p-5 hover:bg-muted/50 cursor-pointer transition-colors group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            role="row"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onRowClick(booking._id);
                }
            }}
            aria-label={`Booking for ${booking.customer.fullName}, ${booking.status} status`}
        >
            {/* Avatar/Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{booking.customer.fullName}</h3>
                    <StatusBadge status={booking.status} />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {formatDate(booking.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {booking.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {booking.customer.address.city}, {booking.customer.address.state}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:bg-primary/10 hover:text-primary"
                    title={ADMIN_BOOKINGS_CONFIG.actions.view.tooltip}
                    aria-label={ADMIN_BOOKINGS_CONFIG.actions.view.tooltip}
                >
                    <Link href={`/admin/bookings/${booking._id}`} target="_blank">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(booking._id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                    title={ADMIN_BOOKINGS_CONFIG.actions.delete.tooltip}
                    aria-label={ADMIN_BOOKINGS_CONFIG.actions.delete.tooltip}
                >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
            </div>
        </div>
    );
}
