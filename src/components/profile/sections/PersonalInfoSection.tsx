'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { PROFILE_CONFIG } from '@/configs/profile';
import { cn } from '@/lib/utils';
import type { ProfileFormData } from '@/lib/validations';

interface PersonalInfoSectionProps {
    email: string;
    emailVerified: boolean;
}

export function PersonalInfoSection({ email, emailVerified }: PersonalInfoSectionProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext<ProfileFormData>();

    const { displayName: displayNameConfig, email: emailConfig } = PROFILE_CONFIG.form.fields;

    return (
        <div className="grid gap-5 sm:grid-cols-2">
            {/* Display Name */}
            <div className="space-y-2">
                <Label htmlFor="displayName" className="flex items-center gap-2">
                    <displayNameConfig.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    {displayNameConfig.label}
                    {displayNameConfig.required && <span className="text-destructive">*</span>}
                </Label>
                <Input
                    id="displayName"
                    {...register('displayName')}
                    placeholder={displayNameConfig.placeholder}
                    className={cn('transition-all', errors.displayName && 'border-destructive focus-visible:ring-destructive')}
                    aria-invalid={!!errors.displayName}
                    aria-describedby={errors.displayName ? 'displayName-error' : undefined}
                />
                {errors.displayName && (
                    <p id="displayName-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {errors.displayName.message}
                    </p>
                )}
            </div>

            {/* Email Address */}
            <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                    <emailConfig.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    {emailConfig.label}
                </Label>
                <div className="relative">
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        disabled
                        className="bg-muted/50 pr-10"
                        aria-label={`${emailConfig.label} (read-only)`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true">
                        {emailVerified ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">{emailConfig.disabledMessage}</p>
            </div>
        </div>
    );
}
