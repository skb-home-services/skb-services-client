import type { User } from './user';
import type { ProfileFormData } from '@/lib/validations';

export interface ProfilePageProps {
    className?: string;
}

export interface ProfileFormState {
    isDirty: boolean;
    hasImageChanged: boolean;
    hasChanges: boolean;
    isSubmitting: boolean;
}

export interface ProfileImageState {
    previewUrl: string | null;
    file: File | null;
    hasChanged: boolean;
}

export interface AccountStatusData {
    emailVerified: boolean;
    memberSince: string | null;
    displayName: string;
    email: string;
}

export interface ProfileHookReturn {
    // Data
    userProfile: User | undefined;
    authUser: ReturnType<typeof import('@/providers/AuthProvider').useAuth>['user'];

    // Form
    formMethods: ReturnType<typeof import('react-hook-form').useForm<ProfileFormData>>;
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    errors: ReturnType<typeof import('react-hook-form').useForm<ProfileFormData>>['formState']['errors'];

    // Image
    previewUrl: string | null;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;

    // State
    isLoading: boolean;
    isSubmitting: boolean;
    hasChanges: boolean;

    // Handlers
    onSubmit: (data: ProfileFormData) => void;
}

export interface AvatarUploadProps {
    previewUrl: string | null;
    currentImageUrl?: string;
    fallbackInitials: string;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    maxFileSize: number;
    acceptedTypes: string[];
    disabled?: boolean;
}

export interface AccountStatsProps {
    emailVerified: boolean;
    memberSince: string | null;
    displayName: string;
    email: string;
}

export interface PersonalInfoSectionProps {
    displayName: string;
    email: string;
    emailVerified: boolean;
    errors: Record<string, any>;
    register: ReturnType<typeof import('react-hook-form').useForm<ProfileFormData>>['register'];
}

export interface PhoneSectionProps {
    control: ReturnType<typeof import('react-hook-form').useForm<ProfileFormData>>['control'];
    register: ReturnType<typeof import('react-hook-form').useForm<ProfileFormData>>['register'];
    errors: Record<string, any>;
}

export interface FormActionsProps {
    hasChanges: boolean;
    isSubmitting: boolean;
}
