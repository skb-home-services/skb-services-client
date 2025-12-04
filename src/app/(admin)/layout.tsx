'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Header, PageLoader } from '@/components/common';
import { AdminSidebar } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isLoading, isAuthenticated, isAdmin } = useProtectedRoute({
        requireAdmin: true,
    });

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    <PageLoader />
                </main>
            </div>
        );
    }

    if (!isAuthenticated || !isAdmin) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col bg-muted/30">
            {/* Header */}
            <Header />

            <div className="flex flex-1 relative">
                {/* Sidebar */}
                <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto lg:ml-64 transition-all duration-300">
                    {/* Page Content */}
                    <div className="container-custom py-6 lg:py-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
