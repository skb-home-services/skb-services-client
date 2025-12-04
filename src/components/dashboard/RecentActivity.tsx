'use client';

import { memo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import BookingItem from '@/components/common/BookingItem';
import { DASHBOARD_CONFIG } from '@/configs/dashboard';
import type { Booking } from '@/types';

export interface RecentActivityProps {
    bookings: Booking[];
    totalBookings: number;
    isLoading?: boolean;
}

function RecentActivityComponent({ bookings, totalBookings, isLoading = false }: RecentActivityProps) {
    const { title, titleIcon: TitleIcon, viewAllText, emptyState } = DASHBOARD_CONFIG.recentActivity;
    const EmptyStateIcon = emptyState.icon;
    const hasBookings = bookings.length > 0;

    return (
        <Card className="border-0 shadow-sm overflow-hidden" role="region" aria-label="Recent bookings">
            <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" aria-hidden="true" />
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <TitleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" aria-hidden="true" />
                    {title}
                </CardTitle>
                {totalBookings > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        aria-label={`${viewAllText} bookings`}
                        className="w-fit self-start sm:self-auto"
                    >
                        <Link href="/user/bookings">
                            {viewAllText}
                            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                        </Link>
                    </Button>
                )}
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
                {isLoading ? (
                    <div className="space-y-3 sm:space-y-4" role="status" aria-label="Loading bookings">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-muted/50 animate-pulse">
                                <Skeleton className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl shrink-0" />
                                <div className="flex-1 min-w-0 space-y-2">
                                    <Skeleton className="h-4 w-24 sm:w-32" />
                                    <Skeleton className="h-3 w-full max-w-[200px] sm:max-w-none sm:w-48" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : hasBookings ? (
                    <div className="space-y-2 sm:space-y-3" role="list" aria-label="Recent bookings list">
                        {bookings.slice(0, 5).map((booking) => (
                            <div key={booking._id} role="listitem">
                                <BookingItem booking={booking} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 sm:py-12 text-center px-2" role="status" aria-label="No bookings">
                        <div className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-muted">
                            <EmptyStateIcon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <h3 className="mb-2 font-semibold text-base sm:text-lg px-2">{emptyState.title}</h3>
                        <p className="mb-6 text-sm sm:text-base text-muted-foreground max-w-sm mx-auto px-2">{emptyState.description}</p>
                        <Button asChild size="lg" aria-label={emptyState.ctaText} className="text-sm sm:text-base">
                            <Link href={emptyState.ctaHref}>
                                {emptyState.ctaText}
                                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export const RecentActivity = memo(RecentActivityComponent);
