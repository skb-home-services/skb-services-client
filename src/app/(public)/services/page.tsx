import { Metadata } from 'next';
import { ServicesPageContent } from '@/components/services';

export const metadata: Metadata = {
    title: 'Our Services - SKB Services',
    description: 'Browse our range of professional home services',
};

export default function ServicesPage() {
    return <ServicesPageContent />;
}
