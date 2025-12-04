'use client';

import { ServiceCard } from '@/components/common';
import { SERVICES_CONFIG } from '@/configs/services';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

type ViewMode = 'grid' | 'list';

interface ServicesResultsProps {
    services: Service[];
    viewMode: ViewMode;
    totalCount?: number;
    onImagePreview: (service: Service, startIndex: number) => void;
}

export function ServicesResults({ services, viewMode, totalCount, onImagePreview }: ServicesResultsProps) {
    return (
        <>
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {SERVICES_CONFIG.results.showingLabel} <span className="font-medium text-foreground">{services.length}</span>{' '}
                    {services.length === 1 ? SERVICES_CONFIG.results.serviceLabel : SERVICES_CONFIG.results.servicesLabel}
                    {totalCount && services.length !== totalCount && (
                        <span>
                            {' '}
                            {SERVICES_CONFIG.results.ofLabel} {totalCount}
                        </span>
                    )}
                </p>
            </div>

            {/* Services Grid/List */}
            <div
                className={cn('animate-fade-in', viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-4')}
            >
                {services.map((service, index) => (
                    <div key={service._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                        <ServiceCard
                            service={service}
                            viewMode={viewMode}
                            onImagePreview={(startIndex) => onImagePreview(service, startIndex)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
