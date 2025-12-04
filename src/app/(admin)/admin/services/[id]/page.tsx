'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, X, Plus, ImageIcon, CheckCircle, Save, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImagePreview } from '@/components/ui/image-preview';
import { YouTubePlayer, extractYouTubeVideoId } from '@/components/ui/youtube-player';
import { PageLoader } from '@/components/common';
import { toast } from '@/hooks/useToast';
import { getServiceById, updateService } from '@/services';
import { queryKeys } from '@/lib/queryKeys';
import { editServiceSchema, type EditServiceFormData } from '@/lib/validations';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_GALLERY_IMAGES } from '@/configs/config';
import { cn } from '@/lib/utils';
import type { UpdateServiceInput, GalleryImage } from '@/types';

interface NewGalleryItem {
    file: File;
    preview: string;
    isMain: boolean;
}

export default function EditServicePage() {
    const params = useParams();
    const queryClient = useQueryClient();
    const id = params.id as string;

    const [pinCodeInput, setPinCodeInput] = useState('');
    const [newGalleryItems, setNewGalleryItems] = useState<NewGalleryItem[]>([]);
    const [existingGalleryImages, setExistingGalleryImages] = useState<GalleryImage[]>([]);
    const [mainImageId, setMainImageId] = useState<string | null>(null);
    const [showSavedIndicator, setShowSavedIndicator] = useState(false);
    const [imagesChanged, setImagesChanged] = useState(false);

    // Image preview state
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const [previewStartIndex, setPreviewStartIndex] = useState(0);

    const galleryRef = useRef<HTMLInputElement>(null);

    const { data: service, isLoading } = useQuery({
        queryKey: queryKeys.services.detail(id),
        queryFn: () => getServiceById(id),
        enabled: !!id,
    });

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors, isDirty },
    } = useForm<EditServiceFormData>({
        resolver: zodResolver(editServiceSchema),
        defaultValues: {
            image_ids: [],
            main_image_id: undefined,
        },
    });

    useEffect(() => {
        register('image_ids');
        register('main_image_id');
    }, [register]);

    useEffect(() => {
        if (service) {
            reset({
                id: service._id,
                name: service.name,
                category: service.category,
                baseCost: service.baseCost,
                durationMinutes: service.durationMinutes,
                description: service.description,
                isAvailable: service.isAvailable,
                pinCodesCovered: service.pinCodesCovered,
                youtubeEmbedUrl: service.youtubeEmbedUrl,
                image_ids: [],
                main_image_id: service.gallery?.find((img) => img.main)?._id,
            });
            setExistingGalleryImages(service.gallery || []);
            const mainImage = service.gallery?.find((img) => img.main);
            setMainImageId(mainImage?._id || null);
            setValue('main_image_id', mainImage?._id || undefined, { shouldDirty: false });
        }
    }, [service, reset, setValue]);

    const pinCodes = watch('pinCodesCovered') || [];
    const hasChanges = isDirty || imagesChanged;

    const mutation = useMutation({
        mutationFn: (data: UpdateServiceInput) => updateService(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.services.all });
            await queryClient.invalidateQueries({ queryKey: queryKeys.services.detail(id) });

            setImagesChanged(false);
            setNewGalleryItems([]);

            setShowSavedIndicator(true);
            setTimeout(() => setShowSavedIndicator(false), 3000);

            toast({
                title: 'Service Updated',
                description: 'The service has been updated successfully.',
                variant: 'success',
            });
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Update Failed',
                description: error.message || 'Could not update service.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data: EditServiceFormData) => {
        const gallery = newGalleryItems.map((item) => item.file);
        const mainFlags = newGalleryItems.map((item) => item.isMain);
        const removalList = data.image_ids?.filter(Boolean) || [];

        mutation.mutate({
            ...data,
            id,
            gallery: gallery.length > 0 ? gallery : undefined,
            mainFlags: mainFlags.length > 0 ? mainFlags : undefined,
            image_ids: removalList.length > 0 ? removalList : undefined,
            main_image_id: mainImageId ?? undefined,
        });
    };

    // Pin code handlers
    const addPinCode = () => {
        const code = pinCodeInput.trim();
        if (code && !pinCodes.includes(code)) {
            setValue('pinCodesCovered', [...pinCodes, code], { shouldDirty: true });
            setPinCodeInput('');
        }
    };

    const removePinCode = (codeToRemove: string) => {
        setValue(
            'pinCodesCovered',
            pinCodes.filter((code) => code !== codeToRemove),
            { shouldDirty: true }
        );
    };

    const handlePinCodeKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addPinCode();
        }
    };

    // Gallery handlers
    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const totalImages = existingGalleryImages.length + newGalleryItems.length;
        const remainingSlots = MAX_GALLERY_IMAGES - totalImages;

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

        const newItems: NewGalleryItem[] = [];

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
                isMain: existingGalleryImages.length === 0 && newGalleryItems.length === 0 && newItems.length === 0,
            });
        }

        if (newItems.length > 0) {
            setNewGalleryItems((prev) => [...prev, ...newItems]);
            setImagesChanged(true);
        }

        if (galleryRef.current) galleryRef.current.value = '';
    };

    const removeNewGalleryImage = (index: number) => {
        const removedItem = newGalleryItems[index];
        const updatedItems = newGalleryItems.filter((_, i) => i !== index);

        if (removedItem?.isMain) {
            if (updatedItems.length > 0) {
                updatedItems[0].isMain = true;
                setMainImageId(null);
                setValue('main_image_id', undefined, { shouldDirty: true });
            } else if (existingGalleryImages.length > 0) {
                const fallbackExisting = existingGalleryImages.find((img) => img.main)?._id || existingGalleryImages[0]._id;
                setExistingAsMain(fallbackExisting);
            } else {
                setMainImageId(null);
                setValue('main_image_id', undefined, { shouldDirty: true });
            }
        }

        setNewGalleryItems(updatedItems);
        setImagesChanged(true);
    };

    const removeExistingGalleryImage = (imageId: string) => {
        const removedImage = existingGalleryImages.find((img) => img._id === imageId);
        const updatedExisting = existingGalleryImages.filter((img) => img._id !== imageId);

        setExistingGalleryImages(updatedExisting);
        setImagesChanged(true);

        const currentRemovalList = watch('image_ids') || [];
        if (!currentRemovalList.includes(imageId)) {
            setValue('image_ids', [...currentRemovalList, imageId], { shouldDirty: true });
        }

        // If we removed the main image, reassign main priority
        if (removedImage?.main) {
            if (updatedExisting.length > 0) {
                setExistingAsMain(updatedExisting[0]._id);
            } else if (newGalleryItems.length > 0) {
                setNewAsMain(0);
            } else {
                setMainImageId(null);
                setValue('main_image_id', undefined, { shouldDirty: true });
            }
        }
    };

    const setExistingAsMain = (imageId: string) => {
        if (mainImageId === imageId) return;
        setMainImageId(imageId);
        setExistingGalleryImages((prev) => prev.map((img) => ({ ...img, main: img._id === imageId })));
        setNewGalleryItems((prev) => prev.map((item) => ({ ...item, isMain: false })));
        setImagesChanged(true);
        setValue('main_image_id', imageId, { shouldDirty: true });
    };

    const setNewAsMain = (index: number) => {
        if (newGalleryItems[index]?.isMain) return;
        setMainImageId(null);
        setExistingGalleryImages((prev) => prev.map((img) => ({ ...img, main: false })));
        setNewGalleryItems((prev) => prev.map((item, i) => ({ ...item, isMain: i === index })));
        setImagesChanged(true);
        setValue('main_image_id', undefined, { shouldDirty: true });
    };

    const totalGalleryCount = existingGalleryImages.length + newGalleryItems.length;

    // Get all preview-able images for the modal
    const getAllPreviewImages = () => {
        const images: string[] = [];
        existingGalleryImages.forEach((img) => images.push(img.url));
        newGalleryItems.forEach((item) => images.push(item.preview));
        return images;
    };

    const openImagePreview = (index: number) => {
        setPreviewStartIndex(index);
        setIsImagePreviewOpen(true);
    };

    // Get YouTube video ID for preview
    const youtubeUrl = watch('youtubeEmbedUrl');
    const youtubeVideoId = youtubeUrl ? extractYouTubeVideoId(youtubeUrl) : null;

    if (isLoading) {
        return <PageLoader />;
    }

    if (!service) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-destructive">Service not found</h2>
                <Button asChild className="mt-4">
                    <Link href="/admin/services">Back to Services</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild>
                <Link href="/admin/services">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Services
                </Link>
            </Button>

            <Card className="border-0 shadow-sm overflow-hidden">
                <div
                    className={cn(
                        'h-1 transition-all duration-300',
                        showSavedIndicator
                            ? 'bg-gradient-to-r from-green-500 to-green-400'
                            : hasChanges
                              ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                              : 'bg-gradient-to-r from-primary to-primary/50'
                    )}
                />
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">Edit Service</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                {hasChanges ? 'You have unsaved changes' : 'Make changes to the service details'}
                            </p>
                        </div>
                        {showSavedIndicator && (
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full animate-fade-in">
                                <CheckCircle className="h-5 w-5" />
                                <span className="text-sm font-semibold">Saved successfully!</span>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Service Name *</Label>
                                <Input id="name" {...register('name')} />
                                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input id="category" {...register('category')} />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="baseCost">Base Cost (NPR) *</Label>
                                <Input id="baseCost" type="number" {...register('baseCost')} />
                                {errors.baseCost && <p className="text-sm text-destructive">{errors.baseCost.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="durationMinutes">Duration (minutes) *</Label>
                                <Input id="durationMinutes" type="number" {...register('durationMinutes')} />
                                {errors.durationMinutes && <p className="text-sm text-destructive">{errors.durationMinutes.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" {...register('description')} rows={4} />
                        </div>

                        {/* Pin Codes Covered */}
                        <div className="space-y-2">
                            <Label>Pin Codes Covered</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={pinCodeInput}
                                    onChange={(e) => setPinCodeInput(e.target.value)}
                                    onKeyDown={handlePinCodeKeyDown}
                                    placeholder="Enter pin code (e.g., 44600)"
                                    className="flex-1"
                                />
                                <Button type="button" onClick={addPinCode} variant="secondary">
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add
                                </Button>
                            </div>
                            {pinCodes.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {pinCodes.map((code) => (
                                        <span
                                            key={code}
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                                        >
                                            {code}
                                            <button
                                                type="button"
                                                onClick={() => removePinCode(code)}
                                                className="hover:bg-primary/20 rounded-full p-0.5"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Image Gallery */}
                        <div className="space-y-2">
                            <Label>Service Images</Label>
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
                                {/* Existing gallery images */}
                                {existingGalleryImages.map((image, index) => (
                                    <div key={image._id} className="relative w-32 h-32 rounded-xl overflow-hidden border group">
                                        <Image src={image.url} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
                                        {/* Main indicator */}
                                        <button
                                            type="button"
                                            onClick={() => setExistingAsMain(image._id)}
                                            className={cn(
                                                'absolute top-1 left-1 z-20 p-1 rounded-full transition-colors',
                                                image.main
                                                    ? 'bg-yellow-400 text-yellow-900'
                                                    : 'bg-black/50 text-white/70 opacity-0 group-hover:opacity-100'
                                            )}
                                            title={image.main ? 'Main image' : 'Set as main image'}
                                        >
                                            <Star className={cn('h-3 w-3', image.main && 'fill-current')} />
                                        </button>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => openImagePreview(index)}
                                                className="p-1.5 bg-white/90 text-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeExistingGalleryImage(image._id)}
                                                className="p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                        {image.main && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] py-0.5 text-center font-medium">
                                                Main
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {/* New gallery images */}
                                {newGalleryItems.map((item, index) => {
                                    const previewIndex = existingGalleryImages.length + index;
                                    return (
                                        <div
                                            key={`new-${index}`}
                                            className="relative w-32 h-32 rounded-xl overflow-hidden border border-primary group"
                                        >
                                            <Image
                                                src={item.preview}
                                                alt={`New gallery image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Main indicator */}
                                            <button
                                                type="button"
                                                onClick={() => setNewAsMain(index)}
                                                className={cn(
                                                    'absolute top-1 left-1 z-20 p-1 rounded-full transition-colors',
                                                    item.isMain
                                                        ? 'bg-yellow-400 text-yellow-900'
                                                        : 'bg-black/50 text-white/70 opacity-0 group-hover:opacity-100'
                                                )}
                                                title={item.isMain ? 'Main image' : 'Set as main image'}
                                            >
                                                <Star className={cn('h-3 w-3', item.isMain && 'fill-current')} />
                                            </button>
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => openImagePreview(previewIndex)}
                                                    className="p-1.5 bg-white/90 text-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewGalleryImage(index)}
                                                    className="p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                            {item.isMain && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] py-0.5 text-center font-medium">
                                                    Main
                                                </div>
                                            )}
                                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-bl font-medium">
                                                New
                                            </div>
                                        </div>
                                    );
                                })}
                                {totalGalleryCount < MAX_GALLERY_IMAGES && (
                                    <button
                                        type="button"
                                        onClick={() => galleryRef.current?.click()}
                                        className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-colors"
                                    >
                                        <ImageIcon className="h-6 w-6 text-muted-foreground mb-1" />
                                        <span className="text-xs text-muted-foreground">Add Image</span>
                                        <span className="text-xs text-muted-foreground">
                                            ({totalGalleryCount}/{MAX_GALLERY_IMAGES})
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="youtubeEmbedUrl">YouTube Embed URL</Label>
                            <Input
                                id="youtubeEmbedUrl"
                                {...register('youtubeEmbedUrl')}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                            {errors.youtubeEmbedUrl && <p className="text-sm text-destructive">{errors.youtubeEmbedUrl.message}</p>}

                            {/* YouTube Preview */}
                            {youtubeVideoId && (
                                <div className="mt-4">
                                    <p className="text-sm text-muted-foreground mb-2">Video Preview:</p>
                                    <div className="max-w-md">
                                        <YouTubePlayer
                                            videoId={youtubeVideoId}
                                            title={service.name}
                                            autoPlay={false}
                                            showProgressBar={true}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <Controller
                            name="isAvailable"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isAvailable"
                                        checked={field.value ?? true}
                                        onChange={field.onChange}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="isAvailable" className="font-normal">
                                        Service is available for booking
                                    </Label>
                                </div>
                            )}
                        />

                        <div className="flex items-center gap-4 pt-4 border-t">
                            <Button
                                type="submit"
                                disabled={!hasChanges || mutation.isPending}
                                size="lg"
                                className={cn(
                                    'min-w-[160px] transition-all',
                                    hasChanges && !mutation.isPending && 'shadow-lg shadow-primary/25'
                                )}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <div className="h-4 w-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                            <Button type="button" variant="outline" size="lg" asChild>
                                <Link href="/admin/services">Cancel</Link>
                            </Button>
                            {hasChanges && (
                                <span className="text-sm text-amber-600 flex items-center gap-1.5 ml-auto">
                                    <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                                    Unsaved changes
                                </span>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Image Preview Modal */}
            <ImagePreview
                images={getAllPreviewImages()}
                initialIndex={previewStartIndex}
                isOpen={isImagePreviewOpen}
                onClose={() => setIsImagePreviewOpen(false)}
                title={service.name}
            />
        </div>
    );
}
