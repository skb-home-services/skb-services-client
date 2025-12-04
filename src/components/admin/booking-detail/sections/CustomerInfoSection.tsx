'use client';

import Link from 'next/link';
import { User, Mail, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfoCard } from '../ui/InfoCard';
import { PhoneDisplay } from '../ui/PhoneDisplay';
import { SectionSkeleton } from '../ui/LoadingState';
import { ADMIN_BOOKING_DETAIL_CONFIG } from '@/configs/admin-booking-detail';
import type { CustomerInfoSectionProps } from '@/types/admin-booking-detail';

export function CustomerInfoSection({ customer, isLoading }: CustomerInfoSectionProps) {
    if (isLoading) {
        return <SectionSkeleton />;
    }

    const customerType = customer.uid
        ? ADMIN_BOOKING_DETAIL_CONFIG.customer.registeredUserLabel
        : ADMIN_BOOKING_DETAIL_CONFIG.customer.guestCustomerLabel;

    return (
        <Card className="border-0 shadow-sm" aria-label="Customer information">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10" aria-hidden="true">
                        <User className="h-4 w-4 text-primary" />
                    </div>
                    {ADMIN_BOOKING_DETAIL_CONFIG.customer.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0" aria-hidden="true">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-semibold truncate">{customer.fullName}</p>
                            <p className="text-sm text-muted-foreground">{customerType}</p>
                        </div>
                    </div>
                    {customer.uid && (
                        <Button variant="outline" size="sm" asChild className="shrink-0">
                            <Link href={`/admin/users/${customer.uid}`} aria-label={`View profile for ${customer.fullName}`}>
                                <ArrowUpRight className="mr-2 h-3 w-3" />
                                {ADMIN_BOOKING_DETAIL_CONFIG.customer.viewProfileLabel}
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="space-y-3">
                    <InfoCard
                        label={ADMIN_BOOKING_DETAIL_CONFIG.customer.emailLabel}
                        value={
                            <a
                                href={`mailto:${customer.email}`}
                                className="text-sm font-medium hover:text-primary transition-colors"
                                aria-label={`Send email to ${customer.email}`}
                            >
                                {customer.email}
                            </a>
                        }
                        icon={Mail}
                    />

                    <PhoneDisplay phone={customer.phone} label={ADMIN_BOOKING_DETAIL_CONFIG.customer.phoneLabel} />

                    {customer.secondaryPhone && (
                        <PhoneDisplay phone={customer.secondaryPhone} label={ADMIN_BOOKING_DETAIL_CONFIG.customer.secondaryPhoneLabel} />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
