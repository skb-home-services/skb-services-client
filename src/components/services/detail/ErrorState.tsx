'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SERVICES_CONFIG } from '@/configs/services';

export function ErrorState() {
    const { error } = SERVICES_CONFIG.detail;

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center animate-fade-in">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl" role="img" aria-label="Search icon">
                        🔍
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{error.title}</h2>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">{error.message}</p>
                <Button asChild size="lg" className="rounded-xl" aria-label={error.backButton}>
                    <Link href="/services">
                        <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                        {error.backButton}
                    </Link>
                </Button>
            </div>
        </div>
    );
}
