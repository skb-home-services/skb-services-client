'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/common';
import {
    createManualCustomerSchema,
    updateManualCustomerSchema,
    type CreateManualCustomerFormData,
    type UpdateManualCustomerFormData,
} from '@/lib/validations';
import { cn } from '@/lib/utils';
import type { ManualCustomer } from '@/types';
import { BOOKING_CONFIG } from '@/configs/booking';
import { PROFILE_CONFIG } from '@/configs/profile';

interface CustomerFormProps {
    customer?: ManualCustomer;
    onSubmit: (data: CreateManualCustomerFormData | UpdateManualCustomerFormData) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function CustomerForm({ customer, onSubmit, onCancel, isLoading }: CustomerFormProps) {
    const isEditMode = !!customer;

    const form = useForm<CreateManualCustomerFormData | UpdateManualCustomerFormData>({
        resolver: zodResolver(isEditMode ? updateManualCustomerSchema : createManualCustomerSchema),
        defaultValues: customer
            ? {
                  id: customer._id,
                  fullName: customer.fullName,
                  email: customer.email || undefined,
                  phone: {
                      region: customer.phone.region,
                      number: customer.phone.nationalNumber,
                  },
                  isActive: customer.isActive,
                  address: {
                      houseNumber: customer.address.houseNumber || '',
                      line1: customer.address.line1 || '',
                      line2: customer.address.line2 || '',
                      city: customer.address.city || '',
                      state: customer.address.state || '',
                      pincode: customer.address.pincode || '',
                      landmark: customer.address.landmark || '',
                  },
              }
            : {
                  fullName: '',
                  email: undefined,
                  phone: {
                      region: PROFILE_CONFIG.defaultCountryCode,
                      number: '',
                  },
                  isActive: true,
                  address: {
                      houseNumber: '',
                      line1: '',
                      line2: '',
                      city: '',
                      state: '',
                      pincode: '',
                      landmark: '',
                  },
              },
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        await onSubmit(data);
    });

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">
                                Full Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="fullName"
                                {...form.register('fullName')}
                                placeholder="John Doe"
                                className={cn(form.formState.errors.fullName && 'border-destructive')}
                            />
                            {form.formState.errors.fullName && (
                                <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...form.register('email')}
                                placeholder="john.doe@example.com"
                                className={cn(form.formState.errors.email && 'border-destructive')}
                            />
                            {form.formState.errors.email && (
                                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <PhoneInput name="phone" label="Phone Number" required />
                </div>

                {/* Address */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Address</h3>
                    <div className="grid gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="address.houseNumber">House Number</Label>
                                <Input
                                    id="address.houseNumber"
                                    {...form.register('address.houseNumber')}
                                    placeholder="12B"
                                    className={cn(form.formState.errors.address?.houseNumber && 'border-destructive')}
                                />
                                {form.formState.errors.address?.houseNumber && (
                                    <p className="text-sm text-destructive">{form.formState.errors.address.houseNumber.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address.line1">Address Line 1</Label>
                                <Input
                                    id="address.line1"
                                    {...form.register('address.line1')}
                                    placeholder="123 Main Street"
                                    className={cn(form.formState.errors.address?.line1 && 'border-destructive')}
                                />
                                {form.formState.errors.address?.line1 && (
                                    <p className="text-sm text-destructive">{form.formState.errors.address.line1.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address.line2">Address Line 2</Label>
                            <Input id="address.line2" {...form.register('address.line2')} placeholder="Apartment 4B" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="address.city">City</Label>
                                <Input
                                    id="address.city"
                                    {...form.register('address.city')}
                                    placeholder={BOOKING_CONFIG.fields.city.placeholder}
                                    className={cn(form.formState.errors.address?.city && 'border-destructive')}
                                />
                                {form.formState.errors.address?.city && (
                                    <p className="text-sm text-destructive">{form.formState.errors.address.city.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address.state">State</Label>
                                <Input
                                    id="address.state"
                                    {...form.register('address.state')}
                                    placeholder={BOOKING_CONFIG.fields.state.placeholder}
                                    className={cn(form.formState.errors.address?.state && 'border-destructive')}
                                />
                                {form.formState.errors.address?.state && (
                                    <p className="text-sm text-destructive">{form.formState.errors.address.state.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address.pincode">Pincode</Label>
                                <Input
                                    id="address.pincode"
                                    {...form.register('address.pincode')}
                                    placeholder="44600"
                                    className={cn(form.formState.errors.address?.pincode && 'border-destructive')}
                                />
                                {form.formState.errors.address?.pincode && (
                                    <p className="text-sm text-destructive">{form.formState.errors.address.pincode.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address.landmark">Landmark</Label>
                            <Input
                                id="address.landmark"
                                {...form.register('address.landmark')}
                                placeholder={BOOKING_CONFIG.fields.landmark.placeholder}
                            />
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <Label htmlFor="isActive">Status</Label>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            {...form.register('isActive')}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="isActive" className="font-normal cursor-pointer">
                            Active customer
                        </Label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    {onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : isEditMode ? 'Update Customer' : 'Create Customer'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
