import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_GALLERY_IMAGES } from '@/configs/config';

export const imageValidation = z
    .custom<File>()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), `Only ${ACCEPTED_IMAGE_TYPES.join(', ')} formats are supported`);

export type ImageFormData = z.infer<typeof imageValidation>;

export const imageGalleryValidation = z
    .array(z.custom<File>())
    .max(MAX_GALLERY_IMAGES, `Maximum ${MAX_GALLERY_IMAGES} images allowed in gallery`)
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), `Each file must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
    .refine(
        (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
        'Only .jpg, .jpeg, .png and .webp formats are supported'
    );

export const imageGallerySchema = imageGalleryValidation.optional();
