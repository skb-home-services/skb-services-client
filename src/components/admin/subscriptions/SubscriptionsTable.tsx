'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_SUBSCRIPTIONS_CONFIG } from '@/configs/admin-subscriptions';
import type { ServiceSubscription } from '@/types';
import { SubscriptionStatusBadge } from './SubscriptionStatusBadge';
import { SubscriptionActions } from './SubscriptionActions';
import { SubscriptionCard } from './SubscriptionCard';
import { LoadingState } from './LoadingState';

interface SubscriptionsTableProps {
    subscriptions: ServiceSubscription[];
    totalCount: number;
    loading?: boolean;
    hasFilters?: boolean;
    onRowClick: (id: string) => void;
}

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

function formatRelativeTime(date: Date) {
    const seconds = Math.round((date.getTime() - Date.now()) / 1000);
    const divisions: Array<[Intl.RelativeTimeFormatUnit, number]> = [
        ['year', 60 * 60 * 24 * 365],
        ['month', 60 * 60 * 24 * 30],
        ['week', 60 * 60 * 24 * 7],
        ['day', 60 * 60 * 24],
        ['hour', 60 * 60],
        ['minute', 60],
        ['second', 1],
    ];

    for (const [unit, amount] of divisions) {
        if (Math.abs(seconds) >= amount || unit === 'second') {
            return relativeTimeFormatter.format(Math.round(seconds / amount), unit);
        }
    }
    return 'just now';
}

function getLastActivity(subscription: ServiceSubscription) {
    if (subscription.lastOutcomeAt) {
        return `${subscription.lastOutcome ?? 'Outcome updated'} • ${formatRelativeTime(new Date(subscription.lastOutcomeAt))}`;
    }

    if (subscription.lastReminderSentAt) {
        return `Reminder sent • ${formatRelativeTime(new Date(subscription.lastReminderSentAt))}`;
    }

    if (subscription.lastTakenAt) {
        return `Service taken • ${formatRelativeTime(new Date(subscription.lastTakenAt))}`;
    }

    return ADMIN_SUBSCRIPTIONS_CONFIG.table.lastActivityFallback;
}

export function SubscriptionsTable({ subscriptions, totalCount, loading, hasFilters, onRowClick }: SubscriptionsTableProps) {
    if (loading) {
        return <LoadingState rows={5} />;
    }

    if (!subscriptions.length) {
        const emptyState = hasFilters ? ADMIN_SUBSCRIPTIONS_CONFIG.emptyStates.filtered : ADMIN_SUBSCRIPTIONS_CONFIG.emptyStates.default;
        return (
            <Card className="border-0 shadow-sm">
                <CardContent className="py-16 text-center">
                    <p className="text-xl font-semibold">{emptyState.title}</p>
                    <p className="text-muted-foreground mt-2">{emptyState.description}</p>
                </CardContent>
            </Card>
        );
    }

    const rows = subscriptions.map((subscription) => ({
        subscription,
        lastActivity: getLastActivity(subscription),
    }));

    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-lg">Subscriptions ({totalCount})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="hidden md:block">
                    <table className="w-full text-sm" role="table">
                        <thead className="border-b bg-muted/40 text-muted-foreground">
                            <tr>
                                {ADMIN_SUBSCRIPTIONS_CONFIG.table.columns.map((column) => (
                                    <th key={column} className="px-6 py-3 text-left font-medium">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(({ subscription, lastActivity }) => (
                                <tr
                                    key={subscription._id}
                                    className="cursor-pointer border-b last:border-0 transition hover:bg-muted/50"
                                    onClick={() => onRowClick(subscription._id)}
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">{subscription.customer?.fullName ?? 'Unknown customer'}</div>
                                        <p className="text-muted-foreground text-xs">{subscription.customer?.email ?? 'No email'}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-primary">{subscription.service?.name ?? 'Unknown service'}</div>
                                        <p className="text-muted-foreground text-xs">{subscription.service?.category}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <SubscriptionStatusBadge status={subscription.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        {subscription.channels.length > 0 ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                {subscription.channels.map((channel) => {
                                                    const style = ADMIN_SUBSCRIPTIONS_CONFIG.channels[channel];
                                                    return (
                                                        <span
                                                            key={channel}
                                                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${style.bg} ${style.color}`}
                                                        >
                                                            <style.icon className="h-3.5 w-3.5" aria-hidden="true" />
                                                            {style.label}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">No channels</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{lastActivity}</td>
                                    <td className="px-6 py-4 text-right">
                                        <SubscriptionActions onView={() => onRowClick(subscription._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid gap-4 p-4 md:hidden">
                    {rows.map(({ subscription, lastActivity }) => (
                        <SubscriptionCard
                            key={subscription._id}
                            subscription={subscription}
                            lastActivityLabel={lastActivity}
                            onView={onRowClick}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
