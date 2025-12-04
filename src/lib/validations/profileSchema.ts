import { z } from 'zod';
import { phoneNumberSchema } from './phoneSchema';
import { imageValidation } from './imageSchema';

export const profileSchema = z.object({
    displayName: z.string().optional(),
    phone: phoneNumberSchema.optional(),
    profile_image: imageValidation.optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
