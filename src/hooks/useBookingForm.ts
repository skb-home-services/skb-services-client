'use client';

import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getServiceById, createBooking } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { bookingSchema, type BookingFormData } from '@/lib/validations';
import { toast } from '@/hooks/useToast';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export function useBookingForm() {
    const params = useParams();
    const router = useRouter();
    const serviceId = params.id as string;

    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const [previewStartIndex, setPreviewStartIndex] = useState(0);

    // Protect this route - redirect to login if not authenticated
    const { isLoading: isAuthLoading, isAuthenticated } = useProtectedRoute({
        redirectTo: `/login?redirect=/services/${serviceId}/book`,
    });

    // Fetch service data
    const { data: service, isLoading: isServiceLoading } = useQuery({
        queryKey: queryKeys.services.detail(serviceId),
        queryFn: () => getServiceById(serviceId),
        enabled: !!serviceId && isAuthenticated,
    });

    // Form setup
    const methods = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    // Booking mutation
    const mutation = useMutation({
        mutationFn: (data: BookingFormData) => createBooking(serviceId, data),
        onSuccess: () => {
            toast({
                title: 'Booking Submitted!',
                description: 'We will contact you shortly to confirm your booking.',
                variant: 'success',
            });
            router.push('/services');
        },
        onError: (error: { message?: string }) => {
            toast({
                title: 'Booking Failed',
                description: error.message || 'Please try again.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = useCallback(
        (data: BookingFormData) => {
            mutation.mutate(data);
        },
        [mutation]
    );

    // Image preview handlers
    const openImagePreview = useCallback((index: number) => {
        setPreviewStartIndex(index);
        setIsImagePreviewOpen(true);
    }, []);

    const closeImagePreview = useCallback(() => {
        setIsImagePreviewOpen(false);
    }, []);

    // Field focus handlers
    const handleFieldFocus = useCallback((fieldName: string) => {
        setFocusedField(fieldName);
    }, []);

    const handleFieldBlur = useCallback(() => {
        setFocusedField(null);
    }, []);

    // Get all gallery images
    const allImages = service?.gallery?.map((img) => img.url) || [];
    const mainImageUrl = service?.gallery?.find((img) => img.main)?.url;

    const isLoading = isAuthLoading || isServiceLoading || !isAuthenticated;
    const isSubmittingBooking = isSubmitting || mutation.isPending;

    return {
        // Service data
        service,
        serviceId,
        allImages,
        mainImageUrl,

        // Form
        methods,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting: isSubmittingBooking,

        // State
        focusedField,
        isImagePreviewOpen,
        previewStartIndex,

        // Handlers
        handleFieldFocus,
        handleFieldBlur,
        openImagePreview,
        closeImagePreview,

        // Loading states
        isLoading,
        isAuthenticated,
    };
}
