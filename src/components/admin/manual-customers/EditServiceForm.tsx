'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { updateManualCustomerServiceSchema, type UpdateManualCustomerServiceFormData } from '@/lib/validations';
import { MANUAL_CUSTOMER_CHANNELS, MANUAL_CUSTOMER_SERVICE_STATUSES, MANUAL_CUSTOMER_SERVICE_OUTCOMES } from '@/configs/config';
import { cn } from '@/lib/utils';
import type { ManualCustomerService } from '@/types';

interface EditServiceFormProps {
    customerId: string;
    service: ManualCustomerService;
    onSubmit: (data: Partial<UpdateManualCustomerServiceFormData>) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function EditServiceForm({ service, onSubmit, onCancel, isLoading }: EditServiceFormProps) {
    const form = useForm<Partial<UpdateManualCustomerServiceFormData>>({
        resolver: zodResolver(updateManualCustomerServiceSchema.partial()),
        defaultValues: {
            lastTakenAt: service.lastTakenAt || null,
            channels: service.channels,
            notes: service.notes || null,
            status: service.status,
            lastOutcome: service.lastOutcome || null,
            lastOutcomeAt: service.lastOutcomeAt || null,
        },
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        await onSubmit(data);
    });

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label>Service</Label>
                <p className="font-medium">{service.serviceInfo?.name || 'Unknown Service'}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label>
                        Status <span className="text-destructive">*</span>
                    </Label>
                    <Select value={form.watch('status') || 'active'} onValueChange={(value) => form.setValue('status', value as any)}>
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
                    {form.formState.errors.status && <p className="text-sm text-destructive">{form.formState.errors.status.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Last Taken At</Label>
                    <Input
                        type="datetime-local"
                        {...form.register('lastTakenAt')}
                        value={form.watch('lastTakenAt') ? new Date(form.watch('lastTakenAt')!).toISOString().slice(0, 16) : ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            form.setValue('lastTakenAt', value ? new Date(value).toISOString() : null);
                        }}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>
                    Channels <span className="text-destructive">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                    {MANUAL_CUSTOMER_CHANNELS.map((channel) => {
                        const channels = form.watch('channels') || [];
                        const isSelected = channels.includes(channel);
                        return (
                            <Badge
                                key={channel}
                                variant={isSelected ? 'default' : 'outline'}
                                className="cursor-pointer"
                                onClick={() => {
                                    const current = form.watch('channels') || [];
                                    if (isSelected) {
                                        form.setValue(
                                            'channels',
                                            current.filter((c) => c !== channel)
                                        );
                                    } else {
                                        form.setValue('channels', [...current, channel]);
                                    }
                                }}
                            >
                                {channel}
                            </Badge>
                        );
                    })}
                </div>
                {form.formState.errors.channels && <p className="text-sm text-destructive">{form.formState.errors.channels.message}</p>}
            </div>

            <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea {...form.register('notes')} placeholder="Optional notes..." rows={3} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label>Last Outcome</Label>
                    <Select
                        value={form.watch('lastOutcome') || '__none__'}
                        onValueChange={(value) => form.setValue('lastOutcome', (value === '__none__' ? null : value) as any)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select outcome" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="__none__">None</SelectItem>
                            {MANUAL_CUSTOMER_SERVICE_OUTCOMES.map((outcome) => (
                                <SelectItem key={outcome} value={outcome}>
                                    {outcome.charAt(0).toUpperCase() + outcome.slice(1).replace('_', ' ')}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Last Outcome At</Label>
                    <Input
                        type="datetime-local"
                        value={form.watch('lastOutcomeAt') ? new Date(form.watch('lastOutcomeAt')!).toISOString().slice(0, 16) : ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            form.setValue('lastOutcomeAt', value ? new Date(value).toISOString() : null);
                        }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Service'}
                </Button>
            </div>
        </form>
    );
}
