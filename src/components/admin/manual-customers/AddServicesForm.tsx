'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getServices } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { z } from 'zod';
import { manualCustomerServiceSchema, type ManualCustomerServiceFormData } from '@/lib/validations';
import { MANUAL_CUSTOMER_CHANNELS, MANUAL_CUSTOMER_SERVICE_STATUSES } from '@/configs/config';
import { cn, formatCurrency, formatDuration } from '@/lib/utils';
import type { Service } from '@/types';

interface AddServicesFormProps {
    customerId: string;
    existingserviceSubIds: string[];
    onSubmit: (data: ManualCustomerServiceFormData[]) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function AddServicesForm({ customerId, existingserviceSubIds, onSubmit, onCancel, isLoading }: AddServicesFormProps) {
    const [selectedserviceSubIds, setSelectedserviceSubIds] = useState<Set<string>>(new Set());

    const { data: servicesData } = useQuery({
        // Todo: make addition api for this task
        queryKey: queryKeys.services.list({ limit: 10 }),
        queryFn: () => getServices({ limit: 10 }),
    });

    const availableServices = servicesData?.services.filter((s: Service) => !existingserviceSubIds.includes(s._id)) || [];

    const form = useForm<{ services: ManualCustomerServiceFormData[] }>({
        resolver: zodResolver(
            z.object({
                services: z.array(manualCustomerServiceSchema).min(1, 'At least one service is required'),
            })
        ),
        defaultValues: {
            services: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'services',
    });

    const handleAddService = (serviceId: string) => {
        if (selectedserviceSubIds.has(serviceId)) return;

        const service = availableServices.find((s: Service) => s._id === serviceId);
        if (!service) return;

        append({
            serviceId,
            channels: ['whatsapp'],
            status: 'active',
            lastTakenAt: null,
            notes: null,
            lastOutcome: null,
            lastOutcomeAt: null,
        });

        setSelectedserviceSubIds((prev) => {
            const next = new Set(prev);
            next.add(serviceId);
            return next;
        });
    };

    const handleRemoveService = (index: number) => {
        const serviceId = form.watch(`services.${index}.serviceId`);
        remove(index);
        setSelectedserviceSubIds((prev) => {
            const next = new Set(Array.from(prev));
            next.delete(serviceId);
            return next;
        });
    };

    const handleSubmit = form.handleSubmit(async (data) => {
        await onSubmit(data.services);
    });

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div className="space-y-4">
                <div>
                    <Label>Select Services to Add</Label>
                    <div className="mt-2 space-y-2 max-h-60 overflow-y-auto border rounded-lg p-3">
                        {availableServices.length > 0 ? (
                            availableServices.map((service: Service) => {
                                const isSelected = selectedserviceSubIds.has(service._id);
                                return (
                                    <div
                                        key={service._id}
                                        onClick={() => !isSelected && handleAddService(service._id)}
                                        className={cn(
                                            'p-3 rounded-lg border cursor-pointer transition-colors',
                                            isSelected ? 'bg-muted border-primary' : 'hover:bg-muted/50 border-border'
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium">{service.name}</p>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                                    <span>{service.category}</span>
                                                    <span>{formatCurrency(service.baseCost)}</span>
                                                    <span>{formatDuration(service.durationMinutes)}</span>
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <Badge variant="default" className="ml-2">
                                                    Added
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">No available services to add</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Service Forms */}
            {fields.length > 0 && (
                <div className="space-y-4">
                    <Label>Configure Services</Label>
                    {fields.map((field, index) => {
                        const serviceId = form.watch(`services.${index}.serviceId`);
                        const service = availableServices.find((s: Service) => s._id === serviceId);
                        const serviceErrors = form.formState.errors.services?.[index];

                        return (
                            <div key={field.id} className="border rounded-lg p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold">{service?.name || 'Unknown Service'}</h4>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveService(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>
                                            Status <span className="text-destructive">*</span>
                                        </Label>
                                        <Select
                                            value={form.watch(`services.${index}.status`)}
                                            onValueChange={(value) => form.setValue(`services.${index}.status`, value as any)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {MANUAL_CUSTOMER_SERVICE_STATUSES.map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {serviceErrors?.status && (
                                            <p className="text-sm text-destructive">{serviceErrors.status.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>
                                            Channels <span className="text-destructive">*</span>
                                        </Label>
                                        <div className="flex flex-wrap gap-2">
                                            {MANUAL_CUSTOMER_CHANNELS.map((channel) => {
                                                const channels = form.watch(`services.${index}.channels`) || [];
                                                const isSelected = channels.includes(channel);
                                                return (
                                                    <Badge
                                                        key={channel}
                                                        variant={isSelected ? 'default' : 'outline'}
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            const current = form.watch(`services.${index}.channels`) || [];
                                                            if (isSelected) {
                                                                form.setValue(
                                                                    `services.${index}.channels`,
                                                                    current.filter((c) => c !== channel)
                                                                );
                                                            } else {
                                                                form.setValue(`services.${index}.channels`, [...current, channel]);
                                                            }
                                                        }}
                                                    >
                                                        {channel}
                                                    </Badge>
                                                );
                                            })}
                                        </div>
                                        {serviceErrors?.channels && (
                                            <p className="text-sm text-destructive">{serviceErrors.channels.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Notes</Label>
                                    <Textarea
                                        {...form.register(`services.${index}.notes`)}
                                        placeholder="Optional notes about this service..."
                                        rows={2}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={isLoading || fields.length === 0}>
                    {isLoading ? 'Adding...' : `Add ${fields.length} Service${fields.length !== 1 ? 's' : ''}`}
                </Button>
            </div>
        </form>
    );
}
