'use client';

import { SubscriptionDetailPage } from '@/components/admin/subscriptions';

interface PageProps {
    params: {
        id: string;
    };
}

export default function Page({ params }: PageProps) {
    return <SubscriptionDetailPage subscriptionId={params.id} />;
}
