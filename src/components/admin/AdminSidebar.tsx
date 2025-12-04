'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Wrench, Calendar, Users, MessageSquare, UserCheck, X, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const adminNavItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/services', label: 'Services', icon: Wrench },
    { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/manual-customers', label: 'Manual Customers', icon: UserCheck },
    { href: '/admin/subscriptions', label: 'Subscriptions', icon: Repeat },
    { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
];

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();

    const isActiveRoute = (href: string) => {
        if (href === '/admin/dashboard') {
            return pathname === href || pathname === '/admin';
        }
        return pathname === href || pathname.startsWith(href + '/');
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} />}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed top-16 left-0 bottom-0 z-30 w-64 bg-card border-r transition-transform duration-300 ease-in-out lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Sidebar Header */}
                    <div className="flex h-16 items-center justify-between border-b px-6 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="font-semibold text-foreground">Admin Panel </span>
                        </div>
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                        {adminNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                    isActiveRoute(item.href)
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="border-t p-4 shrink-0">
                        <p className="text-xs text-muted-foreground text-center">SKB Services Admin</p>
                    </div>
                </div>
            </aside>
        </>
    );
}
