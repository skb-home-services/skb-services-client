'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormField } from './FormField';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
    name: string;
    label: string;
    required?: boolean;
    icon?: LucideIcon;
    focused?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    className?: string;
}

export const TimeField = forwardRef<HTMLInputElement, TimeFieldProps>(
    ({ name, label, required = false, icon: Icon, focused = false, onFocus, onBlur, className, ...props }, ref) => {
        const {
            register,
            formState: { errors },
        } = useFormContext();

        const fieldError = errors[name]?.message as string | undefined;

        return (
            <FormField id={name} label={label} required={required} error={fieldError}>
                <div className={cn('relative transition-all duration-200', focused && 'scale-[1.02]')}>
                    {Icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
                            <Icon className="w-4 h-4" />
                        </div>
                    )}
                    <Input
                        id={name}
                        type="time"
                        {...register(name)}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        className={cn(
                            Icon ? 'pl-10' : '',
                            'h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 transition-all',
                            className
                        )}
                        aria-invalid={fieldError ? 'true' : 'false'}
                        aria-describedby={fieldError ? `${name}-error` : undefined}
                        ref={ref}
                        {...props}
                    />
                </div>
                {fieldError && (
                    <span id={`${name}-error`} className="sr-only">
                        {fieldError}
                    </span>
                )}
            </FormField>
        );
    }
);

TimeField.displayName = 'TimeField';
