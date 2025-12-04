'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Wrench, IndianRupee, Timer, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ServiceCardSkeleton } from './ui/LoadingState';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';
import type { ServiceCardProps } from '@/types/admin-booking-detail';

export function ServiceCard({ service, isLoading }: ServiceCardProps) {
    if (isLoading) {
        return <ServiceCardSkeleton />;
    }

    const serviceImage = service.mainImage?.url || service.gallery?.find((img) => img.main)?.url || null;

    return (
        <Card className="overflow-hidden border-0 shadow-sm" aria-label="Service information">
            <div className="flex flex-col md:flex-row">
                {/* Service Image */}
                <div className="relative h-48 md:h-auto md:w-72 shrink-0 bg-muted">
                    {serviceImage ? (
                        <Image
                            src={serviceImage}
                            alt={service.name}
                            fill
                            className="object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 288px"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center" aria-hidden="true">
                            <Wrench className="h-16 w-16 text-muted-foreground/30" />
                        </div>
                    )}
                </div>

                {/* Service Details */}
                <div className="flex-1 p-6">
                    <div className="flex flex-col h-full">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <p className="text-sm font-medium text-primary mb-1">{service.category}</p>
                                <h2 className="text-xl font-semibold">{service.name}</h2>
                            </div>
                            <Badge
                                variant={service.isAvailable ? 'default' : 'secondary'}
                                className="shrink-0"
                                aria-label={`Service is ${service.isAvailable ? ADMIN_BOOKING_DETAIL_CONFIG.service.availableLabel : ADMIN_BOOKING_DETAIL_CONFIG.service.unavailableLabel}`}
                            >
                                {service.isAvailable
                                    ? ADMIN_BOOKING_DETAIL_CONFIG.service.availableLabel
                                    : ADMIN_BOOKING_DETAIL_CONFIG.service.unavailableLabel}
                            </Badge>
                        </div>

                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{service.description}</p>

                        <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100" aria-hidden="true">
                                    <IndianRupee className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">{ADMIN_BOOKING_DETAIL_CONFIG.service.baseCostLabel}</p>
                                    <p className="font-semibold">₹{service.baseCost}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100" aria-hidden="true">
                                    <Timer className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">{ADMIN_BOOKING_DETAIL_CONFIG.service.durationLabel}</p>
                                    <p className="font-semibold">{service.durationMinutes} min</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t flex flex-wrap gap-3">
                            <Button variant="outline" asChild>
                                <Link href={`/services/${service._id}`} target="_blank" aria-label={`Open ${service.name} public page`}>
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    {ADMIN_BOOKING_DETAIL_CONFIG.service.publicPageLabel}
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={`/admin/services/${service._id}`} aria-label={`Edit ${service.name} service`}>
                                    <Wrench className="mr-2 h-4 w-4" />
                                    {ADMIN_BOOKING_DETAIL_CONFIG.service.editServiceLabel}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
