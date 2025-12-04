'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';
import { BookingRow } from './BookingRow';
import { EmptyState } from './ui/EmptyState';
import type { BookingsTableProps } from '@/types/admin-bookings';

interface BookingsTableComponentProps extends BookingsTableProps {
    totalCount: number;
    hasFilters: boolean;
}

export function BookingsTable({ bookings, totalCount, hasFilters, onRowClick, onDelete, loading }: BookingsTableComponentProps) {
    return (
        <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-lg">
                    {ADMIN_BOOKINGS_CONFIG.table.title} ({totalCount})
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {loading ? (
                    <div className="divide-y">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-5 animate-pulse">
                                <div className="h-12 w-12 rounded-full bg-muted shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 w-48 bg-muted rounded" />
                                    <div className="h-4 w-64 bg-muted rounded" />
                                </div>
                                <div className="h-8 w-24 bg-muted rounded shrink-0" />
                                <div className="flex gap-2 shrink-0">
                                    <div className="h-9 w-9 bg-muted rounded" />
                                    <div className="h-9 w-9 bg-muted rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : bookings.length > 0 ? (
                    <div className="divide-y" role="table" aria-label="Bookings list">
                        {bookings.map((booking) => (
                            <BookingRow key={booking._id} booking={booking} onRowClick={onRowClick} onDelete={onDelete} />
                        ))}
                    </div>
                ) : (
                    <EmptyState hasFilters={hasFilters} />
                )}
            </CardContent>
        </Card>
    );
}
