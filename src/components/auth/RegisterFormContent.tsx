'use client';

import { FormProvider } from 'react-hook-form';
import { UserPlus } from 'lucide-react';
import { BackgroundEffects } from './BackgroundEffects';
import { GoogleSignInButton } from './GoogleSignInButton';
import { EmailRegisterForm } from './EmailRegisterForm';
import { FeaturesSection } from './FeaturesSection';
import { FooterLinks } from './FooterLinks';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { REGISTER_CONFIG } from '@/configs/register';
import { cn } from '@/lib/utils';

export const RegisterFormContent = () => {
    const { formMethods, handleEmailSignUp, handleGoogleSignUp, isGoogleLoading, redirectTo } = useRegisterForm();

    return (
        <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden py-12 px-4">
            <BackgroundEffects />

            <div className="relative w-full max-w-md animate-fade-in-up">
                <div
                    className={cn(
                        'relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10',
                        `shadow-${REGISTER_CONFIG.ui.accentColor}-900/5`
                    )}
                >
                    <TopAccent />
                    <Header />

                    <GoogleSignInButton onClick={handleGoogleSignUp} isLoading={isGoogleLoading} />

                    <Divider text="or register with email" />

                    <FormProvider {...formMethods}>
                        <EmailRegisterForm onSubmit={handleEmailSignUp} />
                    </FormProvider>

                    <FeaturesSection />
                    <FooterLinks type="register" redirectTo={redirectTo} />
                </div>

                <BottomNote />
            </div>
        </div>
    );
};

const TopAccent = () => (
    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
);

const Header = () => (
    <div className="text-center mb-8">
        <div
            className={cn(
                'inline-flex items-center justify-center w-16 h-16 rounded-2xl text-white shadow-lg shadow-primary/25 mb-6',
                REGISTER_CONFIG.ui.cardGradient
            )}
        >
            <UserPlus className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{REGISTER_CONFIG.hero.title}</h1>
        <p className="text-gray-500">{REGISTER_CONFIG.hero.subtitle}</p>
    </div>
);

const Divider = ({ text }: { text: string }) => (
    <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/80 text-gray-400 font-medium">{text}</span>
        </div>
    </div>
);

const BottomNote = () => (
    <div className="mt-4 text-center text-sm text-gray-400">By creating an account, you agree to our Terms of Service</div>
);
