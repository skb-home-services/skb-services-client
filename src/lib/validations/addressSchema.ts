import { z } from 'zod';

export const addressSchema = z.object({
    houseNumber: z.string().min(1, 'House number is required'),
    line1: z.string().min(1, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().min(1, 'Pincode is required'),
    landmark: z.string().optional(),
});

export const manualCustomerAddressSchema = z.object({
    houseNumber: z.string().trim().optional(),
    line1: z.string().trim().optional(),
    line2: z.string().trim().optional(),
    city: z.string().trim().optional(),
    state: z.string().trim().optional(),
    pincode: z.string().trim().optional(),
    landmark: z.string().optional(),
});

export type AddressData = z.infer<typeof addressSchema>;
