'use client';

import { memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const LoadingState = memo(function LoadingState() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-9 w-24" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="border-0 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-xl" />
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-16 mb-2" />
                                    <Skeleton className="h-8 w-12" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters Skeleton */}
            <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-36" />
                    </div>
                </CardContent>
            </Card>

            {/* List Skeleton */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent className="p-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 border-b last:border-b-0">
                            <Skeleton className="h-10 w-10 rounded-xl" />
                            <div className="flex-1">
                                <Skeleton className="h-5 w-32 mb-2" />
                                <Skeleton className="h-4 w-24 mb-1" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                            <Skeleton className="h-9 w-9 rounded-md" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
});
