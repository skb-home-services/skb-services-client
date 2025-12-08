'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
    Plus,
    Pencil,
    Trash2,
    ExternalLink,
    Wrench,
    Search,
    Filter,
    RefreshCw,
    CheckCircle,
    XCircle,
    Clock,
    IndianRupee,
} from 'lucide-react';
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
import { getServices, deleteService } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { formatCurrency, formatDuration, cn } from '@/lib/utils';
import type { Service } from '@/types';

const ITEMS_PER_PAGE = 10;

export default function AdminServicesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'unavailable'>('all');

    const currentPage = Number(searchParams.get('page')) || 1;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: queryKeys.services.list({ limit: ITEMS_PER_PAGE, offset }),
        queryFn: () => getServices({ limit: ITEMS_PER_PAGE, offset }),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.services.all });
            toast({
                title: 'Service Deleted',
                description: 'The service has been deleted successfully.',
                variant: 'success',
            });
            setDeleteId(null);
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Delete Failed',
                description: error.message || 'Could not delete service.',
                variant: 'destructive',
            });
        },
    });

    const handleRowClick = (id: string) => {
        router.push(`/services/${id}`);
    };

    // Filter services based on search and availability
    const filteredServices = data?.services.filter((service: Service) => {
        const matchesSearch =
            searchQuery === '' ||
            service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesAvailability =
            availabilityFilter === 'all' ||
            (availabilityFilter === 'available' && service.isAvailable) ||
            (availabilityFilter === 'unavailable' && !service.isAvailable);

        return matchesSearch && matchesAvailability;
    });

    // Stats
    const totalCount = data?.pagination.totalCount || 0;
    const availableCount = data?.services.filter((s: Service) => s.isAvailable).length || 0;
    const unavailableCount = data?.services.filter((s: Service) => !s.isAvailable).length || 0;

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <Wrench className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Error loading services</h2>
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
                    <h1 className="text-2xl font-bold tracking-tight">Services</h1>
                    <p className="text-muted-foreground mt-1">Manage your service offerings</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
                        <RefreshCw className={cn('h-4 w-4 mr-2', isFetching && 'animate-spin')} />
                        Refresh
                    </Button>
                    <Button asChild>
                        <Link href="/admin/services/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Service
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
                                <Wrench className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Services</p>
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
                                <p className="text-sm text-muted-foreground">Available</p>
                                <p className="text-2xl font-bold">{availableCount}</p>
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
                                <p className="text-sm text-muted-foreground">Unavailable</p>
                                <p className="text-2xl font-bold">{unavailableCount}</p>
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
                                placeholder="Search by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <Select
                                value={availabilityFilter}
                                onValueChange={(value: 'all' | 'available' | 'unavailable') => setAvailabilityFilter(value)}
                            >
                                <SelectTrigger className="w-36">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="unavailable">Unavailable</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Services List */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="text-lg">All Services ({totalCount})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {filteredServices && filteredServices.length > 0 ? (
                        <div className="divide-y">
                            {filteredServices.map((service: Service) => (
                                <div
                                    key={service._id}
                                    onClick={() => handleRowClick(service._id)}
                                    className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors group"
                                >
                                    {/* Service Image */}
                                    <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-muted">
                                        {service.mainImage?.url ? (
                                            <Image src={service.mainImage.url} alt={service.name} fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <Wrench className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                                                {service.name}
                                            </h3>
                                            <Badge
                                                variant={service.isAvailable ? 'default' : 'secondary'}
                                                className={cn(
                                                    'shrink-0',
                                                    service.isAvailable
                                                        ? 'bg-green-100 text-green-800 border-green-200'
                                                        : 'bg-gray-100 text-gray-800 border-gray-200'
                                                )}
                                            >
                                                {service.isAvailable ? 'Available' : 'Unavailable'}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                            <span className="text-primary font-medium">{service.category}</span>
                                            <span className="flex items-center gap-1.5">
                                                <IndianRupee className="h-3.5 w-3.5" />
                                                {formatCurrency(service.baseCost)}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="h-3.5 w-3.5" />
                                                {formatDuration(service.durationMinutes)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                            className="hover:bg-primary/10 hover:text-primary"
                                            title="View public page"
                                        >
                                            <Link href={`/services/${service._id}`} target="_blank">
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                            className="hover:bg-blue-100 hover:text-blue-600"
                                            title="Edit service"
                                        >
                                            <Link href={`/admin/services/${service._id}`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteId(service._id)}
                                            className="hover:bg-destructive/10 hover:text-destructive"
                                            title="Delete service"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <Wrench className="h-12 w-12 text-muted-foreground/30 mb-4" />
                            <h3 className="font-semibold text-lg mb-1">No services found</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                {searchQuery || availabilityFilter !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'Create your first service to get started'}
                            </p>
                            {!searchQuery && availabilityFilter === 'all' && (
                                <Button asChild>
                                    <Link href="/admin/services/new">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Service
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
                        <AlertDialogTitle>Delete Service</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this service? This action cannot be undone.
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
