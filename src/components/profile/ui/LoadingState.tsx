'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function ProfileLoadingState() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Header Skeleton */}
            <div className="relative">
                <div className="absolute inset-0 h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl -z-10" />
                <div className="pt-8 pb-4">
                    <div className="flex items-center gap-2 mb-2 ml-5">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-7 w-48" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column Skeleton */}
                <div className="lg:col-span-1">
                    <Card className="border-0 shadow-sm overflow-hidden">
                        <div className="h-20 bg-gradient-to-br from-primary/20 to-primary/5" />
                        <CardContent className="-mt-10 pb-6">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <Skeleton className="h-28 w-28 rounded-full" />
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-5 w-20" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm mt-6">
                        <CardHeader className="pb-3">
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column Skeleton */}
                <div className="lg:col-span-2">
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <Skeleton className="h-6 w-48 mb-2" />
                            <Skeleton className="h-4 w-64" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <Skeleton className="h-10 w-32 ml-auto" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
