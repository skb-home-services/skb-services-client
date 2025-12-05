export const AUTH_CONFIG = {
    login: {
        title: 'Welcome Back',
        subtitle: 'Sign in to your account to continue',
        redirectPath: '/user/dashboard',
    },

    reset: {
        title: 'Reset Password',
        subtitle: 'Reset your account password',
        redirectPath: '/login',
    },

    google: {
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        scope: 'profile email',
        buttonText: 'Continue with Google',
    },

    validation: {
        email: {
            placeholder: 'john@example.com',
            icon: 'Mail' as const,
        },
        password: {
            placeholder: '••••••••',
            icon: 'Lock' as const,
        },
    },

    ui: {
        backgroundGradient: 'from-slate-50 via-blue-50/50 to-indigo-50',
        accentGradient: 'from-primary to-primary/80',
        cardBackground: 'bg-white/80 backdrop-blur-xl',
    },

    messages: {
        success: {
            title: 'Welcome back!',
            description: 'You have successfully signed in.',
        },
        error: {
            title: 'Sign in failed',
            defaultDescription: 'Invalid email or password.',
        },
    },
} as const;
