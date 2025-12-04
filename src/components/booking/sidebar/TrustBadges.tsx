'use client';

import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BOOKING_CONFIG } from '@/configs/booking';
import { Shield, CheckCircle } from 'lucide-react';

export const TrustBadges = memo(function TrustBadges() {
    const config = BOOKING_CONFIG.sidebar.trustBadges;

    return (
        <Card className="border-0 shadow-lg shadow-gray-100/50">
            <CardContent className="p-5">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.secure.iconBg}`}>
                            <Shield className={`w-4 h-4 ${config.secure.iconColor}`} />
                        </div>
                        <div>
                            <span className="font-medium text-gray-900">{config.secure.title}</span>
                            <p className="text-gray-500 text-xs">{config.secure.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.verified.iconBg}`}>
                            <CheckCircle className={`w-4 h-4 ${config.verified.iconColor}`} />
                        </div>
                        <div>
                            <span className="font-medium text-gray-900">{config.verified.title}</span>
                            <p className="text-gray-500 text-xs">{config.verified.description}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});
