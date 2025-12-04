'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';
import { PROFILE_CONFIG } from '@/configs/profile';
import type { FormActionsProps } from '@/types/profile';

export function FormActions({ hasChanges, isSubmitting }: FormActionsProps) {
    const { save: saveConfig, status: statusConfig } = PROFILE_CONFIG.form.actions;

    return (
        <>
            <Separator />
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    {hasChanges ? (
                        <span className="flex items-center gap-2 text-amber-600">
                            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
                            {statusConfig.unsavedChanges}
                        </span>
                    ) : (
                        <span className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                            {statusConfig.allSaved}
                        </span>
                    )}
                </div>
                <Button type="submit" disabled={!hasChanges || isSubmitting} className="min-w-[140px]">
                    {isSubmitting ? (
                        <>
                            <div
                                className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"
                                aria-hidden="true"
                            />
                            {saveConfig.savingLabel}
                        </>
                    ) : (
                        saveConfig.label
                    )}
                </Button>
            </div>
        </>
    );
}
