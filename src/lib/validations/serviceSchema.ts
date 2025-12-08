import { z } from 'zod';
import { imageGalleryValidation } from './imageSchema';

export const serviceSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    category: z.string().optional(),
    baseCost: z.coerce.number().min(0, 'Base cost must be a positive number'),
    durationMinutes: z.coerce.number().min(1, 'Duration must be at least 1 minute'),
    description: z.string().optional(),
    isAvailable: z.boolean().default(true),
    gallery: imageGalleryValidation,
    mainFlags: z.array(z.boolean()).optional(),
    youtubeEmbedUrl: z.string().url().optional().or(z.literal('')),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export const editServiceSchema = z.object({
    id: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    category: z.string().optional(),
    baseCost: z.coerce.number().min(0, 'Base cost must be a positive number').optional(),
    durationMinutes: z.coerce.number().min(1, 'Duration must be at least 1 minute').optional(),
    description: z.string().optional(),
    isAvailable: z.boolean().optional(),
    gallery: z.union([imageGalleryValidation, z.array(z.string())]).optional(),
    mainFlags: z.array(z.boolean()).optional(),
    image_ids: z.array(z.string()).optional(),
    main_image_id: z.string().optional(),
    youtubeEmbedUrl: z.string().url().optional().or(z.literal('')),
});

export type EditServiceFormData = z.infer<typeof editServiceSchema>;
