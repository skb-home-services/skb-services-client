'use client';

import { Calendar, Clock } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';
import { BOOKING_DETAIL_CONFIG } from '@/configs/booking-detail';

interface ScheduleSectionProps {
    date: string;
    time: string;
}

export function ScheduleSection({ date, time }: ScheduleSectionProps) {
    const config = BOOKING_DETAIL_CONFIG.sections.schedule;

    return (
        <div
            className={`rounded-3xl bg-gradient-to-br ${config.gradient} p-6 ring-1 ${config.ringColor}`}
            aria-label={BOOKING_DETAIL_CONFIG.accessibility.sections.schedule}
        >
            <h3 className="mb-5 text-sm font-medium uppercase tracking-wider text-slate-400">{config.title}</h3>
            <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.iconBg} shadow-sm`}>
                        <Calendar className={`h-5 w-5 ${config.iconColor}`} aria-hidden="true" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400">{BOOKING_DETAIL_CONFIG.fields.date.label}</p>
                        <p className="text-lg font-medium text-slate-900">{formatDate(date)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.iconBg} shadow-sm`}>
                        <Clock className={`h-5 w-5 ${config.iconColor}`} aria-hidden="true" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400">{BOOKING_DETAIL_CONFIG.fields.time.label}</p>
                        <p className="text-lg font-medium text-slate-900">{formatTime(time)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
