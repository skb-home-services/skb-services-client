'use client';

import { Suspense } from 'react';
import { LoginFormContent } from './LoginFormContent';
import { LoadingSpinner } from '@/components/common';

export const LoginForm = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <LoginFormContent />
        </Suspense>
    );
};

const LoadingScreen = () => (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <LoadingSpinner />
    </div>
);
