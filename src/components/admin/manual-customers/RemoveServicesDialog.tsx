'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { ManualCustomerService } from '@/types';

interface RemoveServicesDialogProps {
    services: ManualCustomerService[];
    onSubmit: (serviceSubIds: string[]) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function RemoveServicesDialog({ services, onSubmit, onCancel, isLoading }: RemoveServicesDialogProps) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const handleToggle = (serviceId: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(serviceId)) {
                next.delete(serviceId);
            } else {
                next.add(serviceId);
            }
            return next;
        });
    };

    const handleSubmit = async () => {
        if (selectedIds.size > 0) {
            await onSubmit(Array.from(selectedIds));
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Select services to remove</Label>
                <div className="max-h-60 overflow-y-auto border rounded-lg p-3 space-y-2">
                    {services.length > 0 ? (
                        services.map((service) => {
                            const isSelected = selectedIds.has(service._id);
                            return (
                                <div
                                    key={service._id}
                                    onClick={() => handleToggle(service._id)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                        isSelected ? 'bg-destructive/10 border-destructive' : 'hover:bg-muted/50 border-border'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleToggle(service._id)}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{service.serviceInfo?.name || 'Unknown Service'}</p>
                                            <p className="text-sm text-muted-foreground">Status: {service.status}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No services to remove</p>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                )}
                <Button type="button" variant="destructive" onClick={handleSubmit} disabled={isLoading || selectedIds.size === 0}>
                    {isLoading ? 'Removing...' : `Remove ${selectedIds.size} Service${selectedIds.size !== 1 ? 's' : ''}`}
                </Button>
            </div>
        </div>
    );
}
