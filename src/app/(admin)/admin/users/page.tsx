'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpRight, Users, Search, RefreshCw, Shield, Mail, Calendar, Filter, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageLoader, Pagination } from '@/components/common';
import { getUsers } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { formatDate, getInitials, cn } from '@/lib/utils';
import type { User } from '@/types';

const ITEMS_PER_PAGE = 10;

export default function AdminUsersPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');

    const currentPage = Number(searchParams.get('page')) || 1;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: queryKeys.users.list({ limit: ITEMS_PER_PAGE, offset }),
        queryFn: () => getUsers({ limit: ITEMS_PER_PAGE, offset }),
    });

    // Stats
    const totalCount = data?.pagination?.totalCount || 0;

    const handleRowClick = (uid: string) => {
        router.push(`/admin/users/${uid}`);
    };

    // Filter users based on search and role
    const filteredUsers = useMemo(() => {
        return data?.users.filter((user: User) => {
            const matchesSearch =
                searchQuery === '' ||
                (user.displayName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesRole =
                roleFilter === 'all' ||
                (roleFilter === 'admin' && user.role?.includes('admin')) ||
                (roleFilter === 'user' && (!user.role || !user.role.includes('admin')));

            return matchesSearch && matchesRole;
        });
    }, [data, searchQuery, roleFilter]);

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Error loading users</h2>
                <p className="text-muted-foreground mb-4">Please try again later.</p>
                <Button onClick={() => refetch()}>Try Again</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground mt-1">View registered platform users</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching} className="w-fit">
                    <RefreshCw className={cn('h-4 w-4 mr-2', isFetching && 'animate-spin')} />
                    Refresh
                </Button>
            </div>

            {/* Search and Filter */}
            <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <Select value={roleFilter} onValueChange={(value: 'all' | 'admin' | 'user') => setRoleFilter(value)}>
                                <SelectTrigger className="w-36">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="user">Regular Users</SelectItem>
                                    <SelectItem value="admin">Administrators</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users List */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="text-lg">All Users ({totalCount})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {filteredUsers && filteredUsers.length > 0 ? (
                        <div className="divide-y">
                            {filteredUsers.map((user: User) => (
                                <div
                                    key={user._id}
                                    onClick={() => handleRowClick(user.uid)}
                                    className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors group"
                                >
                                    {/* Avatar */}
                                    <Avatar className="h-12 w-12 shrink-0">
                                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {getInitials(user.displayName || user.email)}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                                                {user.displayName || 'Unnamed User'}
                                            </h3>
                                            {user.role && user.role.length > 0 && (
                                                <div className="flex gap-1">
                                                    {user.role.map((role) => (
                                                        <Badge key={role} variant="secondary" className="shrink-0 gap-1">
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
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5" />
                                                Joined {formatDate(user.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                            className="hover:bg-primary/10 hover:text-primary"
                                            title="View user details"
                                        >
                                            <Link href={`/admin/users/${user.uid}`}>
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
                            <h3 className="font-semibold text-lg mb-1">No users found</h3>
                            <p className="text-muted-foreground text-sm">
                                {searchQuery || roleFilter !== 'all'
                                    ? 'Try adjusting your search or filter'
                                    : 'Registered users will appear here'}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {data?.pagination && <Pagination totalPages={data.pagination.totalPages} />}
        </div>
    );
}
