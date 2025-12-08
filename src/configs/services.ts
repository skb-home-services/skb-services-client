export const SERVICES_CONFIG = {
    itemsPerPage: 12,
    categories: [
        { value: 'all', label: 'All Categories' },
        { value: 'cleaning', label: 'Cleaning' },
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'electrical', label: 'Electrical' },
        { value: 'carpentry', label: 'Carpentry' },
        { value: 'painting', label: 'Painting' },
        { value: 'pest-control', label: 'Pest Control' },
        { value: 'appliance', label: 'Appliance Repair' },
        { value: 'other', label: 'Other' },
    ],
    sortOptions: [
        { value: 'newest', label: 'Newest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'duration', label: 'Duration: Short to Long' },
        { value: 'name', label: 'Name: A to Z' },
    ],
    hero: {
        title: 'Our Services',
        description: 'Browse our range of professional home services',
        icon: 'Sparkles',
    },
    search: {
        placeholder: 'Search services by name, description, or category...',
    },
    filters: {
        categoryLabel: 'Category',
        sortLabel: 'Sort by',
        availableOnlyLabel: 'Available Only',
        clearAllLabel: 'Clear All',
        activeFiltersLabel: 'Active filters:',
    },
    results: {
        showingLabel: 'Showing',
        serviceLabel: 'service',
        servicesLabel: 'services',
        ofLabel: 'of',
    },
    emptyState: {
        title: 'No services found',
        descriptionWithFilters: "Try adjusting your filters or search query to find what you're looking for.",
        descriptionWithoutFilters: 'No services are available at the moment. Please check back later.',
        clearFiltersLabel: 'Clear All Filters',
    },
    error: {
        title: 'Error loading services',
        message: 'Please try again later.',
    },
    detail: {
        error: {
            title: 'Service not found',
            message: "The service you're looking for doesn't exist or may have been removed.",
            backButton: 'Back to Services',
        },
        backButton: 'Back to Services',
        gallery: {
            title: 'Gallery',
            noImage: 'No image available',
            previewHint: 'Click to preview',
        },
        description: {
            title: 'About this service',
            empty: 'No description available for this service.',
            icon: 'Sparkles',
        },
        video: {
            title: 'Watch Video',
            icon: 'Play',
        },
        sidebar: {
            verifiedLabel: 'Verified Service',
            rating: '5.0',
            basePriceLabel: 'base price',
            durationLabel: 'Duration',
            availabilityLabel: 'Availability',
            availableNow: 'Available Now',
            unavailable: 'Currently Unavailable',
            bookNow: 'Book Now',
            contactQuestion: 'Have questions?',
            contactLink: 'Contact us',
        },
        trustSignals: {
            title: 'Why choose us?',
            items: [
                {
                    icon: 'Shield',
                    title: 'Verified Professionals',
                    description: 'All our service providers are thoroughly vetted',
                    color: 'emerald',
                },
                {
                    icon: 'CheckCircle',
                    title: 'Quality Guaranteed',
                    description: 'Satisfaction guaranteed or your money back',
                    color: 'blue',
                },
                {
                    icon: 'Star',
                    title: 'Top-Rated Service',
                    description: 'Consistently rated 5 stars by customers',
                    color: 'amber',
                },
            ],
        },
        pricing: {
            currency: 'NPR',
            defaultCurrency: 'NPR',
        },
    },
} as const;
