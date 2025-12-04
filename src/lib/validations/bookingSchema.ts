import { z } from 'zod';
import { phoneNumberSchema, optionalPhoneNumberSchema } from './phoneSchema';
import { addressSchema } from './addressSchema';

export const bookingSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: phoneNumberSchema,
    secondaryPhone: optionalPhoneNumberSchema,
    address: addressSchema,
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
