'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { COUNTRY_CODES } from '@/configs/config';
import { PROFILE_CONFIG } from '@/configs/profile';

interface PhoneInputProps {
    name: string;
    label: string;
    required?: boolean;
    className?: string;
}

export function PhoneInput({ name, label, required = false, className }: PhoneInputProps) {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    // Get nested error for phone fields
    const getNestedError = () => {
        const parts = name.split('.');
        let error: Record<string, unknown> | undefined = errors;
        for (const part of parts) {
            if (!error) return undefined;
            error = error[part] as Record<string, unknown> | undefined;
        }
        return error;
    };

    const phoneError = getNestedError();
    const hasError = !!phoneError;

    // todo: "remove this comment later"
    console.log('phoneError', phoneError);

    return (
        <div className={cn('space-y-2', className)}>
            <Label htmlFor={`${name}.number`}>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>

            <div className="flex gap-2">
                {/* Country Code Selector */}
                <Controller
                    name={`${name}.region`}
                    control={control}
                    render={({ field }) => {
                        const safeValue = COUNTRY_CODES.some((c) => c.code === field.value)
                            ? field.value
                            : PROFILE_CONFIG.defaultCountryCode;

                        return (
                            <Select key={safeValue} value={safeValue} onValueChange={field.onChange}>
                                <SelectTrigger className="w-[130px]">
                                    <SelectValue placeholder="Country" />
                                </SelectTrigger>

                                <SelectContent>
                                    {COUNTRY_CODES.map((country) => (
                                        <SelectItem key={country.code} value={country.code}>
                                            <span className="flex items-center gap-2">
                                                <span className="text-muted-foreground">{country.dial}</span>
                                                <span>{country.code}</span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        );
                    }}
                />

                {/* Phone Number Input */}
                <Input
                    id={`${name}.number`}
                    type="tel"
                    inputMode="numeric"
                    {...register(`${name}.number`)}
                    placeholder="Phone number"
                    className={cn('flex-1', hasError && 'border-destructive')}
                />
            </div>

            {/* Error Message */}
            {phoneError && (
                <p className="text-sm text-destructive">
                    {typeof phoneError === 'object' && 'message' in phoneError
                        ? String(phoneError.message)
                        : (phoneError as { number?: { message?: string } })?.number?.message || 'Invalid phone number'}
                </p>
            )}
        </div>
    );
}

// Standalone version for forms not using FormProvider
interface StandalonePhoneInputProps {
    regionValue: string;
    numberValue: string;
    onRegionChange: (value: string) => void;
    onNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    required?: boolean;
    error?: string;
    className?: string;
    numberInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function StandalonePhoneInput({
    regionValue,
    numberValue,
    onRegionChange,
    onNumberChange,
    label,
    required = false,
    error,
    className,
    numberInputProps,
}: StandalonePhoneInputProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <Label>
                {label} {required && '*'}
            </Label>
            <div className="flex gap-2">
                <Select onValueChange={onRegionChange} value={regionValue}>
                    <SelectTrigger className="w-[130px]" />
                    <SelectContent>
                        {COUNTRY_CODES.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                                <span className="flex items-center gap-2">
                                    <span className="text-muted-foreground">{country.dial}</span>
                                    <span>{country.code}</span>
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input
                    type="tel"
                    inputMode="numeric"
                    value={numberValue}
                    onChange={onNumberChange}
                    placeholder="Phone number"
                    className={cn('flex-1', error && 'border-destructive')}
                    {...numberInputProps}
                />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
