'use client';

import { Button } from '@/components/ui/button';
import { ADMIN_SUBSCRIPTIONS_CONFIG } from '@/configs/admin-subscriptions';
import { ArrowRight } from 'lucide-react';

interface SubscriptionActionsProps {
    onView: () => void;
}

export function SubscriptionActions({ onView }: SubscriptionActionsProps) {
    return (
        <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary"
            onClick={(event) => {
                event.stopPropagation();
                onView();
            }}
            aria-label="View subscription details"
        >
            {ADMIN_SUBSCRIPTIONS_CONFIG.table.actionLabel}
            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
        </Button>
    );
}
