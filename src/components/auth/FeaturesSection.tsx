import { CheckCircle } from 'lucide-react';
import { REGISTER_CONFIG } from '@/configs/register';

export const FeaturesSection = () => (
    <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
            {REGISTER_CONFIG.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{feature.text}</span>
                </div>
            ))}
        </div>
    </div>
);
