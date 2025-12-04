import apiClient from '@/lib/apiClient';
import type { ApiResponse, User, UserListResponse, UserFilters, UpdateUserInput } from '@/types';
import { applyFilters } from '@/lib/utils';

export async function getCurrentUser(): Promise<User> {
    const { data } = await apiClient.get<ApiResponse<User>>('/profile');
    return data.data;
}

export async function updateCurrentUser(input: UpdateUserInput): Promise<User> {
    const formData = new FormData();

    if (input.displayName) {
        formData.append('displayName', input.displayName);
    }

    if (input.phone) {
        formData.append('phone[region]', input.phone.region);
        formData.append('phone[number]', input.phone.number);
    }

    if (input.profile_image) {
        formData.append('profile_image', input.profile_image);
    }

    const { data } = await apiClient.patch<ApiResponse<User>>('/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data.data;
}

export async function getUsers(filters?: UserFilters): Promise<UserListResponse> {
    const url = `/admin/user${applyFilters(filters)}`;
    const { data } = await apiClient.get<ApiResponse<UserListResponse>>(url);
    return data.data;
}

export async function getUserByUid(uid: string): Promise<User> {
    const { data } = await apiClient.get<ApiResponse<User>>(`/admin/user/${uid}`);
    return data.data;
}
