import { RegisterForm } from '@/components/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up - SKB Services',
    description: 'Create your SKB Services account',
};

export default function RegisterPage() {
    return <RegisterForm />;
}
