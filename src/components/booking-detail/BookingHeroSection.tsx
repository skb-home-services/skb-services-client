'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, IndianRupee, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BOOKING_DETAIL_CONFIG } from '@/configs/booking-detail';
import type { BookingDetail } from '@/types/booking';

interface BookingHeroSectionProps {
    service: BookingDetail['service'];
}

export function BookingHeroSection({ service }: BookingHeroSectionProps) {
    const serviceImage = service.mainImage?.url || service.gallery?.find((img) => img.main)?.url || null;

    return (
        <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
                {/* Service Image */}
                {serviceImage && (
                    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                        <Image
                            src={serviceImage}
                            alt={BOOKING_DETAIL_CONFIG.accessibility.images.serviceImage(service.name)}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                            sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                )}

                {/* Service Quick Info */}
                <div className="rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur-sm">
                    <h2 className="text-xl font-semibold text-slate-900">{service.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{service.category}</p>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div className="flex items-center gap-2 text-slate-600">
                            <IndianRupee className="h-4 w-4" aria-hidden="true" />
                            <span className="text-lg font-semibold text-slate-900">{service.baseCost}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Timer className="h-4 w-4" aria-hidden="true" />
                            <span>
                                {service.durationMinutes} {BOOKING_DETAIL_CONFIG.hero.duration.suffix}
                            </span>
                        </div>
                    </div>

                    {service.description && <p className="mt-4 text-sm leading-relaxed text-slate-500">{service.description}</p>}

                    <Button
                        asChild
                        variant="ghost"
                        className="mt-6 w-full justify-between rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        aria-label={BOOKING_DETAIL_CONFIG.accessibility.buttons.viewService(service.name)}
                    >
                        <Link href={`/services/${service._id}`}>
                            {BOOKING_DETAIL_CONFIG.hero.serviceDetails.label}
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
