import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import type { SubscriptionCustomer } from '@/types';

interface CustomerInfoCardProps {
    customer?: SubscriptionCustomer;
}

export function CustomerInfoCard({ customer }: CustomerInfoCardProps) {
    if (!customer) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Customer</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Customer data is not available for this subscription.</p>
                </CardContent>
            </Card>
        );
    }

    const addressLine = customer.address
        ? [customer.address.line1, customer.address.line2, customer.address.city, customer.address.state, customer.address.pincode]
              .filter(Boolean)
              .join(', ')
        : null;

    const primaryPhone = typeof customer.phone === 'string' ? customer.phone : customer.phone?.nationalNumber;

    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between">
                <CardTitle>Customer</CardTitle>
                <div className="flex gap-2">
                    {primaryPhone && (
                        <Button variant="outline" size="icon" asChild>
                            <a href={`tel:${primaryPhone}`} aria-label="Call customer">
                                <Phone className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                    {customer.email && (
                        <Button variant="outline" size="icon" asChild>
                            <a href={`mailto:${customer.email}`} aria-label="Email customer">
                                <Mail className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div>
                    <p className="text-xs uppercase text-muted-foreground">Name</p>
                    <p className="font-medium">{customer.fullName}</p>
                </div>
                {primaryPhone && (
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Phone</p>
                        <p>{primaryPhone}</p>
                    </div>
                )}
                {customer.email && (
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Email</p>
                        <p>{customer.email}</p>
                    </div>
                )}
                {addressLine && (
                    <div>
                        <p className="text-xs uppercase text-muted-foreground">Address</p>
                        <p>{addressLine}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
