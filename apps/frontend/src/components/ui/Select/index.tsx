'use client';

import { type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SelectOption {
  label: ReactNode;
  value: string;
}

export interface SelectProps {
  label: ReactNode;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  helperText?: ReactNode;
  error?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  containerClassName?: string;
}

export const Select = ({
  label,
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  helperText,
  error = false,
  disabled = false,
  name,
  id,
  className,
  containerClassName,
}: SelectProps) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = `${selectId}-message`;
  const listboxId = `${selectId}-listbox`;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find((o) => o.value === selectedValue);

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () =>
      document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    if (!isControlled) setInternalValue(option.value);
    onChange?.(option.value);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative flex w-full flex-col gap-2', containerClassName)}
    >
      <label
        htmlFor={selectId}
        className={cn(
          'text-base leading-6 font-medium text-gray-50',
          disabled && 'text-gray-200'
        )}
      >
        {label}
      </label>

      {name && <input type="hidden" name={name} value={selectedValue} />}

      <button
        type="button"
        id={selectId}
        role="combobox"
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-invalid={error || undefined}
        aria-describedby={helperText ? messageId : undefined}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-xl border bg-background-300 px-6 py-4 text-left text-xl text-gray-50 outline-none transition-colors disabled:cursor-not-allowed disabled:border-transparent disabled:bg-background-200 disabled:text-gray-200',
          error
            ? 'border-red-200 ring-1 ring-red-200'
            : 'border-transparent focus:border-primary focus:ring-1 focus:ring-primary',
          className
        )}
      >
        <span className={cn(!selectedOption && 'text-gray-200')}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            'size-5 shrink-0 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute top-full left-0 z-10 mt-2 max-h-72 w-full overflow-auto rounded-2xl bg-background-200 p-2 shadow-lg"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === selectedValue}
              onClick={() => handleSelect(option)}
              className={cn(
                'cursor-pointer rounded-xl px-4 py-3 text-xl text-gray-50 transition-colors hover:bg-background-300',
                option.value === selectedValue && 'font-bold'
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

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
