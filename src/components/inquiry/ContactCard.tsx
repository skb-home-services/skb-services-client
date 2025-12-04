import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ContactCardProps {
    title: string;
    description: string;
    actionText?: string;
    href: string;
    icon: LucideIcon;
    iconColor: string;
    iconBgColor: string;
    external?: boolean;
}

export const ContactCard = ({
    title,
    description,
    actionText,
    href,
    icon: Icon,
    iconColor,
    iconBgColor,
    external = false,
}: ContactCardProps) => {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
        <Card className="group border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <a href={href} className="block" {...linkProps}>
                <CardContent className="flex items-center gap-4 p-5">
                    <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors', iconBgColor)}>
                        <Icon className={cn('h-6 w-6', iconColor)} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{title}</h3>
                        <p className="text-primary font-medium truncate">{description}</p>
                        {actionText && <p className="text-sm text-muted-foreground">{actionText}</p>}
                    </div>
                </CardContent>
            </a>
        </Card>
    );
};
