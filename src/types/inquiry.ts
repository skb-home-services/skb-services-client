import { PhoneNumberInput } from '@/lib/validations';
import { PhoneNumber } from './common';

export interface Inquiry {
    _id: string;
    fullName: string;
    email: string;
    phone: PhoneNumber | string;
    message: string;
    isResolved: boolean;
    isSpam?: boolean;
    source?: string;
    createdAt: string;
    updatedAt: string;
}

export interface InquiryListResponse {
    inquiries: Inquiry[];
    pagination: {
        limit: number;
        offset: number;
        totalCount: number;
        currentPage: number;
        totalPages: number;
        hasMore: boolean;
        nextOffset: number | null;
        prevOffset: number | null;
    };
}

export interface CreateInquiryInput {
    fullName: string;
    email: string;
    phone: PhoneNumberInput;
    message: string;
}

export interface InquiryFilters {
    fullName?: string;
    email?: string;
    isResolved?: boolean;
    limit?: number;
    offset?: number;
}

export interface UpdateInquiryInput {
    id: string;
    isResolved?: boolean;
    isSpam?: boolean;
}
