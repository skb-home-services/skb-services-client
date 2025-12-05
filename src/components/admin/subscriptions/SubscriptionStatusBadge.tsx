import { Badge } from '@/components/ui/badge';
import { ADMIN_SUBSCRIPTIONS_CONFIG } from '@/configs/admin-subscriptions';
import type { ServiceSubscriptionStatus } from '@/types';

interface SubscriptionStatusBadgeProps {
    status: ServiceSubscriptionStatus;
    srLabel?: string;
}

export function SubscriptionStatusBadge({ status, srLabel }: SubscriptionStatusBadgeProps) {
    const styles = ADMIN_SUBSCRIPTIONS_CONFIG.status[status];

    return (
        <Badge
            variant="outline"
            className={`inline-flex items-center gap-2 rounded-full border ${styles.badge}`}
            aria-label={srLabel ?? `${styles.label} subscription`}
        >
            {styles.label}
        </Badge>
    );
}
