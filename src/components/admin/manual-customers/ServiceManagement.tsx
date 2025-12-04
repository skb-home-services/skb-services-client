'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/useToast';
import {
    addManualCustomerServices,
    removeManualCustomerServices,
    updateManualCustomerService,
    updateManualCustomerServiceOutcome,
} from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { AddServicesForm } from './AddServicesForm';
import { EditServiceForm } from './EditServiceForm';
import { RemoveServicesDialog } from './RemoveServicesDialog';
import { UpdateOutcomeDialog } from './UpdateOutcomeDialog';
import type { ManualCustomerService } from '@/types';

interface ServiceManagementProps {
    customerId: string;
    services: ManualCustomerService[];
    variant?: 'button' | 'default';
}

export function ServiceManagement({ customerId, services, variant = 'default' }: ServiceManagementProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [isOutcomeDialogOpen, setIsOutcomeDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<ManualCustomerService | null>(null);

    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: addManualCustomerServices,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.detail(customerId) });
            toast({
                title: 'Services Added',
                description: 'Services have been added successfully.',
                variant: 'success',
            });
            setIsAddDialogOpen(false);
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Failed to Add Services',
                description: error.message || 'Could not add services.',
                variant: 'destructive',
            });
        },
    });

    const removeMutation = useMutation({
        mutationFn: removeManualCustomerServices,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.detail(customerId) });
            toast({
                title: 'Services Removed',
                description: 'Services have been removed successfully.',
                variant: 'success',
            });
            setIsRemoveDialogOpen(false);
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Failed to Remove Services',
                description: error.message || 'Could not remove services.',
                variant: 'destructive',
            });
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateManualCustomerService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.detail(customerId) });
            toast({
                title: 'Service Updated',
                description: 'The service has been updated successfully.',
                variant: 'success',
            });
            setIsEditDialogOpen(false);
            setSelectedService(null);
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Failed to Update Service',
                description: error.message || 'Could not update service.',
                variant: 'destructive',
            });
        },
    });

    const outcomeMutation = useMutation({
        mutationFn: updateManualCustomerServiceOutcome,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.detail(customerId) });
            toast({
                title: 'Outcome Updated',
                description: 'The service outcome has been updated successfully.',
                variant: 'success',
            });
            setIsOutcomeDialogOpen(false);
            setSelectedService(null);
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Failed to Update Outcome',
                description: error.message || 'Could not update outcome.',
                variant: 'destructive',
            });
        },
    });

    const handleEdit = (service: ManualCustomerService) => {
        setSelectedService(service);
        setIsEditDialogOpen(true);
    };

    const handleUpdateOutcome = (service: ManualCustomerService) => {
        setSelectedService(service);
        setIsOutcomeDialogOpen(true);
    };

    if (variant === 'button') {
        return (
            <>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Services
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Add Services</DialogTitle>
                        </DialogHeader>
                        <AddServicesForm
                            customerId={customerId}
                            existingserviceSubIds={services.map((s) => {
                                if (s?.serviceInfo) return s.serviceInfo._id;
                                return '';
                            })}
                            onSubmit={async (data) => {
                                await addMutation.mutateAsync({ customerId, services: data });
                            }}
                            onCancel={() => setIsAddDialogOpen(false)}
                            isLoading={addMutation.isPending}
                        />
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Services
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add Services</DialogTitle>
                    </DialogHeader>
                    <AddServicesForm
                        customerId={customerId}
                        existingserviceSubIds={services.map((s) => {
                            if (s?.serviceInfo) return s.serviceInfo._id;
                            return '';
                        })}
                        onSubmit={async (data) => {
                            await addMutation.mutateAsync({ customerId, services: data });
                        }}
                        onCancel={() => setIsAddDialogOpen(false)}
                        isLoading={addMutation.isPending}
                    />
                </DialogContent>
            </Dialog>

            {/* remove and add services */}
            {services.length > 0 && (
                <>
                    <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Remove Services</DialogTitle>
                            </DialogHeader>
                            <RemoveServicesDialog
                                services={services}
                                onSubmit={async (serviceSubIds) => {
                                    await removeMutation.mutateAsync({ customerId, serviceSubIds });
                                }}
                                onCancel={() => setIsRemoveDialogOpen(false)}
                                isLoading={removeMutation.isPending}
                            />
                        </DialogContent>
                    </Dialog>
                </>
            )}

            {selectedService && (
                <>
                    <Dialog
                        open={isEditDialogOpen}
                        onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (!open) setSelectedService(null);
                        }}
                    >
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Edit Service</DialogTitle>
                            </DialogHeader>
                            <EditServiceForm
                                customerId={customerId}
                                service={selectedService}
                                onSubmit={async (data) => {
                                    await updateMutation.mutateAsync({
                                        customerId,
                                        serviceId: selectedService._id,
                                        ...data,
                                    });
                                }}
                                onCancel={() => {
                                    setIsEditDialogOpen(false);
                                    setSelectedService(null);
                                }}
                                isLoading={updateMutation.isPending}
                            />
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        open={isOutcomeDialogOpen}
                        onOpenChange={(open) => {
                            setIsOutcomeDialogOpen(open);
                            if (!open) setSelectedService(null);
                        }}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Service Outcome</DialogTitle>
                            </DialogHeader>
                            <UpdateOutcomeDialog
                                customerId={customerId}
                                service={selectedService}
                                onSubmit={async (data) => {
                                    const { customerId: _, serviceId: __, ...payload } = data;
                                    await outcomeMutation.mutateAsync({
                                        customerId,
                                        serviceId: selectedService._id,
                                        ...payload,
                                    });
                                }}
                                onCancel={() => {
                                    setIsOutcomeDialogOpen(false);
                                    setSelectedService(null);
                                }}
                                isLoading={outcomeMutation.isPending}
                            />
                        </DialogContent>
                    </Dialog>
                </>
            )}

            {/* Action buttons for each service - these will be rendered in the detail page */}
            <div className="hidden" id="service-actions">
                {services.map((service) => (
                    <div key={service._id} className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(service)} title="Edit service">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleUpdateOutcome(service)} title="Update outcome">
                            <CheckCircle className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
