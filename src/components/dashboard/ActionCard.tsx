'use client';

import { memo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ActionCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconBg: string;
    iconBgHover: string;
    iconColor: string;
    gradient: string;
    href: string;
    buttonText: string;
    buttonHoverClass: string;
    'aria-label'?: string;
}

function ActionCardComponent({
    title,
    description,
    icon: Icon,
    iconBg,
    iconBgHover,
    iconColor,
    gradient,
    href,
    buttonText,
    buttonHoverClass,
    'aria-label': ariaLabel,
}: ActionCardProps) {
    return (
        <Card
            className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm overflow-hidden"
            aria-label={ariaLabel || title}
        >
            <div className={cn('h-1 bg-gradient-to-r', gradient)} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">{title}</CardTitle>
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl transition-colors', iconBg, iconBgHover)}>
                    <Icon className={cn('h-5 w-5', iconColor)} aria-hidden="true" />
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{description}</p>
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn('transition-colors', buttonHoverClass)}
                    aria-label={`${buttonText} - ${title}`}
                >
                    <Link href={href}>
                        {buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}

export const ActionCard = memo(ActionCardComponent);
