'use client';

import { Button } from '@/components/ui/button';
import { DashboardPanel } from '@/components/admin';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import { EmptyState } from '../ui/EmptyState';
import { InquiryItem } from '../ui/InquiryItem';
import { ADMIN_DASHBOARD_CONFIG } from '@/configs/admin-dashboard';
import type { Inquiry } from '@/types';

interface PendingInquiriesPanelProps {
    inquiries: Inquiry[];
    loading?: boolean;
}

export function PendingInquiriesPanel({ inquiries, loading }: PendingInquiriesPanelProps) {
    const config = ADMIN_DASHBOARD_CONFIG.panels.pendingInquiries;
    const isEmpty = !loading && inquiries.length === 0;

    return (
        <DashboardPanel
            title={config.title}
            headerAction={
                <Button variant="ghost" size="sm" asChild>
                    <Link href={config.viewAllHref} className="flex items-center gap-1">
                        {config.viewAllLabel}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </Button>
            }
        >
            {loading ? (
                <LoadingSkeleton count={ADMIN_DASHBOARD_CONFIG.loading.skeletonCount.inquiries} variant="inquiry" />
            ) : isEmpty ? (
                <EmptyState {...config.emptyState} />
            ) : (
                <div className="space-y-3" role="list" aria-label="Pending inquiries">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry._id} role="listitem">
                            <InquiryItem inquiry={inquiry} href={`/admin/inquiries/${inquiry._id}`} />
                        </div>
                    ))}
                </div>
            )}
        </DashboardPanel>
    );
}
