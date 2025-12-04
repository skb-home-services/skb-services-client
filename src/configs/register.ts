export const REGISTER_CONFIG = {
    hero: {
        title: 'Create Account',
        subtitle: 'Join us and start booking services',
    },

    features: [
        { text: 'Free to join', icon: 'CheckCircle' as const },
        { text: 'Cancel anytime', icon: 'CheckCircle' as const },
    ] as const,

    validation: {
        email: {
            placeholder: 'john@example.com',
            icon: 'Mail' as const,
        },
        password: {
            placeholder: '••••••••',
            icon: 'Lock' as const,
        },
        confirmPassword: {
            placeholder: '••••••••',
            icon: 'Shield' as const,
        },
    },

    ui: {
        backgroundGradient: 'from-slate-50 via-emerald-50/30 to-blue-50',
        cardGradient: 'bg-gradient-to-br from-primary to-primary/80',
        accentColor: 'emerald',
    },

    messages: {
        success: {
            title: 'Account created!',
            description: 'Welcome to SKB Services.',
        },
        error: {
            title: 'Registration failed',
            defaultDescription: 'Could not create account. Please try again.',
        },
        google: {
            success: 'Welcome!',
            googleSuccess: 'Your account has been created with Google.',
        },
    },

    passwordStrength: {
        levels: [
            { label: 'Weak', color: 'bg-red-400', minScore: 0 },
            { label: 'Fair', color: 'bg-yellow-400', minScore: 2 },
            { label: 'Good', color: 'bg-emerald-400', minScore: 3 },
            { label: 'Strong', color: 'bg-emerald-500', minScore: 4 },
        ] as const,
    },
} as const;
