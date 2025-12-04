'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PROFILE_CONFIG } from '@/configs/profile';
import type { ProfileFormData } from '@/lib/validations';

interface CountrySelectProps {
    name?: string;
    className?: string;
}

export function CountrySelect({ name = 'phone.region', className }: CountrySelectProps) {
    const { control } = useFormContext<ProfileFormData>();

    return (
        <Controller
            name={name as any}
            control={control}
            render={({ field }) => (
                <Select value={field.value || PROFILE_CONFIG.defaultCountryCode} onValueChange={field.onChange}>
                    <SelectTrigger className={className || 'w-[140px]'}>
                        <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                        {PROFILE_CONFIG.countryCodes.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                                <span className="flex items-center gap-2">
                                    <span className="text-muted-foreground font-mono text-xs">{country.dial}</span>
                                    <span>{country.code}</span>
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        />
    );
}
