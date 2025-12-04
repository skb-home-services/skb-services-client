import { AUTH_CONFIG } from '@/configs/auth';
import { cn } from '@/lib/utils';

export const BackgroundEffects = () => (
    <div className="absolute inset-0">
        <div className={cn('absolute inset-0 bg-gradient-to-br', AUTH_CONFIG.ui.backgroundGradient)}>
            <RadialGradients />
            <GridPattern />
            <FloatingOrbs />
        </div>
    </div>
);

const RadialGradients = () => (
    <>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent" />
    </>
);

const GridPattern = () => <div className="absolute inset-0 bg-grid-pattern opacity-30" />;

const FloatingOrbs = () => (
    <>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float" />
        <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '1s' }}
        />
    </>
);
