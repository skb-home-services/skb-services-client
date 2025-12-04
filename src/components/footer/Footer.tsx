'use client';

import { useAuth } from '@/providers/AuthProvider';
import { FooterTopWave, FooterSection, FooterBrand, FooterLinks, FooterContact, FooterBottomBar } from './FooterComponents';
import { useFooterLinks } from './useFooterLinks';

import { FOOTER_CONFIG } from '@/configs/footer';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { isAuthenticated } = useAuth();
    const { accountLinks } = useFooterLinks(isAuthenticated);

    return (
        <footer className="relative overflow-hidden" role="contentinfo">
            <div className="bg-slate-900">
                <FooterTopWave />

                <div className="container-custom py-16 md:py-20">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                        {/* Brand Section */}
                        <FooterBrand />

                        {/* Quick Links */}
                        <FooterSection title="Quick Links">
                            <FooterLinks links={[...FOOTER_CONFIG.quickLinks]} />
                        </FooterSection>

                        {/* Account Links */}
                        <FooterSection title="Account">
                            <FooterLinks links={accountLinks} />
                        </FooterSection>

                        {/* Contact Info */}
                        <FooterContact />
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <FooterBottomBar year={currentYear} />
        </footer>
    );
}
