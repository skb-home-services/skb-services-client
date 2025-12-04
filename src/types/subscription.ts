import type { Address, PaginationInfo, PhoneNumber } from './common';
import type { Service } from './service';

export type ServiceSubscriptionStatus = 'active' | 'pending' | 'completed' | 'declined' | 'paused' | 'not_reachable';

export type CommunicationChannel = 'whatsapp' | 'email' | 'phone' | 'sms';

export interface SubscriptionCustomer {
    _id: string;
    fullName: string;
    email?: string;
    phone?: PhoneNumber | string;
    secondaryPhone?: PhoneNumber | string;
    address?: Address;
}

export interface ServiceSubscription {
    _id: string;
    customerId: string;
    serviceId: string;
    lastTakenAt: string | null;
    channels: CommunicationChannel[];
    notes: string;
    status: ServiceSubscriptionStatus;
    lastOutcome: string | null;
    lastOutcomeAt: string | null;
    lastReminderSentAt: string | null;
    reminderAttempt: number;
    createdAt: string;
    updatedAt: string;
    service?: Service;
    customer?: SubscriptionCustomer;
}

export interface SubscriptionPagination extends Pick<PaginationInfo, 'totalCount' | 'hasMore'> {
    offset: number;
    limit: number;
    nextOffset: number | null;
    prevOffset: number | null;
}

export interface SubscriptionListResponse {
    subscriptions: ServiceSubscription[];
    pagination: SubscriptionPagination;
}

export interface SubscriptionFilters extends Record<string, string | number | undefined> {
    search?: string;
    status?: ServiceSubscriptionStatus;
    limit?: number;
    offset?: number;
}
