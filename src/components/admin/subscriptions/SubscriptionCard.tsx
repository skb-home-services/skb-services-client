'use client';

import { Card, CardContent } from '@/components/ui/card';
import { SubscriptionStatusBadge } from './SubscriptionStatusBadge';
import { SubscriptionActions } from './SubscriptionActions';
import { ADMIN_SUBSCRIPTIONS_CONFIG } from '@/configs/admin-subscriptions';
import type { ServiceSubscription } from '@/types';

interface SubscriptionCardProps {
    subscription: ServiceSubscription;
    lastActivityLabel: string;
    onView: (id: string) => void;
}

export function SubscriptionCard({ subscription, lastActivityLabel, onView }: SubscriptionCardProps) {
    const customerName = subscription.customer?.fullName ?? 'Unknown customer';
    const serviceName = subscription.service?.name ?? 'Unknown service';

    return (
        <Card className="border border-border shadow-sm">
            <CardContent className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Customer</p>
                        <p className="font-semibold">{customerName}</p>
                    </div>
                    <SubscriptionStatusBadge status={subscription.status} />
                </div>

                <div className="space-y-2 text-sm">
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Service</p>
                        <p className="font-medium text-primary">{serviceName}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Last activity</p>
                        <p>{lastActivityLabel}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs uppercase text-muted-foreground mb-2">{ADMIN_SUBSCRIPTIONS_CONFIG.channelsLegend.title}</p>
                    {subscription.channels.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
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
                        <p className="text-xs text-muted-foreground">No channels recorded.</p>
                    )}
                </div>

                <div className="pt-2">
                    <SubscriptionActions onView={() => onView(subscription._id)} />
                </div>
            </CardContent>
        </Card>
    );
}
