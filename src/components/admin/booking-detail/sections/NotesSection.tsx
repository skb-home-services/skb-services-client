'use client';

import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionSkeleton } from '../ui/LoadingState';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';
import type { NotesSectionProps } from '@/types/admin-booking-detail';

export function NotesSection({ notes, isLoading }: NotesSectionProps) {
    if (isLoading) {
        return <SectionSkeleton />;
    }

    if (!notes) {
        return null;
    }

    return (
        <Card className="border-0 shadow-sm" aria-label="Customer notes">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10" aria-hidden="true">
                        <FileText className="h-4 w-4 text-primary" />
                    </div>
                    {ADMIN_BOOKING_DETAIL_CONFIG.notes.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg bg-muted/50 p-4 border-l-4 border-primary">
                    <p className="text-muted-foreground whitespace-pre-wrap">{notes}</p>
                </div>
            </CardContent>
        </Card>
    );
}
