import { Sparkles } from 'lucide-react';
import { SERVICES_CONFIG } from '@/configs/services';

export function ServicesHero() {
    return (
        <div className="relative mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl -z-10" />
            <div className="py-8 px-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                        <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{SERVICES_CONFIG.hero.title}</h1>
                        <p className="text-muted-foreground">{SERVICES_CONFIG.hero.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
