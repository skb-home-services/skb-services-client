'use client';

import { useFormContext } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { REGISTER_CONFIG } from '@/configs/register';
import { cn } from '@/lib/utils';

export const EmailRegisterForm = ({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) => {
    const { handleSubmit } = useFormContext();
    const {
        isLoading,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        focusedField,
        setFocusedField,
        password,
        passwordStrength,
        strengthLevel,
    } = useRegisterForm();

    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <FormField
                label="Email Address"
                name="email"
                icon={<Mail className="w-5 h-5" />}
                focused={focusedField === 'email'}
                error={errors.email}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
            >
                <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder={REGISTER_CONFIG.validation.email.placeholder}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="pl-12 h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                />
            </FormField>

            {/* Password Field */}
            <div className="space-y-2">
                <FormField
                    label="Password"
                    name="password"
                    icon={<Lock className="w-5 h-5" />}
                    focused={focusedField === 'password'}
                    error={errors.password}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                >
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            placeholder={REGISTER_CONFIG.validation.password.placeholder}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                            className="pl-12 pr-12 h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </FormField>

                {/* Password Strength Indicator */}
                {password && <PasswordStrengthIndicator strength={passwordStrength} level={strengthLevel} />}
            </div>

            {/* Confirm Password Field */}
            <FormField
                label="Confirm Password"
                name="confirmPassword"
                icon={<Shield className="w-5 h-5" />}
                focused={focusedField === 'confirmPassword'}
                error={errors.confirmPassword}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField(null)}
            >
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword')}
                        placeholder={REGISTER_CONFIG.validation.confirmPassword.placeholder}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField(null)}
                        className="pl-12 pr-12 h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </FormField>

            {/* Submit Button */}
            <SubmitButton isLoading={isLoading} />
        </form>
    );
};

interface FormFieldProps {
    label: string;
    name: string;
    icon: React.ReactNode;
    focused?: boolean;
    error?: any;
    onFocus?: () => void;
    onBlur?: () => void;
    children: React.ReactNode;
}

const FormField = ({ label, name, icon, focused, error, children }: FormFieldProps) => (
    <div className="space-y-2">
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}
        </Label>
        <div className={cn('relative transition-all duration-200', focused && 'scale-[1.02]')}>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>
            {children}
        </div>
        {error && (
            <p className="text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                {error.message}
            </p>
        )}
    </div>
);

interface PasswordStrengthIndicatorProps {
    strength: number;
    level: (typeof REGISTER_CONFIG.passwordStrength.levels)[number];
}

const PasswordStrengthIndicator = ({ strength, level }: PasswordStrengthIndicatorProps) => (
    <div className="space-y-2 animate-fade-in">
        <div className="flex gap-1">
            {[1, 2, 3, 4].map((levelIndex) => (
                <div
                    key={levelIndex}
                    className={cn(
                        'h-1 flex-1 rounded-full transition-colors duration-300',
                        strength >= levelIndex ? level.color : 'bg-gray-200'
                    )}
                />
            ))}
        </div>
        <p className="text-xs text-gray-500">{level.label} password</p>
    </div>
);

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => (
    <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
    >
        {isLoading ? (
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating account...</span>
            </div>
        ) : (
            <div className="flex items-center gap-2">
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        )}
    </Button>
);
