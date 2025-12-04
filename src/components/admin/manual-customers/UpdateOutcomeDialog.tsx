'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateManualCustomerServiceOutcomeSchema, type UpdateManualCustomerServiceOutcomeFormData } from '@/lib/validations';
import { MANUAL_CUSTOMER_SERVICE_OUTCOMES } from '@/configs/config';
import type { ManualCustomerService } from '@/types';

interface UpdateOutcomeDialogProps {
    customerId: string;
    service: ManualCustomerService;
    onSubmit: (data: UpdateManualCustomerServiceOutcomeFormData) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function UpdateOutcomeDialog({ customerId, service, onSubmit, onCancel, isLoading }: UpdateOutcomeDialogProps) {
    const form = useForm<UpdateManualCustomerServiceOutcomeFormData>({
        resolver: zodResolver(updateManualCustomerServiceOutcomeSchema),
        defaultValues: {
            customerId,
            serviceId: service._id,
            outcome: service.lastOutcome || 'completed',
            notes: service.notes || '',
            updateStatus: false,
        },
    });

    const handleSubmit = form.handleSubmit(
        async (data) => {
            try {
                console.log('Submitting outcome update:', data);
                await onSubmit(data);
            } catch (error) {
                console.error('Error submitting outcome update:', error);
            }
        },
        (errors) => {
            console.error('Form validation errors:', errors);
        }
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label>Service</Label>
                <p className="font-medium">{service.serviceInfo?.name || 'Unknown Service'}</p>
            </div>

            <div className="space-y-2">
                <Label>
                    Outcome <span className="text-destructive">*</span>
                </Label>
                <Controller
                    name="outcome"
                    control={form.control}
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select outcome" />
                            </SelectTrigger>
                            <SelectContent>
                                {MANUAL_CUSTOMER_SERVICE_OUTCOMES.map((outcome) => (
                                    <SelectItem key={outcome} value={outcome}>
                                        {outcome.charAt(0).toUpperCase() + outcome.slice(1).replace('_', ' ')}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {form.formState.errors.outcome && <p className="text-sm text-destructive">{form.formState.errors.outcome.message}</p>}
            </div>

            <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea {...form.register('notes')} placeholder="Optional notes about the outcome..." rows={3} />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="updateStatus"
                    {...form.register('updateStatus')}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="updateStatus" className="font-normal cursor-pointer">
                    Update service status to match outcome
                </Label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Outcome'}
                </Button>
            </div>
        </form>
    );
}
