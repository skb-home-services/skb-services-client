'use client';

import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { BOOKING_CONFIG } from '@/configs/booking';
import { formatCurrency, formatDuration } from '@/lib/utils';
import type { Service } from '@/types';
import { GalleryPreview } from './GalleryPreview';

interface BookingSummaryProps {
    service: Service;
    allImages: string[];
    onImageClick: (index: number) => void;
}

export const BookingSummary = memo(function BookingSummary({ service, allImages, onImageClick }: BookingSummaryProps) {
    const config = BOOKING_CONFIG.sidebar.summary;

    return (
        <Card className="border-0 shadow-xl shadow-gray-200/50 overflow-hidden">
            <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6">
                <h3 className="font-semibold text-lg mb-1">{config.title}</h3>
                <p className="text-white/70 text-sm">{config.subtitle}</p>
            </div>
            <CardContent className="p-6 space-y-4">
                {/* Service Image Gallery Preview */}
                <GalleryPreview images={allImages} onImageClick={onImageClick} />

                <div className="pt-2 space-y-3">
                    <div className="flex justify-between items-start">
                        <span className="text-gray-500 text-sm">{config.serviceLabel}</span>
                        <span className="font-semibold text-gray-900 text-right max-w-[60%]">{service.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">{config.categoryLabel}</span>
                        <Badge variant="secondary" className="bg-gray-100">
                            {service.category}
                        </Badge>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">{config.durationLabel}</span>
                        <span className="text-gray-700 flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-gray-400" aria-hidden="true" />
                            {formatDuration(service.durationMinutes)}
                        </span>
                    </div>
                    <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-900 font-medium">{config.basePriceLabel}</span>
                            <span className="text-2xl font-bold text-primary">{formatCurrency(service.baseCost)}</span>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">{config.priceDisclaimer}</p>
            </CardContent>
        </Card>
    );
});
