import type { BookingDetail } from './booking';
import { BookingStatus } from './common';

export interface BookingDetailConfig {
    status: Record<
        BookingStatus,
        {
            label: string;
            variant: 'default' | 'secondary' | 'success' | 'destructive';
            color: string;
            bgColor: string;
            borderColor: string;
        }
    >;
}

export interface PhoneDisplayProps {
    phone: string | { phoneE164: string; countryCode: number; region: string; nationalNumber: string };
    showIcon?: boolean;
    className?: string;
}

export interface StatusBadgeProps {
    status: BookingStatus;
    className?: string;
    showIcon?: boolean;
}

export interface InfoCardProps {
    label: string;
    value: string | React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
}

export interface SectionHeaderProps {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    iconBg?: string;
    iconColor?: string;
    className?: string;
}

export interface UseBookingDetailReturn {
    booking: BookingDetail | undefined;
    isLoading: boolean;
    error: Error | null;
    statusConfig: BookingDetailConfig['status'][BookingStatus];
    formatPhone: (phone: string | { phoneE164: string }) => string;
    refetch: () => void;
}
