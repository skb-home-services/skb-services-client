import apiClient from '@/lib/apiClient';
import type { ApiResponse, Service, ServiceListResponse, ServiceFilters, CreateServiceInput, UpdateServiceInput } from '@/types';
import { applyFilters } from '@/lib/utils';

export async function getServices(filters?: ServiceFilters): Promise<ServiceListResponse> {
    const url = `/service${applyFilters(filters)}`;
    const { data } = await apiClient.get<ApiResponse<ServiceListResponse>>(url);
    return data.data;
}

export async function getServiceById(id: string): Promise<Service> {
    const { data } = await apiClient.get<ApiResponse<Service>>(`/service/${id}`);
    return data.data;
}

export async function createService(input: CreateServiceInput): Promise<Service> {
    const formData = new FormData();

    formData.append('name', input.name);
    formData.append('baseCost', String(input.baseCost));
    formData.append('durationMinutes', String(input.durationMinutes));

    if (input.category) formData.append('category', input.category);
    if (input.description) formData.append('description', input.description);
    if (input.isAvailable !== undefined) formData.append('isAvailable', String(input.isAvailable));
    if (input.youtubeEmbedUrl) formData.append('youtubeEmbedUrl', input.youtubeEmbedUrl);

    // Gallery images
    if (input.gallery && input.gallery.length > 0) {
        input.gallery.forEach((file) => {
            formData.append('gallery', file);
        });
    }

    // Main flags for each gallery image
    if (input.mainFlags && input.mainFlags.length > 0) {
        input.mainFlags.forEach((flag) => {
            formData.append('mainFlags[]', String(flag));
        });
    }

    const { data } = await apiClient.post<ApiResponse<Service>>('/admin/service', formData);

    return data.data;
}

export async function updateService(input: UpdateServiceInput): Promise<void> {
    const formData = new FormData();

    if (input.name) formData.append('name', input.name);
    if (input.baseCost !== undefined) formData.append('baseCost', String(input.baseCost));
    if (input.durationMinutes !== undefined) formData.append('durationMinutes', String(input.durationMinutes));
    if (input.category) formData.append('category', input.category);
    if (input.description) formData.append('description', input.description);
    if (input.isAvailable !== undefined) formData.append('isAvailable', String(input.isAvailable));
    if (input.youtubeEmbedUrl !== undefined) formData.append('youtubeEmbedUrl', input.youtubeEmbedUrl);

    // New gallery images
    if (input.gallery && input.gallery.length > 0) {
        input.gallery.forEach((file) => {
            formData.append('gallery', file);
        });
    }

    // Main flags for new gallery images
    if (input.mainFlags && input.mainFlags.length > 0) {
        input.mainFlags.forEach((flag) => {
            formData.append('mainFlags[]', String(flag));
        });
    }

    // IDs of existing gallery images to delete
    if (input.image_ids && input.image_ids.length > 0) {
        input.image_ids.forEach((id) => {
            formData.append('image_ids[]', id);
        });
    }

    if (input.main_image_id) {
        formData.append('main_image_id', input.main_image_id);
    }

    const { data } = await apiClient.put(`/admin/service/${input.id}`, formData);

    return data.data;
}

export async function deleteService(id: string): Promise<void> {
    const { data } = await apiClient.delete(`/admin/service/${id}`);
    return data.data;
}
