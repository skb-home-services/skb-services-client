'use client';

import { memo } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    loading?: boolean;
    iconColor?: string;
    iconBg?: string;
    onClick?: () => void;
    'aria-label'?: string;
}

function StatsCardComponent({
    title,
    value,
    icon: Icon,
    loading = false,
    iconColor = 'text-primary',
    iconBg = 'bg-primary/10',
    onClick,
    'aria-label': ariaLabel,
}: StatsCardProps) {
    return (
        <Card
            className={cn(
                'border-0 shadow-sm hover:shadow-md transition-shadow',
                onClick && 'cursor-pointer hover:scale-[1.02] transition-transform'
            )}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label={ariaLabel}
            onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
        >
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <div className={cn('flex h-14 w-14 items-center justify-center rounded-2xl', iconBg)}>
                        <Icon className={cn('h-7 w-7', iconColor)} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground" aria-label={`${title} label`}>
                            {title}
                        </p>
                        {loading ? (
                            <Skeleton className="h-9 w-20 mt-1" />
                        ) : (
                            <p className="text-3xl font-bold" aria-label={`${title} value: ${value}`}>
                                {value}
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export const StatsCard = memo(StatsCardComponent);
