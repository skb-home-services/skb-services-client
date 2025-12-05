'use client';

import { useFormContext } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { PROFILE_CONFIG } from '@/configs/profile';
import type { ProfileFormData } from '@/lib/validations';
import { PhoneInput } from '@/components/common';

export function PhoneSection() {
    const {
        formState: { errors },
    } = useFormContext<ProfileFormData>();

    const { phone: phoneConfig } = PROFILE_CONFIG.form.fields;
    const phoneError = errors.phone;

    return (
        <div className="space-y-2">
            <PhoneInput name="phone" label={phoneConfig.label} required={true} />
            {phoneError && (
                <p id="phone-error" className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {typeof phoneError === 'object' && 'message' in phoneError
                        ? phoneError.message
                        : phoneError?.number?.message || phoneError?.region?.message}
                </p>
            )}
            <p className="text-xs text-muted-foreground">{phoneConfig.helperText}</p>
        </div>
    );
}
