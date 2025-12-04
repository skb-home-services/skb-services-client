import { SERVICES_CONFIG } from '@/configs/services';

export function ServicesError() {
    return (
        <div className="container-custom py-12">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-destructive">{SERVICES_CONFIG.error.title}</h2>
                <p className="text-muted-foreground">{SERVICES_CONFIG.error.message}</p>
            </div>
        </div>
    );
}
