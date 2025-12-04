'use client';

import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
    id: string;
    label: string;
    required?: boolean;
    error?: string;
    children: ReactNode;
    className?: string;
    description?: string;
}

export function FormField({ id, label, required = false, error, children, className, description }: FormFieldProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <Label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            {description && <p className="text-xs text-gray-500">{description}</p>}
            {children}
            {error && (
                <p className="text-sm text-red-500 flex items-center gap-1 animate-fade-in" role="alert">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" aria-hidden="true" />
                    {error}
                </p>
            )}
        </div>
    );
}
