'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImagePreview } from '@/components/ui/image-preview';
import { HeroGallery } from './HeroGallery';
import { ServiceDescription } from './ServiceDescription';
import { ServiceAreas } from './ServiceAreas';
import { ServiceSidebar } from './ServiceSidebar';
import { useServiceDetail } from '@/hooks/useServiceDetail';
import { SERVICES_CONFIG } from '@/configs/services';

export function ServiceDetailContent() {
    const {
        service,
        isLoading,
        error,
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
    } = useServiceDetail();

    if (isLoading) {
        return null; // Loading handled by parent
    }

    if (error || !service) {
        return null; // Error handled by parent
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-white">
            <div className="relative">
                <div className="absolute inset-0 h-96 bg-gradient-to-b from-primary/5 via-transparent to-transparent" aria-hidden="true" />
                <div className="container-custom relative py-6">
                    {/* Back Button */}
                    <Button variant="ghost" asChild className="mb-6 -ml-2 text-gray-600 hover:text-gray-900 group">
                        <Link href="/services" aria-label={SERVICES_CONFIG.detail.backButton}>
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                            {SERVICES_CONFIG.detail.backButton}
                        </Link>
                    </Button>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <HeroGallery
                                service={service}
                                mainImage={mainImage}
                                galleryImages={galleryImages}
                                onImageClick={openImagePreview}
                            />
                            <ServiceDescription service={service} youtubeVideoId={youtubeVideoId} />
                            <ServiceAreas service={service} />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <ServiceSidebar service={service} isLiked={isLiked} onToggleLike={toggleLike} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            <ImagePreview
                images={allImageUrls}
                initialIndex={previewStartIndex}
                isOpen={isImagePreviewOpen}
                onClose={closeImagePreview}
                title={service.name}
            />
        </div>
    );
}
