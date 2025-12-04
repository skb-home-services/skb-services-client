'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';
import { EmptyState } from '../ui/EmptyState';
import type { BookingsTableProps } from '@/types/admin-bookings';

interface TablePanelProps extends BookingsTableProps {
    totalCount: number;
    hasFilters: boolean;
}

export function TablePanel({ bookings, totalCount, hasFilters, onRowClick, onDelete }: TablePanelProps) {
    return (
        <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-lg">
                    {ADMIN_BOOKINGS_CONFIG.table.title} ({totalCount})
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {bookings.length > 0 ? (
                    <div className="divide-y" role="table" aria-label="Bookings list">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                role="row"
                                onClick={() => onRowClick(booking._id)}
                                className="flex items-center gap-4 p-5 hover:bg-muted/50 cursor-pointer transition-colors group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onRowClick(booking._id);
                                    }
                                }}
                                aria-label={`Booking for ${booking.customer.fullName}`}
                            >
                                {/* This will be replaced by BookingRow component */}
                                {booking._id}
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState hasFilters={hasFilters} />
                )}
            </CardContent>
        </Card>
    );
}
