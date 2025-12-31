import { z } from 'zod';
import { phoneNumberSchema, optionalPhoneNumberSchema } from './phoneSchema';
import { manualCustomerAddressSchema } from './addressSchema';
import { MANUAL_CUSTOMER_CHANNELS } from '@/configs/config';

export const manualCustomerServiceStatuses = ['active', 'paused', 'completed'] as const;
export const manualCustomerServiceOutcomes = ['completed', 'no_response', 'declined', 'rescheduled'] as const;

export const manualCustomerServiceSchema = z.object({
    serviceId: z.string().min(1, 'Service ID is required'),
    lastTakenAt: z.string().nullable().optional(),
    channels: z.array(z.enum(MANUAL_CUSTOMER_CHANNELS)).min(1, 'At least one channel is required'),
    notes: z.string().nullable().optional(),
    status: z.enum(manualCustomerServiceStatuses),
    lastOutcome: z.enum(manualCustomerServiceOutcomes).nullable().optional(),
    lastOutcomeAt: z.string().nullable().optional(),
});

export const createManualCustomerSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.preprocess((val) => (val === '' ? undefined : val), z.string().email('Please enter a valid email address').optional()),
    phone: phoneNumberSchema,
    isActive: z.boolean().default(true),
    address: manualCustomerAddressSchema,
});

export const updateManualCustomerSchema = z.object({
    id: z.string(),
    fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
    email: z.preprocess((val) => (val === '' ? undefined : val), z.string().email('Please enter a valid email address').optional()),
    phone: optionalPhoneNumberSchema,
    isActive: z.boolean().optional(),
    address: manualCustomerAddressSchema,
});

export const addManualCustomerServicesSchema = z.object({
    customerId: z.string(),
    services: z.array(manualCustomerServiceSchema).min(1, 'At least one service is required'),
});

export const updateManualCustomerServiceSchema = z.object({
    customerId: z.string(),
    serviceId: z.string(),
    lastTakenAt: z.string().nullable().optional(),
    channels: z.array(z.enum(MANUAL_CUSTOMER_CHANNELS)).optional(),
    notes: z.string().nullable().optional(),
    status: z.enum(manualCustomerServiceStatuses).optional(),
    lastOutcome: z.enum(manualCustomerServiceOutcomes).nullable().optional(),
    lastOutcomeAt: z.string().nullable().optional(),
});

export const updateManualCustomerServiceOutcomeSchema = z.object({
    customerId: z.string(),
    serviceId: z.string(),
    outcome: z.enum(manualCustomerServiceOutcomes),
    notes: z.string().optional(),
    updateStatus: z.boolean().optional(),
});

export type ManualCustomerServiceFormData = z.infer<typeof manualCustomerServiceSchema>;
export type CreateManualCustomerFormData = z.infer<typeof createManualCustomerSchema>;
export type UpdateManualCustomerFormData = z.infer<typeof updateManualCustomerSchema>;
export type AddManualCustomerServicesFormData = z.infer<typeof addManualCustomerServicesSchema>;
export type UpdateManualCustomerServiceFormData = z.infer<typeof updateManualCustomerServiceSchema>;
export type UpdateManualCustomerServiceOutcomeFormData = z.infer<typeof updateManualCustomerServiceOutcomeSchema>;
