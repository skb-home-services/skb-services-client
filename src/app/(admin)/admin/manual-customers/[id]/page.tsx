'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ArrowLeft,
    Plus,
    Pencil,
    Trash2,
    Mail,
    Phone,
    MapPin,
    Wrench,
    Calendar,
    MessageSquare,
    CheckCircle,
    XCircle,
    Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PageLoader } from '@/components/common';
import { toast } from '@/hooks/useToast';
import {
    getManualCustomerById,
    updateManualCustomer,
    deleteManualCustomer,
    updateManualCustomerService,
    updateManualCustomerServiceOutcome,
} from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { CustomerForm } from '@/components/admin/manual-customers/CustomerForm';
import { ServiceManagement } from '@/components/admin/manual-customers/ServiceManagement';
import { EditServiceForm } from '@/components/admin/manual-customers/EditServiceForm';
import { UpdateOutcomeDialog } from '@/components/admin/manual-customers/UpdateOutcomeDialog';
import { cn, formatDate } from '@/lib/utils';
import type { ManualCustomerService } from '@/types';
import type { UpdateManualCustomerFormData, UpdateManualCustomerServiceOutcomeFormData } from '@/lib/validations';

export default function ManualCustomerDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const customerId = params.id;

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isServiceEditDialogOpen, setIsServiceEditDialogOpen] = useState(false);
    const [isOutcomeDialogOpen, setIsOutcomeDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<ManualCustomerService | null>(null);

    const {
        data: customer,
        isLoading,
        error,
    } = useQuery({
        queryKey: queryKeys.manualCustomers.detail(customerId),
        queryFn: () => getManualCustomerById(customerId),
    });

    const updateMutation = useMutation({
        mutationFn: async (data: UpdateManualCustomerFormData) => {
            return await updateManualCustomer({ ...data, id: customerId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.detail(customerId) });
            toast({
                title: 'Customer Updated',
                description: 'The manual customer has been updated successfully.',
                variant: 'success',
            });
            setIsEditDialogOpen(false);
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Update Failed',
                description: error.message || 'Could not update customer.',
                variant: 'destructive',
            });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteManualCustomer(customerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.all });
            toast({
                title: 'Customer Deleted',
                description: 'The manual customer has been deleted successfully.',
                variant: 'success',
            });
            router.push('/admin/manual-customers');
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Delete Failed',
                description: error.message || 'Could not delete customer.',
                variant: 'destructive',
            });
        },
    });

    const updateServiceMutation = useMutation({
        mutationFn: async (data: { serviceId: string; [key: string]: any }) => {
            const { serviceId: serviceIdParam, ...payload } = data;
            return await updateManualCustomerService({ customerId, serviceId: serviceIdParam, ...payload });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.detail(customerId) });
            toast({
                title: 'Service Updated',
                description: 'The service has been updated successfully.',
                variant: 'success',
            });
            setIsServiceEditDialogOpen(false);
            setSelectedService(null);
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Update Failed',
                description: error.message || 'Could not update service.',
                variant: 'destructive',
            });
        },
    });

    const updateOutcomeMutation = useMutation({
        mutationFn: async (data: UpdateManualCustomerServiceOutcomeFormData) => {
            console.log('updateOutcomeMutation called with:', data);
            const { customerId: _, ...payload } = data;
            console.log('Calling updateManualCustomerServiceOutcome with:', { customerId, ...payload });
            return await updateManualCustomerServiceOutcome({ customerId, ...payload });
        },
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
                title: 'Update Failed',
                description: error.message || 'Could not update outcome.',
                variant: 'destructive',
            });
        },
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (error || !customer) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <XCircle className="h-12 w-12 text-destructive mb-4" />
                <h2 className="text-xl font-semibold mb-2">Customer not found</h2>
                <p className="text-muted-foreground mb-4">The customer you&apos;re looking for doesn&apos;t exist.</p>
                <Button onClick={() => router.push('/admin/manual-customers')}>Back to Customers</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{customer.fullName}</h1>
                        <p className="text-muted-foreground mt-1">Manual Customer Details</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Edit Customer</DialogTitle>
                            </DialogHeader>
                            <CustomerForm
                                customer={customer}
                                onSubmit={async (data) => {
                                    await updateMutation.mutateAsync(data as UpdateManualCustomerFormData);
                                }}
                                onCancel={() => setIsEditDialogOpen(false)}
                                isLoading={updateMutation.isPending}
                            />
                        </DialogContent>
                    </Dialog>
                    <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)} disabled={deleteMutation.isPending}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Customer Information */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle>Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge
                                    variant={customer.isActive ? 'default' : 'secondary'}
                                    className={cn(
                                        customer.isActive
                                            ? 'bg-green-100 text-green-800 border-green-200'
                                            : 'bg-gray-100 text-gray-800 border-gray-200'
                                    )}
                                >
                                    {customer.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Full Name</p>
                                    <p className="font-medium">{customer.fullName}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{customer.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{customer.phone.phoneE164}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Address</p>
                                <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            {customer.address.houseNumber}, {customer.address.line1}
                                        </p>
                                        {customer.address.line2 && (
                                            <p className="text-sm text-muted-foreground">{customer.address.line2}</p>
                                        )}
                                        <p className="text-sm text-muted-foreground">
                                            {customer.address.city}, {customer.address.state} - {customer.address.pincode}
                                        </p>
                                        {customer.address.landmark && (
                                            <p className="text-sm text-muted-foreground">Landmark: {customer.address.landmark}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-4 sm:grid-cols-2 text-sm">
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Created At</p>
                                    <p className="font-medium">{formatDate(customer.createdAt)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Last Updated</p>
                                    <p className="font-medium">{formatDate(customer.updatedAt)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Services */}
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Services ({customer.services.length})</CardTitle>
                                <ServiceManagement customerId={customerId} services={customer.services} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            {customer.services.length > 0 ? (
                                <div className="space-y-4">
                                    {customer.services.map((service) => (
                                        <div
                                            key={service._id}
                                            className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="font-semibold">{service.serviceInfo?.name || 'Unknown Service'}</h4>
                                                        <Badge
                                                            variant={
                                                                service.status === 'active'
                                                                    ? 'default'
                                                                    : service.status === 'paused'
                                                                      ? 'secondary'
                                                                      : 'outline'
                                                            }
                                                            className={cn(
                                                                service.status === 'active' &&
                                                                    'bg-green-100 text-green-800 border-green-200',
                                                                service.status === 'paused' &&
                                                                    'bg-yellow-100 text-yellow-800 border-yellow-200',
                                                                service.status === 'completed' &&
                                                                    'bg-gray-100 text-gray-800 border-gray-200'
                                                            )}
                                                        >
                                                            {service.status}
                                                        </Badge>
                                                    </div>
                                                    {service.serviceInfo && (
                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                                                            <span>{service.serviceInfo.category}</span>
                                                            {service.serviceInfo.baseCost && <span>₹{service.serviceInfo.baseCost}</span>}
                                                            {service.serviceInfo.durationMinutes && (
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="h-3.5 w-3.5" />
                                                                    {service.serviceInfo.durationMinutes} min
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedService(service);
                                                            setIsServiceEditDialogOpen(true);
                                                        }}
                                                        title="Edit service"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedService(service);
                                                            setIsOutcomeDialogOpen(true);
                                                        }}
                                                        title="Update outcome"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="grid gap-2 sm:grid-cols-2 text-sm">
                                                {service.lastTakenAt && (
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-muted-foreground">Last Taken:</span>
                                                        <span className="font-medium">{formatDate(service.lastTakenAt)}</span>
                                                    </div>
                                                )}
                                                {service.lastOutcome && (
                                                    <div className="flex items-center gap-2">
                                                        {service.lastOutcome === 'completed' ? (
                                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                                        ) : (
                                                            <XCircle className="h-4 w-4 text-red-600" />
                                                        )}
                                                        <span className="text-muted-foreground">Last Outcome:</span>
                                                        <span className="font-medium capitalize">{service.lastOutcome}</span>
                                                    </div>
                                                )}
                                                {service?.channels?.length > 0 && (
                                                    <div className="flex items-center gap-2">
                                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-muted-foreground">Channels:</span>
                                                        <div className="flex gap-1">
                                                            {service.channels.map((channel) => (
                                                                <Badge key={channel} variant="outline" className="text-xs">
                                                                    {channel}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {service.notes && (
                                                <div className="pt-2 border-t">
                                                    <p className="text-sm">
                                                        <span className="text-muted-foreground">Notes: </span>
                                                        <span>{service.notes}</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Wrench className="h-12 w-12 text-muted-foreground/30 mb-4" />
                                    <h3 className="font-semibold text-lg mb-1">No services assigned</h3>
                                    <p className="text-muted-foreground text-sm mb-4">Add services to this customer to get started</p>
                                    <ServiceManagement customerId={customerId} services={customer.services} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions Sidebar */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <ServiceManagement customerId={customerId} services={customer.services} variant="button" />
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this manual customer? This action cannot be undone and will also remove all
                            associated services.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteMutation.mutate()}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Service Edit Dialog */}
            {selectedService && (
                <>
                    <Dialog
                        open={isServiceEditDialogOpen}
                        onOpenChange={(open) => {
                            setIsServiceEditDialogOpen(open);
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
                                    await updateServiceMutation.mutateAsync({
                                        serviceId: selectedService._id,
                                        ...data,
                                    });
                                }}
                                onCancel={() => {
                                    setIsServiceEditDialogOpen(false);
                                    setSelectedService(null);
                                }}
                                isLoading={updateServiceMutation.isPending}
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
                                    await updateOutcomeMutation.mutateAsync(data);
                                }}
                                onCancel={() => {
                                    setIsOutcomeDialogOpen(false);
                                    setSelectedService(null);
                                }}
                                isLoading={updateOutcomeMutation.isPending}
                            />
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </div>
    );
}
