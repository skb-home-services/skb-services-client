export const BOOKING_CONFIG = {
    header: {
        backButton: 'Back to Service Details',
        titlePrefix: 'Book',
        subtitle: 'Complete the form below to schedule your service',
    },
    sections: {
        personalInfo: {
            title: 'Personal Information',
            description: 'Tell us about yourself',
            icon: 'User',
            gradient: 'from-primary/5 to-transparent',
            iconBg: 'bg-primary/10',
            iconColor: 'text-primary',
        },
        address: {
            title: 'Service Address',
            description: 'Where should we provide the service?',
            icon: 'MapPin',
            gradient: 'from-emerald-500/5 to-transparent',
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-600',
        },
        schedule: {
            title: 'Schedule',
            description: 'Pick your preferred date and time',
            icon: 'Calendar',
            gradient: 'from-violet-500/5 to-transparent',
            iconBg: 'bg-violet-500/10',
            iconColor: 'text-violet-600',
        },
        notes: {
            title: 'Additional Notes',
            description: 'Any special requests or instructions?',
            icon: 'FileText',
            gradient: 'from-amber-500/5 to-transparent',
            iconBg: 'bg-amber-500/10',
            iconColor: 'text-amber-600',
        },
    },
    fields: {
        fullName: {
            label: 'Full Name',
            placeholder: 'John Doe',
            icon: 'User',
            required: true,
        },
        email: {
            label: 'Email',
            placeholder: 'john@example.com',
            icon: 'Mail',
            required: true,
        },
        phone: {
            label: 'Phone Number',
            required: true,
        },
        secondaryPhone: {
            label: 'Secondary Phone (Optional)',
            required: false,
        },
        houseNumber: {
            label: 'House Number',
            placeholder: '123',
            icon: 'Home',
            required: true,
        },
        addressLine1: {
            label: 'Address Line 1',
            placeholder: '123 Main Street',
            required: true,
        },
        addressLine2: {
            label: 'Address Line 2',
            placeholder: 'Apartment 4B',
            required: false,
        },
        city: {
            label: 'City',
            placeholder: 'Kathmandu',
            icon: 'Building',
            required: true,
        },
        state: {
            label: 'State',
            placeholder: 'Bagmati',
            required: true,
        },
        pincode: {
            label: 'Pincode',
            placeholder: '44600',
            required: true,
        },
        landmark: {
            label: 'Landmark',
            placeholder: 'Near Durbar Marg',
            required: false,
        },
        date: {
            label: 'Preferred Date',
            icon: 'Calendar',
            required: true,
        },
        time: {
            label: 'Preferred Time',
            icon: 'Clock',
            required: true,
        },
        notes: {
            label: 'Additional Notes',
            placeholder: 'Any special instructions or requirements...',
            required: false,
        },
    },
    submit: {
        default: {
            icon: 'Sparkles',
            text: 'Confirm Booking',
        },
        submitting: {
            text: 'Submitting Booking...',
        },
    },
    sidebar: {
        summary: {
            title: 'Booking Summary',
            subtitle: 'Review your service details',
            serviceLabel: 'Service',
            categoryLabel: 'Category',
            durationLabel: 'Duration',
            basePriceLabel: 'Base Price',
            priceDisclaimer: '* Final price may vary based on service requirements and location',
        },
        trustBadges: {
            secure: {
                icon: 'Shield',
                title: 'Secure Booking',
                description: 'Your information is protected',
                iconBg: 'bg-emerald-50',
                iconColor: 'text-emerald-600',
            },
            verified: {
                icon: 'CheckCircle',
                title: 'Verified Professionals',
                description: 'All our experts are vetted',
                iconBg: 'bg-blue-50',
                iconColor: 'text-blue-600',
            },
        },
    },
    messages: {
        success: {
            title: 'Booking Submitted!',
            description: 'We will contact you shortly to confirm your booking.',
        },
        error: {
            title: 'Booking Failed',
            description: 'Please try again.',
        },
        notFound: {
            title: 'Service not found',
            description: "The service you're looking for doesn't exist.",
            backButton: 'Back to Services',
        },
    },
    gallery: {
        previewHint: 'Click to preview',
        moreImages: '+{count}',
    },
} as const;
