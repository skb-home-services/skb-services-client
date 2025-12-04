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
    pinCodesCovered: string[];
    youtubeEmbedUrl?: string;
    createdAt: string;
    updatedAt: string;
    /** Full gallery (returned in single service fetch) */
    gallery?: GalleryImage[];
    /** Main image only (returned in list responses) */
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
    pinCodesCovered?: string[];
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
    pinCodesCovered?: string[];
    /** New gallery files to upload */
    gallery?: File[];
    /** Flags indicating which new files are main images */
    mainFlags?: boolean[];
    /** IDs of existing images to remove */
    image_ids?: string[];
    /** ID of an existing image to promote as main */
    main_image_id?: string;
    youtubeEmbedUrl?: string;
}
