import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, type InquiryFormData } from '@/lib/validations';
import { createInquiry } from '@/services';
import { toast } from '@/hooks/useToast';

export const useInquiryForm = () => {
    const formMethods = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
        mode: 'onBlur',
    });

    const mutation = useMutation({
        mutationFn: createInquiry,
        onSuccess: () => {
            toast({
                title: 'Inquiry Submitted!',
                description: 'We will get back to you within 24 hours.',
                variant: 'success',
            });
            formMethods.reset();
        },
        onError: (error: Error) => {
            toast({
                title: 'Failed to submit',
                description: error.message || 'Please try again.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data: InquiryFormData) => {
        mutation.mutate(data);
    };

    const isLoading = mutation.isPending || formMethods.formState.isSubmitting;

    return {
        formMethods,
        onSubmit,
        isLoading,
        errors: formMethods.formState.errors,
    };
};
