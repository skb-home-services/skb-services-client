'use client';

import { Suspense } from 'react';
import { ResetPasswordFormContent } from './ResetPasswordFormContent';
import { LoadingSpinner } from '@/components/common';

export const ResetForm = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <ResetPasswordFormContent />
        </Suspense>
    );
};

const LoadingScreen = () => (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <LoadingSpinner />
    </div>
);
