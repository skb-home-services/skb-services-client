'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SERVICES_CONFIG } from '@/configs/services';
import type { Service, GalleryImage } from '@/types';

interface HeroGalleryProps {
    service: Service;
    mainImage: GalleryImage | undefined;
    galleryImages: GalleryImage[];
    onImageClick: (index: number) => void;
}

const ServiceImage = memo(function ServiceImage({
    image,
    alt,
    onClick,
    priority = false,
    className = '',
}: {
    image: GalleryImage;
    alt: string;
    onClick: () => void;
    priority?: boolean;
    className?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`relative block w-full aspect-[16/10] group cursor-pointer ${className}`}
            aria-label={`View ${alt} in full screen`}
        >
            <Image
                src={image.url}
                alt={alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                    <Maximize2 className="h-4 w-4 text-gray-700" aria-hidden="true" />
                    <span className="text-sm font-medium text-gray-700">{SERVICES_CONFIG.detail.gallery.previewHint}</span>
                </div>
            </div>
        </button>
    );
});

const GalleryThumbnail = memo(function GalleryThumbnail({
    image,
    alt,
    onClick,
    index,
}: {
    image: GalleryImage;
    alt: string;
    onClick: () => void;
    index: number;
}) {
    return (
        <button
            onClick={onClick}
            className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-lg shadow-gray-100/50 hover:shadow-xl transition-shadow"
            aria-label={`View gallery image ${index + 1}`}
        >
            <Image
                src={image.url}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <Maximize2
                    className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                    aria-hidden="true"
                />
            </div>
        </button>
    );
});

export function HeroGallery({ service, mainImage, galleryImages, onImageClick }: HeroGalleryProps) {
    return (
        <>
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-gray-200/50 animate-fade-in-up">
                {mainImage ? (
                    <ServiceImage image={mainImage} alt={service.name} onClick={() => onImageClick(0)} priority />
                ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl">
                        <div className="text-center">
                            <span className="text-7xl block mb-4" role="img" aria-label="Tool icon">
                                🛠️
                            </span>
                            <span className="text-gray-400 font-medium">{SERVICES_CONFIG.detail.gallery.noImage}</span>
                        </div>
                    </div>
                )}
                {/* Category badge */}
                {mainImage && (
                    <div className="absolute top-6 left-6">
                        <Badge className="bg-white/95 backdrop-blur-sm text-gray-800 border-0 shadow-lg px-4 py-1.5 font-medium">
                            {service.category}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        {SERVICES_CONFIG.detail.gallery.title}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {galleryImages.map((image, index) => (
                            <GalleryThumbnail
                                key={image._id}
                                image={image}
                                alt={`${service.name} gallery ${index + 1}`}
                                onClick={() => onImageClick(index + 1)}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
