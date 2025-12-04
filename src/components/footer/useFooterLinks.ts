import { FOOTER_CONFIG } from '@/configs/footer';

export const useFooterLinks = (isAuthenticated: boolean) => {
    const { accountLinks } = FOOTER_CONFIG;

    const links = [...(isAuthenticated ? accountLinks.authenticated : [...accountLinks.unauthenticated, ...accountLinks.authenticated])];

    return { accountLinks: links };
};
