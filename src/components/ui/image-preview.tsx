'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ImagePreviewProps {
    images: string[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

export function ImagePreview({ images, initialIndex = 0, isOpen, onClose, title }: ImagePreviewProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
                    break;
                case 'ArrowRight':
                    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
                    break;
                case ' ':
                    e.preventDefault();
                    setIsZoomed(!isZoomed);
                    break;
            }
        },
        [isOpen, currentIndex, images.length, onClose, isZoomed]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsLoading(true);
        }
    };

    const goToNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsLoading(true);
        }
    };

    if (!isOpen || images.length === 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
            {/* Backdrop with blur - macOS style */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

            {/* Content Container */}
            <div
                className="relative z-10 flex flex-col items-center w-full h-full max-w-[95vw] max-h-[95vh] p-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between w-full mb-4 px-2">
                    <div className="flex items-center gap-4">
                        {title && <h2 className="text-white/90 font-medium text-lg">{title}</h2>}
                        {images.length > 1 && (
                            <span className="text-white/60 text-sm">
                                {currentIndex + 1} of {images.length}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsZoomed(!isZoomed)}
                            className="text-white/70 hover:text-white hover:bg-white/10"
                            title={isZoomed ? 'Zoom out' : 'Zoom in'}
                        >
                            {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="text-white/70 hover:text-white hover:bg-white/10"
                            title="Close (Esc)"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Main Image Area */}
                <div className="relative flex-1 flex items-center justify-center w-full overflow-hidden">
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={goToPrevious}
                                disabled={currentIndex === 0}
                                className={cn(
                                    'absolute left-4 z-20 h-12 w-12 rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all',
                                    currentIndex === 0 && 'opacity-30 cursor-not-allowed'
                                )}
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={goToNext}
                                disabled={currentIndex === images.length - 1}
                                className={cn(
                                    'absolute right-4 z-20 h-12 w-12 rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all',
                                    currentIndex === images.length - 1 && 'opacity-30 cursor-not-allowed'
                                )}
                            >
                                <ChevronRight className="h-8 w-8" />
                            </Button>
                        </>
                    )}

                    {/* Image Container with macOS-style animation */}
                    <div
                        className={cn(
                            'relative transition-all duration-300 ease-out rounded-xl overflow-hidden shadow-2xl',
                            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in',
                            isLoading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                        )}
                        onClick={() => setIsZoomed(!isZoomed)}
                    >
                        <div className={cn('relative transition-transform duration-300', isZoomed ? 'scale-150' : 'scale-100')}>
                            <Image
                                src={images[currentIndex]}
                                alt={`Preview ${currentIndex + 1}`}
                                width={1200}
                                height={800}
                                className="max-h-[75vh] w-auto h-auto object-contain"
                                onLoad={() => setIsLoading(false)}
                                priority
                            />
                        </div>
                    </div>

                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-10 w-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                    <div className="flex items-center gap-2 mt-4 p-2 bg-black/40 rounded-xl backdrop-blur-sm overflow-x-auto max-w-full">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsLoading(true);
                                }}
                                className={cn(
                                    'relative h-16 w-16 shrink-0 rounded-lg overflow-hidden transition-all duration-200',
                                    index === currentIndex
                                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50 scale-105'
                                        : 'opacity-60 hover:opacity-100'
                                )}
                            >
                                <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Keyboard Hints */}
                <div className="flex items-center gap-6 mt-4 text-white/40 text-xs">
                    <span>← → Navigate</span>
                    <span>Space Zoom</span>
                    <span>Esc Close</span>
                </div>
            </div>
        </div>
    );
}

// Single image preview trigger component
interface ImageThumbnailProps {
    src: string;
    alt?: string;
    onClick?: () => void;
    className?: string;
    showZoomHint?: boolean;
}

export function ImageThumbnail({ src, alt, onClick, className, showZoomHint = true }: ImageThumbnailProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'relative group overflow-hidden rounded-lg transition-all duration-200 hover:ring-2 hover:ring-primary hover:ring-offset-2',
                className
            )}
        >
            <Image src={src} alt={alt || 'Image'} fill className="object-cover" />
            {showZoomHint && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all">
                    <Maximize2 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            )}
        </button>
    );
}
