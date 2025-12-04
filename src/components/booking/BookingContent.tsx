'use client';

import { FormProvider } from 'react-hook-form';
import { ImagePreview } from '@/components/ui/image-preview';
import { useBookingForm } from '@/hooks/useBookingForm';
import { HeaderSection } from './sections/HeaderSection';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { AddressSection } from './sections/AddressSection';
import { ScheduleSection } from './sections/ScheduleSection';
import { NotesSection } from './sections/NotesSection';
import { SubmitSection } from './sections/SubmitSection';
import { BookingSummary } from './sidebar/BookingSummary';
import { TrustBadges } from './sidebar/TrustBadges';
import { LoadingState } from './ui/LoadingState';

export function BookingContent() {
    const {
        service,
        serviceId,
        allImages,
        mainImageUrl,
        methods,
        handleSubmit,
        focusedField,
        isImagePreviewOpen,
        previewStartIndex,
        isLoading,
        handleFieldFocus,
        handleFieldBlur,
        openImagePreview,
        closeImagePreview,
        isSubmitting,
    } = useBookingForm();

    return (
        <LoadingState isLoading={isLoading} service={service}>
            {service && (
                <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                    <HeaderSection
                        service={service}
                        serviceId={serviceId}
                        mainImageUrl={mainImageUrl}
                        onImageClick={() => openImagePreview(0)}
                    />

                    <div className="container-custom py-8">
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Main Form */}
                            <div className="lg:col-span-2 animate-fade-in-up">
                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <PersonalInfoSection
                                            focusedField={focusedField}
                                            onFieldFocus={handleFieldFocus}
                                            onFieldBlur={handleFieldBlur}
                                        />
                                        <AddressSection
                                            focusedField={focusedField}
                                            onFieldFocus={handleFieldFocus}
                                            onFieldBlur={handleFieldBlur}
                                        />
                                        <ScheduleSection
                                            focusedField={focusedField}
                                            onFieldFocus={handleFieldFocus}
                                            onFieldBlur={handleFieldBlur}
                                        />
                                        <NotesSection />
                                        <SubmitSection isSubmitting={isSubmitting} />
                                    </form>
                                </FormProvider>
                            </div>

                            {/* Sidebar - Booking Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 space-y-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                                    <BookingSummary service={service} allImages={allImages} onImageClick={openImagePreview} />
                                    <TrustBadges />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Preview Modal */}
                    <ImagePreview
                        images={allImages}
                        initialIndex={previewStartIndex}
                        isOpen={isImagePreviewOpen}
                        onClose={closeImagePreview}
                        title={service.name}
                    />
                </div>
            )}
        </LoadingState>
    );
}
