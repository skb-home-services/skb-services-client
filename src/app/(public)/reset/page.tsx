import { ResetForm } from '@/components/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reset Password - SKB Services',
    description: 'Reset your SKB Services account',
};

export default function ResetPage() {
    return <ResetForm />;
}
