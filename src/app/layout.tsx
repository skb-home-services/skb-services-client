import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Providers } from '@/providers';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

export const metadata: Metadata = {
    title: 'SKB Services',
    description: 'Professional cleaning services in Bangalore',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    openGraph: {
        title: 'SKB Services',
        description: 'Professional cleaning services in Bangalore',
        url: 'https://www.tankcleaningservice.in',
        siteName: 'SKB Services',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SKB Services',
        description: 'Professional cleaning services in Bangalore',
        images: ['/android-chrome-512x512.png'],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={outfit.variable}>
            <body className="min-h-screen bg-background font-sans antialiased">
                <Providers>{children}</Providers>
                <SpeedInsights />
            </body>
        </html>
    );
}
