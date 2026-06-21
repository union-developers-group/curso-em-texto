import { type ComponentPropsWithRef, type ReactNode, useId } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  label: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  containerClassName?: string;
}

export const Input = ({
  label,
  helperText,
  error = false,
  containerClassName,
  className,
  id,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;

  return (
    <div className={cn('flex w-full flex-col gap-2', containerClassName)}>
      <label
        htmlFor={inputId}
        className={cn(
          'text-base leading-6 font-medium text-gray-50',
          props.disabled && 'text-gray-200'
        )}
      >
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={error || undefined}
        aria-describedby={helperText ? messageId : undefined}
        className={cn(
          'w-full rounded-xl border bg-background-300 px-6 py-4 text-xl text-gray-50 outline-none transition-colors placeholder:text-gray-200 focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:border-transparent disabled:bg-background-200 disabled:text-gray-200',
          error ? 'border-red-200' : 'border-transparent',
          className
        )}
        {...props}
      />

      {helperText && (
        <p
          id={messageId}
          className={cn('text-sm text-gray-200', error && 'text-red-200')}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
