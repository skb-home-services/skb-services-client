import { Address, PaginationInfo, PhoneNumber, PhoneNumberInput } from './common';
import { MainImage } from './service';

export type ManualCustomerServiceChannel = 'whatsapp' | 'email';
export type ManualCustomerServiceStatus = 'active' | 'paused' | 'completed';
export type ManualCustomerServiceOutcome = 'completed' | 'no_response' | 'declined' | 'rescheduled';

export interface ManualCustomerServiceInfo {
    _id: string;
    name: string;
    category: string;
    baseCost: number;
    durationMinutes: number;
    description: string;
    isAvailable: boolean;
    pinCodesCovered: string[];
    youtubeEmbedUrl?: string;
    createdAt: string;
    updatedAt: string;
    mainImage?: MainImage;
}

export interface ManualCustomerService {
    _id: string;
    customerId: string;
    lastTakenAt: string | null;
    channels: ManualCustomerServiceChannel[];
    notes: string | null;
    status: ManualCustomerServiceStatus;
    lastOutcome: ManualCustomerServiceOutcome | null;
    lastOutcomeAt: string | null;
    /** Populated service info (returned in GET single customer) */
    serviceInfo?: ManualCustomerServiceInfo;
}

export interface ManualCustomer {
    _id: string;
    fullName: string;
    phone: PhoneNumber;
    email?: string;
    isActive: boolean;
    address: Address;
    services: ManualCustomerService[];
    createdAt: string;
    updatedAt: string;
}

export interface ManualCustomerListResponse {
    customers: ManualCustomer[];
    pagination: PaginationInfo;
}

export interface ManualCustomerFilters {
    search?: string;
    isActive?: boolean;
    limit?: number;
    offset?: number;
}

export interface CreateManualCustomerInput {
    fullName: string;
    phone: PhoneNumberInput;
    email?: string;
    isActive?: boolean;
    address: Address;
}

export interface UpdateManualCustomerInput {
    id: string;
    fullName?: string;
    phone?: PhoneNumberInput;
    email?: string;
    isActive?: boolean;
    address?: Address;
}

export interface AddManualCustomerServicesInput {
    customerId: string;
    services: {
        serviceId: string;
        lastTakenAt?: string | null;
        channels: ManualCustomerServiceChannel[];
        notes?: string | null;
        status: ManualCustomerServiceStatus;
        lastOutcome?: ManualCustomerServiceOutcome | null;
        lastOutcomeAt?: string | null;
    }[];
}

export interface RemoveManualCustomerServicesInput {
    customerId: string;
    serviceSubIds: string[];
}

export interface UpdateManualCustomerServiceInput {
    customerId: string;
    serviceId: string;
    lastTakenAt?: string | null;
    channels?: ManualCustomerServiceChannel[];
    notes?: string | null;
    status?: ManualCustomerServiceStatus;
    lastOutcome?: ManualCustomerServiceOutcome | null;
    lastOutcomeAt?: string | null;
}

export interface UpdateManualCustomerServiceOutcomeInput {
    customerId: string;
    serviceId: string;
    outcome: ManualCustomerServiceOutcome;
    notes?: string;
    updateStatus?: boolean;
}
