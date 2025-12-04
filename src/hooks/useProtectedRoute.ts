'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

interface UseProtectedRouteOptions {
    requireAdmin?: boolean;
    redirectTo?: string;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
    const { requireAdmin = false, redirectTo = '/login' } = options;
    const { isAuthenticated, isLoading, roles } = useAuth();

    const router = useRouter();
    const isAdmin = roles.includes('admin');

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated) {
            router.push(redirectTo);
            return;
        }

        if (requireAdmin && !isAdmin) {
            router.push('/');
            return;
        }
    }, [isAuthenticated, isAdmin, isLoading, requireAdmin, redirectTo, router]);
    return { isLoading, isAuthenticated, isAdmin };
}
