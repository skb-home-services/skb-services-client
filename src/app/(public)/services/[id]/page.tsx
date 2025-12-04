'use client';

import { PageLoader } from '@/components/common';
import { ErrorState, ServiceDetailContent } from '@/components/services/detail';
import { useServiceDetail } from '@/hooks/useServiceDetail';

export default function ServiceDetailPage() {
    const { isLoading, error, service } = useServiceDetail();

    if (isLoading) {
        return <PageLoader />;
    }

    if (error || !service) {
        return <ErrorState />;
    }

    return <ServiceDetailContent />;
}
