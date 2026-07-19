import { cn } from '@/utils/cn';
import {
  KeyboardEvent,
  ComponentPropsWithoutRef,
  useRef,
  useState,
} from 'react';

export interface TabItem {
  value: string;
  label: string;
}

export interface TabsProps extends ComponentPropsWithoutRef<'div'> {
  tabs: TabItem[];
}

export const Tabs = ({ tabs, className, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;

      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;

      case 'Home':
        nextIndex = 0;
        break;

      case 'End':
        nextIndex = tabs.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();
    setActiveTab(tabs[nextIndex].value);

    tabsRef.current[nextIndex]?.focus();
  };

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div
      {...props}
      role="tablist"
      className={cn('inline-flex rounded-xl bg-background-400 p-1', className)}
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(tab.value)}
            tabIndex={isActive ? 0 : -1}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(element) => {
              tabsRef.current[index] = element;
            }}
            className={cn(
              'relative rounded-lg bg-background-400 px-6 py-3 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary',
              isActive ? 'text-gray-50' : 'text-gray-200 hover:text-gray-50'
            )}
          >
            {tab.label}

            {isActive && (
              <span className="bg-gradient-primary absolute right-0 bottom-0 left-0 h-0.5 rounded-full"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
