import { z } from 'zod';
import { phoneNumberSchema } from './phoneSchema';

export const inquirySchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: phoneNumberSchema,
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
