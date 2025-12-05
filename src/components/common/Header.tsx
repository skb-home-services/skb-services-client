'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/providers/AuthProvider';
import { getInitials } from '@/lib/utils';
import { NAV_ITEMS } from '@/configs/config';
import { Logo } from './Logo';
import { useProfile } from '@/hooks/useProfile';

type NavItem = (typeof NAV_ITEMS)[number];

interface NavLinkProps {
    item: NavItem;
    isActive: boolean;
    onClick?: () => void;
    mobile?: boolean;
}

const NavLink = ({ item, isActive, onClick, mobile = false }: NavLinkProps) => {
    const baseClasses = cn(
        'font-semibold transition-colors',
        isActive ? 'text-blue-600' : 'text-muted-foreground hover:text-foreground',
        mobile ? 'text-base py-1' : 'text-[15px] py-1.5'
    );

    return (
        <Link href={item.href} className={cn(baseClasses, 'relative w-fit')} onClick={onClick} aria-current={isActive ? 'page' : undefined}>
            {item.label}
            {isActive && <span className="absolute -bottom-0.5 left-0 h-[2.5px] w-full rounded-full bg-blue-500" />}
        </Link>
    );
};

const UserMenu = () => {
    const { user, signOut } = useAuth();
    const router = useRouter();
    const isAdmin = useAuth().roles.includes('admin');

    const { userProfile, authUser, previewUrl } = useProfile();

    const displayName = userProfile?.displayName || authUser?.displayName || 'User';
    const currentImageUrl = previewUrl || userProfile?.photoURL || authUser?.photoURL || '';

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={currentImageUrl} alt={displayName || 'User'} />
                        <AvatarFallback>{getInitials(displayName || user?.email || 'U')}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                    {displayName && <p className="font-medium truncate">{displayName}</p>}
                    {user?.email && <p className="text-sm text-muted-foreground truncate">{user.email}</p>}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/user/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/user/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                {isAdmin && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/admin/dashboard" className="cursor-pointer">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Admin Panel
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 hover:text-red-700 focus:text-red-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const MobileMenuToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onClick}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
    >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
);

const DesktopNavigation = () => {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} item={item} isActive={item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)} />
            ))}
        </nav>
    );
};

const DesktopAuthSection = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
                <UserMenu />
            ) : (
                <Button variant="ghost" asChild>
                    <Link href="/login">Sign in</Link>
                </Button>
            )}
        </div>
    );
};

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { isAuthenticated, roles, signOut } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const isAdmin = roles.includes('admin');

    const handleMobileSignOut = async () => {
        await signOut();
        onClose();
        router.push('/');
    };

    if (!isOpen) return null;

    return (
        <div className="border-t md:hidden" role="dialog" aria-label="Mobile menu">
            <nav className="container-custom py-5 flex flex-col gap-3" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.href}
                        item={item}
                        isActive={item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)}
                        onClick={onClose}
                        mobile
                    />
                ))}

                <div className="mt-2 pt-4 border-t">
                    {isAuthenticated ? (
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/user/dashboard"
                                className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
                                onClick={onClose}
                            >
                                Dashboard
                            </Link>
                            {isAdmin && (
                                <Link
                                    href="/admin/dashboard"
                                    className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={onClose}
                                >
                                    Admin Panel
                                </Link>
                            )}
                            <Button variant="outline" onClick={handleMobileSignOut} className="mt-2">
                                Sign out
                            </Button>
                        </div>
                    ) : (
                        <Button variant="outline" asChild className="w-full">
                            <Link href="/login" onClick={onClose}>
                                Sign in
                            </Link>
                        </Button>
                    )}
                </div>
            </nav>
        </div>
    );
};

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
    const handleMenuClose = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container-custom flex h-16 items-center justify-between">
                <Logo />
                <DesktopNavigation />
                <DesktopAuthSection />
                <MobileMenuToggle isOpen={isMenuOpen} onClick={handleMenuToggle} />
            </div>
            <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
        </header>
    );
}
