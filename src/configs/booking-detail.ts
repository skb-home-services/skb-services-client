export const BOOKING_DETAIL_CONFIG = {
    page: {
        title: 'Booking Details',
        backButton: 'Back to My Bookings',
        backButtonHref: '/user/bookings',
    },
    status: {
        pending: {
            label: 'Pending',
            variant: 'default' as const,
            color: 'text-slate-600',
            bgColor: 'bg-slate-100',
            borderColor: 'border-slate-200',
        },
        confirmed: {
            label: 'Confirmed',
            variant: 'secondary' as const,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            borderColor: 'border-blue-200',
        },
        completed: {
            label: 'Completed',
            variant: 'success' as const,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
            borderColor: 'border-emerald-200',
        },
        cancelled: {
            label: 'Cancelled',
            variant: 'destructive' as const,
            color: 'text-rose-600',
            bgColor: 'bg-rose-100',
            borderColor: 'border-rose-200',
        },
    },
    sections: {
        schedule: {
            title: 'Schedule',
            icon: 'Calendar',
            gradient: 'from-blue-50 to-indigo-50/50',
            ringColor: 'ring-blue-100/50',
            iconBg: 'bg-white',
            iconColor: 'text-blue-600',
        },
        customer: {
            title: 'Customer Details',
            icon: 'User',
            iconBg: 'bg-slate-100',
            iconColor: 'text-slate-600',
        },
        address: {
            title: 'Service Address',
            icon: 'MapPin',
            iconBg: 'bg-slate-100',
            iconColor: 'text-slate-600',
        },
        notes: {
            title: 'Notes',
            icon: 'StickyNote',
            gradient: 'from-amber-50/50',
            ringColor: 'ring-amber-100/50',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
        },
        reference: {
            title: 'Reference',
            icon: 'Hash',
            iconBg: 'bg-slate-200/70',
            iconColor: 'text-slate-500',
        },
    },
    fields: {
        date: {
            label: 'Date',
            icon: 'Calendar',
        },
        time: {
            label: 'Time',
            icon: 'Clock',
        },
        fullName: {
            label: 'Full Name',
        },
        email: {
            label: 'Email',
            icon: 'Mail',
        },
        primaryPhone: {
            label: 'Primary Phone',
            icon: 'Phone',
        },
        secondaryPhone: {
            label: 'Secondary Phone',
            icon: 'Phone',
        },
        houseNumber: {
            label: 'House Number',
        },
        addressLine1: {
            label: 'Address Line 1',
        },
        addressLine2: {
            label: 'Address Line 2',
        },
        city: {
            label: 'City',
        },
        state: {
            label: 'State',
        },
        pincode: {
            label: 'Pincode',
        },
        landmark: {
            label: 'Landmark',
            prefix: 'Near:',
        },
        areaCode: {
            label: 'Area Code',
            icon: 'Layers',
        },
        bookingId: {
            label: 'Booking ID',
        },
        serviceId: {
            label: 'Service ID',
        },
        bookedOn: {
            label: 'Booked On',
        },
    },
    hero: {
        serviceDetails: {
            label: 'View Service Details',
            icon: 'ArrowUpRight',
        },
        price: {
            icon: 'IndianRupee',
        },
        duration: {
            icon: 'Timer',
            suffix: 'mins',
        },
    },
    formats: {
        date: {
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            },
        },
        time: {
            options: {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            },
        },
    },
    messages: {
        notFound: {
            title: 'Booking not found',
            description: "The booking you're looking for doesn't exist or you don't have access to it.",
            backButton: 'Back to My Bookings',
        },
        error: {
            title: 'Error loading booking',
            description: 'Something went wrong while loading the booking details. Please try again.',
            retryButton: 'Retry',
        },
    },
    accessibility: {
        statusBadge: {
            ariaLabel: (status: string) => `Booking status: ${status}`,
        },
        sections: {
            schedule: 'Schedule information',
            customer: 'Customer information',
            address: 'Service address information',
            notes: 'Additional notes',
            reference: 'Booking reference information',
        },
        images: {
            serviceImage: (serviceName: string) => `Service image for ${serviceName}`,
        },
        buttons: {
            back: 'Navigate back to bookings list',
            viewService: (serviceName: string) => `View details for ${serviceName}`,
        },
    },
} as const;
