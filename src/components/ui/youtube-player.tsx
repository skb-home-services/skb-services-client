'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';

// YouTube IFrame API type declarations
interface YTPlayer {
    playVideo(): void;
    pauseVideo(): void;
    mute(): void;
    unMute(): void;
    setVolume(volume: number): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    getCurrentTime(): number;
    getDuration(): number;
    getVideoLoadedFraction(): number;
    destroy(): void;
}

interface YTPlayerEvent {
    target: YTPlayer;
}

interface YTOnStateChangeEvent {
    target: YTPlayer;
    data: number;
}

interface YTPlayerOptions {
    videoId: string;
    width?: string | number;
    height?: string | number;
    playerVars?: Record<string, unknown>;
    events?: {
        onReady?: (event: YTPlayerEvent) => void;
        onStateChange?: (event: YTOnStateChangeEvent) => void;
        onError?: (event: YTPlayerEvent) => void;
    };
}

interface YTNamespace {
    Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
    PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
    };
}

interface YouTubePlayerProps {
    videoId: string;
    title?: string;
    className?: string;
    autoPlay?: boolean;
    showProgressBar?: boolean;
}

// Extract video ID from various YouTube URL formats
export function extractYouTubeVideoId(url: string): string | null {
    if (!url) return null;

    // Handle various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
        /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }

    // Check if it's already just a video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
        return url;
    }

    return null;
}

export function YouTubePlayer({ videoId, title = 'Video', className, autoPlay = true, showProgressBar = true }: YouTubePlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<YTPlayer | null>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [buffered, setBuffered] = useState(0);

    const initPlayer = useCallback(() => {
        if (!playerContainerRef.current || playerRef.current) return;

        const playerId = `youtube-player-${videoId}`;

        // Create a div for the player if it doesn't exist
        let playerDiv = document.getElementById(playerId);
        if (!playerDiv) {
            playerDiv = document.createElement('div');
            playerDiv.id = playerId;
            playerContainerRef.current.appendChild(playerDiv);
        }

        playerRef.current = new window.YT.Player(playerId, {
            videoId,
            width: '100%',
            height: '100%',
            playerVars: {
                autoplay: autoPlay ? 1 : 0,
                mute: 1, // Always start muted for autoplay
                controls: 0, // Hide default controls
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                fs: 0,
                iv_load_policy: 3, // Hide annotations
                disablekb: 1, // Disable keyboard controls (we handle them)
                playsinline: 1,
                origin: typeof window !== 'undefined' ? window.location.origin : '',
                // Fix for black bars - fit the video properly
                cc_load_policy: 0,
                hl: 'en',
            },
            events: {
                onReady: (event: YTPlayerEvent) => {
                    setIsReady(true);
                    setDuration(event.target.getDuration());
                    if (autoPlay) {
                        event.target.playVideo();
                    }
                },
                onStateChange: (event: YTOnStateChangeEvent) => {
                    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
                },
            },
        });
    }, [videoId, autoPlay]);

    // Load YouTube IFrame API
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if API is already loaded
        if (window.YT && window.YT.Player) {
            initPlayer();
            return;
        }

        // Load the API script
        if (!document.getElementById('youtube-iframe-api')) {
            const tag = document.createElement('script');
            tag.id = 'youtube-iframe-api';
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        // Initialize player when API is ready
        window.onYouTubeIframeAPIReady = () => {
            initPlayer();
        };
    }, [videoId, initPlayer]);

    // Update progress bar and buffer
    useEffect(() => {
        if (!isReady || !playerRef.current) return;

        const interval = setInterval(() => {
            if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function' && !isDragging) {
                const currentTime = playerRef.current.getCurrentTime();
                const totalDuration = playerRef.current.getDuration();
                if (totalDuration > 0) {
                    setProgress((currentTime / totalDuration) * 100);

                    // Get buffered percentage
                    const bufferedEnd = playerRef.current.getVideoLoadedFraction();
                    setBuffered(bufferedEnd * 100);
                }
            }
        }, 200);

        return () => clearInterval(interval);
    }, [isReady, isDragging]);

    // Handle fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Hide controls after inactivity
    useEffect(() => {
        if (!isHovering && showControls && isPlaying) {
            const timeout = setTimeout(() => {
                setShowControls(false);
            }, 2500);
            return () => clearTimeout(timeout);
        }
    }, [isHovering, showControls, isPlaying]);

    const togglePlay = () => {
        if (!playerRef.current) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!playerRef.current) return;

        if (isMuted) {
            playerRef.current.unMute();
            playerRef.current.setVolume(100);
        } else {
            playerRef.current.mute();
        }
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressRef.current || !playerRef.current || !duration) return;

        const rect = progressRef.current.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        const newTime = clickPosition * duration;

        playerRef.current.seekTo(newTime, true);
        setProgress(clickPosition * 100);
    };

    const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        handleProgressClick(e);
    };

    const handleProgressMouseUp = () => {
        setIsDragging(false);
    };

    const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        handleProgressClick(e);
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentTime = duration ? (progress / 100) * duration : 0;

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative w-full bg-black rounded-xl overflow-hidden group',
                // Maintain 16:9 aspect ratio properly
                'aspect-video',
                className
            )}
            onMouseEnter={() => {
                setIsHovering(true);
                setShowControls(true);
            }}
            onMouseLeave={() => {
                setIsHovering(false);
            }}
            onMouseMove={() => {
                if (!showControls) setShowControls(true);
            }}
        >
            {/* Player container - scaled slightly to hide any potential black edges */}
            <div
                ref={playerContainerRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    // Slight overscale to eliminate any black edges from YouTube's player
                    transform: 'scale(1.01)',
                    transformOrigin: 'center center',
                }}
            />

            {/* Style the iframe to fill completely */}
            <style jsx global>{`
                #youtube-player-${videoId} {
                    width: 100% !important;
                    height: 100% !important;
                }
                #youtube-player-${videoId} iframe {
                    width: 100% !important;
                    height: 100% !important;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            `}</style>

            {/* Loading state */}
            {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <div className="h-10 w-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
            )}

            {/* Custom Controls Overlay */}
            <div
                className={cn(
                    'absolute inset-0 z-20 flex flex-col justify-end transition-opacity duration-300',
                    showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                )}
            >
                {/* Gradient overlay for controls visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Center play/pause button */}
                <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    <div
                        className={cn(
                            'flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all',
                            'hover:bg-white/30 hover:scale-110',
                            isPlaying && showControls ? 'opacity-0' : 'opacity-100'
                        )}
                    >
                        {isPlaying ? (
                            <Pause className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                        ) : (
                            <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white ml-1" />
                        )}
                    </div>
                </button>

                {/* Bottom controls bar */}
                <div className="relative px-3 sm:px-4 pb-3 sm:pb-4 space-y-2 sm:space-y-3">
                    {/* Progress bar - larger hit area */}
                    {showProgressBar && (
                        <div
                            ref={progressRef}
                            onClick={handleProgressClick}
                            onMouseDown={handleProgressMouseDown}
                            onMouseUp={handleProgressMouseUp}
                            onMouseMove={handleProgressMouseMove}
                            onMouseLeave={handleProgressMouseUp}
                            className="group/progress relative h-1 hover:h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden transition-all"
                            role="slider"
                            aria-label="Video progress"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={progress}
                        >
                            {/* Buffered progress */}
                            <div
                                className="absolute inset-y-0 left-0 bg-white/30 rounded-full transition-all"
                                style={{ width: `${buffered}%` }}
                            />
                            {/* Actual progress - using red for YouTube familiarity */}
                            <div
                                className="absolute inset-y-0 left-0 bg-red-500 rounded-full transition-all duration-75"
                                style={{ width: `${progress}%` }}
                            />
                            {/* Hover indicator / Scrubber */}
                            <div
                                className={cn(
                                    'absolute top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 rounded-full shadow-lg transition-transform',
                                    'scale-0 group-hover/progress:scale-100',
                                    isDragging && 'scale-100'
                                )}
                                style={{ left: `calc(${progress}% - 6px)` }}
                            />
                        </div>
                    )}

                    {/* Control buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Play/Pause */}
                            <button
                                type="button"
                                onClick={togglePlay}
                                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10"
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? (
                                    <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                                ) : (
                                    <Play className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" />
                                )}
                            </button>

                            {/* Mute/Unmute */}
                            <button
                                type="button"
                                onClick={toggleMute}
                                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10"
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
                            </button>

                            {/* Time display */}
                            <span className="text-white/90 text-xs sm:text-sm font-medium tabular-nums hidden sm:inline">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Fullscreen */}
                            <button
                                type="button"
                                onClick={toggleFullscreen}
                                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10"
                                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                            >
                                {isFullscreen ? (
                                    <Minimize className="h-4 w-4 sm:h-5 sm:w-5" />
                                ) : (
                                    <Maximize className="h-4 w-4 sm:h-5 sm:w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Add YouTube types to window
declare global {
    interface Window {
        YT: YTNamespace;
        onYouTubeIframeAPIReady: () => void;
    }
}
