'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardLoadingState() {
    return (
        <div className="space-y-8 animate-stagger">
            {/* Welcome Section Skeleton */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/10">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-96" />
                    </div>
                    <Skeleton className="h-12 w-40" />
                </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="border-0 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-14 w-14 rounded-2xl" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-9 w-20" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions Skeleton */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-0 shadow-sm">
                        <div className="h-1 bg-muted" />
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-10 w-10 rounded-xl" />
                            </div>
                            <Skeleton className="h-4 w-full mb-4" />
                            <Skeleton className="h-4 w-3/4 mb-4" />
                            <Skeleton className="h-9 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Skeleton */}
            <Card className="border-0 shadow-sm">
                <div className="h-1 bg-muted" />
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                                <Skeleton className="h-14 w-14 rounded-xl" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-48" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
