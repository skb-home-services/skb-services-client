'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Maximize2 } from 'lucide-react';
import { BOOKING_CONFIG } from '@/configs/booking';
import type { Service } from '@/types';

interface HeaderSectionProps {
    service: Service;
    serviceId: string;
    mainImageUrl?: string;
    onImageClick: () => void;
}

export function HeaderSection({ service, serviceId, mainImageUrl, onImageClick }: HeaderSectionProps) {
    return (
        <div className="bg-white border-b border-gray-100">
            <div className="container-custom py-6">
                <Button variant="ghost" asChild className="mb-4 -ml-2 text-gray-600 hover:text-gray-900">
                    <Link href={`/services/${serviceId}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {BOOKING_CONFIG.header.backButton}
                    </Link>
                </Button>

                <div className="flex items-start gap-6">
                    {/* Service Thumbnail with Preview */}
                    {mainImageUrl && (
                        <button
                            onClick={onImageClick}
                            className="relative hidden sm:block w-24 h-24 rounded-2xl overflow-hidden shrink-0 group shadow-lg"
                            aria-label="Preview service images"
                        >
                            <Image
                                src={mainImageUrl}
                                alt={service.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                                {service.category}
                            </Badge>
                            <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Available
                            </Badge>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                            {BOOKING_CONFIG.header.titlePrefix} {service.name}
                        </h1>
                        <p className="text-gray-500">{BOOKING_CONFIG.header.subtitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
