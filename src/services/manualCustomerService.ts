import apiClient from '@/lib/apiClient';
import { applyFilters } from '@/lib/utils';
import type {
    ApiResponse,
    ManualCustomer,
    ManualCustomerListResponse,
    ManualCustomerFilters,
    CreateManualCustomerInput,
    UpdateManualCustomerInput,
    AddManualCustomerServicesInput,
    RemoveManualCustomerServicesInput,
    UpdateManualCustomerServiceInput,
    UpdateManualCustomerServiceOutcomeInput,
} from '@/types';

const BASE_URL = '/admin/manual-customer';

/**
 * Get list of manual customers with optional filters
 */
export async function getManualCustomers(filters?: ManualCustomerFilters): Promise<ManualCustomerListResponse> {
    const url = `${BASE_URL}${applyFilters(filters)}`;
    const { data } = await apiClient.get<ApiResponse<ManualCustomerListResponse>>(url);
    return data.data;
}

/**
 * Get a single manual customer by ID
 */
export async function getManualCustomerById(id: string): Promise<ManualCustomer> {
    const { data } = await apiClient.get<ApiResponse<ManualCustomer>>(`${BASE_URL}/${id}`);
    return data.data;
}

/**
 * Create a new manual customer
 */
export async function createManualCustomer(input: CreateManualCustomerInput): Promise<ManualCustomer> {
    const { data } = await apiClient.post<ApiResponse<ManualCustomer>>(BASE_URL, input);
    return data.data;
}

/**
 * Update an existing manual customer
 */
export async function updateManualCustomer(input: UpdateManualCustomerInput): Promise<ManualCustomer> {
    const { id, ...payload } = input;
    const { data } = await apiClient.patch<ApiResponse<ManualCustomer>>(`${BASE_URL}/${id}`, payload);
    return data.data;
}

/**
 * Delete a manual customer
 */
export async function deleteManualCustomer(id: string): Promise<void> {
    await apiClient.delete(`${BASE_URL}/${id}`);
}

/**
 * Add services to a manual customer
 */
export async function addManualCustomerServices(input: AddManualCustomerServicesInput): Promise<ManualCustomer> {
    const { customerId, services } = input;
    const { data } = await apiClient.post<ApiResponse<ManualCustomer>>(`${BASE_URL}/${customerId}/services`, { services });
    return data.data;
}

/**
 * Remove services from a manual customer
 */
export async function removeManualCustomerServices(input: RemoveManualCustomerServicesInput): Promise<ManualCustomer> {
    const { customerId, serviceSubIds } = input;
    const { data } = await apiClient.delete<ApiResponse<ManualCustomer>>(`${BASE_URL}/${customerId}/services`, { data: { serviceSubIds } });
    return data.data;
}

/**
 * Update a specific service for a manual customer
 */
export async function updateManualCustomerService(input: UpdateManualCustomerServiceInput): Promise<ManualCustomer> {
    const { customerId, serviceId, ...payload } = input;
    const { data } = await apiClient.patch<ApiResponse<ManualCustomer>>(`${BASE_URL}/${customerId}/services/${serviceId}`, payload);
    return data.data;
}

/**
 * Update the outcome of a service for a manual customer
 */
export async function updateManualCustomerServiceOutcome(input: UpdateManualCustomerServiceOutcomeInput): Promise<ManualCustomer> {
    const { customerId, serviceId, ...payload } = input;
    const { data } = await apiClient.post<ApiResponse<ManualCustomer>>(`${BASE_URL}/${customerId}/services/${serviceId}/outcome`, payload);
    return data.data;
}
