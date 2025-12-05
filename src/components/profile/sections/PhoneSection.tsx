'use client';

import { PROFILE_CONFIG } from '@/configs/profile';
import { PhoneInput } from '@/components/common';

export function PhoneSection() {
    const { phone: phoneConfig } = PROFILE_CONFIG.form.fields;

    return (
        <div className="space-y-2">
            <PhoneInput name="phone" label={phoneConfig.label} required={true} />

            <p className="text-xs text-muted-foreground">{phoneConfig.helperText}</p>
        </div>
    );
}
