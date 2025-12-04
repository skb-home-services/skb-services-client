'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DashboardPanel } from '@/components/admin';
import { ADMIN_DASHBOARD_CONFIG } from '@/configs/admin-dashboard';

export function QuickActionsGrid() {
    const actions = ADMIN_DASHBOARD_CONFIG.quickActions;

    return (
        <DashboardPanel title="Quick Actions">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="Quick actions">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Button
                            key={action.key}
                            variant="outline"
                            asChild
                            className="justify-start h-auto py-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            role="listitem"
                        >
                            <Link href={action.href} className="flex items-center gap-3">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.iconBg}`}>
                                    <Icon className={`h-5 w-5 ${action.iconColor}`} aria-hidden="true" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium">{action.title}</p>
                                    <p className="text-xs text-muted-foreground">{action.description}</p>
                                </div>
                            </Link>
                        </Button>
                    );
                })}
            </div>
        </DashboardPanel>
    );
}
