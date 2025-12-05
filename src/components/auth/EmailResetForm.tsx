'use client';

import { useFormContext } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from './FormField';
import { useResetPasswordForm } from '@/hooks/useResetPasswordForm';
import { AUTH_CONFIG } from '@/configs/auth';

interface ResetInFormProps {
    onSubmit: (data: any) => Promise<void>;
}

export const ResetForm = ({ onSubmit }: ResetInFormProps) => {
    const { handleSubmit } = useFormContext();
    const { isLoading } = useResetPasswordForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <EmailField />
            <SubmitButton isLoading={isLoading} />
        </form>
    );
};

const EmailField = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <FormField label="Email Address" name="email" type="email" icon="Mail" focused={true} error={errors.email}>
            {(props) => (
                <Input
                    {...props}
                    {...register('email')}
                    placeholder={AUTH_CONFIG.validation.email.placeholder}
                    className="pl-12 h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                />
            )}
        </FormField>
    );
};

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => (
    <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
    >
        {isLoading ? (
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Resetting...</span>
            </div>
        ) : (
            <div className="flex items-center gap-2">
                <span>Reset</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        )}
    </Button>
);
