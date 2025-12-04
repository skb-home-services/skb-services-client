import { useQuery } from '@tanstack/react-query';
import { getSubscriptions, getSubscriptionById } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import type { SubscriptionFilters, SubscriptionListResponse, ServiceSubscription } from '@/types';

export const useSubscriptions = (params?: SubscriptionFilters) => {
    return useQuery<SubscriptionListResponse>({
        queryKey: queryKeys.subscriptions.list(params ?? {}),
        queryFn: () => getSubscriptions(params),
    });
};

export const useSubscription = (id?: string) => {
    return useQuery<ServiceSubscription>({
        queryKey: queryKeys.subscriptions.detail(id ?? ''),
        queryFn: () => getSubscriptionById(id!),
        enabled: Boolean(id),
    });
};
