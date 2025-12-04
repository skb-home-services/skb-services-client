'use client';

import { memo } from 'react';
import { SectionCard } from '../ui/SectionCard';
import { TextareaField } from '../ui/TextareaField';
import { BOOKING_CONFIG } from '@/configs/booking';
import { FileText } from 'lucide-react';

interface NotesSectionProps {
    // No props needed for this section
}

export const NotesSection = memo(function NotesSection(_props: NotesSectionProps) {
    const config = BOOKING_CONFIG.sections.notes;
    const fields = BOOKING_CONFIG.fields;

    return (
        <SectionCard
            title={config.title}
            description={config.description}
            icon={FileText}
            gradient={config.gradient}
            iconBg={config.iconBg}
            iconColor={config.iconColor}
        >
            <TextareaField
                name="notes"
                label={fields.notes.label}
                placeholder={fields.notes.placeholder}
                required={fields.notes.required}
                rows={4}
            />
        </SectionCard>
    );
});
