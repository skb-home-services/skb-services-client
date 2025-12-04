'use client';

import { Clock } from 'lucide-react';
import { HeroSection } from '@/components/inquiry/HeroSection';
import { ContactSidebar } from '@/components/inquiry/ContactSidebar';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { useInquiryForm } from '@/hooks';
import { CONTACT_CONFIG } from '@/configs/contact';

export default function InquiryPage() {
    const { formMethods, onSubmit, isLoading } = useInquiryForm();

    return (
        <div className="min-h-screen">
            <HeroSection />

            <div className="container-custom py-12">
                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Contact Information Sidebar */}
                    <div className="lg:col-span-2">
                        <ContactSidebar />
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <InquiryForm formMethods={formMethods} onSubmit={onSubmit} isLoading={isLoading} />

                        {/* Response Time Info */}
                        <ResponseTimeInfo />
                    </div>
                </div>
            </div>
        </div>
    );
}

const ResponseTimeInfo = () => (
    <div className="mt-6 p-4 rounded-2xl bg-muted/50 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
        </div>
        <div>
            <h4 className="font-medium">Expected Response Time</h4>
            <p className="text-sm text-muted-foreground">
                We typically respond {CONTACT_CONFIG.responseTime.expected} during our working hours. {CONTACT_CONFIG.responseTime.note}
            </p>
        </div>
    </div>
);
