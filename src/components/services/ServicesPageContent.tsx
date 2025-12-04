'use client';

import { useServicesPage } from '@/hooks/useServicesPage';
import { ServicesHero } from './ServicesHero';
import { ServicesFilters } from './ServicesFilters';
import { ServicesResults } from './ServicesResults';
import { ServicesEmptyState } from './ServicesEmptyState';
import { ServicesError } from './ServicesError';
import { ImagePreview } from '@/components/ui/image-preview';
import { PageLoader } from '@/components/common';

export function ServicesPageContent() {
    const {
        services,
        pagination,
        isLoading,
        error,
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
        clearFilters,
        handleImagePreview,
        closeImagePreview,
        imagePreview,
    } = useServicesPage();

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return <ServicesError />;
    }

    return (
        <div className="container-custom py-12">
            <ServicesHero />

            <ServicesFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                sortBy={sortBy}
                onSortChange={(value) => setSortBy(value as any)}
                availableOnly={availableOnly}
                onAvailableOnlyToggle={() => setAvailableOnly(!availableOnly)}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                hasActiveFilters={hasActiveFilters}
                activeCategoryLabel={activeCategoryLabel}
                onClearFilters={clearFilters}
            />

            {services.length > 0 ? (
                <ServicesResults
                    services={services}
                    viewMode={viewMode}
                    totalCount={pagination?.totalCount}
                    onImagePreview={handleImagePreview}
                />
            ) : (
                <ServicesEmptyState hasActiveFilters={hasActiveFilters} onClearFilters={clearFilters} />
            )}

            {/* Image Preview Modal */}
            <ImagePreview
                images={imagePreview.images}
                initialIndex={imagePreview.startIndex}
                isOpen={imagePreview.isOpen}
                onClose={closeImagePreview}
                title={imagePreview.title}
            />
        </div>
    );
}
