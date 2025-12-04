'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface BookingStatsCardProps {
    label: string;
    value: number;
    icon: LucideIcon;
    bgColor: string;
    iconColor: string;
    onClick?: () => void;
}

export const BookingStatsCard = memo(function BookingStatsCard({
    label,
    value,
    icon: Icon,
    bgColor,
    iconColor,
    onClick,
}: BookingStatsCardProps) {
    return (
        <Card className={cn('border-0 shadow-sm', onClick && 'cursor-pointer hover:shadow-md transition-shadow')} onClick={onClick}>
            <CardContent className="p-5">
                <div className="flex items-center gap-4">
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', bgColor)}>
                        <Icon className={cn('h-6 w-6', iconColor)} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});
