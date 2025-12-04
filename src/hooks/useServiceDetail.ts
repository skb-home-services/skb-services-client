'use client';

import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getServiceById } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { extractYouTubeVideoId } from '@/components/ui/youtube-player';
import type { Service, GalleryImage } from '@/types';

export interface UseServiceDetailReturn {
    service: Service | undefined;
    isLoading: boolean;
    error: Error | null;
    // Image preview state
    isImagePreviewOpen: boolean;
    previewStartIndex: number;
    openImagePreview: (index: number) => void;
    closeImagePreview: () => void;
    // Image data
    mainImage: GalleryImage | undefined;
    galleryImages: GalleryImage[];
    allImageUrls: string[];
    // YouTube
    youtubeVideoId: string | null;
    // Like/share
    isLiked: boolean;
    toggleLike: () => void;
    // Computed values
    pinCodeCount: number;
}

export function useServiceDetail(): UseServiceDetailReturn {
    const params = useParams();
    const id = params.id as string;

    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const [previewStartIndex, setPreviewStartIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const {
        data: service,
        isLoading,
        error,
    } = useQuery({
        queryKey: queryKeys.services.detail(id),
        queryFn: () => getServiceById(id),
        enabled: !!id,
    });

    const openImagePreview = useCallback((index: number) => {
        setPreviewStartIndex(index);
        setIsImagePreviewOpen(true);
    }, []);

    const closeImagePreview = useCallback(() => {
        setIsImagePreviewOpen(false);
    }, []);

    const toggleLike = useCallback(() => {
        setIsLiked((prev) => !prev);
    }, []);

    // Memoized image data
    const { mainImage, galleryImages, allImageUrls } = useMemo(() => {
        if (!service?.gallery) {
            return {
                mainImage: undefined,
                galleryImages: [],
                allImageUrls: [],
            };
        }

        const main = service.gallery.find((img) => img.main);
        const gallery = service.gallery.filter((img) => !img.main);
        const allUrls = service.gallery.map((img) => img.url);

        return {
            mainImage: main,
            galleryImages: gallery,
            allImageUrls: allUrls,
        };
    }, [service?.gallery]);

    // Memoized YouTube video ID
    const youtubeVideoId = useMemo(() => {
        if (!service?.youtubeEmbedUrl) return null;
        return extractYouTubeVideoId(service.youtubeEmbedUrl);
    }, [service?.youtubeEmbedUrl]);

    // Memoized pin code count
    const pinCodeCount = useMemo(() => {
        return service?.pinCodesCovered?.length || 0;
    }, [service?.pinCodesCovered]);

    return {
        service,
        isLoading,
        error: error as Error | null,
        isImagePreviewOpen,
        previewStartIndex,
        openImagePreview,
        closeImagePreview,
        mainImage,
        galleryImages,
        allImageUrls,
        youtubeVideoId,
        isLiked,
        toggleLike,
        pinCodeCount,
    };
}
