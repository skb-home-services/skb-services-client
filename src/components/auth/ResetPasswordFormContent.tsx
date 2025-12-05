'use client';

import { FormProvider } from 'react-hook-form';
import { Sparkles } from 'lucide-react';
import { BackgroundEffects } from './BackgroundEffects';
import { FooterLinks } from './FooterLinks';
import { AUTH_CONFIG } from '@/configs/auth';
import { cn } from '@/lib/utils';
import { useResetPasswordForm } from '@/hooks';
import { ResetForm } from './EmailResetForm';

export const ResetPasswordFormContent = () => {
    const { formMethods, handleResetPassword, redirectTo } = useResetPasswordForm();

    return (
        <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden py-12 px-4">
            <BackgroundEffects />

            <div className="relative w-full max-w-md animate-fade-in-up">
                <div
                    className={cn(
                        'relative rounded-3xl shadow-2xl shadow-blue-900/5 border border-white/50 p-8 md:p-10',
                        AUTH_CONFIG.ui.cardBackground
                    )}
                >
                    <TopAccent />
                    <Header />

                    <FormProvider {...formMethods}>
                        <ResetForm onSubmit={handleResetPassword} />
                    </FormProvider>

                    <FooterLinks type="login" redirectTo={redirectTo} />
                </div>

                <BottomNote />
            </div>
        </div>
    );
};

const TopAccent = () => (
    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
);

const Header = () => (
    <div className="text-center mb-8">
        <div
            className={cn(
                'inline-flex items-center justify-center w-16 h-16 rounded-2xl text-white shadow-lg shadow-primary/25 mb-6',
                'bg-gradient-to-br',
                AUTH_CONFIG.ui.accentGradient
            )}
        >
            <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{AUTH_CONFIG.reset.title}</h1>
        <p className="text-gray-500">{AUTH_CONFIG.reset.subtitle}</p>
    </div>
);

const BottomNote = () => <div className="mt-4 text-center text-sm text-gray-400">Protected by industry-standard encryption</div>;
