import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { z } from 'zod';

const phoneUtil = PhoneNumberUtil.getInstance();

export const phoneNumberSchema = z
    .object({
        region: z.string().min(1, 'Region (ISO) is required').trim(),
        number: z.string().min(4, 'Phone number must be at least 4 digits').max(15, 'Phone number must not exceed 15 digits').trim(),
    })
    .refine(
        ({ number, region }) => {
            try {
                const parsed = phoneUtil.parse(number, region);
                return phoneUtil.isValidNumber(parsed);
            } catch {
                return false;
            }
        },
        {
            message: 'Invalid phone number for the selected country',
        }
    );

// Optional phone number schema - validates only if number is provided
export const optionalPhoneNumberSchema = z
    .object({
        region: z.string().optional(),
        number: z.string().optional(),
    })
    .optional()
    .transform((data) => {
        // If no data or empty number, return undefined
        if (!data || !data.number || data.number.trim() === '') {
            return undefined;
        }
        return data;
    })
    .pipe(
        z.union([
            z.undefined(),
            z
                .object({
                    region: z.string().min(1, 'Region is required'),
                    number: z.string().min(4, 'Phone number must be at least 4 digits'),
                })
                .refine(
                    ({ number, region }) => {
                        try {
                            const parsed = phoneUtil.parse(number, region);
                            return phoneUtil.isValidNumber(parsed);
                        } catch {
                            return false;
                        }
                    },
                    {
                        message: 'Invalid phone number for the selected country',
                    }
                ),
        ])
    );

// Format phone to E.164 format (for display purposes)
export function formatPhoneToE164(number: string, region: string): string {
    try {
        const parsed = phoneUtil.parse(number, region);
        return phoneUtil.format(parsed, PhoneNumberFormat.E164);
    } catch {
        return number;
    }
}

// Format phone for display
export function formatPhoneForDisplay(number: string, region: string): string {
    try {
        const parsed = phoneUtil.parse(number, region);
        return phoneUtil.format(parsed, PhoneNumberFormat.INTERNATIONAL);
    } catch {
        return number;
    }
}

// Validate phone number
export function isValidPhoneNumber(number: string, region: string): boolean {
    try {
        const parsed = phoneUtil.parse(number, region);
        return phoneUtil.isValidNumber(parsed);
    } catch {
        return false;
    }
}

// Parse E.164 phone number to extract region and national number
export function parseE164PhoneNumber(e164Phone: string): {
    region: string;
    number: string;
} | null {
    if (!e164Phone) return null;

    try {
        // Parse the E.164 formatted number
        const parsed = phoneUtil.parse(e164Phone);

        // Get the region code (ISO 3166-1 alpha-2)
        const regionCode = phoneUtil.getRegionCodeForNumber(parsed);

        // Get the national number (without country code)
        const nationalNumber = parsed.getNationalNumber()?.toString() || '';

        if (!regionCode) return null;

        return {
            region: regionCode,
            number: nationalNumber,
        };
    } catch {
        return null;
    }
}

export type PhoneNumberInput = z.infer<typeof phoneNumberSchema>;
export type OptionalPhoneNumberInput = z.infer<typeof optionalPhoneNumberSchema>;
