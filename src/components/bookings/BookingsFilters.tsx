'use client';

import { memo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BOOKINGS_CONFIG } from '@/configs/bookings';
import type { BookingStatus } from '@/types';

interface BookingsFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    statusFilter: BookingStatus | 'all';
    onStatusChange: (status: BookingStatus | 'all') => void;
    totalCount: number;
}

export const BookingsFilters = memo(function BookingsFilters({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
    totalCount,
}: BookingsFiltersProps) {
    if (totalCount === 0) return null;

    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder={BOOKINGS_CONFIG.filters.search.placeholder}
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10"
                            aria-label={BOOKINGS_CONFIG.filters.search.ariaLabel}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select value={statusFilter} onValueChange={onStatusChange}>
                            <SelectTrigger className="w-36" aria-label={BOOKINGS_CONFIG.filters.status.label}>
                                <SelectValue placeholder={BOOKINGS_CONFIG.filters.status.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {BOOKINGS_CONFIG.filters.status.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});
