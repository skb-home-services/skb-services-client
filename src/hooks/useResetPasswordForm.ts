'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/validations';
import { toast } from '@/hooks/useToast';
import { useAuth } from '@/providers/AuthProvider';
import { RESET_PASSWORD_CONFIG } from '@/configs/resetPassword';

export const useResetPasswordForm = () => {
    const router = useRouter();
    const { resetPassword } = useAuth();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const redirectTo = searchParams.get('redirect') || '/login';

    const formMethods = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onBlur',
    });

    const handleResetPassword = async (data: ResetPasswordFormData) => {
        setIsLoading(true);
        try {
            await resetPassword(data.email);

            toast({
                title: RESET_PASSWORD_CONFIG.messages.success.title,
                description: RESET_PASSWORD_CONFIG.messages.success.description,
                variant: 'success',
            });

            router.push(redirectTo);
        } catch (error: any) {
            toast({
                title: RESET_PASSWORD_CONFIG.messages.error.title,
                description: error instanceof Error ? error.message : RESET_PASSWORD_CONFIG.messages.error.defaultDescription,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formMethods,
        handleResetPassword,
        isLoading,
        redirectTo,
    };
};
