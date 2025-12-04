import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Service } from '@/types';
import { formatCurrency, formatDuration } from '@/lib/utils';
import { Clock3, IndianRupee, Tag } from 'lucide-react';

interface ServiceInfoCardProps {
    service?: Service;
}

export function ServiceInfoCard({ service }: ServiceInfoCardProps) {
    if (!service) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Service</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Service information is not available.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div>
                    <p className="text-xs uppercase text-muted-foreground">Name</p>
                    <p className="font-medium">{service.name}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium capitalize">{service.category ?? 'N/A'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <p className="text-muted-foreground">Base Cost</p>
                    <p className="font-medium">{formatCurrency(service.baseCost)}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{formatDuration(service.durationMinutes)}</p>
                </div>
            </CardContent>
        </Card>
    );
}
