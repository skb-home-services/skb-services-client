'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    loading?: boolean;
    iconColor?: string;
    iconBg?: string;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    loading = false,
    iconColor = 'text-primary',
    iconBg = 'bg-primary/10',
}: StatCardProps) {
    return (
        <Card className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        {loading ? <Skeleton className="h-8 w-20" /> : <p className="text-3xl font-bold tracking-tight">{value}</p>}
                    </div>
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', iconBg)}>
                        <Icon className={cn('h-6 w-6', iconColor)} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
