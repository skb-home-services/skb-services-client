'use client';

import { Skeleton } from '@/components/ui/skeleton';
import type { LoadingSkeletonProps } from '@/types/admin-dashboard';

export function LoadingSkeleton({ count = 3, variant = 'booking' }: LoadingSkeletonProps) {
    if (variant === 'stat') {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(count)].map((_, i) => (
                    <div key={i} className="border-0 bg-card shadow-sm rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1 flex-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                            <Skeleton className="h-12 w-12 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === 'booking' || variant === 'inquiry') {
        return (
            <div className="space-y-3">
                {[...Array(count)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 animate-pulse">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4 rounded" />
                            <Skeleton className="h-3 w-1/2 rounded" />
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                ))}
            </div>
        );
    }

    return null;
}
