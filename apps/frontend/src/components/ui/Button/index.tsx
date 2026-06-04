import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export const buttonVariants = cva(
  'flex cursor-pointer items-center justify-center gap-2 rounded-md px-8 pt-[0.71875rem] pb-[0.78125rem] font-medium text-gray-50 transition-all focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-primary shadow-sm hover:brightness-95',
        secondary: 'bg-background-300 hover:bg-background-200',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button = ({
  variant,
  icon,
  iconPosition = 'right',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props}>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};
