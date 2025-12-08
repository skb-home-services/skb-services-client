'use client';

import { useFormContext } from 'react-hook-form';
import { InputField } from './InputField';
import { FormField } from './FormField';
import { Input } from '@/components/ui/input';
import { Home } from 'lucide-react';
import { BOOKING_CONFIG } from '@/configs/booking';

interface AddressFieldProps {
    focusedField: string | null;
    onFieldFocus: (field: string) => void;
    onFieldBlur: () => void;
}

export function AddressField({ focusedField, onFieldFocus, onFieldBlur }: AddressFieldProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const addressErrors = errors.address as Record<string, { message?: string }> | undefined;

    return (
        <div className="space-y-4">
            <InputField
                name="address.houseNumber"
                label="House Number"
                placeholder="123"
                icon={Home}
                required
                focused={focusedField === 'houseNumber'}
                onFocus={() => onFieldFocus('houseNumber')}
                onBlur={onFieldBlur}
            />

            <FormField id="address.line1" label="Address Line 1" required error={addressErrors?.line1?.message}>
                <Input
                    id="address.line1"
                    {...register('address.line1')}
                    placeholder="123 Main Street"
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 transition-all"
                    aria-invalid={addressErrors?.line1 ? 'true' : 'false'}
                />
            </FormField>

            <FormField id="address.line2" label="Address Line 2" error={addressErrors?.line2?.message}>
                <Input
                    id="address.line2"
                    {...register('address.line2')}
                    placeholder="Apartment 4B"
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 transition-all"
                />
            </FormField>

            <div className="grid gap-4 sm:grid-cols-3">
                <FormField id="address.city" label="City" required error={addressErrors?.city?.message}>
                    <Input
                        id="address.city"
                        {...register('address.city')}
                        placeholder={BOOKING_CONFIG.fields.city.placeholder}
                        className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 transition-all"
                        aria-invalid={addressErrors?.city ? 'true' : 'false'}
                    />
                </FormField>

                <FormField id="address.state" label="State" required error={addressErrors?.state?.message}>
                    <Input
                        id="address.state"
                        {...register('address.state')}
                        placeholder={BOOKING_CONFIG.fields.state.placeholder}
                        className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 transition-all"
                        aria-invalid={addressErrors?.state ? 'true' : 'false'}
                    />
                </FormField>

                <FormField id="address.pincode" label="Pincode" required error={addressErrors?.pincode?.message}>
                    <Input
                        id="address.pincode"
                        {...register('address.pincode')}
                        placeholder="44600"
                        className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 transition-all"
                        aria-invalid={addressErrors?.pincode ? 'true' : 'false'}
                    />
                </FormField>
            </div>

            <FormField id="address.landmark" label="Landmark" error={addressErrors?.landmark?.message}>
                <Input
                    id="address.landmark"
                    {...register('address.landmark')}
                    placeholder={BOOKING_CONFIG.fields.landmark.placeholder}
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary/50 transition-all"
                />
            </FormField>
        </div>
    );
}
