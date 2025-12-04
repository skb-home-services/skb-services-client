'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { BOOKING_CONFIG } from '@/configs/booking';

interface GalleryPreviewProps {
    images: string[];
    onImageClick: (index: number) => void;
}

export const GalleryPreview = memo(function GalleryPreview({ images, onImageClick }: GalleryPreviewProps) {
    if (images.length === 0) return null;

    return (
        <div className="space-y-3">
            <button
                onClick={() => onImageClick(0)}
                className="relative w-full aspect-video rounded-xl overflow-hidden group"
                aria-label={BOOKING_CONFIG.gallery.previewHint}
            >
                <Image
                    src={images[0]}
                    alt="Service gallery preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Maximize2 className="w-4 h-4 text-gray-800" />
                    </div>
                </div>
            </button>
            {images.length > 1 && (
                <div className="flex gap-2">
                    {images.slice(1, 4).map((img, index) => (
                        <button
                            key={index}
                            onClick={() => onImageClick(index + 1)}
                            className="relative flex-1 aspect-square rounded-lg overflow-hidden group"
                            aria-label={`Gallery image ${index + 2}`}
                        >
                            <Image
                                src={img}
                                alt={`Gallery ${index + 2}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {index === 2 && images.length > 4 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white font-semibold">
                                        {BOOKING_CONFIG.gallery.moreImages.replace('{count}', String(images.length - 4))}
                                    </span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});
