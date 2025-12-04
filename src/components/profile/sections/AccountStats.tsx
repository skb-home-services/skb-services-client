'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Calendar } from 'lucide-react';
import { PROFILE_CONFIG } from '@/configs/profile';
import { cn } from '@/lib/utils';
import type { AccountStatsProps } from '@/types/profile';

export function AccountStats({ emailVerified, memberSince, displayName, email }: AccountStatsProps) {
    const { title, titleIcon: TitleIcon, emailVerified: emailConfig, memberSince: memberConfig } = PROFILE_CONFIG.accountStatus;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <Card className="border-0 shadow-sm mt-6">
            <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                    <TitleIcon className="h-4 w-4 text-primary" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Email Verification Status */}
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                        <div
                            className={cn(
                                'flex h-9 w-9 items-center justify-center rounded-lg',
                                emailVerified ? 'bg-green-100' : 'bg-amber-100'
                            )}
                        >
                            <Mail className={cn('h-4 w-4', emailVerified ? 'text-green-600' : 'text-amber-600')} />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{emailConfig.label}</p>
                            <p className="text-xs text-muted-foreground">
                                {emailVerified ? emailConfig.verifiedText : emailConfig.unverifiedText}
                            </p>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Member Since */}
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                            <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{memberConfig.label}</p>
                            <p className="text-sm text-muted-foreground">{memberSince ? formatDate(memberSince) : 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
