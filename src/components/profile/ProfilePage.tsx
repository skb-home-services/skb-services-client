'use client';

import { FormProvider } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useProfile } from '@/hooks/useProfile';
import { PROFILE_CONFIG } from '@/configs/profile';
import { getInitials } from '@/lib/utils';
import { ProfileHeader } from './sections/ProfileHeader';
import { AvatarSection } from './sections/AvatarSection';
import { AccountStats } from './sections/AccountStats';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { PhoneSection } from './sections/PhoneSection';
import { FormActions } from './sections/FormActions';
import { ProfileLoadingState } from './ui/LoadingState';

export function ProfilePage() {
    const {
        userProfile,
        authUser,
        formMethods,
        handleSubmit,
        previewUrl,
        handleImageChange,
        removeImage,
        fileInputRef,
        isLoading,
        isSubmitting,
        hasChanges,
    } = useProfile();

    if (isLoading) {
        return <ProfileLoadingState />;
    }

    const displayName = userProfile?.displayName || authUser?.displayName || 'User';
    const email = userProfile?.email || authUser?.email || '';
    const emailVerified = authUser?.emailVerified || false;
    const currentImageUrl = previewUrl || userProfile?.photoURL || authUser?.photoURL || null;
    const fallbackInitials = getInitials(displayName || email || 'U');

    // Get the current image URL for avatar (excluding preview since it's handled separately)
    const avatarImageUrl = (userProfile?.photoURL || authUser?.photoURL) ?? undefined;

    const { title, titleIcon: TitleIcon, description } = PROFILE_CONFIG.form;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <ProfileHeader />

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Avatar & Account Stats */}
                <div className="lg:col-span-1">
                    <AvatarSection
                        previewUrl={currentImageUrl}
                        currentImageUrl={avatarImageUrl}
                        fallbackInitials={fallbackInitials}
                        onImageChange={handleImageChange}
                        onRemove={removeImage}
                        fileInputRef={fileInputRef}
                        displayName={displayName}
                        email={email}
                        emailVerified={emailVerified}
                        disabled={isSubmitting}
                    />

                    <AccountStats
                        emailVerified={emailVerified}
                        memberSince={userProfile?.createdAt || null}
                        displayName={displayName}
                        email={email}
                    />
                </div>

                {/* Right Column - Edit Form */}
                <div className="lg:col-span-2">
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TitleIcon className="h-5 w-5 text-primary" />
                                {title}
                            </CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormProvider {...formMethods}>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <PersonalInfoSection email={email} emailVerified={emailVerified} />
                                    <PhoneSection />
                                    <FormActions hasChanges={hasChanges} isSubmitting={isSubmitting} />
                                </form>
                            </FormProvider>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
