'use client';

import { memo } from 'react';
import { SectionCard } from '../ui/SectionCard';
import { DateField } from '../ui/DateField';
import { TimeField } from '../ui/TimeField';
import { BOOKING_CONFIG } from '@/configs/booking';
import { Calendar, Clock } from 'lucide-react';

interface ScheduleSectionProps {
    focusedField: string | null;
    onFieldFocus: (field: string) => void;
    onFieldBlur: () => void;
}

export const ScheduleSection = memo(function ScheduleSection({ focusedField, onFieldFocus, onFieldBlur }: ScheduleSectionProps) {
    const config = BOOKING_CONFIG.sections.schedule;
    const fields = BOOKING_CONFIG.fields;

    return (
        <SectionCard
            title={config.title}
            description={config.description}
            icon={Calendar}
            gradient={config.gradient}
            iconBg={config.iconBg}
            iconColor={config.iconColor}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <DateField
                    name="date"
                    label={fields.date.label}
                    icon={Calendar}
                    required={fields.date.required}
                    focused={focusedField === 'date'}
                    onFocus={() => onFieldFocus('date')}
                    onBlur={onFieldBlur}
                />
                <TimeField
                    name="time"
                    label={fields.time.label}
                    icon={Clock}
                    required={fields.time.required}
                    focused={focusedField === 'time'}
                    onFocus={() => onFieldFocus('time')}
                    onBlur={onFieldBlur}
                />
            </div>
        </SectionCard>
    );
});
