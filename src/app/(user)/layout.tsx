'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, User } from 'lucide-react';
import { Header, PageLoader } from '@/components/common';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
    title: 'User - SKB Services',
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

const navItems = [
    { href: '/user/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/user/bookings', label: 'My Bookings', icon: Calendar },
    { href: '/user/profile', label: 'Profile', icon: User },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isLoading, isAuthenticated } = useProtectedRoute();

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    <PageLoader />
                </main>
                <Footer />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
                <div className="container-custom py-8">
                    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                        {/* Sidebar */}
                        <aside className="hidden lg:block">
                            <nav className="sticky top-24 space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                            pathname === item.href
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </aside>

                        {/* Mobile Nav */}
                        <div className="flex gap-2 overflow-x-auto pb-4 lg:hidden">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                        pathname === item.href
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Main Content */}
                        <main>{children}</main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
