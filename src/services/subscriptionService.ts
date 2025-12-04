import apiClient from '@/lib/apiClient';
import { applyFilters } from '@/lib/utils';
import type { ApiResponse, ServiceSubscription, SubscriptionFilters, SubscriptionListResponse } from '@/types';

const BASE_URL = '/admin/service-sub';

export async function getSubscriptions(filters?: SubscriptionFilters): Promise<SubscriptionListResponse> {
    const url = `${BASE_URL}${applyFilters(filters)}`;
    const { data } = await apiClient.get<ApiResponse<SubscriptionListResponse>>(url);
    return data.data;
}

export async function getSubscriptionById(id: string): Promise<ServiceSubscription> {
    const { data } = await apiClient.get<ApiResponse<ServiceSubscription>>(`${BASE_URL}/${id}`);
    return data.data;
}
