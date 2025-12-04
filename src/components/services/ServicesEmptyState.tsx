'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SERVICES_CONFIG } from '@/configs/services';

interface ServicesEmptyStateProps {
    hasActiveFilters: boolean;
    onClearFilters: () => void;
}

export function ServicesEmptyState({ hasActiveFilters, onClearFilters }: ServicesEmptyStateProps) {
    return (
        <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{SERVICES_CONFIG.emptyState.title}</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {hasActiveFilters
                    ? SERVICES_CONFIG.emptyState.descriptionWithFilters
                    : SERVICES_CONFIG.emptyState.descriptionWithoutFilters}
            </p>
            {hasActiveFilters && (
                <Button onClick={onClearFilters} variant="outline" className="rounded-xl">
                    {SERVICES_CONFIG.emptyState.clearFiltersLabel}
                </Button>
            )}
        </div>
    );
}
