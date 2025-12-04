'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Clock, MapPin, CalendarDays, CheckCircle2, XCircle, AlertCircle, User, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, cn } from '@/lib/utils';
import type { Booking, BookingStatus } from '@/types';

const statusConfig: Record<BookingStatus, { label: string; badge: string; icon: typeof CheckCircle2; color: string; bg: string }> = {
    pending: {
        label: 'Pending',
        badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: AlertCircle,
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
    },
    confirmed: {
        label: 'Confirmed',
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: CheckCircle2,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
    },
    completed: {
        label: 'Completed',
        badge: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle2,
        color: 'text-green-600',
        bg: 'bg-green-100',
    },
    cancelled: {
        label: 'Cancelled',
        badge: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-100',
    },
};

export default function BookingItem({ booking }: { booking: Booking }) {
    const router = useRouter();
    const status = statusConfig[booking.status];
    const StatusIcon = status.icon;

    const handleRowClick = (id: string) => {
        router.push(`/user/bookings/${id}`);
    };

    return (
        <>
            <div
                key={booking._id}
                onClick={() => handleRowClick(booking._id)}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-5 hover:bg-muted/50 cursor-pointer transition-colors group rounded-lg"
            >
                {/* Content */}
                <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-1.5 flex-wrap">
                        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                            <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>

                        <div className="flex flex-col min-w-0 flex-1">
                            <h3 className="font-semibold truncate group-hover:text-primary transition-colors text-sm sm:text-base">
                                {booking.customer.fullName}
                            </h3>

                            <p className="text-[0.65rem] sm:text-[0.7rem] text-muted-foreground truncate">ID: {booking._id}</p>
                        </div>

                        <Badge className={cn('shrink-0 gap-1 text-[0.65rem] sm:text-xs whitespace-nowrap', status.badge)}>
                            <StatusIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                            <span>{status.label}</span>
                        </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-x-4 sm:gap-y-1 text-xs sm:text-sm text-muted-foreground pl-0 sm:pl-0">
                        <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                            <span className="truncate">{formatDate(booking.date)}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                            <span>{booking.time}</span>
                        </span>
                        <span className="flex items-center gap-1.5 min-w-0">
                            <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                            <span className="truncate">
                                {booking.customer.address.city}, {booking.customer.address.state}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto" onClick={(e) => e.stopPropagation()}>
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="hover:bg-primary/10 hover:text-primary h-8 w-8 sm:h-10 sm:w-10"
                        title="View details"
                    >
                        <Link href={`/services/${booking.service}`} target="_blank">
                            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
