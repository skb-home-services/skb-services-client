'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from '@/hooks/useToast';
import { AUTH_CONFIG } from '@/configs/auth';

export const useLoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { signIn, signInGoogle } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const formMethods = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    const redirectTo = searchParams.get('redirect') || AUTH_CONFIG.login.redirectPath;

    const handleEmailSignIn = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            await signIn(data.email, data.password);
            toast({
                title: AUTH_CONFIG.messages.success.title,
                description: AUTH_CONFIG.messages.success.description,
                variant: 'success',
            });
            router.push(redirectTo);
        } catch (error) {
            toast({
                title: AUTH_CONFIG.messages.error.title,
                description: error instanceof Error ? error.message : AUTH_CONFIG.messages.error.defaultDescription,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            await signInGoogle();
            toast({
                title: 'Welcome!',
                description: 'You have successfully signed in with Google.',
                variant: 'success',
            });
            router.push(redirectTo);
        } catch (error) {
            toast({
                title: 'Google sign in failed',
                description: error instanceof Error ? error.message : 'Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return {
        formMethods,
        handleEmailSignIn,
        handleGoogleSignIn,
        isLoading,
        isGoogleLoading,
        showPassword,
        setShowPassword,
        focusedField,
        setFocusedField,
        redirectTo,
    };
};
