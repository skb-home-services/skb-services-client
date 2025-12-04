'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';
import type { BookingsFiltersProps } from '@/types/admin-bookings';

export function FiltersPanel({ searchQuery, statusFilter, onSearchChange, onStatusChange }: BookingsFiltersProps) {
    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                        <Input
                            placeholder={ADMIN_BOOKINGS_CONFIG.filters.search.placeholder}
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10"
                            aria-label="Search bookings"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <Select value={statusFilter} onValueChange={onStatusChange}>
                            <SelectTrigger className="w-36" aria-label={ADMIN_BOOKINGS_CONFIG.filters.status.label}>
                                <SelectValue placeholder={ADMIN_BOOKINGS_CONFIG.filters.status.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {ADMIN_BOOKINGS_CONFIG.filters.status.options.map((option) => (
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
}
