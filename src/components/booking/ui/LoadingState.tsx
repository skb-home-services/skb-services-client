'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PageLoader } from '@/components/common';
import { BOOKING_CONFIG } from '@/configs/booking';

import type { Service } from '@/types';

interface LoadingStateProps {
    isLoading: boolean;
    service: Service | null | undefined;
    children: React.ReactNode;
}

export function LoadingState({ isLoading, service, children }: LoadingStateProps) {
    if (isLoading) {
        return <PageLoader />;
    }

    if (!service) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">😕</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{BOOKING_CONFIG.messages.notFound.title}</h2>
                    <p className="text-gray-500 mb-6">{BOOKING_CONFIG.messages.notFound.description}</p>
                    <Button asChild>
                        <Link href="/services">{BOOKING_CONFIG.messages.notFound.backButton}</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
