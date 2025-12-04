'use client';

import { memo } from 'react';
import { ActionCard } from './ActionCard';
import { DASHBOARD_CONFIG } from '@/configs/dashboard';

export function QuickActionsGrid() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="region" aria-label="Quick actions">
            {DASHBOARD_CONFIG.quickActions.map((action) => (
                <ActionCard
                    key={action.key}
                    title={action.title}
                    description={action.description}
                    icon={action.icon}
                    iconBg={action.iconBg}
                    iconBgHover={action.iconBgHover}
                    iconColor={action.iconColor}
                    gradient={action.gradient}
                    href={action.href}
                    buttonText={action.buttonText}
                    buttonHoverClass={action.buttonHoverClass}
                    aria-label={`${action.title} action card`}
                />
            ))}
        </div>
    );
}

export const MemoizedQuickActionsGrid = memo(QuickActionsGrid);
