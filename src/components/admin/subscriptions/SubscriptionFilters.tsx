'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ADMIN_SUBSCRIPTIONS_CONFIG } from '@/configs/admin-subscriptions';
import type { ServiceSubscriptionStatus } from '@/types';
import { cn } from '@/lib/utils';

interface SubscriptionFiltersProps {
    search: string;
    status: ServiceSubscriptionStatus | 'all';
    onSearchChange: (value: string) => void;
    onStatusChange: (value: ServiceSubscriptionStatus | 'all') => void;
    onClearFilters?: () => void;
    hasActiveFilters?: boolean;
    className?: string;
}

export function SubscriptionFilters({
    search,
    status,
    onSearchChange,
    onStatusChange,
    onClearFilters,
    hasActiveFilters,
    className,
}: SubscriptionFiltersProps) {
    const SearchIcon = ADMIN_SUBSCRIPTIONS_CONFIG.filters.search.icon;
    const FilterIcon = ADMIN_SUBSCRIPTIONS_CONFIG.filters.status.icon;

    return (
        <div className={cn('rounded-xl border bg-card p-4 shadow-sm', className)}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder={ADMIN_SUBSCRIPTIONS_CONFIG.filters.search.placeholder}
                        className="pl-10"
                        aria-label="Search subscriptions"
                    />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                        <FilterIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <Select value={status} onValueChange={onStatusChange}>
                            <SelectTrigger className="w-48" aria-label="Filter by subscription status">
                                <SelectValue placeholder={ADMIN_SUBSCRIPTIONS_CONFIG.filters.status.label} />
                            </SelectTrigger>
                            <SelectContent>
                                {ADMIN_SUBSCRIPTIONS_CONFIG.filters.status.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {onClearFilters && (
                        <Button variant="ghost" onClick={onClearFilters} disabled={!hasActiveFilters}>
                            Clear filters
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
