'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageLoader, Pagination } from '@/components/common';
import { SubscriptionFilters } from './SubscriptionFilters';
import { SubscriptionsTable } from './SubscriptionsTable';
import { ADMIN_SUBSCRIPTIONS_CONFIG } from '@/configs/admin-subscriptions';
import { useSubscriptions } from '@/hooks';
import type { ServiceSubscription, ServiceSubscriptionStatus } from '@/types';
import { cn } from '@/lib/utils';

export function SubscriptionsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<ServiceSubscriptionStatus | 'all'>('all');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), ADMIN_SUBSCRIPTIONS_CONFIG.filters.search.debounceMs);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const currentPage = Number(searchParams.get('page')) || 1;
    const offset = (currentPage - 1) * ADMIN_SUBSCRIPTIONS_CONFIG.pagination.limit;

    const queryFilters = useMemo(
        () => ({
            limit: ADMIN_SUBSCRIPTIONS_CONFIG.pagination.limit,
            offset,
            search: debouncedSearch || undefined,
            status: statusFilter === 'all' ? undefined : statusFilter,
        }),
        [debouncedSearch, offset, statusFilter]
    );

    const { data, isLoading, isFetching, error, refetch, dataUpdatedAt } = useSubscriptions(queryFilters);

    const subscriptionData = data?.subscriptions;
    const subscriptions = useMemo<ServiceSubscription[]>(() => subscriptionData ?? [], [subscriptionData]);
    const totalCount = data?.pagination?.totalCount ?? 0;
    const resolvedLimit = data?.pagination?.limit ?? ADMIN_SUBSCRIPTIONS_CONFIG.pagination.limit;

    const stats = useMemo(() => {
        const active = subscriptions.filter((item) => item.status === 'active').length;
        const pending = subscriptions.filter((item) => item.status === 'pending').length;
        return [
            {
                label: ADMIN_SUBSCRIPTIONS_CONFIG.stats.totalLabel,
                value: totalCount,
            },
            {
                label: ADMIN_SUBSCRIPTIONS_CONFIG.stats.activeLabel,
                value: active,
            },
            {
                label: 'Pending follow-ups',
                value: pending,
            },
        ];
    }, [subscriptions, totalCount]);

    const totalPages = totalCount ? Math.max(1, Math.ceil(totalCount / resolvedLimit)) : 1;
    const hasFilters = Boolean(searchQuery) || statusFilter !== 'all';
    const lastSynced = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString() : null;

    if (isLoading && !data) {
        return <PageLoader />;
    }

    if (error && !data) {
        return (
            <Card>
                <CardContent className="py-16 text-center space-y-4">
                    <p className="text-xl font-semibold">Unable to load subscriptions</p>
                    <p className="text-muted-foreground">Please try again later.</p>
                    <Button onClick={() => refetch()} disabled={isFetching}>
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const handleRowClick = (id: string) => {
        router.push(`/admin/subscriptions/${id}`);
    };

    return (
        <div className="space-y-6">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">{ADMIN_SUBSCRIPTIONS_CONFIG.page.title}</h1>
                    <p className="text-muted-foreground">{ADMIN_SUBSCRIPTIONS_CONFIG.page.description}</p>
                    {lastSynced && <p className="text-xs text-muted-foreground/80 mt-1">Last synced {lastSynced}</p>}
                </div>
                <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
                    <RefreshCw className={cn('mr-2 h-4 w-4', isFetching && 'animate-spin')} />
                    {ADMIN_SUBSCRIPTIONS_CONFIG.page.refreshLabel}
                </Button>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.label} className="border border-border shadow-sm">
                        <CardContent className="p-4">
                            <p className="text-xs uppercase text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <SubscriptionFilters
                search={searchQuery}
                status={statusFilter}
                onSearchChange={setSearchQuery}
                onStatusChange={(value) => setStatusFilter(value as ServiceSubscriptionStatus | 'all')}
                onClearFilters={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                }}
                hasActiveFilters={hasFilters}
            />

            <SubscriptionsTable
                subscriptions={subscriptions}
                totalCount={totalCount}
                loading={isFetching && !subscriptions.length}
                hasFilters={hasFilters}
                onRowClick={handleRowClick}
            />

            {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </div>
    );
}
