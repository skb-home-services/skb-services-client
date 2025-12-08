export const FOOTER_CONFIG = {
    brand: {
        name: 'SKB Services',
        tagline:
            'We specialize in Tank, Well, Sump, Solar and Overhead/Underground water tank cleaning services across Bangalore. Along with the Tank rent for the construction works.',
    },

    socialLinks: [
        {
            icon: 'Facebook' as const,
            href: 'https://www.facebook.com/share/17QUs5cSgq',
            label: 'Facebook',
        },
        {
            icon: 'Twitter' as const,
            href: '#',
            label: 'Twitter',
        },
        {
            icon: 'Instagram' as const,
            href: 'https://www.instagram.com/skb_cleaning_services',
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
        address: 'Bangalore, India',
        email: 'skbtankcleaning@gmail.com',
        phone: '+91 81233 20272',
        emailHref: 'mailto:skbtankcleaning@gmail.com',
        phoneHref: 'tel:+91 81233 20272',
    },

    legalLinks: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
    ],
} as const;
