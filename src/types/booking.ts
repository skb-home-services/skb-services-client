import { Address, BookingStatus, PaginationInfo, PhoneNumber, PhoneNumberInput } from './common';
import { Service } from './service';

export interface BookingCustomer {
    uid?: string;
    fullName: string;
    email: string;
    phone: PhoneNumber | string;
    secondaryPhone?: PhoneNumber | string;
    address: Address;
}

export interface Booking {
    _id: string;
    customer: BookingCustomer;
    service: string;
    date: string;
    time: string;
    notes?: string;
    status: BookingStatus;
    createdAt: string;
    updatedAt: string;
}

export interface BookingDetail extends Omit<Booking, 'service'> {
    service: Service;
}

export interface BookingListResponse {
    bookings: Booking[];
    pagination: PaginationInfo;
}

export interface CreateBookingInput {
    fullName: string;
    email: string;
    phone: PhoneNumberInput;
    secondaryPhone?: PhoneNumberInput;
    address: Address;
    date: string;
    time: string;
    notes?: string;
}

export interface BookingFilters {
    fullName?: string;
    email?: string;
    phone?: string;
    secondaryPhone?: string;
    serviceId?: string;
    status?: BookingStatus;
    date?: string;
    limit?: number;
    offset?: number;
}

export interface UserBookingFilters {
    search?: string;
    status?: BookingStatus;
    date?: string;
    limit?: number;
    offset?: number;
}

export interface UpdateBookingStatusInput {
    id: string;
    status: BookingStatus;
}
