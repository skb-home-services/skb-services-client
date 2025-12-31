import { Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactCard } from './ContactCard';
import { CONTACT_CONFIG } from '@/configs/contact';
import Image from 'next/image';

const WhyContactCard = () => (
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
);

export const ContactSidebar = () => {
    const { office, contactInfo } = CONTACT_CONFIG;

    return (
        <div className="space-y-6 lg:col-span-2">
            {/* Contact Cards */}
            <div className="space-y-4">
                <ContactCard
                    title="Call Us"
                    description={contactInfo.phone}
                    actionText={office.hours}
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    icon={Phone}
                    iconColor="text-green-600"
                    iconBgColor="bg-green-100 group-hover:bg-green-200"
                />

                <ContactCard
                    title="Email Us"
                    description={contactInfo.email}
                    actionText="We reply within 24 hours"
                    href={`mailto:${contactInfo.email}`}
                    icon={Mail}
                    iconColor="text-blue-600"
                    iconBgColor="bg-blue-100 group-hover:bg-blue-200"
                />
            </div>

            {/* Map image */}
            <div className="relative h-60 w-ful">
                <Image
                    src={'/map/bangaluru.png'}
                    alt="Office location map"
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority={false}
                />
            </div>

            {/* Why Contact Us */}
            <WhyContactCard />
        </div>
    );
};
