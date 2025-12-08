import type { Metadata } from 'next';
import { Header } from '@/components/common';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
    title: 'Public - SKB Services',
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

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
