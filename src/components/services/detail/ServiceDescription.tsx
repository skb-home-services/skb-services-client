'use client';

import { lazy, Suspense } from 'react';
import { Sparkles, Play } from 'lucide-react';
import { YouTubePlayer } from '@/components/ui/youtube-player';
import { SERVICES_CONFIG } from '@/configs/services';
import type { Service } from '@/types';

// Lazy load YouTube player for better performance
const LazyYouTubePlayer = lazy(() =>
    Promise.resolve({
        default: YouTubePlayer,
    })
);

interface ServiceDescriptionProps {
    service: Service;
    youtubeVideoId: string | null;
}

function YouTubePlayerSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-center">
                <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Loading video...</p>
            </div>
        </div>
    );
}

export function ServiceDescription({ service, youtubeVideoId }: ServiceDescriptionProps) {
    const { description, video } = SERVICES_CONFIG.detail;

    return (
        <>
            {/* Description Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center" aria-hidden="true">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{description.title}</h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <p className="text-gray-600 leading-relaxed text-lg">{service.description || description.empty}</p>
                </div>
            </div>

            {/* YouTube Video */}
            {youtubeVideoId && (
                <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center" aria-hidden="true">
                            <Play className="w-5 h-5 text-red-600" fill="currentColor" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{video.title}</h2>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <Suspense fallback={<YouTubePlayerSkeleton />}>
                            <LazyYouTubePlayer
                                videoId={youtubeVideoId}
                                title={`${service.name} video`}
                                autoPlay={true}
                                showProgressBar={true}
                            />
                        </Suspense>
                    </div>
                </div>
            )}
        </>
    );
}
