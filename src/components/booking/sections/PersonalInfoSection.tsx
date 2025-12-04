'use client';

import { memo } from 'react';
import { SectionCard } from '../ui/SectionCard';
import { InputField } from '../ui/InputField';
import { PhoneInput } from '@/components/common';
import { BOOKING_CONFIG } from '@/configs/booking';
import { User, Mail } from 'lucide-react';

interface PersonalInfoSectionProps {
    focusedField: string | null;
    onFieldFocus: (field: string) => void;
    onFieldBlur: () => void;
}

export const PersonalInfoSection = memo(function PersonalInfoSection({
    focusedField,
    onFieldFocus,
    onFieldBlur,
}: PersonalInfoSectionProps) {
    const config = BOOKING_CONFIG.sections.personalInfo;
    const fields = BOOKING_CONFIG.fields;

    return (
        <SectionCard
            title={config.title}
            description={config.description}
            icon={User}
            gradient={config.gradient}
            iconBg={config.iconBg}
            iconColor={config.iconColor}
        >
            <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                        name="fullName"
                        label={fields.fullName.label}
                        placeholder={fields.fullName.placeholder}
                        icon={User}
                        required={fields.fullName.required}
                        focused={focusedField === 'fullName'}
                        onFocus={() => onFieldFocus('fullName')}
                        onBlur={onFieldBlur}
                    />
                    <InputField
                        name="email"
                        label={fields.email.label}
                        placeholder={fields.email.placeholder}
                        type="email"
                        icon={Mail}
                        required={fields.email.required}
                        focused={focusedField === 'email'}
                        onFocus={() => onFieldFocus('email')}
                        onBlur={onFieldBlur}
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <PhoneInput name="phone" label={fields.phone.label} required={fields.phone.required} />
                    <PhoneInput name="secondaryPhone" label={fields.secondaryPhone.label} required={fields.secondaryPhone.required} />
                </div>
            </div>
        </SectionCard>
    );
});
