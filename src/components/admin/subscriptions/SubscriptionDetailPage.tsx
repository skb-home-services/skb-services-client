'use client';

import Link from 'next/link';
import { ChevronLeft, ClipboardList, BellRing, StickyNote, Clock4 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLoader } from '@/components/common';
import { SubscriptionStatusBadge } from './SubscriptionStatusBadge';
import { CustomerInfoCard } from './CustomerInfoCard';
import { ServiceInfoCard } from './ServiceInfoCard';
import { ADMIN_SUBSCRIPTIONS_CONFIG } from '@/configs/admin-subscriptions';
import { useSubscription } from '@/hooks';
import { formatDate, formatTime } from '@/lib/utils';

interface SubscriptionDetailPageProps {
    subscriptionId: string;
}

export function SubscriptionDetailPage({ subscriptionId }: SubscriptionDetailPageProps) {
    const { data, isLoading, error, refetch, isFetching } = useSubscription(subscriptionId);

    if (isLoading) {
        return <PageLoader />;
    }

    if (error || !data) {
        return (
            <Card>
                <CardContent className="py-16 text-center space-y-4">
                    <p className="text-xl font-semibold">Unable to load subscription</p>
                    <p className="text-muted-foreground">Please try again.</p>
                    <Button onClick={() => refetch()} disabled={isFetching}>
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const subscription = data;

    type TimelineEvent = {
        title: string;
        description?: string;
        timestamp: string;
    };

    const timelineEvents: TimelineEvent[] = [];

    if (subscription.lastOutcomeAt) {
        timelineEvents.push({
            title: 'Last outcome',
            description: subscription.lastOutcome ?? 'Outcome recorded',
            timestamp: subscription.lastOutcomeAt,
        });
    }

    if (subscription.lastReminderSentAt) {
        timelineEvents.push({
            title: `Reminder attempt #${subscription.reminderAttempt ?? 0}`,
            description: 'Reminder sent',
            timestamp: subscription.lastReminderSentAt,
        });
    }

    if (subscription.lastTakenAt) {
        timelineEvents.push({
            title: 'Last service taken',
            description: subscription.service?.name,
            timestamp: subscription.lastTakenAt,
        });
    }

    timelineEvents.push(
        {
            title: 'Subscription created',
            description: 'Record added',
            timestamp: subscription.createdAt,
        },
        {
            title: 'Last updated',
            description: 'Most recent change',
            timestamp: subscription.updatedAt,
        }
    );

    timelineEvents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin/subscriptions">
                            <ChevronLeft className="mr-1 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wide">Subscription</p>
                        <h1 className="text-2xl font-bold">{subscription.customer?.fullName ?? 'Subscription detail'}</h1>
                    </div>
                </div>
                <SubscriptionStatusBadge status={subscription.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <ClipboardList className="h-8 w-8 rounded-full bg-primary/10 p-2 text-primary" />
                        <div>
                            <p className="text-xs uppercase text-muted-foreground">Service</p>
                            <p className="font-semibold">{subscription.service?.name ?? 'Unknown'}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <BellRing className="h-8 w-8 rounded-full bg-amber-100 p-2 text-amber-600" />
                        <div>
                            <p className="text-xs uppercase text-muted-foreground">Reminder attempts</p>
                            <p className="font-semibold">{subscription.reminderAttempt ?? 0}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <StickyNote className="h-8 w-8 rounded-full bg-blue-100 p-2 text-blue-600" />
                        <div>
                            <p className="text-xs uppercase text-muted-foreground">Notes</p>
                            <p className="font-semibold">{subscription.notes ? 'Added' : 'None'}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <Clock4 className="h-8 w-8 rounded-full bg-gray-100 p-2 text-gray-600" />
                        <div>
                            <p className="text-xs uppercase text-muted-foreground">Updated</p>
                            <p className="font-semibold">{formatDate(subscription.updatedAt)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <CustomerInfoCard customer={subscription.customer} />
                <ServiceInfoCard service={subscription.service} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Subscription details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Preferred channels</p>
                        {subscription.channels.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {subscription.channels.map((channel) => {
                                    const style = ADMIN_SUBSCRIPTIONS_CONFIG.channels[channel];
                                    return (
                                        <span
                                            key={channel}
                                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${style.bg} ${style.color}`}
                                        >
                                            <style.icon className="h-3.5 w-3.5" aria-hidden="true" />
                                            {style.label}
                                        </span>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="mt-1 text-sm text-muted-foreground">No channels recorded for this subscription.</p>
                        )}
                    </div>

                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Notes</p>
                        <p className="mt-1 whitespace-pre-line rounded-lg bg-muted/50 p-3 text-sm">
                            {subscription.notes?.trim() ? subscription.notes : 'No notes recorded.'}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Activity timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {timelineEvents.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No timeline activity recorded yet.</p>
                    ) : (
                        <ol className="relative border-l border-border pl-6">
                            {timelineEvents.map((event) => (
                                <li key={`${event.title}-${event.timestamp}`} className="mb-6 last:mb-0">
                                    <div className="absolute -left-2.5 mt-1 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                                    <p className="font-medium">{event.title}</p>
                                    {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
                                    <span className="text-xs text-muted-foreground">
                                        {formatDate(event.timestamp)} at {formatTime(event.timestamp)}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
