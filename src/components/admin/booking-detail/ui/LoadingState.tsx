'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PageLoader } from '@/components/common';

export function AdminBookingDetailLoadingState() {
    return <PageLoader />;
}

export function SectionSkeleton() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-6 w-48" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </CardContent>
        </Card>
    );
}

export function ServiceCardSkeleton() {
    return (
        <Card className="overflow-hidden border-0 shadow-sm">
            <div className="flex flex-col md:flex-row">
                <Skeleton className="h-48 md:h-auto md:w-72 shrink-0" />
                <div className="flex-1 p-6 space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-6 w-64" />
                    </div>
                    <Skeleton className="h-16 w-full" />
                    <div className="flex gap-4">
                        <Skeleton className="h-16 w-32" />
                        <Skeleton className="h-16 w-32" />
                    </div>
                </div>
            </div>
        </Card>
    );
}
