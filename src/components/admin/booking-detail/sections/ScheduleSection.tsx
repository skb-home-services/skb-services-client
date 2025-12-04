'use client';

import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SectionSkeleton } from '../ui/LoadingState';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';
import { formatDate, formatTime, cn } from '@/lib/utils';
import type { ScheduleSectionProps } from '@/types/admin-booking-detail';

export function ScheduleSection({ date, time, status, isLoading }: ScheduleSectionProps) {
    if (isLoading) {
        return <SectionSkeleton />;
    }

    const statusConfig = ADMIN_BOOKING_DETAIL_CONFIG.status.config[status];
    const StatusIcon = statusConfig.icon;

    return (
        <Card className="border-0 shadow-sm" aria-label="Scheduled appointment">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10" aria-hidden="true">
                        <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    {ADMIN_BOOKING_DETAIL_CONFIG.schedule.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0" aria-hidden="true">
                            <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">{ADMIN_BOOKING_DETAIL_CONFIG.schedule.dateLabel}</p>
                            <p className="font-semibold">{formatDate(date)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 shrink-0" aria-hidden="true">
                            <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">{ADMIN_BOOKING_DETAIL_CONFIG.schedule.timeLabel}</p>
                            <p className="font-semibold">{formatTime(time)}</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-4" aria-hidden="true" />

                <div className="flex items-center gap-3 p-4 rounded-lg border">
                    <div
                        className={cn('flex h-12 w-12 items-center justify-center rounded-lg shrink-0', statusConfig.bg)}
                        aria-hidden="true"
                    >
                        <StatusIcon className={cn('h-6 w-6', statusConfig.color)} />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">{ADMIN_BOOKING_DETAIL_CONFIG.schedule.currentStatusLabel}</p>
                        <p className={cn('font-semibold', statusConfig.color)}>{statusConfig.label}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
