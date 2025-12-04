import {
    AlertCircle,
    CheckCircle2,
    XCircle,
    User,
    MapPin,
    Calendar,
    Phone,
    Mail,
    Clock,
    FileText,
    ArrowUpRight,
    Wrench,
    IndianRupee,
    Timer,
    ExternalLink,
    LucideIcon,
} from 'lucide-react';
import type { BookingStatus } from '@/types';

export interface StatusConfig {
    label: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    badge: string;
}

export interface AdminBookingDetailConfig {
    page: {
        title: string;
        backLabel: string;
        bookedOnLabel: string;
    };
    status: {
        options: BookingStatus[];
        updateLabel: string;
        config: Record<BookingStatus, StatusConfig>;
    };
    service: {
        availableLabel: string;
        unavailableLabel: string;
        baseCostLabel: string;
        durationLabel: string;
        publicPageLabel: string;
        editServiceLabel: string;
    };
    customer: {
        title: string;
        registeredUserLabel: string;
        guestCustomerLabel: string;
        viewProfileLabel: string;
        emailLabel: string;
        phoneLabel: string;
        secondaryPhoneLabel: string;
    };
    schedule: {
        title: string;
        dateLabel: string;
        timeLabel: string;
        currentStatusLabel: string;
    };
    address: {
        title: string;
        areaCodeLabel: string;
        landmarkPrefix: string;
    };
    notes: {
        title: string;
    };
    messages: {
        statusUpdated: {
            title: string;
            description: string;
        };
        statusUpdateFailed: {
            title: string;
            description: string;
        };
        bookingNotFound: {
            title: string;
            description: string;
            backLabel: string;
        };
    };
    formats: {
        phone: {
            displayFormat: (phone: string | { phoneE164: string }) => string;
        };
        address: {
            primaryFormat: (address: {
                houseNumber: string;
                line1: string;
                line2?: string;
                city: string;
                state: string;
                pincode: string;
                landmark?: string;
            }) => string;
            secondaryFormat: (address: { line2?: string; city: string; state: string; pincode: string }) => string;
        };
    };
}

export const ADMIN_BOOKING_DETAIL_CONFIG: AdminBookingDetailConfig = {
    page: {
        title: 'Booking Details',
        backLabel: 'Back to Bookings',
        bookedOnLabel: 'Booked on',
    },
    status: {
        options: ['pending', 'confirmed', 'completed', 'cancelled'],
        updateLabel: 'Update Status:',
        config: {
            pending: {
                label: 'Pending',
                icon: AlertCircle,
                color: 'text-yellow-600',
                bg: 'bg-yellow-100',
                badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            },
            confirmed: {
                label: 'Confirmed',
                icon: CheckCircle2,
                color: 'text-blue-600',
                bg: 'bg-blue-100',
                badge: 'bg-blue-100 text-blue-800 border-blue-200',
            },
            completed: {
                label: 'Completed',
                icon: CheckCircle2,
                color: 'text-green-600',
                bg: 'bg-green-100',
                badge: 'bg-green-100 text-green-800 border-green-200',
            },
            cancelled: {
                label: 'Cancelled',
                icon: XCircle,
                color: 'text-red-600',
                bg: 'bg-red-100',
                badge: 'bg-red-100 text-red-800 border-red-200',
            },
        },
    },
    service: {
        availableLabel: 'Available',
        unavailableLabel: 'Unavailable',
        baseCostLabel: 'Base Cost',
        durationLabel: 'Duration',
        publicPageLabel: 'Public Page',
        editServiceLabel: 'Edit Service',
    },
    customer: {
        title: 'Customer Information',
        registeredUserLabel: 'Registered User',
        guestCustomerLabel: 'Guest Customer',
        viewProfileLabel: 'View Profile',
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        secondaryPhoneLabel: 'Secondary Phone',
    },
    schedule: {
        title: 'Scheduled Appointment',
        dateLabel: 'Date',
        timeLabel: 'Time',
        currentStatusLabel: 'Current Status',
    },
    address: {
        title: 'Service Location',
        areaCodeLabel: 'Area Code',
        landmarkPrefix: 'Near',
    },
    notes: {
        title: 'Customer Notes',
    },
    messages: {
        statusUpdated: {
            title: 'Status Updated',
            description: 'Booking status has been updated.',
        },
        statusUpdateFailed: {
            title: 'Update Failed',
            description: 'Could not update status.',
        },
        bookingNotFound: {
            title: 'Booking Not Found',
            description: "The booking you're looking for doesn't exist or has been removed.",
            backLabel: 'Back to Bookings',
        },
    },
    formats: {
        phone: {
            displayFormat: (phone) => {
                if (typeof phone === 'object' && phone.phoneE164) {
                    return phone.phoneE164;
                }
                return String(phone);
            },
        },
        address: {
            primaryFormat: (address) => {
                return `${address.houseNumber}, ${address.line1}`;
            },
            secondaryFormat: (address) => {
                return `${address.city}, ${address.state} - ${address.pincode}`;
            },
        },
    },
} as const;
