import { CONTACT_CONFIG } from '@/configs/contact';
import { MessageSquare } from 'lucide-react';

export const HeroSection = () => (
    <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="container-custom relative py-16 md:py-24">
            <div className="max-w-2xl mx-auto text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
                    <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{CONTACT_CONFIG.hero.title}</h1>
                <p className="text-lg text-muted-foreground">{CONTACT_CONFIG.hero.description}</p>
            </div>
        </div>
    </div>
);
