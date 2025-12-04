import type { BookingDetail, BookingStatus } from '@/types';
import type { LucideIcon } from 'lucide-react';

export interface StatusConfig {
    label: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    badge: string;
}

export interface StatusBadgeProps {
    status: BookingStatus;
    className?: string;
    showIcon?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export interface StatusSelectorProps {
    value: BookingStatus;
    onChange: (status: BookingStatus) => void;
    disabled?: boolean;
    options?: BookingStatus[];
    className?: string;
}

export interface PhoneDisplayProps {
    phone: string | { phoneE164: string; countryCode?: number; region?: string; nationalNumber?: string };
    showIcon?: boolean;
    className?: string;
    label?: string;
}

export interface InfoCardProps {
    label: string;
    value: string | React.ReactNode;
    icon?: LucideIcon;
    className?: string;
    iconBg?: string;
    iconColor?: string;
}

export interface SectionHeaderProps {
    title: string;
    icon: LucideIcon;
    iconBg?: string;
    iconColor?: string;
    className?: string;
}

export interface CustomerInfoSectionProps {
    customer: BookingDetail['customer'];
    isLoading?: boolean;
}

export interface ScheduleSectionProps {
    date: string;
    time: string;
    status: BookingStatus;
    isLoading?: boolean;
}

export interface AddressSectionProps {
    address: BookingDetail['customer']['address'];
    isLoading?: boolean;
}

export interface NotesSectionProps {
    notes: string;
    isLoading?: boolean;
}

export interface StatusSectionProps {
    status: BookingStatus;
    isLoading?: boolean;
}

export interface ServiceCardProps {
    service: BookingDetail['service'];
    isLoading?: boolean;
}

export interface BookingDetailHeaderProps {
    bookingId: string;
    status: BookingStatus;
    createdAt: string;
    onStatusChange: (status: BookingStatus) => void;
    isUpdatingStatus?: boolean;
}

export interface UseAdminBookingDetailReturn {
    booking: BookingDetail | undefined;
    isLoading: boolean;
    error: Error | null;
    statusConfig: StatusConfig;
    formatPhone: (phone: string | { phoneE164: string }) => string;
    updateStatus: (status: BookingStatus) => void;
    isUpdatingStatus: boolean;
    refetch: () => void;
}

export interface AdminBookingDetailPageProps {
    bookingId: string;
}
