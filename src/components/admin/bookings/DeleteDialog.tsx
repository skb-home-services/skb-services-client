'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ADMIN_BOOKINGS_CONFIG } from '@/configs/admin-bookings';
import type { DeleteDialogProps } from '@/types/admin-bookings';

export function DeleteDialog({ open, bookingId, isDeleting, onClose, onConfirm }: DeleteDialogProps) {
    const config = ADMIN_BOOKINGS_CONFIG.deleteDialog;

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{config.title}</AlertDialogTitle>
                    <AlertDialogDescription>{config.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>{config.cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        aria-label={isDeleting ? config.deletingLabel : config.confirmLabel}
                    >
                        {isDeleting ? config.deletingLabel : config.confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
