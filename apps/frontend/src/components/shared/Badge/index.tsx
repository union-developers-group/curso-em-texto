import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

export const badgeVariants = cva(
  'inline-flex w-fit items-center justify-center text-sm font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'text-gray-50',
        outline:
          'rounded-full border border-gray-200 px-4 py-1.5 text-gray-100',
        filled:
          'rounded-full bg-[#F59E0B] px-4 py-1.5 font-semibold text-background-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

export interface BadgeProps extends BadgeVariants {
  label: string;
  className?: string;
}

export const Badge = ({ label, variant, className }: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant, className }))}>
      {label}
    </span>
  );
};
