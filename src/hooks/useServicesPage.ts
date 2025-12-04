'use client';

import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { SERVICES_CONFIG } from '@/configs/services';
import type { Service } from '@/types';

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'price-low' | 'price-high' | 'duration' | 'name';

interface ImagePreviewState {
    isOpen: boolean;
    images: string[];
    startIndex: number;
    title: string;
}

export function useServicesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [availableOnly, setAvailableOnly] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [offset, setOffset] = useState(0);
    const [imagePreview, setImagePreview] = useState<ImagePreviewState>({
        isOpen: false,
        images: [],
        startIndex: 0,
        title: '',
    });

    const { data, isLoading, error } = useQuery({
        queryKey: queryKeys.services.list({ limit: SERVICES_CONFIG.itemsPerPage, offset }),
        queryFn: () => getServices({ limit: SERVICES_CONFIG.itemsPerPage, offset }),
    });

    // Filter and sort services
    const filteredServices = useMemo(() => {
        if (!data?.services) return [];

        let services = [...data.services];

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            services = services.filter(
                (service) =>
                    service.name.toLowerCase().includes(query) ||
                    service.description?.toLowerCase().includes(query) ||
                    service.category?.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (categoryFilter !== 'all') {
            services = services.filter((service) => service.category?.toLowerCase() === categoryFilter.toLowerCase());
        }

        // Available only filter
        if (availableOnly) {
            services = services.filter((service) => service.isAvailable);
        }

        // Sort
        switch (sortBy) {
            case 'price-low':
                services.sort((a, b) => a.baseCost - b.baseCost);
                break;
            case 'price-high':
                services.sort((a, b) => b.baseCost - a.baseCost);
                break;
            case 'duration':
                services.sort((a, b) => a.durationMinutes - b.durationMinutes);
                break;
            case 'name':
                services.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'newest':
            default:
                services.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return services;
    }, [data?.services, searchQuery, categoryFilter, sortBy, availableOnly]);

    // Handle image preview
    const handleImagePreview = useCallback((service: Service, startIndex: number = 0) => {
        const images: string[] = [];
        if (service.mainImage?.url) {
            images.push(service.mainImage.url);
        }
        if (service.gallery) {
            service.gallery.forEach((img) => {
                if (!img.main) images.push(img.url);
            });
        }
        if (images.length > 0) {
            setImagePreview({
                isOpen: true,
                images,
                startIndex,
                title: service.name,
            });
        }
    }, []);

    const closeImagePreview = useCallback(() => {
        setImagePreview((prev) => ({ ...prev, isOpen: false }));
    }, []);

    // Clear all filters
    const clearFilters = useCallback(() => {
        setSearchQuery('');
        setCategoryFilter('all');
        setSortBy('newest');
        setAvailableOnly(false);
    }, []);

    // Check if any filters are active
    const hasActiveFilters = useMemo(
        () => searchQuery !== '' || categoryFilter !== 'all' || sortBy !== 'newest' || availableOnly,
        [searchQuery, categoryFilter, sortBy, availableOnly]
    );

    // Get active category label
    const activeCategoryLabel = useMemo(() => {
        return SERVICES_CONFIG.categories.find((c) => c.value === categoryFilter)?.label || '';
    }, [categoryFilter]);

    return {
        // Data
        services: filteredServices,
        pagination: data?.pagination,
        isLoading,
        error,

        // Filters state
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        sortBy,
        setSortBy,
        availableOnly,
        setAvailableOnly,
        viewMode,
        setViewMode,
        hasActiveFilters,
        activeCategoryLabel,

        // Actions
        clearFilters,
        handleImagePreview,
        closeImagePreview,

        // Image preview state
        imagePreview,
    };
}
