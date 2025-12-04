'use client';

import { memo } from 'react';
import { Pagination } from '@/components/common';

interface BookingsPaginationProps {
    totalPages: number;
    className?: string;
}

export const BookingsPagination = memo(function BookingsPagination({ totalPages, className }: BookingsPaginationProps) {
    if (totalPages <= 1) return null;

    return <Pagination totalPages={totalPages} className={className} />;
});
