'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, Filter, RefreshCw, UserCheck, CheckCircle, XCircle, Mail, Phone, MapPin } from 'lucide-react';
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
import { getManualCustomers, deleteManualCustomer } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { cn } from '@/lib/utils';
import type { ManualCustomer } from '@/types';

const ITEMS_PER_PAGE = 10;

export default function AdminManualCustomersPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const currentPage = Number(searchParams.get('page')) || 1;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const filters = {
        limit: ITEMS_PER_PAGE,
        offset,
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter !== 'all' && { isActive: statusFilter === 'active' }),
    };

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: queryKeys.manualCustomers.list(filters),
        queryFn: () => getManualCustomers(filters),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteManualCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.manualCustomers.all });
            toast({
                title: 'Customer Deleted',
                description: 'The manual customer has been deleted successfully.',
                variant: 'success',
            });
            setDeleteId(null);
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Delete Failed',
                description: error.message || 'Could not delete customer.',
                variant: 'destructive',
            });
        },
    });

    const handleRowClick = (id: string) => {
        router.push(`/admin/manual-customers/${id}`);
    };

    // Stats
    const totalCount = data?.pagination.totalCount || 0;
    const activeCount = data?.customers.filter((c) => c.isActive).length || 0;
    const inactiveCount = data?.customers.filter((c) => !c.isActive).length || 0;

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <UserCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Error loading customers</h2>
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
                    <h1 className="text-2xl font-bold tracking-tight">Manual Customers</h1>
                    <p className="text-muted-foreground mt-1">Manage manual customer records and their services</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
                        <RefreshCw className={cn('h-4 w-4 mr-2', isFetching && 'animate-spin')} />
                        Refresh
                    </Button>
                    <Button asChild>
                        <Link href="/admin/manual-customers/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Customer
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <UserCheck className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Customers</p>
                                <p className="text-2xl font-bold">{totalCount}</p>
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
                                <p className="text-sm text-muted-foreground">Active</p>
                                <p className="text-2xl font-bold">{activeCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                                <XCircle className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Inactive</p>
                                <p className="text-2xl font-bold">{inactiveCount}</p>
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
                                placeholder="Search by name, email, or phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
                                <SelectTrigger className="w-36">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Customers List */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="text-lg">All Customers ({totalCount})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {data?.customers && data.customers.length > 0 ? (
                        <div className="divide-y">
                            {data.customers.map((customer: ManualCustomer) => (
                                <div
                                    key={customer._id}
                                    onClick={() => handleRowClick(customer._id)}
                                    className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors group"
                                >
                                    {/* Customer Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                                                {customer.fullName}
                                            </h3>
                                            <Badge
                                                variant={customer.isActive ? 'default' : 'secondary'}
                                                className={cn(
                                                    'shrink-0',
                                                    customer.isActive
                                                        ? 'bg-green-100 text-green-800 border-green-200'
                                                        : 'bg-gray-100 text-gray-800 border-gray-200'
                                                )}
                                            >
                                                {customer.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                            {customer.email && (
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    {customer.email}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1.5">
                                                <Phone className="h-3.5 w-3.5" />
                                                {customer.phone.nationalNumber}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {customer.address.city}, {customer.address.state}
                                            </span>
                                            <span className="text-primary font-medium">
                                                {customer.services.length} service{customer.services.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                            className="hover:bg-blue-100 hover:text-blue-600"
                                            title="Edit customer"
                                        >
                                            <Link href={`/admin/manual-customers/${customer._id}`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteId(customer._id)}
                                            className="hover:bg-destructive/10 hover:text-destructive"
                                            title="Delete customer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <UserCheck className="h-12 w-12 text-muted-foreground/30 mb-4" />
                            <h3 className="font-semibold text-lg mb-1">No customers found</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                {searchQuery || statusFilter !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'Create your first manual customer to get started'}
                            </p>
                            {!searchQuery && statusFilter === 'all' && (
                                <Button asChild>
                                    <Link href="/admin/manual-customers/new">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Customer
                                    </Link>
                                </Button>
                            )}
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
                        <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this manual customer? This action cannot be undone and will also remove all
                            associated services.
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
