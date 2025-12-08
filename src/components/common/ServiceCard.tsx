'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Images, Maximize2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDuration, cn } from '@/lib/utils';
import type { Service } from '@/types';

interface ServiceCardProps {
    service: Service;
    viewMode?: 'grid' | 'list';
    onImagePreview?: (startIndex: number) => void;
}

export function ServiceCard({ service, viewMode = 'grid', onImagePreview }: ServiceCardProps) {
    const [isHovering, setIsHovering] = useState(false);

    // Get main image URL from mainImage (list response) or gallery (detail response)
    const mainImageUrl = service.mainImage?.url || service.gallery?.find((img) => img.main)?.url;
    const galleryCount = service.gallery?.length || (service.mainImage ? 1 : 0);
    const hasGallery = galleryCount > 1;

    const handleImageClick = (e: React.MouseEvent) => {
        if (onImagePreview) {
            e.preventDefault();
            e.stopPropagation();
            onImagePreview(0);
        }
    };

    if (viewMode === 'list') {
        return (
            <Card className="group overflow-hidden transition-all hover:shadow-lg border-0 bg-card/50">
                <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div
                        className="relative aspect-video sm:aspect-square sm:w-48 md:w-56 shrink-0 overflow-hidden cursor-pointer"
                        onClick={handleImageClick}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {mainImageUrl ? (
                            <>
                                <Image
                                    src={mainImageUrl}
                                    alt={service.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, 224px"
                                />
                                {/* Hover Overlay */}
                                <div
                                    className={cn(
                                        'absolute inset-0 flex items-center justify-center bg-black/0 transition-all',
                                        isHovering && 'bg-black/40'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 transition-all',
                                            isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                                        )}
                                    >
                                        <Maximize2 className="h-4 w-4 text-gray-800" />
                                        <span className="text-sm font-medium text-gray-800">Preview</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex h-full items-center justify-center bg-muted">
                                <span className="text-4xl text-muted-foreground">🛠️</span>
                            </div>
                        )}

                        {/* Gallery Indicator */}
                        {hasGallery && (
                            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                                <Images className="h-3 w-3" />
                                {galleryCount}
                            </div>
                        )}

                        {!service.isAvailable && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <Badge variant="secondary">Unavailable</Badge>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <div className="mb-2 flex items-start justify-between gap-2">
                            <div>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{service.name}</h3>
                                <Badge variant="outline" className="mt-1">
                                    {service.category}
                                </Badge>
                            </div>
                            <div className="text-xl font-bold text-primary">{formatCurrency(service.baseCost)}</div>
                        </div>

                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground flex-1">{service.description}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {formatDuration(service.durationMinutes)}
                                </div>
                            </div>
                            <Button asChild size="sm" className="rounded-xl gap-1.5">
                                <Link href={`/services/${service._id}`}>
                                    View Details
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    // Grid View (default)
    return (
        <Card className="group overflow-hidden transition-all hover:shadow-lg border-0 bg-card/50 flex flex-col h-full">
            <div
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={handleImageClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {mainImageUrl ? (
                    <>
                        <Image
                            src={mainImageUrl}
                            alt={service.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Hover Overlay */}
                        <div
                            className={cn(
                                'absolute inset-0 flex items-center justify-center bg-black/0 transition-all',
                                isHovering && 'bg-black/40'
                            )}
                        >
                            <div
                                className={cn(
                                    'flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 transition-all',
                                    isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                                )}
                            >
                                <Maximize2 className="h-4 w-4 text-gray-800" />
                                <span className="text-sm font-medium text-gray-800">Preview</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                        <span className="text-4xl text-muted-foreground">🛠️</span>
                    </div>
                )}

                {/* Gallery Indicator */}
                {hasGallery && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-lg text-xs font-medium">
                        <Images className="h-3.5 w-3.5" />
                        {galleryCount} photos
                    </div>
                )}

                {!service.isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Badge variant="secondary">Currently Unavailable</Badge>
                    </div>
                )}
            </div>

            <CardContent className="p-4 flex-1">
                <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{service.name}</h3>
                    <Badge variant="outline" className="shrink-0">
                        {service.category}
                    </Badge>
                </div>

                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{service.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDuration(service.durationMinutes)}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t p-4">
                <div className="text-lg font-bold text-primary">{formatCurrency(service.baseCost)}</div>
                <Button asChild size="sm" className="rounded-xl gap-1.5">
                    <Link href={`/services/${service._id}`}>
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
