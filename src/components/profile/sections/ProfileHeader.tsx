'use client';

import { PROFILE_CONFIG } from '@/configs/profile';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
    className?: string;
}

export function ProfileHeader({ className }: ProfileHeaderProps) {
    const { title, description, icon: Icon } = PROFILE_CONFIG.header;

    return (
        <div className={cn('relative', className)}>
            {/* Background Gradient */}
            <div className="absolute inset-0 h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl -z-10" />

            <div className="pt-8 pb-4">
                <div className="flex items-center gap-2 mb-2 ml-5 mr-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                        <p className="text-muted-foreground text-sm">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
