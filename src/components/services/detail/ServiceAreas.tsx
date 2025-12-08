'use client';

import { MapPin } from 'lucide-react';
import { SERVICES_CONFIG } from '@/configs/services';
import type { Service } from '@/types';

interface ServiceAreasProps {
    service: Service;
}

export function ServiceAreas({ service }: ServiceAreasProps) {
    const { areas } = SERVICES_CONFIG.detail;

    return (
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center" aria-hidden="true">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{areas.title}</h2>
            </div>
        </div>
    );
}
