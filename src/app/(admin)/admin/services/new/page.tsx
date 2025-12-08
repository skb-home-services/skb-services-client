'use client';

import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, X, ImageIcon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/useToast';
import { createService } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { serviceSchema, type ServiceFormData } from '@/lib/validations';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_GALLERY_IMAGES } from '@/configs/config';
import { cn } from '@/lib/utils';
import type { CreateServiceInput } from '@/types';

interface GalleryItem {
    file: File;
    preview: string;
    isMain: boolean;
}

export default function NewServicePage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [pinCodeInput, setPinCodeInput] = useState('');
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

    const galleryRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            isAvailable: true,
            gallery: [],
            mainFlags: [],
        },
    });

    const mutation = useMutation({
        mutationFn: (data: CreateServiceInput) => createService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.services.all });

            toast({
                title: 'Service Created',
                description: 'The service has been created successfully.',
                variant: 'success',
            });

            router.push('/admin/services');
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Creation Failed',
                description: error.message || 'Could not create service.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data: ServiceFormData) => {
        const gallery = galleryItems.map((item) => item.file);
        const mainFlags = galleryItems.map((item) => item.isMain);

        mutation.mutate({
            ...data,
            gallery,
            mainFlags,
        });
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const remainingSlots = MAX_GALLERY_IMAGES - galleryItems.length;

        if (remainingSlots <= 0) {
            toast({
                title: 'Gallery full',
                description: `You cannot upload more than ${MAX_GALLERY_IMAGES} images.`,
                variant: 'destructive',
            });
            return;
        }

        if (files.length > remainingSlots) {
            toast({
                title: 'Too many images',
                description: `You can only add ${remainingSlots} more image(s). Maximum ${MAX_GALLERY_IMAGES} images allowed.`,
                variant: 'destructive',
            });
            return;
        }

        const newItems: GalleryItem[] = [];

        for (const file of files) {
            if (file.size > MAX_FILE_SIZE) {
                toast({
                    title: 'File too large',
                    description: `${file.name} exceeds the ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`,
                    variant: 'destructive',
                });
                continue;
            }

            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                toast({
                    title: 'Invalid file type',
                    description: `${file.name} must be JPEG, PNG or WEBP.`,
                    variant: 'destructive',
                });
                continue;
            }

            newItems.push({
                file,
                preview: URL.createObjectURL(file),
                isMain: galleryItems.length === 0 && newItems.length === 0, // First image is main by default
            });
        }

        if (newItems.length > 0) {
            setGalleryItems((prev) => [...prev, ...newItems]);
        }

        if (galleryRef.current) galleryRef.current.value = '';
    };

    const removeGalleryImage = (index: number) => {
        const removedItem = galleryItems[index];
        const newItems = galleryItems.filter((_, i) => i !== index);

        // If we removed the main image and there are other images, make the first one main
        if (removedItem.isMain && newItems.length > 0) {
            newItems[0].isMain = true;
        }

        setGalleryItems(newItems);
    };

    const setAsMainImage = (index: number) => {
        setGalleryItems((prev) =>
            prev.map((item, i) => ({
                ...item,
                isMain: i === index,
            }))
        );
    };

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild>
                <Link href="/admin/services">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Services
                </Link>
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Service</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Service Name *</Label>
                                <Input id="name" {...register('name')} placeholder="Home Cleaning" />
                                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input id="category" {...register('category')} placeholder="Household" />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="baseCost">Base Cost (INR) *</Label>
                                <Input id="baseCost" type="number" {...register('baseCost')} placeholder="1500" />
                                {errors.baseCost && <p className="text-sm text-destructive">{errors.baseCost.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="durationMinutes">Duration (minutes) *</Label>
                                <Input id="durationMinutes" type="number" {...register('durationMinutes')} placeholder="120" />
                                {errors.durationMinutes && <p className="text-sm text-destructive">{errors.durationMinutes.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" {...register('description')} placeholder="Describe the service..." rows={4} />
                        </div>

                        {/* Image Gallery */}
                        <div className="space-y-2">
                            <Label>Service Images *</Label>
                            <p className="text-sm text-muted-foreground">
                                Upload up to {MAX_GALLERY_IMAGES} images. Click the star to set as main image. (max{' '}
                                {MAX_FILE_SIZE / (1024 * 1024)}MB each)
                            </p>
                            <input
                                ref={galleryRef}
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                multiple
                                onChange={handleGalleryChange}
                                className="hidden"
                            />
                            <div className="flex flex-wrap gap-4">
                                {galleryItems.map((item, index) => (
                                    <div key={index} className="relative w-32 h-32 rounded-lg overflow-hidden border group">
                                        <Image src={item.preview} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
                                        {/* Main indicator */}
                                        <button
                                            type="button"
                                            onClick={() => setAsMainImage(index)}
                                            className={cn(
                                                'absolute top-1 left-1 p-1 rounded-full transition-colors',
                                                item.isMain
                                                    ? 'bg-yellow-400 text-yellow-900'
                                                    : 'bg-black/50 text-white/70 opacity-0 group-hover:opacity-100'
                                            )}
                                            title={item.isMain ? 'Main image' : 'Set as main image'}
                                        >
                                            <Star className={cn('h-3 w-3', item.isMain && 'fill-current')} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(index)}
                                            className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                        {item.isMain && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-yellow-900 text-xs text-center py-0.5 font-medium">
                                                Main
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {galleryItems.length < MAX_GALLERY_IMAGES && (
                                    <button
                                        type="button"
                                        onClick={() => galleryRef.current?.click()}
                                        className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-colors"
                                    >
                                        <ImageIcon className="h-6 w-6 text-muted-foreground mb-1" />
                                        <span className="text-xs text-muted-foreground">Add Image</span>
                                        <span className="text-xs text-muted-foreground">
                                            ({galleryItems.length}/{MAX_GALLERY_IMAGES})
                                        </span>
                                    </button>
                                )}
                            </div>
                            {galleryItems.length === 0 && <p className="text-sm text-destructive">At least one image is required</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="youtubeEmbedUrl">YouTube Embed URL</Label>
                            <Input id="youtubeEmbedUrl" {...register('youtubeEmbedUrl')} placeholder="https://www.youtube.com/embed/..." />
                            {errors.youtubeEmbedUrl && <p className="text-sm text-destructive">{errors.youtubeEmbedUrl.message}</p>}
                        </div>

                        <Controller
                            name="isAvailable"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isAvailable"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="isAvailable" className="font-normal">
                                        Service is available for booking
                                    </Label>
                                </div>
                            )}
                        />

                        <div className="flex gap-4">
                            <Button type="submit" disabled={isSubmitting || mutation.isPending || galleryItems.length === 0}>
                                {mutation.isPending ? 'Creating...' : 'Create Service'}
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href="/admin/services">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
