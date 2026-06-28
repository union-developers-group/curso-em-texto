import type { ElementType } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

export const highlightCardVariants = cva(
  'flex flex-col gap-2 rounded-2xl border border-background-200 bg-background-400 p-6',
  {
    variants: {
      size: {
        md: 'max-w-[21.3125rem]',
        lg: 'max-w-[27.5rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type HighlightCardVariants = VariantProps<typeof highlightCardVariants>;

export interface HighlightCardProps extends HighlightCardVariants {
  icon: ElementType;
  title: string;
  description: string;
  className?: string;
}

export const HighlightCard = ({
  icon: Icon,
  title,
  description,
  size,
  className,
}: HighlightCardProps) => {
  return (
    <article
      className={cn(highlightCardVariants({ size, className }))}
      data-testid="highlight-card"
    >
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <linearGradient
            id="icon-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3C83F6" />
            <stop offset="100%" stopColor="#10B77F" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="flex h-10 w-10 items-center justify-center rounded-full border border-background-200 bg-background-300"
        data-testid="highlight-card-icon"
      >
        <Icon
          className="h-5 w-5"
          style={{ stroke: 'url(#icon-gradient)' }}
          aria-hidden="true"
        />
      </div>

      <h3
        className="text-base font-semibold text-gray-50"
        data-testid="highlight-card-title"
      >
        {title}
      </h3>

      <p
        className="text-sm leading-relaxed text-gray-200"
        data-testid="highlight-card-description"
      >
        {description}
      </p>
    </article>
  );
};
