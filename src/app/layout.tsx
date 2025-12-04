import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Providers } from '@/providers';
import '@/styles/globals.css';

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

export const metadata: Metadata = {
    title: {
        default: 'SKB Services - Professional Home Services',
        template: '%s | SKB Services',
    },
    description: 'Professional home services at your doorstep. Quality work by trusted professionals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={outfit.variable}>
            <body className="min-h-screen bg-background font-sans antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
