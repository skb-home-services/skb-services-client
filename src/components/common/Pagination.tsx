'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { generatePagination, cn } from '@/lib/utils';

interface PaginationProps {
    totalPages: number;
    className?: string;
}

export function Pagination({ totalPages, className }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = Number(searchParams.get('page')) || 1;
    const allPages = generatePagination(currentPage, totalPages);

    const createPageURL = (pageNumber: number | string | null | undefined) => {
        // Coerce to a safe positive integer page number
        const numericPage = typeof pageNumber === 'number' ? pageNumber : parseInt(String(pageNumber ?? currentPage), 10) || currentPage;

        const safePage = Math.max(1, Math.min(numericPage, totalPages));

        const params = new URLSearchParams(searchParams);
        params.set('page', String(safePage));
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={cn('flex items-center justify-center gap-1', className)}>
            {/* Previous Button */}
            <PaginationArrow direction="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {allPages.map((page, index) => {
                    let position: 'first' | 'last' | 'single' | 'middle' | undefined;
                    if (index === 0) position = 'first';
                    if (index === allPages.length - 1) position = 'last';
                    if (allPages.length === 1) position = 'single';
                    if (page === '...') position = 'middle';

                    return (
                        <PaginationNumber
                            key={`${page}-${index}`}
                            href={page === '...' ? '#' : createPageURL(page)}
                            page={page}
                            position={position}
                            isActive={page !== '...' && currentPage === page}
                        />
                    );
                })}
            </div>

            {/* Next Button */}
            <PaginationArrow direction="right" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages} />
        </div>
    );
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string;
    href: string;
    position?: 'first' | 'last' | 'middle' | 'single';
    isActive: boolean;
}) {
    const className = cn('flex h-9 w-9 items-center justify-center text-sm border rounded-md transition-colors', {
        'bg-primary border-primary text-primary-foreground': isActive,
        'hover:bg-muted': !isActive && position !== 'middle',
        'text-muted-foreground cursor-default': position === 'middle',
        'border-input': !isActive,
    });

    return isActive || position === 'middle' ? (
        <span className={className}>{page}</span>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
}

function PaginationArrow({ href, direction, isDisabled }: { href: string; direction: 'left' | 'right'; isDisabled?: boolean }) {
    const className = cn('flex h-9 w-9 items-center justify-center rounded-md border border-input transition-colors', {
        'pointer-events-none text-muted-foreground/50': isDisabled,
        'hover:bg-muted': !isDisabled,
    });

    const icon = direction === 'left' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />;

    return isDisabled ? (
        <span className={className}>{icon}</span>
    ) : (
        <Link href={href} className={className}>
            {icon}
        </Link>
    );
}

export default Pagination;
