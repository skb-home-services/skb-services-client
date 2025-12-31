'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PhoneInput } from '@/components/common';
import { toast } from '@/hooks/useToast';
import { createInquiry } from '@/services';
import { inquirySchema, type InquiryFormData } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { ContactSidebar } from '@/components/inquiry/ContactSidebar';

export default function InquiryPage() {
    const methods = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = methods;

    const mutation = useMutation({
        mutationFn: createInquiry,
        onSuccess: () => {
            toast({
                title: 'Inquiry Submitted!',
                description: 'We will get back to you within 24 hours.',
                variant: 'success',
            });
            reset();
        },
        onError: (error: { message: string }) => {
            toast({
                title: 'Failed to submit',
                description: error.message || 'Please try again.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data: InquiryFormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="min-h-screen">
            <div className="container-custom py-12">
                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Contact Information Sidebar */}
                    <ContactSidebar />

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                        <Send className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>Send us a Message</CardTitle>
                                        <CardDescription>Fill out the form below and we&apos;ll get back to you shortly.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="fullName" className="text-sm font-medium">
                                                    Full Name <span className="text-destructive">*</span>
                                                </Label>
                                                <Input
                                                    id="fullName"
                                                    {...register('fullName')}
                                                    placeholder="John Doe"
                                                    className={cn(
                                                        'h-11 rounded-xl transition-all',
                                                        errors.fullName && 'border-destructive focus-visible:ring-destructive'
                                                    )}
                                                />
                                                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-sm font-medium">
                                                    Email <span className="text-destructive">*</span>
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    {...register('email')}
                                                    placeholder="john@example.com"
                                                    className={cn(
                                                        'h-11 rounded-xl transition-all',
                                                        errors.email && 'border-destructive focus-visible:ring-destructive'
                                                    )}
                                                />
                                                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                                            </div>
                                        </div>

                                        <PhoneInput name="phone" label="Phone Number" required />

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-sm font-medium">
                                                Message <span className="text-destructive">*</span>
                                            </Label>
                                            <Textarea
                                                id="message"
                                                {...register('message')}
                                                placeholder="Tell us about your requirements, questions, or how we can help you..."
                                                rows={6}
                                                className={cn(
                                                    'rounded-xl resize-none transition-all',
                                                    errors.message && 'border-destructive focus-visible:ring-destructive'
                                                )}
                                            />
                                            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                                            <p className="text-sm text-muted-foreground">
                                                By submitting, you agree to our{' '}
                                                <a href="#" className="text-primary hover:underline">
                                                    Privacy Policy
                                                </a>
                                            </p>
                                            <Button
                                                type="submit"
                                                size="lg"
                                                disabled={mutation.isPending || isSubmitting}
                                                className="rounded-xl min-w-[180px]"
                                            >
                                                {mutation.isPending ? (
                                                    <>
                                                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="mr-2 h-4 w-4" />
                                                        Send Message
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </FormProvider>
                            </CardContent>
                        </Card>

                        {/* Response Time Info */}
                        <div className="mt-6 p-4 rounded-2xl bg-muted/50 flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium">Expected Response Time</h4>
                                <p className="text-sm text-muted-foreground">
                                    We typically respond within 2-4 business hours during our working hours. For urgent inquiries, please
                                    call us directly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
