'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { FileUpload } from '../ui/FileUpload';
import { PROFILE_CONFIG } from '@/configs/profile';
import { getInitials } from '@/lib/utils';
import type { AvatarUploadProps } from '@/types/profile';

interface AvatarSectionProps extends Omit<AvatarUploadProps, 'maxFileSize' | 'acceptedTypes'> {
    displayName?: string;
    email?: string;
    emailVerified?: boolean;
}

export function AvatarSection({
    previewUrl,
    currentImageUrl,
    fallbackInitials,
    onImageChange,
    onRemove,
    fileInputRef,
    displayName,
    email,
    emailVerified = false,
    disabled = false,
}: AvatarSectionProps) {
    const initials = fallbackInitials || getInitials(displayName || email || 'U');
    const { emailVerified: emailConfig } = PROFILE_CONFIG.accountStatus;

    return (
        <Card className="border-0 shadow-sm overflow-hidden">
            <div className="h-20 bg-gradient-to-br from-primary/20 to-primary/5" />
            <CardContent className="-mt-10 pb-6">
                <div className="flex flex-col items-center text-center">
                    {/* Profile Image */}
                    <div className="relative mb-4">
                        <FileUpload
                            previewUrl={previewUrl}
                            currentImageUrl={currentImageUrl}
                            fallbackInitials={initials}
                            onImageChange={onImageChange}
                            onRemove={onRemove}
                            fileInputRef={fileInputRef}
                            maxFileSize={PROFILE_CONFIG.avatar.maxFileSize}
                            acceptedTypes={PROFILE_CONFIG.avatar.acceptedTypes}
                            disabled={disabled}
                        />
                    </div>

                    <h3 className="font-semibold text-lg">{displayName || 'User'}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{email}</p>

                    <div className="flex items-center gap-2">
                        <Badge variant={emailVerified ? 'default' : 'secondary'} className="gap-1.5">
                            {emailVerified ? (
                                <>
                                    <CheckCircle2 className="h-3 w-3" />
                                    Verified
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="h-3 w-3" />
                                    Unverified
                                </>
                            )}
                        </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">{PROFILE_CONFIG.avatar.fileSizeLimit}</p>
                </div>
            </CardContent>
        </Card>
    );
}
