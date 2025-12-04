import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icons';

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    icon?: string;
    focused?: boolean;
    error?: any;
    onFocus?: () => void;
    onBlur?: () => void;
    children: (props: any) => React.ReactNode;
}

export const FormField = ({ label, name, type = 'text', icon, focused, error, onFocus, onBlur, children }: FormFieldProps) => {
    const IconComponent = icon ? getIcon(icon) : null;

    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </Label>
            <div
                className={cn('relative transition-all duration-200', {
                    'scale-[1.02]': focused,
                })}
            >
                {IconComponent && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <IconComponent className="w-5 h-5" />
                    </div>
                )}
                {children({
                    id: name,
                    type,
                    onFocus,
                    onBlur,
                })}
            </div>
            {error && (
                <p className="text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                    {error.message}
                </p>
            )}
        </div>
    );
};
