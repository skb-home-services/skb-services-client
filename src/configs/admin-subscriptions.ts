import { Users, RefreshCw, Search, Filter, MessageCircle, Phone, Mail, Smartphone, LucideIcon } from 'lucide-react';
import type { CommunicationChannel, ServiceSubscriptionStatus } from '@/types';

type ChannelKey = CommunicationChannel;

interface StatusStyle {
    label: string;
    badge: string;
    dot: string;
    description: string;
}

interface ChannelStyle {
    label: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

interface StatusOption {
    label: string;
    value: ServiceSubscriptionStatus | 'all';
}

export const ADMIN_SUBSCRIPTIONS_CONFIG = {
    page: {
        title: 'Subscriptions',
        description: 'Track ongoing customer subscription touchpoints and outcomes.',
        refreshLabel: 'Refresh',
    },
    pagination: {
        limit: 20,
    },
    filters: {
        search: {
            placeholder: 'Search by customer name, phone, or email…',
            icon: Search,
            debounceMs: 300,
        },
        status: {
            label: 'Status',
            icon: Filter,
            options: [
                { label: 'All statuses', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Pending', value: 'pending' },
                { label: 'Completed', value: 'completed' },
                { label: 'Declined', value: 'declined' },
                { label: 'Paused', value: 'paused' },
                { label: 'Not Reachable', value: 'not_reachable' },
            ] as StatusOption[],
        },
    },
    status: {
        active: {
            label: 'Active',
            description: 'Currently receiving service reminders',
            badge: 'bg-green-100 text-green-800 border-green-200',
            dot: 'bg-green-500',
        },
        pending: {
            label: 'Pending',
            description: 'Waiting on customer response',
            badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            dot: 'bg-yellow-500',
        },
        completed: {
            label: 'Completed',
            description: 'Latest cycle closed successfully',
            badge: 'bg-blue-100 text-blue-800 border-blue-200',
            dot: 'bg-blue-500',
        },
        declined: {
            label: 'Declined',
            description: 'Customer opted out',
            badge: 'bg-red-100 text-red-800 border-red-200',
            dot: 'bg-red-500',
        },
        paused: {
            label: 'Paused',
            description: 'Temporarily on hold',
            badge: 'bg-gray-100 text-gray-800 border-gray-200',
            dot: 'bg-gray-500',
        },
        not_reachable: {
            label: 'Not Reachable',
            description: 'Attempts were unsuccessful',
            badge: 'bg-orange-100 text-orange-800 border-orange-200',
            dot: 'bg-orange-500',
        },
    } as Record<ServiceSubscriptionStatus, StatusStyle>,
    channels: {
        whatsapp: {
            label: 'WhatsApp',
            icon: MessageCircle,
            color: 'text-emerald-700',
            bg: 'bg-emerald-100',
        },
        phone: {
            label: 'Phone',
            icon: Phone,
            color: 'text-blue-700',
            bg: 'bg-blue-100',
        },
        email: {
            label: 'Email',
            icon: Mail,
            color: 'text-indigo-700',
            bg: 'bg-indigo-100',
        },
        sms: {
            label: 'SMS',
            icon: Smartphone,
            color: 'text-amber-700',
            bg: 'bg-amber-100',
        },
    } as Record<ChannelKey, ChannelStyle>,
    stats: {
        totalLabel: 'Total Subscriptions',
        activeLabel: 'Active Touchpoints',
        lastSyncedLabel: 'Last sync',
        icon: Users,
    },
    emptyStates: {
        default: {
            title: 'No subscriptions yet',
            description: 'Subscription records will appear once customers enroll.',
        },
        filtered: {
            title: 'No results match your filters',
            description: 'Try clearing the search or selecting a different status.',
        },
    },
    table: {
        columns: ['Customer', 'Service', 'Status', 'Channels', 'Last activity', 'Actions'],
        lastActivityFallback: 'No activity recorded',
        actionLabel: 'View',
    },
    actions: {
        refresh: {
            label: 'Refresh',
            icon: RefreshCw,
        },
    },
    channelsLegend: {
        title: 'Preferred channels',
        description: 'Channels recorded for the most recent outreach cycle.',
    },
    channelIcons: {
        whatsapp: MessageCircle,
        phone: Phone,
        email: Mail,
        sms: Smartphone,
    } as Record<ChannelKey, LucideIcon>,
};

export type SubscriptionStatusOption = StatusOption;
export type SubscriptionStatusStyle = StatusStyle;
export type SubscriptionChannelStyle = ChannelStyle;
