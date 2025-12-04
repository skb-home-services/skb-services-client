import Link from 'next/link';
import { getIcon } from '@/lib/icons';
import { FOOTER_CONFIG } from '@/configs/footer';
import { LucideIcon } from 'lucide-react';

interface FooterSectionProps {
    title: string;
    children: React.ReactNode;
}

export const FooterSection = ({ title, children }: FooterSectionProps) => (
    <div>
        <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">{title}</h3>
        {children}
    </div>
);

interface LinkItemProps {
    label: string;
    href: string;
}

export const FooterLinkItem = ({ label, href }: LinkItemProps) => {
    const ArrowIcon = getIcon('ArrowRight');

    return (
        <li>
            <Link href={href} className="group inline-flex items-center text-slate-400 transition-colors hover:text-white">
                <ArrowIcon className="mr-2 h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                {label}
            </Link>
        </li>
    );
};

export const FooterLinks = ({ links }: { links: Array<LinkItemProps> }) => (
    <ul className="space-y-4">
        {links.map((link) => (
            <FooterLinkItem key={link.href} {...link} />
        ))}
    </ul>
);

// Brand Component
export const FooterBrand = () => (
    <div className="lg:col-span-1">
        <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {FOOTER_CONFIG.brand.name}
            </span>
        </Link>
        <p className="text-slate-400 leading-relaxed mb-6">{FOOTER_CONFIG.brand.tagline}</p>
        <SocialLinks />
    </div>
);

// Social Links Component
const SocialLinks = () => (
    <div className="flex items-center gap-3" aria-label="Social media links">
        {FOOTER_CONFIG.socialLinks.map((social) => {
            const Icon = getIcon(social.icon);

            return (
                <a
                    key={social.label}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition-all hover:bg-blue-600 hover:text-white hover:-translate-y-0.5"
                    aria-label={`Visit our ${social.label} page`}
                >
                    <Icon className="h-4 w-4" />
                </a>
            );
        })}
    </div>
);

// Contact Component
interface ContactItemProps {
    icon: LucideIcon;
    content: React.ReactNode;
}

const ContactItem = ({ icon: Icon, content }: ContactItemProps) => (
    <li className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800">
            <Icon className="h-4 w-4 text-blue-400" />
        </div>
        <div>{content}</div>
    </li>
);

export const FooterContact = () => {
    const { contactInfo } = FOOTER_CONFIG;
    const MapPinIcon = getIcon('MapPin');
    const MailIcon = getIcon('Mail');
    const PhoneIcon = getIcon('Phone');

    return (
        <FooterSection title="Contact">
            <ul className="space-y-4">
                <ContactItem icon={MapPinIcon} content={<p className="text-slate-400">{contactInfo.address}</p>} />
                <ContactItem
                    icon={MailIcon}
                    content={
                        <a href={contactInfo.emailHref} className="text-slate-400 hover:text-white transition-colors">
                            {contactInfo.email}
                        </a>
                    }
                />
                <ContactItem
                    icon={PhoneIcon}
                    content={
                        <a href={contactInfo.phoneHref} className="text-slate-400 hover:text-white transition-colors">
                            {contactInfo.phone}
                        </a>
                    }
                />
            </ul>
        </FooterSection>
    );
};

// Top Wave Component
export const FooterTopWave = () => (
    <div className="absolute top-0 left-0 right-0 -translate-y-full pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden="true">
            <path
                d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
                fill="rgb(15 23 42)"
            />
        </svg>
    </div>
);

// Bottom Bar Component
interface FooterBottomBarProps {
    year: number;
}

export const FooterBottomBar = ({ year }: FooterBottomBarProps) => (
    <div className="bg-slate-950">
        <div className="container-custom py-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-slate-500">
                    © {year} {FOOTER_CONFIG.brand.name}. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                    {FOOTER_CONFIG.legalLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-slate-300 transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
