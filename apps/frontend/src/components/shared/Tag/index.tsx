import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

export const tagVariants = cva(
  'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-gray-100 text-background-500 hover:bg-gray-200',

        secondary: 'bg-gray-50 text-background-500 hover:bg-gray-100',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface TagProps
  extends
    React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof tagVariants> {
  label: string;
}

export const Tag = ({ label, variant, className, ...props }: TagProps) => {
  return (
    <button
      type="button"
      className={cn(tagVariants({ variant }), className)}
      {...props}
    >
      <span>{label}</span>

      <X size={16} />
    </button>
  );
};
