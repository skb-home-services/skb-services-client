'use client';

import Link from 'next/link';
import { MessageSquare, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { InquiryItemProps } from '@/types/admin-dashboard';

export function InquiryItem({ inquiry, href }: InquiryItemProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-lg p-2 -mx-2 hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={`View inquiry from ${inquiry.fullName}`}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 shrink-0">
                <MessageSquare className="h-5 w-5 text-orange-600" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{inquiry.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{inquiry.message?.substring(0, 50)}...</p>
            </div>
            <Badge variant="secondary" className="shrink-0">
                <AlertCircle className="h-3 w-3 mr-1" aria-hidden="true" />
                Pending
            </Badge>
        </Link>
    );
}
