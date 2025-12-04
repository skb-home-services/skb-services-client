'use client';

import { Camera, X } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { AvatarUploadProps } from '@/types/profile';

export function FileUpload({
    previewUrl,
    currentImageUrl,
    fallbackInitials,
    onImageChange,
    onRemove,
    fileInputRef,
    maxFileSize,
    acceptedTypes,
    disabled = false,
}: AvatarUploadProps) {
    return (
        <div className="relative">
            {previewUrl ? (
                <>
                    <div className="relative h-28 w-28 rounded-full overflow-hidden ring-4 ring-background shadow-lg">
                        <Image src={previewUrl} alt="Profile preview" fill className="object-cover" />
                    </div>
                    <button
                        type="button"
                        onClick={onRemove}
                        disabled={disabled}
                        className="absolute top-1 right-1 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed z-10"
                        aria-label="Remove profile picture"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </>
            ) : (
                <Avatar className="h-28 w-28 ring-4 ring-background shadow-lg">
                    <AvatarImage src={currentImageUrl} alt="Profile" />
                    <AvatarFallback className="text-3xl bg-primary/10 text-primary font-semibold">{fallbackInitials}</AvatarFallback>
                </Avatar>
            )}
            <label
                htmlFor="profile_image"
                className={cn(
                    'absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105',
                    disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
                )}
                aria-label="Upload profile picture"
            >
                <Camera className="h-4 w-4" />
                <input
                    ref={fileInputRef}
                    id="profile_image"
                    type="file"
                    accept={acceptedTypes.join(',')}
                    className="hidden"
                    onChange={onImageChange}
                    disabled={disabled}
                    aria-label="Profile image upload"
                />
            </label>
        </div>
    );
}
