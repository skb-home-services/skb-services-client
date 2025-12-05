export const RESET_PASSWORD_CONFIG = {
    hero: {
        title: 'Reset Your Password',
        subtitle: 'Enter your email to reset your password',
    },

    validation: {
        email: {
            placeholder: 'john@example.com',
            icon: 'Mail' as const,
        },
    },

    ui: {
        backgroundGradient: 'from-slate-50 via-emerald-50/30 to-blue-50',
        cardGradient: 'bg-gradient-to-br from-primary to-primary/80',
        accentColor: 'emerald',
    },

    messages: {
        success: {
            title: 'Link sent!',
            description: 'Check your email for the password reset link.',
        },
        error: {
            title: 'Reset failed',
            defaultDescription: 'Could not send reset link. Please try again.',
        },
    },
} as const;
