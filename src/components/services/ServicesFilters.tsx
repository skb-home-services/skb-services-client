'use client';

import { Search, SlidersHorizontal, X, Grid3X3, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SERVICES_CONFIG } from '@/configs/services';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list';

interface ServicesFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    categoryFilter: string;
    onCategoryChange: (value: string) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    availableOnly: boolean;
    onAvailableOnlyToggle: () => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    hasActiveFilters: boolean;
    activeCategoryLabel: string;
    onClearFilters: () => void;
}

export function ServicesFilters({
    searchQuery,
    onSearchChange,
    categoryFilter,
    onCategoryChange,
    sortBy,
    onSortChange,
    availableOnly,
    onAvailableOnlyToggle,
    viewMode,
    onViewModeChange,
    hasActiveFilters,
    activeCategoryLabel,
    onClearFilters,
}: ServicesFiltersProps) {
    return (
        <div className="mb-8 space-y-4">
            {/* Main Search Bar */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder={SERVICES_CONFIG.search.placeholder}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-12 h-12 text-base rounded-xl border-0 bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background transition-all"
                        aria-label="Search services"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* View Mode Toggle */}
                <div className="hidden lg:flex items-center gap-1 p-1 bg-muted/50 rounded-xl" role="group" aria-label="View mode">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewModeChange('grid')}
                        className={cn('rounded-lg', viewMode === 'grid' && 'bg-background shadow-sm')}
                        aria-label="Grid view"
                        aria-pressed={viewMode === 'grid'}
                    >
                        <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewModeChange('list')}
                        className={cn('rounded-lg', viewMode === 'list' && 'bg-background shadow-sm')}
                        aria-label="List view"
                        aria-pressed={viewMode === 'list'}
                    >
                        <LayoutList className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters:</span>
                </div>

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={onCategoryChange}>
                    <SelectTrigger className="w-[160px] rounded-xl border-0 bg-muted/50" aria-label={SERVICES_CONFIG.filters.categoryLabel}>
                        <SelectValue placeholder={SERVICES_CONFIG.filters.categoryLabel} />
                    </SelectTrigger>
                    <SelectContent>
                        {SERVICES_CONFIG.categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Sort Filter */}
                <Select value={sortBy} onValueChange={onSortChange}>
                    <SelectTrigger className="w-[180px] rounded-xl border-0 bg-muted/50" aria-label={SERVICES_CONFIG.filters.sortLabel}>
                        <SelectValue placeholder={SERVICES_CONFIG.filters.sortLabel} />
                    </SelectTrigger>
                    <SelectContent>
                        {SERVICES_CONFIG.sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Available Only Toggle */}
                <Button
                    variant={availableOnly ? 'default' : 'outline'}
                    size="sm"
                    onClick={onAvailableOnlyToggle}
                    className={cn('rounded-xl transition-all', !availableOnly && 'border-0 bg-muted/50 hover:bg-muted')}
                    aria-pressed={availableOnly}
                >
                    {SERVICES_CONFIG.filters.availableOnlyLabel}
                </Button>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="text-muted-foreground hover:text-foreground rounded-xl"
                        aria-label="Clear all filters"
                    >
                        <X className="h-4 w-4 mr-1" />
                        {SERVICES_CONFIG.filters.clearAllLabel}
                    </Button>
                )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground">{SERVICES_CONFIG.filters.activeFiltersLabel}</span>
                    {searchQuery && (
                        <Badge variant="secondary" className="gap-1 rounded-lg">
                            Search: &quot;{searchQuery}&quot;
                            <button onClick={() => onSearchChange('')} aria-label="Remove search filter" className="hover:opacity-70">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}
                    {categoryFilter !== 'all' && (
                        <Badge variant="secondary" className="gap-1 rounded-lg">
                            Category: {activeCategoryLabel}
                            <button
                                onClick={() => onCategoryChange('all')}
                                aria-label="Remove category filter"
                                className="hover:opacity-70"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}
                    {availableOnly && (
                        <Badge variant="secondary" className="gap-1 rounded-lg">
                            {SERVICES_CONFIG.filters.availableOnlyLabel}
                            <button onClick={onAvailableOnlyToggle} aria-label="Remove available only filter" className="hover:opacity-70">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}
                </div>
            )}
        </div>
    );
}
