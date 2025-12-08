export const CONTACT_CONFIG = {
    office: {
        location: {
            lat: 12.9126,
            lng: 77.5889,
            address: 'J P Nagar, Bengaluru, Karnataka, India',
            googleMapsUrl: 'https://maps.google.com/?q=12.9126,77.5889',
        },
        hours: 'Mon-Sat, 9:00 AM - 6:00 PM',
    },

    contactInfo: {
        phone: '+91 81233 20272',
        email: 'skbtankcleaning@gmail.com',
    },

    hero: {
        title: 'Get in Touch',
        description: "Have questions about our services? We're here to help. Send us a message and we'll respond as soon as possible.",
    },

    whyContact: [
        'Get personalized service recommendations',
        'Request custom quotes for large projects',
        'Report issues or provide feedback',
    ] as const,

    responseTime: {
        expected: 'within 2-4 business hours',
        note: 'For urgent inquiries, please call us directly.',
    },

    legalNote: 'By submitting, you agree to our Privacy Policy',
} as const;
