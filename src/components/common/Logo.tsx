import Link from 'next/link';

export const Logo = () => (
    <Link href="/" className="flex items-center space-x-2 group" aria-label="SKB Services Home">
        <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent transition-colors group-hover:from-blue-500 group-hover:to-blue-400">
            SKB Services
        </span>
    </Link>
);
