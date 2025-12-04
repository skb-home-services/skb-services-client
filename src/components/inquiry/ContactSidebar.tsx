import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactCard } from './ContactCard';
import { CONTACT_CONFIG } from '@/configs/contact';

export const ContactSidebar = () => {
    const { office, contactInfo, whyContact } = CONTACT_CONFIG;

    return (
        <div className="space-y-6">
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

                <ContactCard
                    title="Visit Us"
                    description={office.location.address}
                    actionText="Get Directions →"
                    href={office.location.googleMapsUrl}
                    icon={MapPin}
                    iconColor="text-amber-600"
                    iconBgColor="bg-amber-100 group-hover:bg-amber-200"
                    external
                />
            </div>

            {/* Map */}
            <MapCard />

            {/* Why Contact Us */}
            <WhyContactCard />
        </div>
    );
};

const MapCard = () => {
    const { office } = CONTACT_CONFIG;

    return (
        <Card className="border-0 shadow-sm overflow-hidden">
            <div className="relative aspect-[4/3] w-full bg-muted">
                <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2587!2d${office.location.lng}!3d${office.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAxLjkiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1635000000000!5m2!1sen!2snp`}
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
                        <span>Open {office.hours}</span>
                    </div>
                    <a
                        href={office.location.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary font-medium hover:underline"
                    >
                        Open in Maps
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};

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
