export interface ApiResponse<T> {
    success: boolean;
    status: number;
    message: string;
    data: T;
}

export interface PaginationInfo {
    limit: number;
    offset: number;
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
    nextOffset: number | null;
    prevOffset: number | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationInfo;
}

export interface Address {
    houseNumber: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
}

export interface PhoneNumber {
    phoneE164: string;
    countryCode: number;
    region: string;
    nationalNumber: string;
    _id?: string;
}

export interface PhoneNumberInput {
    region: string;
    number: string;
}

export interface QueryParams {
    limit?: number;
    offset?: number;
    [key: string]: string | number | boolean | undefined;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
