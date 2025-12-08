import { PaginationInfo } from './common';

export interface GalleryImage {
    _id: string;
    url: string;
    main: boolean;
}

export interface MainImage {
    _id: string;
    url: string;
}

export interface Service {
    _id: string;
    name: string;
    category: string;
    baseCost: number;
    durationMinutes: number;
    description: string;
    isAvailable: boolean;
    youtubeEmbedUrl?: string;
    createdAt: string;
    updatedAt: string;
    gallery?: GalleryImage[];
    mainImage?: MainImage;
}

export interface ServiceListResponse {
    services: Service[];
    pagination: PaginationInfo;
}

export interface ServiceFilters {
    search?: string;
    category?: string;
    minCost?: number;
    maxCost?: number;
    isAvailable?: boolean;
    limit?: number;
    offset?: number;
}

export interface CreateServiceInput {
    name: string;
    category?: string;
    baseCost: number;
    durationMinutes: number;
    description?: string;
    isAvailable?: boolean;
    gallery: File[];
    mainFlags: boolean[];
    youtubeEmbedUrl?: string;
}

export interface UpdateServiceInput {
    id: string;
    name?: string;
    category?: string;
    baseCost?: number;
    durationMinutes?: number;
    description?: string;
    isAvailable?: boolean;
    gallery?: File[];
    mainFlags?: boolean[];
    image_ids?: string[];
    main_image_id?: string;
    youtubeEmbedUrl?: string;
}
