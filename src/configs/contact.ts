export const CONTACT_CONFIG = {
    office: {
        location: {
            lat: 27.7172,
            lng: 85.324,
            address: 'Thamel, Kathmandu 44600, Nepal',
            googleMapsUrl: 'https://maps.google.com/?q=27.7172,85.3240',
        },
        hours: 'Mon-Sat, 9:00 AM - 6:00 PM',
    },

    contactInfo: {
        phone: '+977 9840282545',
        email: 'contact@skbservices.com',
    },

    hero: {
        title: 'Get in Touch',
        description: "Have questions about our services? We're here to help. Send us a message and we'll respond as soon as possible.",
    },

    whyContact: [
        'Get personalized service recommendations',
        'Request custom quotes for large projects',
        'Ask about our service areas',
        'Report issues or provide feedback',
    ] as const,

    responseTime: {
        expected: 'within 2-4 business hours',
        note: 'For urgent inquiries, please call us directly.',
    },

    legalNote: 'By submitting, you agree to our Privacy Policy',
} as const;
