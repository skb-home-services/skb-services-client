'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './AuthProvider';
import { ReactQueryProvider } from './ReactQueryProvider';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ReactQueryProvider>
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
        </ReactQueryProvider>
    );
}

export { AuthProvider, useAuth } from './AuthProvider';
export { ReactQueryProvider } from './ReactQueryProvider';
