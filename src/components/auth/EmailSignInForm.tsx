'use client';

import { useFormContext } from 'react-hook-form';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from './FormField';
import { useLoginForm } from '@/hooks/useLoginForm';
import { AUTH_CONFIG } from '@/configs/auth';

interface EmailSignInFormProps {
    onSubmit: (data: any) => Promise<void>;
}

export const EmailSignInForm = ({ onSubmit }: EmailSignInFormProps) => {
    const { handleSubmit } = useFormContext();
    const { isLoading, showPassword, setShowPassword } = useLoginForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <EmailField />
            <PasswordField showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)} />
            <SubmitButton isLoading={isLoading} />
        </form>
    );
};

const EmailField = () => {
    const { focusedField, setFocusedField } = useLoginForm();
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <FormField
            label="Email Address"
            name="email"
            type="email"
            icon="Mail"
            focused={focusedField === 'email'}
            error={errors.email}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
        >
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

interface PasswordFieldProps {
    showPassword: boolean;
    onTogglePassword: () => void;
}

const PasswordField = ({ showPassword, onTogglePassword }: PasswordFieldProps) => {
    const { focusedField, setFocusedField } = useLoginForm();
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <FormField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            icon="Lock"
            focused={focusedField === 'password'}
            error={errors.password}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
        >
            {(props) => (
                <div className="relative">
                    <Input
                        {...props}
                        {...register('password')}
                        placeholder={AUTH_CONFIG.validation.password.placeholder}
                        className="pl-12 pr-12 h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                    />
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
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
                <span>Signing in...</span>
            </div>
        ) : (
            <div className="flex items-center gap-2">
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        )}
    </Button>
);
