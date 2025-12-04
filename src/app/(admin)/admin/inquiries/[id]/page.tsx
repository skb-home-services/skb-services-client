'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Calendar, CheckCircle, User, MessageSquare, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PageLoader } from '@/components/common';
import { toast } from '@/hooks/useToast';
import { getInquiryById, updateInquiry } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { formatDate, cn } from '@/lib/utils';

const statusConfig = {
    resolved: {
        label: 'Resolved',
        color: 'text-green-600',
        bg: 'bg-green-100',
        badge: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
    },
    pending: {
        label: 'Pending',
        color: 'text-amber-600',
        bg: 'bg-amber-100',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Clock,
    },
};

export default function InquiryDetailPage() {
    const params = useParams();
    const queryClient = useQueryClient();
    const id = params.id as string;

    const { data: inquiry, isLoading } = useQuery({
        queryKey: queryKeys.inquiries.detail(id),
        queryFn: () => getInquiryById(id),
        enabled: !!id,
    });

    const resolveMutation = useMutation({
        mutationFn: () => updateInquiry({ id, isResolved: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.detail(id) });
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

    if (isLoading) {
        return <PageLoader />;
    }

    if (!inquiry) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
                    <XCircle className="h-8 w-8 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Inquiry Not Found</h2>
                <p className="text-muted-foreground mb-6">The inquiry you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <Button asChild>
                    <Link href="/admin/inquiries">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Inquiries
                    </Link>
                </Button>
            </div>
        );
    }

    const status = inquiry.isResolved ? statusConfig.resolved : statusConfig.pending;
    const StatusIcon = status.icon;

    return (
        <div className="space-y-6">
            {/* Header with gradient background */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="shrink-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                        >
                            <Link href="/admin/inquiries">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight">Inquiry Details</h1>
                                <Badge className={cn('gap-1.5', status.badge)}>
                                    <StatusIcon className="h-3.5 w-3.5" />
                                    {status.label}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Submitted on {formatDate(inquiry.createdAt)}</p>
                        </div>
                    </div>

                    {!inquiry.isResolved && (
                        <Button
                            onClick={() => resolveMutation.mutate()}
                            disabled={resolveMutation.isPending}
                            size="lg"
                            className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25"
                        >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            {resolveMutation.isPending ? 'Updating...' : 'Mark as Resolved'}
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Customer Info Card */}
                <Card className="border-0 shadow-sm lg:col-span-1 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary to-primary/50" />
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <User className="h-4 w-4 text-primary" />
                            </div>
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Name - Hero style */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 ring-2 ring-primary/30">
                                <User className="h-7 w-7 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Customer</p>
                                <p className="font-bold text-lg">{inquiry.fullName}</p>
                            </div>
                        </div>

                        {/* Email */}
                        <a
                            href={`mailto:${inquiry.email}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/70 transition-colors group"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                                <Mail className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground">Email Address</p>
                                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{inquiry.email}</p>
                            </div>
                        </a>

                        {/* Phone */}
                        <a
                            href={`tel:${typeof inquiry.phone === 'object' ? inquiry.phone.phoneE164 : inquiry.phone}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/70 transition-colors group"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                                <Phone className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground">Phone Number</p>
                                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                                    {typeof inquiry.phone === 'object' ? inquiry.phone.phoneE164 : inquiry.phone}
                                </p>
                            </div>
                        </a>

                        <Separator />

                        {/* Timestamps */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase">Submitted</p>
                                    <p className="text-xs font-medium">{formatDate(inquiry.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase">Updated</p>
                                    <p className="text-xs font-medium">{formatDate(inquiry.updatedAt)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Message Content - Takes more space */}
                <Card className="border-0 shadow-sm lg:col-span-2 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary/50 to-transparent" />
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <MessageSquare className="h-4 w-4 text-primary" />
                            </div>
                            Inquiry Message
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Message with quote styling */}
                        <div className="relative">
                            <div className="absolute -left-2 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                            <div className="rounded-xl bg-gradient-to-br from-muted/80 to-muted/30 p-6 ml-4">
                                <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-base">{inquiry.message}</p>
                            </div>
                        </div>

                        {/* Quick Actions - More prominent */}
                        <div className="flex flex-wrap gap-3">
                            <Button variant="default" asChild className="shadow-md">
                                <a href={`mailto:${inquiry.email}`}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Reply via Email
                                </a>
                            </Button>
                            <Button variant="outline" asChild className="shadow-sm">
                                <a href={`tel:${typeof inquiry.phone === 'object' ? inquiry.phone.phoneE164 : inquiry.phone}`}>
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Customer
                                </a>
                            </Button>
                        </div>

                        {/* Status Card - Inline at bottom */}
                        <div
                            className={cn(
                                'flex items-center justify-between p-4 rounded-xl border-2',
                                inquiry.isResolved ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', status.bg)}>
                                    <StatusIcon className={cn('h-6 w-6', status.color)} />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
                                    <p className={cn('text-lg font-bold', status.color)}>{status.label}</p>
                                </div>
                            </div>

                            {!inquiry.isResolved && (
                                <Button
                                    onClick={() => resolveMutation.mutate()}
                                    disabled={resolveMutation.isPending}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    {resolveMutation.isPending ? 'Updating...' : 'Resolve'}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
