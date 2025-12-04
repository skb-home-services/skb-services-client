'use client';

import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SERVICES_CONFIG } from '@/configs/services';
import type { Service } from '@/types';

interface ServiceAreasProps {
    service: Service;
}

export function ServiceAreas({ service }: ServiceAreasProps) {
    const { areas } = SERVICES_CONFIG.detail;
    const pinCodes = service.pinCodesCovered || [];

    if (pinCodes.length === 0) {
        return null;
    }

    return (
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center" aria-hidden="true">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{areas.title}</h2>
            </div>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Service areas">
                {pinCodes.map((code) => (
                    <Badge
                        key={code}
                        variant="secondary"
                        className="px-4 py-2 bg-white border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors cursor-default shadow-sm"
                        role="listitem"
                    >
                        <MapPin className="mr-2 h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                        <span className="font-medium text-gray-700">{code}</span>
                    </Badge>
                ))}
            </div>
        </div>
    );
}
