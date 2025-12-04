'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from '@/hooks/useToast';
import { getCurrentUser, updateCurrentUser } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { profileSchema, type ProfileFormData } from '@/lib/validations';
import { PROFILE_CONFIG } from '@/configs/profile';
import type { ProfileHookReturn } from '@/types/profile';

export function useProfile(): ProfileHookReturn {
    const { user: authUser } = useAuth();
    const queryClient = useQueryClient();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [hasImageChanged, setHasImageChanged] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: userProfile, isLoading } = useQuery({
        queryKey: queryKeys.users.current(),
        queryFn: getCurrentUser,
        enabled: !!authUser,
    });

    const formMethods = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    const {
        register,
        handleSubmit: handleFormSubmit,
        control,
        setValue,
        reset,
        formState: { errors, isDirty },
    } = formMethods;

    useEffect(() => {
        if (userProfile) {
            reset({
                displayName: userProfile.displayName || '',
                phone: {
                    region: userProfile.phone?.region || PROFILE_CONFIG.defaultCountryCode,
                    number: userProfile?.phone?.nationalNumber || '',
                },
            });
        }
    }, [userProfile, reset]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // Update mutation
    const mutation = useMutation({
        mutationFn: (data: ProfileFormData) => {
            return updateCurrentUser({
                displayName: data.displayName,
                phone: data.phone,
                profile_image: data.profile_image || undefined,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.current() });
            toast({
                title: PROFILE_CONFIG.messages.success.title,
                description: PROFILE_CONFIG.messages.success.description,
                variant: 'success',
            });
            setHasImageChanged(false);
            // Cleanup preview URL after successful upload
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
            }
        },
        onError: (error: { message: string } | Error) => {
            const message = error instanceof Error ? error.message : error.message || PROFILE_CONFIG.messages.error.updateFailed;
            toast({
                title: PROFILE_CONFIG.messages.error.title,
                description: message,
                variant: 'destructive',
            });
        },
    });

    // Handle image change
    const handleImageChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                if (file.size > PROFILE_CONFIG.avatar.maxFileSize) {
                    toast({
                        title: PROFILE_CONFIG.messages.error.fileTooLarge,
                        description: PROFILE_CONFIG.messages.validation.fileSize(PROFILE_CONFIG.avatar.maxFileSize / (1024 * 1024)),
                        variant: 'destructive',
                    });
                    return;
                }

                // Cleanup previous preview URL
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                }

                setValue('profile_image', file, { shouldDirty: true });
                setPreviewUrl(URL.createObjectURL(file));
                setHasImageChanged(true);
            }
        },
        [setValue, previewUrl]
    );

    // Remove image
    const removeImage = useCallback(() => {
        setValue('profile_image', undefined, { shouldDirty: true });

        // Cleanup preview URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setPreviewUrl(null);
        setHasImageChanged(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [setValue, previewUrl]);

    // Form submission
    const onSubmit = useCallback(
        (data: ProfileFormData) => {
            mutation.mutate(data);
        },
        [mutation]
    );

    const hasChanges = isDirty || hasImageChanged;
    const isSubmitting = mutation.isPending;

    return {
        // Data
        userProfile,
        authUser,

        // Form
        formMethods,
        handleSubmit: handleFormSubmit(onSubmit),
        errors,

        // Image
        previewUrl,
        handleImageChange,
        removeImage,
        fileInputRef,

        // State
        isLoading,
        isSubmitting,
        hasChanges,

        // Handlers
        onSubmit,
    };
}
