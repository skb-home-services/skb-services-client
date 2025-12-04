'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/lib/validations';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from '@/hooks/useToast';
import { REGISTER_CONFIG } from '@/configs/register';

export const useRegisterForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { signUp, signInGoogle } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const formMethods = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onBlur',
    });

    const password = formMethods.watch('password', '');
    const redirectTo = searchParams.get('redirect') || '/user/dashboard';

    const calculatePasswordStrength = (pwd: string): number => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        return score;
    };

    const passwordStrength = calculatePasswordStrength(password);
    const strengthLevel =
        REGISTER_CONFIG.passwordStrength.levels.find((level) => passwordStrength >= level.minScore) ||
        REGISTER_CONFIG.passwordStrength.levels[0];

    const handleEmailSignUp = async (data: RegisterFormData) => {
        setIsLoading(true);
        try {
            await signUp(data.email, data.password);
            toast({
                title: REGISTER_CONFIG.messages.success.title,
                description: REGISTER_CONFIG.messages.success.description,
                variant: 'success',
            });
            router.push(redirectTo);
        } catch (error) {
            toast({
                title: REGISTER_CONFIG.messages.error.title,
                description: error instanceof Error ? error.message : REGISTER_CONFIG.messages.error.defaultDescription,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setIsGoogleLoading(true);
        try {
            await signInGoogle();
            toast({
                title: REGISTER_CONFIG.messages.google.success,
                description: REGISTER_CONFIG.messages.google.googleSuccess,
                variant: 'success',
            });
            router.push(redirectTo);
        } catch (error) {
            toast({
                title: 'Google sign up failed',
                description: error instanceof Error ? error.message : 'Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return {
        formMethods,
        handleEmailSignUp,
        handleGoogleSignUp,
        isLoading,
        isGoogleLoading,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        focusedField,
        setFocusedField,
        password,
        passwordStrength,
        strengthLevel,
        redirectTo,
    };
};
