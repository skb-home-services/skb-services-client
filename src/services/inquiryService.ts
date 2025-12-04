import apiClient from '@/lib/apiClient';
import type { ApiResponse, Inquiry, InquiryListResponse, InquiryFilters, CreateInquiryInput, UpdateInquiryInput } from '@/types';
import { applyFilters } from '@/lib/utils';

export async function createInquiry(input: CreateInquiryInput): Promise<Inquiry> {
    const { data } = await apiClient.post<ApiResponse<Inquiry>>('/inquiry', input);
    return data.data;
}

export async function getInquiries(filters?: InquiryFilters): Promise<InquiryListResponse> {
    const url = `/admin/inquiry${applyFilters(filters)}`;
    const { data } = await apiClient.get<ApiResponse<InquiryListResponse>>(url);
    return data.data;
}

export async function getInquiryById(id: string): Promise<Inquiry> {
    const { data } = await apiClient.get<ApiResponse<Inquiry>>(`/admin/inquiry/${id}`);
    return data.data;
}

export async function updateInquiry(input: UpdateInquiryInput): Promise<void> {
    const payload: Record<string, unknown> = {};
    if (typeof input.isResolved === 'boolean') {
        payload.isResolved = input.isResolved;
    }
    if (typeof input.isSpam === 'boolean') {
        payload.isSpam = input.isSpam;
    }

    const { data } = await apiClient.patch(`/admin/inquiry/${input.id}`, payload);
    return data.data;
}

export async function deleteInquiry(id: string): Promise<void> {
    const { data } = await apiClient.delete(`/admin/inquiry/${id}`);
    return data.data;
}
