'use client';

import { StickyNote } from 'lucide-react';
import { BOOKING_DETAIL_CONFIG } from '@/configs/booking-detail';

interface NotesSectionProps {
    notes: string;
}

export function NotesSection({ notes }: NotesSectionProps) {
    const config = BOOKING_DETAIL_CONFIG.sections.notes;

    return (
        <div
            className={`rounded-3xl bg-amber-50/50 p-6 ring-1 ${config.ringColor}`}
            aria-label={BOOKING_DETAIL_CONFIG.accessibility.sections.notes}
        >
            <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${config.iconBg}`}>
                    <StickyNote className={`h-4 w-4 ${config.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400">{config.title}</h3>
            </div>
            <p className="leading-relaxed text-slate-700">{notes}</p>
        </div>
    );
}
