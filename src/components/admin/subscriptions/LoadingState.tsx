'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
    variant?: 'list' | 'detail';
    rows?: number;
}

export function LoadingState({ variant = 'list', rows = 5 }: LoadingStateProps) {
    if (variant === 'detail') {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardContent className="space-y-3 p-6">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={index} className="h-4 w-full" />
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-3 p-6">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={index} className="h-4 w-full" />
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardContent className="space-y-3 p-6">
                        {[...Array(6)].map((_, index) => (
                            <Skeleton key={index} className="h-4 w-full" />
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="divide-y p-0">
                {[...Array(rows)].map((_, index) => (
                    <div key={index} className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
