'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomerForm } from '@/components/admin/manual-customers/CustomerForm';
import { toast } from '@/hooks/useToast';
import { createManualCustomer } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import type { CreateManualCustomerFormData } from '@/lib/validations';

export default function NewManualCustomerPage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: CreateManualCustomerFormData) => {
            return await createManualCustomer(data);
        },
        onSuccess: (customer) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.all });
            toast({
                title: 'Customer Created',
                description: 'The manual customer has been created successfully.',
                variant: 'success',
            });
            router.push(`/admin/manual-customers/${customer._id}`);
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Creation Failed',
                description: error.message || 'Could not create customer.',
                variant: 'destructive',
            });
        },
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">New Manual Customer</h1>
                    <p className="text-muted-foreground mt-1">Create a new manual customer record</p>
                </div>
            </div>

            {/* Form */}
            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <CustomerForm
                        onSubmit={async (data) => {
                            await createMutation.mutateAsync(data as CreateManualCustomerFormData);
                        }}
                        onCancel={() => router.back()}
                        isLoading={createMutation.isPending}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
