'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, Trash2, CheckCircle, MessageSquare, Clock, User, Mail, Phone, Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageLoader, Pagination } from '@/components/common';
import { toast } from '@/hooks/useToast';
import { getInquiries, deleteInquiry, updateInquiry } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { formatDate, cn } from '@/lib/utils';
import type { Inquiry } from '@/types';

const ITEMS_PER_PAGE = 10;

const statusConfig = {
    resolved: {
        label: 'Resolved',
        color: 'text-green-600',
        bg: 'bg-green-100',
        badge: 'bg-green-100 text-green-800 border-green-200',
    },
    pending: {
        label: 'Pending',
        color: 'text-amber-600',
        bg: 'bg-amber-100',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
    },
};

export default function AdminInquiriesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'resolved' | 'pending'>('all');

    const currentPage = Number(searchParams.get('page')) || 1;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: queryKeys.inquiries.list({ limit: ITEMS_PER_PAGE, offset }),
        queryFn: () => getInquiries({ limit: ITEMS_PER_PAGE, offset }),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteInquiry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.all });
            toast({
                title: 'Inquiry Deleted',
                description: 'The inquiry has been deleted.',
                variant: 'success',
            });
            setDeleteId(null);
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Delete Failed',
                description: error.message || 'Could not delete inquiry.',
                variant: 'destructive',
            });
        },
    });

    const resolveMutation = useMutation({
        mutationFn: (id: string) => updateInquiry({ id, isResolved: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.all });
            toast({
                title: 'Marked as Resolved',
                description: 'The inquiry has been marked as resolved.',
                variant: 'success',
            });
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Update Failed',
                description: error.message || 'Could not update inquiry.',
                variant: 'destructive',
            });
        },
    });

    const handleRowClick = (id: string) => {
        router.push(`/admin/inquiries/${id}`);
    };

    // Filter inquiries based on search and status
    const filteredInquiries = data?.inquiries.filter((inquiry: Inquiry) => {
        const matchesSearch =
            searchQuery === '' ||
            inquiry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'resolved' && inquiry.isResolved) ||
            (statusFilter === 'pending' && !inquiry.isResolved);

        return matchesSearch && matchesStatus;
    });

    // Stats
    const totalCount = data?.pagination.totalCount || 0;
    const resolvedCount = data?.inquiries.filter((i: Inquiry) => i.isResolved).length || 0;
    const pendingCount = data?.inquiries.filter((i: Inquiry) => !i.isResolved).length || 0;

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Error loading inquiries</h2>
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
                    <h1 className="text-2xl font-bold tracking-tight">Inquiries</h1>
                    <p className="text-muted-foreground mt-1">Manage customer inquiries and messages</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching} className="w-fit">
                    <RefreshCw className={cn('h-4 w-4 mr-2', isFetching && 'animate-spin')} />
                    Refresh
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <MessageSquare className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Inquiries</p>
                                <p className="text-2xl font-bold">{totalCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                                <Clock className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Pending</p>
                                <p className="text-2xl font-bold">{pendingCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Resolved</p>
                                <p className="text-2xl font-bold">{resolvedCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email, or message..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <Select value={statusFilter} onValueChange={(value: 'all' | 'resolved' | 'pending') => setStatusFilter(value)}>
                                <SelectTrigger className="w-36">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Inquiries List */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="text-lg">All Inquiries ({totalCount})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {filteredInquiries && filteredInquiries.length > 0 ? (
                        <div className="divide-y">
                            {filteredInquiries.map((inquiry: Inquiry) => {
                                const status = inquiry.isResolved ? statusConfig.resolved : statusConfig.pending;
                                return (
                                    <div
                                        key={inquiry._id}
                                        onClick={() => handleRowClick(inquiry._id)}
                                        className="flex items-start gap-4 p-5 hover:bg-muted/50 cursor-pointer transition-colors group"
                                    >
                                        {/* Avatar/Icon */}
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                            <User className="h-5 w-5 text-primary" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                                                    {inquiry.fullName}
                                                </h3>
                                                <Badge className={cn('shrink-0', status.badge)}>{status.label}</Badge>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    {inquiry.email}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Phone className="h-3.5 w-3.5" />
                                                    {typeof inquiry.phone === 'object' ? inquiry.phone.phoneE164 : inquiry.phone}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {formatDate(inquiry.createdAt)}
                                                </span>
                                            </div>

                                            <p className="text-sm text-muted-foreground line-clamp-2">{inquiry.message}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                            {!inquiry.isResolved && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => resolveMutation.mutate(inquiry._id)}
                                                    disabled={resolveMutation.isPending}
                                                    className="hover:bg-green-100 hover:text-green-600"
                                                    title="Mark as resolved"
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                                className="hover:bg-primary/10 hover:text-primary"
                                                title="View details"
                                            >
                                                <Link href={`/admin/inquiries/${inquiry._id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeleteId(inquiry._id)}
                                                className="hover:bg-destructive/10 hover:text-destructive"
                                                title="Delete inquiry"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-4" />
                            <h3 className="font-semibold text-lg mb-1">No inquiries found</h3>
                            <p className="text-muted-foreground text-sm">
                                {searchQuery || statusFilter !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'Customer inquiries will appear here'}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {data?.pagination && <Pagination totalPages={data.pagination.totalPages} />}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this inquiry? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteId && deleteMutation.mutate(deleteId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
