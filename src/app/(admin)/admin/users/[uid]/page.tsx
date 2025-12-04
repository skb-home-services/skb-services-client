'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    Eye,
    Shield,
    User as UserIcon,
    Clock,
    Hash,
    CalendarDays,
    Clipboard,
    Check,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageLoader } from '@/components/common';
import { ImagePreview } from '@/components/ui/image-preview';
import { getUserByUid, getBookings } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { formatDate, getInitials, cn } from '@/lib/utils';
import type { Booking, BookingStatus } from '@/types';
import BookingItem from '@/components/common/BookingItem';

const statusConfig: Record<BookingStatus, { label: string; badge: string; icon: typeof CheckCircle2; color: string }> = {
    pending: { label: 'Pending', badge: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: AlertCircle, color: 'text-yellow-600' },
    confirmed: { label: 'Confirmed', badge: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle2, color: 'text-blue-600' },
    completed: { label: 'Completed', badge: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle2, color: 'text-green-600' },
    cancelled: { label: 'Cancelled', badge: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, color: 'text-red-600' },
};

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const uid = params.uid as string;

    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const [bookingSearchQuery, setBookingSearchQuery] = useState('');
    const [bookingStatusFilter, setBookingStatusFilter] = useState<BookingStatus | 'all'>('all');

    const { data: user, isLoading: isLoadingUser } = useQuery({
        queryKey: queryKeys.users.detail(uid),
        queryFn: () => getUserByUid(uid),
        enabled: !!uid,
    });

    // Fetch user's bookings (if they have any)
    const { data: bookingsData, isLoading: isLoadingBookings } = useQuery({
        queryKey: ['userBookings', uid],
        queryFn: () => getBookings({ limit: 50 }),
        enabled: !!uid,
    });

    // Filter bookings for this user
    const userBookings = useMemo(() => {
        const bookings = bookingsData?.bookings.filter((booking: Booking) => booking.customer.uid === uid) || [];

        return bookings.filter((booking: Booking) => {
            const matchesSearch =
                bookingSearchQuery === '' ||
                booking.customer.address.city.toLowerCase().includes(bookingSearchQuery.toLowerCase()) ||
                formatDate(booking.date).toLowerCase().includes(bookingSearchQuery.toLowerCase());

            const matchesStatus = bookingStatusFilter === 'all' || booking.status === bookingStatusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [bookingsData, uid, bookingSearchQuery, bookingStatusFilter]);

    // Stats for bookings
    const allUserBookings = bookingsData?.bookings.filter((booking: Booking) => booking.customer.uid === uid) || [];
    const bookingStats = {
        total: allUserBookings.length,
        pending: allUserBookings.filter((b: Booking) => b.status === 'pending').length,
        completed: allUserBookings.filter((b: Booking) => b.status === 'completed').length,
    };

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleBookingRowClick = (bookingId: string) => {
        router.push(`/admin/bookings/${bookingId}`);
    };

    if (isLoadingUser) {
        return <PageLoader />;
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
                    <UserIcon className="h-8 w-8 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
                <p className="text-muted-foreground mb-6">The user you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <Button asChild>
                    <Link href="/admin/users">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Users
                    </Link>
                </Button>
            </div>
        );
    }

    const profileImages = user.photoURL ? [user.photoURL] : [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild className="shrink-0">
                    <Link href="/admin/users">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">User Details</h1>
                    <p className="text-sm text-muted-foreground">View user profile and activity</p>
                </div>
            </div>

            {/* Profile Card */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
                <CardContent className="relative pt-0 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-12">
                        {/* Avatar with preview on click */}
                        <button
                            onClick={() => profileImages.length > 0 && setIsImagePreviewOpen(true)}
                            className={cn('relative group shrink-0', profileImages.length > 0 && 'cursor-pointer')}
                        >
                            <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                <AvatarFallback className="text-3xl bg-primary/10">
                                    {getInitials(user.displayName || user.email)}
                                </AvatarFallback>
                            </Avatar>
                            {profileImages.length > 0 && (
                                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all">
                                    <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}
                        </button>

                        <div className="flex-1 pb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold">{user.displayName || 'Unnamed User'}</h2>
                                {user.role && user.role.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {user.role.map((role) => (
                                            <Badge key={role} variant="secondary" className="gap-1">
                                                <Shield className="h-3 w-3" />
                                                {role}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5" />
                                    {user.email}
                                </span>
                                {user.phoneNumber && (
                                    <span className="flex items-center gap-1.5">
                                        <Phone className="h-3.5 w-3.5" />
                                        {user.phoneNumber}
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    Joined {formatDate(user.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs: Account Details & Bookings */}
            <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger
                        value="details"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                    >
                        Account Details
                    </TabsTrigger>
                    <TabsTrigger
                        value="bookings"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                    >
                        Bookings ({userBookings.length})
                    </TabsTrigger>
                </TabsList>

                {/* Account Details Tab */}
                <TabsContent value="details" className="space-y-6 mt-0">
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                    <UserIcon className="h-4 w-4 text-primary" />
                                </div>
                                Account Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* UID */}
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                                        <Hash className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Firebase UID</p>
                                        <p className="font-mono text-sm">{user.uid}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(user.uid, 'uid')} className="shrink-0">
                                    {copiedField === 'uid' ? (
                                        <Check className="h-4 w-4 text-green-600" />
                                    ) : (
                                        <Clipboard className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>

                            {/* MongoDB ID */}
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                                        <Hash className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">MongoDB ID</p>
                                        <p className="font-mono text-sm">{user._id}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(user._id, 'mongoId')}
                                    className="shrink-0"
                                >
                                    {copiedField === 'mongoId' ? (
                                        <Check className="h-4 w-4 text-green-600" />
                                    ) : (
                                        <Clipboard className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>

                            <Separator />

                            {/* Timestamps */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Account Created</p>
                                        <p className="text-sm font-medium">{formatDate(user.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Last Updated</p>
                                        <p className="text-sm font-medium">{formatDate(user.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Bookings Tab */}
                <TabsContent value="bookings" className="mt-0 space-y-4">
                    {/* Booking Stats */}
                    {allUserBookings.length > 0 && (
                        <div className="grid gap-4 grid-cols-3">
                            <Card className="border-0 shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                            <CalendarDays className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Total</p>
                                            <p className="text-xl font-bold">{bookingStats.total}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                                            <AlertCircle className="h-5 w-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Pending</p>
                                            <p className="text-xl font-bold">{bookingStats.pending}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Completed</p>
                                            <p className="text-xl font-bold">{bookingStats.completed}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Search and Filter */}
                    {allUserBookings.length > 0 && (
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            placeholder="Search by service, city, or date..."
                                            value={bookingSearchQuery}
                                            onChange={(e) => setBookingSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4 text-muted-foreground" />
                                        <Select
                                            value={bookingStatusFilter}
                                            onValueChange={(value: BookingStatus | 'all') => setBookingStatusFilter(value)}
                                        >
                                            <SelectTrigger className="w-36">
                                                <SelectValue placeholder="Filter by status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Status</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Bookings List */}
                    <Card className="border-0 shadow-sm overflow-hidden">
                        <CardHeader className="border-b bg-muted/30">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                    <CalendarDays className="h-4 w-4 text-primary" />
                                </div>
                                User Bookings ({userBookings.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {isLoadingBookings ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                </div>
                            ) : userBookings.length > 0 ? (
                                <div className="divide-y">
                                    {userBookings.map((booking: Booking) => {
                                        return <BookingItem key={booking._id} booking={booking} />;
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <CalendarDays className="h-12 w-12 text-muted-foreground/30 mb-4" />
                                    <h3 className="font-semibold text-lg mb-1">
                                        {allUserBookings.length > 0 ? 'No Matching Bookings' : 'No Bookings Yet'}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {allUserBookings.length > 0
                                            ? 'Try adjusting your search or filter'
                                            : "This user hasn't made any bookings."}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Image Preview Modal */}
            <ImagePreview
                images={profileImages}
                isOpen={isImagePreviewOpen}
                onClose={() => setIsImagePreviewOpen(false)}
                title={user.displayName || 'Profile Photo'}
            />
        </div>
    );
}
