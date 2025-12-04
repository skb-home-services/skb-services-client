'use client';

import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionSkeleton } from '../ui/LoadingState';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';
import type { AddressSectionProps } from '@/types/admin-booking-detail';

export function AddressSection({ address, isLoading }: AddressSectionProps) {
    if (isLoading) {
        return <SectionSkeleton />;
    }

    const primaryAddress = ADMIN_BOOKING_DETAIL_CONFIG.formats.address.primaryFormat(address);
    const secondaryAddress = ADMIN_BOOKING_DETAIL_CONFIG.formats.address.secondaryFormat(address);

    return (
        <Card className="border-0 shadow-sm" aria-label="Service location">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10" aria-hidden="true">
                        <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    {ADMIN_BOOKING_DETAIL_CONFIG.address.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1 space-y-2">
                        <p className="font-semibold text-lg">{primaryAddress}</p>
                        {address.line2 && <p className="text-muted-foreground">{address.line2}</p>}
                        <p className="text-muted-foreground">{secondaryAddress}</p>
                        {address.landmark && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                                <MapPin className="h-4 w-4" aria-hidden="true" />
                                <span>
                                    {ADMIN_BOOKING_DETAIL_CONFIG.address.landmarkPrefix} {address.landmark}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="text-sm py-1.5 px-3">
                            {ADMIN_BOOKING_DETAIL_CONFIG.address.areaCodeLabel}: {address.pincode}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
