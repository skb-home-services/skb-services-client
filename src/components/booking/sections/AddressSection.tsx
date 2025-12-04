'use client';

import { memo } from 'react';
import { SectionCard } from '../ui/SectionCard';
import { AddressField } from '../ui/AddressField';
import { BOOKING_CONFIG } from '@/configs/booking';
import { MapPin } from 'lucide-react';

interface AddressSectionProps {
    focusedField: string | null;
    onFieldFocus: (field: string) => void;
    onFieldBlur: () => void;
}

export const AddressSection = memo(function AddressSection({ focusedField, onFieldFocus, onFieldBlur }: AddressSectionProps) {
    const config = BOOKING_CONFIG.sections.address;

    return (
        <SectionCard
            title={config.title}
            description={config.description}
            icon={MapPin}
            gradient={config.gradient}
            iconBg={config.iconBg}
            iconColor={config.iconColor}
        >
            <AddressField focusedField={focusedField} onFieldFocus={onFieldFocus} onFieldBlur={onFieldBlur} />
        </SectionCard>
    );
});
