import { PaginationInfo, PhoneNumber, PhoneNumberInput } from './common';

export interface User {
    _id: string;
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    phone?: PhoneNumber;
    phoneNumber?: string; // Legacy field
    role?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface UserListResponse {
    users: User[];
    pagination: PaginationInfo;
}

export interface UserFilters {
    uid?: string;
    email?: string;
    phoneNumber?: string;
    displayName?: string;
    limit?: number;
    offset?: number;
}

export interface UpdateUserInput {
    displayName?: string;
    phone?: PhoneNumberInput;
    profile_image?: File;
}
