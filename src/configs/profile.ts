import { User, Mail, Phone, Shield, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { COUNTRY_CODES, MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES, DEFAULT_COUNTRY_CODE } from './config';

export interface ProfilePageConfig {
    header: {
        title: string;
        description: string;
        icon: LucideIcon;
    };
    avatar: {
        uploadLabel: string;
        removeLabel: string;
        fileSizeLimit: string;
        acceptedFormats: string;
        maxFileSize: number;
        acceptedTypes: string[];
    };
    accountStatus: {
        title: string;
        titleIcon: LucideIcon;
        emailVerified: {
            label: string;
            verifiedText: string;
            unverifiedText: string;
            verifiedIcon: LucideIcon;
            unverifiedIcon: LucideIcon;
        };
        memberSince: {
            label: string;
            icon: LucideIcon;
        };
    };
    form: {
        title: string;
        titleIcon: LucideIcon;
        description: string;
        fields: {
            displayName: {
                label: string;
                placeholder: string;
                icon: LucideIcon;
                required: boolean;
            };
            email: {
                label: string;
                disabledMessage: string;
                icon: LucideIcon;
            };
            phone: {
                label: string;
                placeholder: string;
                icon: LucideIcon;
                helperText: string;
            };
        };
        actions: {
            save: {
                label: string;
                savingLabel: string;
            };
            status: {
                unsavedChanges: string;
                allSaved: string;
            };
        };
    };
    messages: {
        success: {
            title: string;
            description: string;
        };
        error: {
            title: string;
            fileTooLarge: string;
            updateFailed: string;
        };
        validation: {
            fileSize: (maxSizeMB: number) => string;
        };
    };
    countryCodes: typeof COUNTRY_CODES;
    defaultCountryCode: typeof DEFAULT_COUNTRY_CODE;
}

export const PROFILE_CONFIG: ProfilePageConfig = {
    header: {
        title: 'Profile Settings',
        description: 'Manage your account information and preferences',
        icon: User,
    },
    avatar: {
        uploadLabel: 'Upload profile picture',
        removeLabel: 'Remove profile picture',
        fileSizeLimit: `Max ${MAX_FILE_SIZE / (1024 * 1024)}MB (JPEG, PNG, WebP)`,
        acceptedFormats: ACCEPTED_IMAGE_TYPES.join(', '),
        maxFileSize: MAX_FILE_SIZE,
        acceptedTypes: ACCEPTED_IMAGE_TYPES,
    },
    accountStatus: {
        title: 'Account Status',
        titleIcon: Shield,
        emailVerified: {
            label: 'Email Verified',
            verifiedText: 'Your email is verified',
            unverifiedText: 'Please verify your email',
            verifiedIcon: CheckCircle2,
            unverifiedIcon: AlertCircle,
        },
        memberSince: {
            label: 'Member Since',
            icon: Calendar,
        },
    },
    form: {
        title: 'Personal Information',
        titleIcon: User,
        description: 'Update your personal details here. Your email cannot be changed.',
        fields: {
            displayName: {
                label: 'Display Name',
                placeholder: 'Enter your name',
                icon: User,
                required: true,
            },
            email: {
                label: 'Email Address',
                disabledMessage: 'Email address cannot be changed',
                icon: Mail,
            },
            phone: {
                label: 'Phone Number',
                placeholder: 'Enter phone number',
                icon: Phone,
                helperText: "We'll use this to contact you about your bookings",
            },
        },
        actions: {
            save: {
                label: 'Save Changes',
                savingLabel: 'Saving...',
            },
            status: {
                unsavedChanges: 'You have unsaved changes',
                allSaved: 'All changes saved',
            },
        },
    },
    messages: {
        success: {
            title: 'Profile Updated',
            description: 'Your profile has been updated successfully.',
        },
        error: {
            title: 'Update Failed',
            fileTooLarge: 'File too large',
            updateFailed: 'Could not update profile.',
        },
        validation: {
            fileSize: (maxSizeMB: number) => `Maximum file size is ${maxSizeMB}MB`,
        },
    },
    countryCodes: COUNTRY_CODES,
    defaultCountryCode: DEFAULT_COUNTRY_CODE,
} as const;
