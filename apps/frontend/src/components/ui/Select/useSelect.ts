import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

export interface SelectOption {
  label: ReactNode;
  value: string;
}

interface UseSelectParams {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
}

export const useSelect = ({
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  id,
}: UseSelectParams) => {
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
    if (!open) return;

    const handleClickOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () =>
      document.removeEventListener('pointerdown', handleClickOutside);
  }, [open]);

  const handleSelect = (option: SelectOption) => {
    if (!isControlled) setInternalValue(option.value);
    onChange?.(option.value);
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setOpen((prev) => !prev);
        break;
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        if (!open) {
          setOpen(true);
          break;
        }

        if (options.length === 0) break;

        const currentIndex = options.findIndex(
          (o) => o.value === selectedValue
        );
        const lastIndex = options.length - 1;
        const nextIndex =
          event.key === 'ArrowDown'
            ? currentIndex < lastIndex
              ? currentIndex + 1
              : 0
            : currentIndex > 0
              ? currentIndex - 1
              : lastIndex;
        handleSelect(options[nextIndex]);
        break;
      }
      case 'Escape':
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  return {
    containerRef,
    handleKeyDown,
    handleSelect,
    listboxId,
    messageId,
    open,
    selectedOption,
    selectedValue,
    selectId,
    setOpen,
  };
};
