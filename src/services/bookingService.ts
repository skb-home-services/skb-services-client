import apiClient from '@/lib/apiClient';
import { applyFilters } from '@/lib/utils';
import type {
    ApiResponse,
    Booking,
    BookingDetail,
    BookingListResponse,
    BookingFilters,
    UserBookingFilters,
    CreateBookingInput,
    UpdateBookingStatusInput,
} from '@/types';

export async function createBooking(serviceId: string, payload: CreateBookingInput): Promise<Booking> {
    const { data } = await apiClient.post<ApiResponse<Booking>>(`/booking/${serviceId}`, payload);
    return data.data;
}

export async function getUserBookings(filters?: UserBookingFilters): Promise<BookingListResponse> {
    const url = `/booking${applyFilters(filters)}`;
    const { data } = await apiClient.get<ApiResponse<BookingListResponse>>(url);
    return data.data;
}

export async function getUserBookingById(id: string): Promise<BookingDetail> {
    const { data } = await apiClient.get<ApiResponse<BookingDetail>>(`/booking/${id}`);
    return data.data;
}

export async function getBookings(filters?: BookingFilters): Promise<BookingListResponse> {
    const url = `/admin/booking${applyFilters(filters)}`;
    const { data } = await apiClient.get<ApiResponse<BookingListResponse>>(url);
    return data.data;
}

export async function getBookingById(id: string): Promise<BookingDetail> {
    const { data } = await apiClient.get<ApiResponse<BookingDetail>>(`/admin/booking/${id}`);
    return data.data;
}

export async function updateBookingStatus(input: UpdateBookingStatusInput): Promise<void> {
    const { data } = await apiClient.patch(`/admin/booking/${input.id}`, { status: input.status });
    return data.data;
}

export async function deleteBooking(id: string): Promise<void> {
    const { data } = await apiClient.delete(`/admin/booking/${id}`);
    return data.data;
}
