'use client';

import { memo } from 'react';
import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BOOKINGS_CONFIG } from '@/configs/bookings';
import BookingItem from '@/components/common/BookingItem';
import type { Booking } from '@/types';

interface BookingsListProps {
    bookings: Booking[];
    totalCount: number;
    hasActiveFilters: boolean;
}

export const BookingsList = memo(function BookingsList({ bookings, totalCount, hasActiveFilters }: BookingsListProps) {
    const emptyState = hasActiveFilters ? BOOKINGS_CONFIG.list.emptyState.noMatches : BOOKINGS_CONFIG.list.emptyState.noBookings;
    const noBookingsState = BOOKINGS_CONFIG.list.emptyState.noBookings;

    return (
        <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    {BOOKINGS_CONFIG.list.title} ({totalCount})
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {bookings.length > 0 ? (
                    <div className="divide-y">
                        {bookings.map((booking) => (
                            <BookingItem key={booking._id} booking={booking} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
                            <CalendarDays className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{emptyState.title}</h3>
                        <p className="text-muted-foreground text-sm max-w-sm mb-6">{emptyState.description}</p>
                        {!hasActiveFilters && (
                            <Button asChild size="lg">
                                <Link href={noBookingsState.actionHref}>
                                    {noBookingsState.actionLabel}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
});
