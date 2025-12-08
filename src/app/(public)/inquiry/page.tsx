'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, ExternalLink, CheckCircle2 } from 'lucide-react';
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
import { CONTACT_CONFIG } from '@/configs/contact';

// Office location (mock coordinates for Kathmandu, Nepal)
const OFFICE_LOCATION = {
    lat: 27.7172,
    lng: 85.324,
    address: 'Thamel, Kathmandu 44600, Nepal',
    googleMapsUrl: 'https://maps.google.com/?q=27.7172,85.3240',
};

// Contact information
const CONTACT_INFO = {
    phone: '+977 9840282545',
    email: 'contact@skbservices.com',
    hours: 'Mon-Sat, 9:00 AM - 6:00 PM',
};

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
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="container-custom relative py-16 md:py-24">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
                            <MessageSquare className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get in Touch</h1>
                        <p className="text-lg text-muted-foreground">
                            Have questions about our services? We&apos;re here to help. Send us a message and we&apos;ll respond as soon as
                            possible.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Contact Information Sidebar */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Contact Cards */}
                        <div className="space-y-4">
                            {/* Phone Card */}
                            <Card className="group border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="block">
                                    <CardContent className="flex items-center gap-4 p-5">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 group-hover:bg-green-200 transition-colors">
                                            <Phone className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Call Us</h3>
                                            <p className="text-primary font-medium">{CONTACT_INFO.phone}</p>
                                            <p className="text-sm text-muted-foreground">{CONTACT_INFO.hours}</p>
                                        </div>
                                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </CardContent>
                                </a>
                            </Card>

                            {/* Email Card */}
                            <Card className="group border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <a href={`mailto:${CONTACT_INFO.email}`} className="block">
                                    <CardContent className="flex items-center gap-4 p-5">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                                            <Mail className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Email Us</h3>
                                            <p className="text-primary font-medium truncate">{CONTACT_INFO.email}</p>
                                            <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                                        </div>
                                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </CardContent>
                                </a>
                            </Card>

                            {/* Office Location Card */}
                            <Card className="group border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <a href={OFFICE_LOCATION.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block">
                                    <CardContent className="flex items-center gap-4 p-5">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 group-hover:bg-amber-200 transition-colors">
                                            <MapPin className="h-6 w-6 text-amber-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Visit Us</h3>
                                            <p className="text-muted-foreground text-sm">{OFFICE_LOCATION.address}</p>
                                            <p className="text-sm text-primary font-medium">Get Directions →</p>
                                        </div>
                                    </CardContent>
                                </a>
                            </Card>
                        </div>

                        {/* Map */}
                        <Card className="border-0 shadow-sm overflow-hidden">
                            <div className="relative aspect-[4/3] w-full bg-muted">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2587!2d${OFFICE_LOCATION.lng}!3d${OFFICE_LOCATION.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAxLjkiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1635000000000!5m2!1sen!2snp`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0"
                                    title="Office Location"
                                />
                            </div>
                            <CardContent className="p-4 bg-muted/30">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>Open {CONTACT_INFO.hours}</span>
                                    </div>
                                    <a
                                        href={OFFICE_LOCATION.googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary font-medium hover:underline"
                                    >
                                        Open in Maps
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Why Contact Us */}
                        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
                            <CardHeader>
                                <CardTitle className="text-lg">Why Contact Us?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {CONTACT_CONFIG.whyContact.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm text-muted-foreground">{item}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

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
