export const adminRoutes = ['/admin'];
export const protectedRoutes = ['/user', '/admin'];
export const publicPaths = ['/service', '/inquiry'];
export const publicPost = ['/inquiry'];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_GALLERY_IMAGES = 6;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const COUNTRY_CODES = [
    { code: 'NP', name: 'Nepal', dial: '+977' },
    { code: 'IN', name: 'India', dial: '+91' },
    { code: 'US', name: 'United States', dial: '+1' },
    { code: 'GB', name: 'United Kingdom', dial: '+44' },
    { code: 'AU', name: 'Australia', dial: '+61' },
    { code: 'CA', name: 'Canada', dial: '+1' },
    { code: 'AE', name: 'UAE', dial: '+971' },
    { code: 'SA', name: 'Saudi Arabia', dial: '+966' },
    { code: 'QA', name: 'Qatar', dial: '+974' },
    { code: 'MY', name: 'Malaysia', dial: '+60' },
    { code: 'SG', name: 'Singapore', dial: '+65' },
    { code: 'JP', name: 'Japan', dial: '+81' },
    { code: 'KR', name: 'South Korea', dial: '+82' },
    { code: 'CN', name: 'China', dial: '+86' },
    { code: 'DE', name: 'Germany', dial: '+49' },
    { code: 'FR', name: 'France', dial: '+33' },
] as const;

export const DEFAULT_COUNTRY_CODE = 'NP';
export const BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const;
export const SERVICE_CATEGORIES = [
    'appliance',
    'cleaning',
    'plumbing',
    'electrical',
    'automobile',
    'painting',
    'carpentry',
    'other',
] as const;

export const MANUAL_CUSTOMER_CHANNELS = ['whatsapp', 'email'] as const;
export const MANUAL_CUSTOMER_SERVICE_STATUSES = ['active', 'paused', 'completed'] as const;
export const MANUAL_CUSTOMER_SERVICE_OUTCOMES = ['completed', 'no_response', 'declined', 'rescheduled'] as const;

export const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/inquiry', label: 'Contact' },
] as const;
