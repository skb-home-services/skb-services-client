'use client';

import { memo } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getInitials } from '@/lib/utils';
import { DASHBOARD_CONFIG } from '@/configs/dashboard';
import type { User } from '@/types';
import type { AuthUser } from '@/types/auth';

export interface WelcomeSectionProps {
    greeting: string;
    user: User | null;
    authUser: AuthUser | null;
    isLoading?: boolean;
}

function WelcomeSectionComponent({ greeting, user, authUser, isLoading }: WelcomeSectionProps) {
    const displayName = user?.displayName || authUser?.displayName || authUser?.email || 'User';
    const firstName = displayName.split(' ')[0];
    const photoURL = user?.photoURL || authUser?.photoURL;
    const initials = getInitials(displayName);

    return (
        <div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/10"
            role="banner"
            aria-label="Welcome section"
        >
            <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                <Avatar className="h-20 w-20 border-4 border-background shadow-xl" aria-label="User avatar">
                    {!isLoading && photoURL && <AvatarImage src={photoURL} alt={displayName} />}
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary" aria-label={`${firstName} initials`}>
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                        <span className="text-sm text-muted-foreground" aria-label="Greeting">
                            {greeting}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight" aria-label={`Welcome back, ${firstName}`}>
                        Welcome back, {firstName}!
                    </h1>
                    <p className="mt-2 text-muted-foreground max-w-lg" aria-label="Dashboard description">
                        {DASHBOARD_CONFIG.welcome.description}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button asChild size="lg" className="shadow-lg shadow-primary/25" aria-label={DASHBOARD_CONFIG.welcome.ctaText}>
                        <Link href={DASHBOARD_CONFIG.welcome.ctaHref}>
                            {DASHBOARD_CONFIG.welcome.ctaText}
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export const WelcomeSection = memo(WelcomeSectionComponent);
