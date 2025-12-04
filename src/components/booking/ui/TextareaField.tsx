'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';

interface TextareaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    rows?: number;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
    ({ name, label, placeholder, required = false, className, rows = 4, ...props }, ref) => {
        const {
            register,
            formState: { errors },
        } = useFormContext();

        const fieldError = errors[name]?.message as string | undefined;

        return (
            <FormField id={name} label={label || ''} required={required} error={fieldError}>
                <Textarea
                    id={name}
                    {...register(name)}
                    placeholder={placeholder}
                    rows={rows}
                    className={cn(
                        'rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 transition-all resize-none',
                        className
                    )}
                    aria-invalid={fieldError ? 'true' : 'false'}
                    aria-describedby={fieldError ? `${name}-error` : undefined}
                    ref={ref}
                    {...props}
                />
                {fieldError && (
                    <span id={`${name}-error`} className="sr-only">
                        {fieldError}
                    </span>
                )}
            </FormField>
        );
    }
);

TextareaField.displayName = 'TextareaField';
