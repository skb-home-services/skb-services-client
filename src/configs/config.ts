export const adminRoutes = ['/admin'];
export const protectedRoutes = ['/user', '/admin'];
export const publicPaths = ['/service', '/inquiry'];
export const publicPost = ['/inquiry'];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_GALLERY_IMAGES = 6;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const COUNTRY_CODES = [
    { code: 'IN', name: 'India', dial: '+91' },
    { code: 'NP', name: 'Nepal', dial: '+977' },
    { code: 'US', name: 'United States', dial: '+1' },
] as const;

export const DEFAULT_COUNTRY_CODE = 'IN';
export const BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const;
export const SERVICE_CATEGORIES = ['household', 'cleaning', 'plumbing', 'other'] as const;

export const MANUAL_CUSTOMER_CHANNELS = ['whatsapp', 'email'] as const;
export const MANUAL_CUSTOMER_SERVICE_STATUSES = ['active', 'paused', 'completed'] as const;
export const MANUAL_CUSTOMER_SERVICE_OUTCOMES = ['completed', 'no_response', 'declined', 'rescheduled'] as const;

export const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/inquiry', label: 'Contact' },
] as const;
