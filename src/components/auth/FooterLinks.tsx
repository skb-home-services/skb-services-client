import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FooterLinksProps {
    type: 'login' | 'register';
    redirectTo: string;
}

export const FooterLinks = ({ type, redirectTo }: FooterLinksProps) => {
    const registerHref = redirectTo !== '/user/dashboard' ? `/register?redirect=${encodeURIComponent(redirectTo)}` : '/register';
    const loginHref = redirectTo !== '/user/dashboard' ? `/login?redirect=${encodeURIComponent(redirectTo)}` : '/login';

    return (
        <div className="mt-8 text-center">
            <p className="text-gray-500">
                {type === 'register' ? 'Don&apos;t have an account?' : 'Already have an account?'}
                <Link
                    href={type === 'register' ? registerHref : loginHref}
                    className="font-semibold ml-2 text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group"
                >
                    {type === 'register' ? 'Create one' : 'Sign in'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </p>
        </div>
    );
};
