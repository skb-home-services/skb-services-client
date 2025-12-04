'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { BOOKING_CONFIG } from '@/configs/booking';
import { Sparkles } from 'lucide-react';

interface SubmitSectionProps {
    isSubmitting: boolean;
}

export const SubmitSection = memo(function SubmitSection({ isSubmitting }: SubmitSectionProps) {
    const submitConfig = BOOKING_CONFIG.submit;

    return (
        <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
        >
            {isSubmitting ? (
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    <span>{submitConfig.submitting.text}</span>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    <span>{submitConfig.default.text}</span>
                </div>
            )}
        </Button>
    );
});
