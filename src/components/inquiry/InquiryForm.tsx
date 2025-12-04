'use client';

import { FormProvider } from 'react-hook-form';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PhoneInput } from '@/components/common';
import { cn } from '@/lib/utils';
import type { UseFormReturn } from 'react-hook-form';
import type { InquiryFormData } from '@/lib/validations';

interface InquiryFormProps {
    formMethods: UseFormReturn<InquiryFormData>;
    onSubmit: (data: InquiryFormData) => void;
    isLoading: boolean;
}

export const InquiryForm = ({ formMethods, onSubmit, isLoading }: InquiryFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = formMethods;

    return (
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
                <FormProvider {...formMethods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Form Fields */}
                        <FormFields register={register} errors={errors} />

                        {/* Submit Section */}
                        <SubmitSection isLoading={isLoading} />
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};

const FormFields = ({ register, errors }: { register: any; errors: any }) => (
    <>
        <div className="grid gap-5 sm:grid-cols-2">
            <FormField
                register={register}
                label="Full Name"
                name="fullName"
                required
                error={errors.fullName}
                render={(props) => (
                    <Input
                        {...props}
                        placeholder="John Doe"
                        className={cn(
                            'h-11 rounded-xl transition-all',
                            errors.fullName && 'border-destructive focus-visible:ring-destructive'
                        )}
                    />
                )}
            />

            <FormField
                register={register}
                label="Email"
                name="email"
                required
                error={errors.email}
                render={(props) => (
                    <Input
                        {...props}
                        type="email"
                        placeholder="john@example.com"
                        className={cn(
                            'h-11 rounded-xl transition-all',
                            errors.email && 'border-destructive focus-visible:ring-destructive'
                        )}
                    />
                )}
            />
        </div>

        <PhoneInput name="phone" label="Phone Number" required />

        <FormField
            register={register}
            label="Message"
            name="message"
            required
            error={errors.message}
            render={(props) => (
                <Textarea
                    {...props}
                    placeholder="Tell us about your requirements, questions, or how we can help you..."
                    rows={6}
                    className={cn(
                        'rounded-xl resize-none transition-all',
                        errors.message && 'border-destructive focus-visible:ring-destructive'
                    )}
                />
            )}
        />
    </>
);

interface FormFieldProps {
    register: any;
    label: string;
    name: string;
    required?: boolean;
    error?: any;

    render: (props: any) => React.ReactNode;
}

const FormField = ({ label, name, required, error, render, register }: FormFieldProps) => (
    <div className="space-y-2">
        <Label htmlFor={name} className="text-sm font-medium">
            {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {render({ id: name, ...register(name) })}
        {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
);

const SubmitSection = ({ isLoading }: { isLoading: boolean }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-sm text-muted-foreground">
            By submitting, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">
                Privacy Policy
            </a>
        </p>
        <Button type="submit" size="lg" disabled={isLoading} className="rounded-xl min-w-[180px]">
            {isLoading ? (
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
);
