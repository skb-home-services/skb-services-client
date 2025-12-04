'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, AlertCircle } from 'lucide-react';
import { CountrySelect } from '../ui/CountrySelect';
import { PROFILE_CONFIG } from '@/configs/profile';
import { cn } from '@/lib/utils';
import type { ProfileFormData } from '@/lib/validations';

export function PhoneSection() {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<ProfileFormData>();

    const { phone: phoneConfig } = PROFILE_CONFIG.form.fields;
    const phoneError = errors.phone;

    return (
        <div className="space-y-2">
            <Label className="flex items-center gap-2">
                <phoneConfig.icon className="h-3.5 w-3.5 text-muted-foreground" />
                {phoneConfig.label}
            </Label>
            <div className="flex gap-3">
                <CountrySelect />
                <Input
                    type="tel"
                    inputMode="numeric"
                    {...register('phone.number')}
                    placeholder={phoneConfig.placeholder}
                    className={cn('flex-1 transition-all', phoneError && 'border-destructive focus-visible:ring-destructive')}
                    aria-invalid={!!phoneError}
                    aria-describedby={phoneError ? 'phone-error' : undefined}
                />
            </div>
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
