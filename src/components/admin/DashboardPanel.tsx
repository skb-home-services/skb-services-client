'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardPanelProps {
    title: string;
    children: ReactNode;
    className?: string;
    headerAction?: ReactNode;
}

export function DashboardPanel({ title, children, className, headerAction }: DashboardPanelProps) {
    return (
        <Card className={cn('border-0 bg-card shadow-sm', className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                {headerAction}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
