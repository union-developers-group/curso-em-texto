import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const loadingVariants = cva(
  'inline-block animate-spin rounded-full border-current border-t-transparent',
  {
    variants: {
      size: {
        sm: 'h-6 w-6 border-2',
        md: 'h-10 w-10 border-[3px]',
        lg: 'h-14 w-14 border-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type LoadingVariants = VariantProps<typeof loadingVariants>;

export interface LoadingProps
  extends HTMLAttributes<HTMLDivElement>,
    LoadingVariants {
  color?: string;
  className?: string;
}

export const Loading = ({
  size,
  color,
  className,
  style,
  ...props
}: LoadingProps) => {
  const spinnerStyle = color ? { ...style, color } : style;

  return (
    <div
      {...props}
      role="status"
      aria-label="Carregando"
      className={cn(loadingVariants({ size, className }))}
      style={spinnerStyle}
    />
  );
};
