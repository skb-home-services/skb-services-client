'use client';

import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
    iconBg: string;
    iconColor: string;
    children: ReactNode;
    className?: string;
}

export function SectionCard({ title, description, icon: Icon, gradient, iconBg, iconColor, children, className }: SectionCardProps) {
    return (
        <Card className={cn('border-0 shadow-lg shadow-gray-100/50 overflow-hidden', className)}>
            <div className={cn('bg-gradient-to-r', gradient, 'px-6 py-4 border-b border-gray-100')}>
                <div className="flex items-center gap-3">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', iconBg)}>
                        <Icon className={cn('w-5 h-5', iconColor)} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                </div>
            </div>
            <CardContent className="p-6">{children}</CardContent>
        </Card>
    );
}
