export const queryKeys = {
    // Services
    services: {
        all: ['services'] as const,
        list: (filters?: Record<string, unknown>) => [...queryKeys.services.all, 'list', filters] as const,
        detail: (id: string) => [...queryKeys.services.all, 'detail', id] as const,
    },

    // Bookings
    bookings: {
        all: ['bookings'] as const,
        list: (filters?: Record<string, unknown>) => [...queryKeys.bookings.all, 'list', filters] as const,
        detail: (id: string) => [...queryKeys.bookings.all, 'detail', id] as const,
        user: (filters?: Record<string, unknown>) => [...queryKeys.bookings.all, 'user', filters] as const,
        userDetail: (id: string) => [...queryKeys.bookings.all, 'user', 'detail', id] as const,
    },

    // Users
    users: {
        all: ['users'] as const,
        list: (filters?: Record<string, unknown>) => [...queryKeys.users.all, 'list', filters] as const,
        detail: (uid: string) => [...queryKeys.users.all, 'detail', uid] as const,
        current: () => [...queryKeys.users.all, 'current'] as const,
    },

    // Inquiries
    inquiries: {
        all: ['inquiries'] as const,
        list: (filters?: Record<string, unknown>) => [...queryKeys.inquiries.all, 'list', filters] as const,
        detail: (id: string) => [...queryKeys.inquiries.all, 'detail', id] as const,
    },

    // Manual Customers
    manualCustomers: {
        all: ['manualCustomers'] as const,
        list: (filters?: Record<string, unknown>) => [...queryKeys.manualCustomers.all, 'list', filters] as const,
        detail: (id: string) => [...queryKeys.manualCustomers.all, 'detail', id] as const,
    },

    // Subscriptions
    subscriptions: {
        all: ['subscriptions'] as const,
        lists: () => [...queryKeys.subscriptions.all, 'list'] as const,
        list: (filters?: Record<string, unknown>) => [...queryKeys.subscriptions.lists(), filters ?? {}] as const,
        details: () => [...queryKeys.subscriptions.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.subscriptions.details(), id] as const,
    },
} as const;
