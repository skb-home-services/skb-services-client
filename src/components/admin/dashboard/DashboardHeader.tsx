'use client';

import { ADMIN_DASHBOARD_CONFIG } from '@/configs/admin-dashboard';

export function DashboardHeader() {
    const { title, description } = ADMIN_DASHBOARD_CONFIG.page;

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
    );
}
