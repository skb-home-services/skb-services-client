import { LoginForm } from '@/components/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign In - SKB Services',
    description: 'Sign in to your SKB Services account',
};

export default function LoginPage() {
    return <LoginForm />;
}
