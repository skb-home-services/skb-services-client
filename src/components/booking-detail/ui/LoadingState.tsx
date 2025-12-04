'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function BookingDetailLoadingState() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Header Skeleton */}
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-6 w-24" />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-8 lg:grid-cols-12">
                {/* Left Column - Service Hero Skeleton */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 space-y-6">
                        <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
                        <div className="rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-100">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="mt-2 h-4 w-1/2" />
                            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                            <Skeleton className="mt-4 h-4 w-full" />
                            <Skeleton className="mt-2 h-4 w-5/6" />
                            <Skeleton className="mt-6 h-10 w-full" />
                        </div>
                    </div>
                </div>

                {/* Right Column - Booking Details Skeleton */}
                <div className="space-y-6 lg:col-span-7">
                    {/* Schedule Card Skeleton */}
                    <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50/50 p-6 ring-1 ring-blue-100/50">
                        <Skeleton className="mb-5 h-4 w-24" />
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-2xl" />
                                <div>
                                    <Skeleton className="mb-2 h-3 w-12" />
                                    <Skeleton className="h-5 w-32" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-2xl" />
                                <div>
                                    <Skeleton className="mb-2 h-3 w-12" />
                                    <Skeleton className="h-5 w-24" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Details Skeleton */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                        <div className="mb-5 flex items-center gap-3">
                            <Skeleton className="h-9 w-9 rounded-xl" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Skeleton className="h-16" />
                            <Skeleton className="h-16" />
                            <Skeleton className="h-16" />
                            <Skeleton className="h-16" />
                        </div>
                    </div>

                    {/* Address Skeleton */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                        <div className="mb-5 flex items-center gap-3">
                            <Skeleton className="h-9 w-9 rounded-xl" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-20" />
                    </div>

                    {/* Reference Skeleton */}
                    <div className="rounded-3xl bg-slate-50/80 p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <Skeleton className="h-9 w-9 rounded-xl" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <Skeleton className="h-12" />
                            <Skeleton className="h-12" />
                            <Skeleton className="h-12" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
