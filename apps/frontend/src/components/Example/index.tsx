import { Github } from 'lucide-react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';
import Link from 'next/link';

export const exampleVariants = cva(
  'flex flex-col justify-center items-center bg-background-400 rounded-lg border border-background-200 mt-2',
  {
    variants: {
      size: {
        md: 'w-[21.3125rem]',
        lg: 'w-[27.5rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type ExampleVariants = VariantProps<typeof exampleVariants>;

export interface ExampleProps extends ExampleVariants {
  githubURL: string;
  className?: string;
}

export const Example = ({ githubURL, size, className }: ExampleProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div
        className={cn(exampleVariants({ size, className }))}
        data-testid="card-container"
      >
        <div className="flex gap-2 p-4 transition-all text-gray-50 hover:text-gray-50/80">
          <Github />
          <a
            href={githubURL}
            target="_blank"
            rel="noreferrer"
            className="font-medium "
          >
            Contribua no Github
          </a>
        </div>
      </div>
      <div className="flex gap-1 text-sm text-gray-400">
        <Link href="/login" className="ml-auto text-sm text-gray-400">
          Faça login
        </Link>
      </div>
    </div>
  );
};
