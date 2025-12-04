'use client';

import { Suspense } from 'react';
import { RegisterFormContent } from './RegisterFormContent';
import { LoadingSpinner } from '@/components/common';

export const RegisterForm = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <RegisterFormContent />
        </Suspense>
    );
};

const LoadingScreen = () => (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <LoadingSpinner />
    </div>
);
