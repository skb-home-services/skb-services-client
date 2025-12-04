export const FOOTER_CONFIG = {
    brand: {
        name: 'SKB Services',
        tagline: 'Professional home services at your doorstep. Quality work, trusted professionals, guaranteed satisfaction.',
    },

    socialLinks: [
        {
            icon: 'Facebook' as const,
            href: '#',
            label: 'Facebook',
        },
        {
            icon: 'Twitter' as const,
            href: '#',
            label: 'Twitter',
        },
        {
            icon: 'Instagram' as const,
            href: '#',
            label: 'Instagram',
        },
        {
            icon: 'Linkedin' as const,
            href: '#',
            label: 'LinkedIn',
        },
    ],

    quickLinks: [
        { label: 'Home', href: '/' },
        { label: 'Our Services', href: '/services' },
        { label: 'Contact Us', href: '/inquiry' },
    ],

    accountLinks: {
        authenticated: [
            { label: 'Dashboard', href: '/user/dashboard' },
            { label: 'My Bookings', href: '/user/bookings' },
        ],
        unauthenticated: [
            { label: 'Sign In', href: '/login' },
            { label: 'Create Account', href: '/register' },
        ],
    },

    contactInfo: {
        address: 'Kathmandu, Nepal',
        email: 'contact@skbservices.com',
        phone: '+977 9840282545',
        emailHref: 'mailto:contact@skbservices.com',
        phoneHref: 'tel:+9779840282545',
    },

    legalLinks: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
    ],
} as const;
