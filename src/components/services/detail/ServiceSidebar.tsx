'use client';

import { memo, useCallback } from 'react';
import Link from 'next/link';
import { Clock, CheckCircle, Heart, Share2, Star, CalendarCheck, ChevronRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatCurrency, formatDuration } from '@/lib/utils';
import { SERVICES_CONFIG } from '@/configs/services';
import { useAuth } from '@/providers/AuthProvider';
import type { Service } from '@/types';

interface ServiceSidebarProps {
    service: Service;
    isLiked: boolean;
    onToggleLike: () => void;
}

const TrustSignalItem = memo(function TrustSignalItem({
    icon: Icon,
    title,
    description,
    color,
}: {
    icon: typeof Shield;
    title: string;
    description: string;
    color: 'emerald' | 'blue' | 'amber';
}) {
    const colorClasses = {
        emerald: 'bg-emerald-50 text-emerald-600',
        blue: 'bg-blue-50 text-blue-600',
        amber: 'bg-amber-50 text-amber-600',
    };

    return (
        <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorClasses[color]}`} aria-hidden="true">
                <Icon className="w-4 h-4" />
            </div>
            <div>
                <p className="font-medium text-gray-900 text-sm">{title}</p>
                <p className="text-gray-500 text-xs">{description}</p>
            </div>
        </div>
    );
});

export function ServiceSidebar({ service, isLiked, onToggleLike }: ServiceSidebarProps) {
    const { sidebar, trustSignals } = SERVICES_CONFIG.detail;
    const { isAuthenticated } = useAuth();

    const handleShare = useCallback(async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: service.name,
                    text: service.description,
                    url: window.location.href,
                });
            } catch (err) {
                // User cancelled or error occurred
                console.log('Share cancelled or failed');
            }
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
        }
    }, [service]);

    // Determine the booking link based on authentication
    const bookingLink = isAuthenticated ? `/services/${service._id}/book` : '/login';

    return (
        <div className="sticky top-24 space-y-6">
            {/* Main CTA Card */}
            <Card className="border-0 shadow-2xl shadow-gray-200/50 overflow-hidden animate-fade-in" style={{ animationDelay: '50ms' }}>
                <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-emerald-500" aria-hidden="true" />
                <CardContent className="p-6">
                    {/* Title & Category */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-medium">
                                {service.category}
                            </Badge>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onToggleLike}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    <Heart
                                        className={cn('w-5 h-5 transition-colors', isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400')}
                                    />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="Share service"
                                >
                                    <Share2 className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="flex items-center" role="img" aria-label={`Rating: ${sidebar.rating} stars`}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                                ))}
                            </div>
                            <span>{sidebar.rating}</span>
                            <span className="text-gray-300" aria-hidden="true">
                                •
                            </span>
                            <span>{sidebar.verifiedLabel}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="bg-gradient-to-br from-primary/5 to-emerald-500/5 rounded-2xl p-5 mb-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-gray-900">
                                {formatCurrency(service.baseCost, SERVICES_CONFIG.detail.pricing.currency)}
                            </span>
                            <span className="text-gray-500">{sidebar.basePriceLabel}</span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm" aria-hidden="true">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{sidebar.durationLabel}</p>
                                <p className="font-semibold text-gray-900">{formatDuration(service.durationMinutes)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm" aria-hidden="true">
                                <CheckCircle className={cn('h-5 w-5', service.isAvailable ? 'text-emerald-500' : 'text-gray-400')} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{sidebar.availabilityLabel}</p>
                                <p className={cn('font-semibold', service.isAvailable ? 'text-emerald-600' : 'text-gray-500')}>
                                    {service.isAvailable ? sidebar.availableNow : sidebar.unavailable}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                        className={cn(
                            'w-full h-14 rounded-xl text-lg font-semibold transition-all duration-300 group',
                            service.isAvailable
                                ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        )}
                        size="lg"
                        disabled={!service.isAvailable}
                        asChild={service.isAvailable}
                    >
                        {service.isAvailable ? (
                            <Link
                                href={bookingLink}
                                className="flex items-center justify-center gap-2"
                                aria-label={isAuthenticated ? `${sidebar.bookNow} - ${service.name}` : 'Login to book this service'}
                            >
                                <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                                <span>{sidebar.bookNow}</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </Link>
                        ) : (
                            <span>{sidebar.unavailable}</span>
                        )}
                    </Button>

                    {/* Contact Link */}
                    <p className="mt-4 text-center text-sm text-gray-500">
                        {sidebar.contactQuestion}{' '}
                        <Link
                            href="/inquiry"
                            className="font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                        >
                            {sidebar.contactLink}
                            <ChevronRight className="w-3 h-3" aria-hidden="true" />
                        </Link>
                    </p>
                </CardContent>
            </Card>

            {/* Trust Signals */}
            <Card className="border-0 shadow-lg shadow-gray-100/50 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">{trustSignals.title}</h3>
                    <div className="space-y-4">
                        {trustSignals.items.map((signal, index) => {
                            const Icon = signal.icon === 'Shield' ? Shield : signal.icon === 'CheckCircle' ? CheckCircle : Star;
                            return (
                                <TrustSignalItem
                                    key={index}
                                    icon={Icon}
                                    title={signal.title}
                                    description={signal.description}
                                    color={signal.color as 'emerald' | 'blue' | 'amber'}
                                />
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
