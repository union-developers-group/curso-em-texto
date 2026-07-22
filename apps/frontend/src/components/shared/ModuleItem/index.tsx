import { ComponentPropsWithoutRef, ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp, GripVertical, Pencil } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ModuleItemProps extends ComponentPropsWithoutRef<'div'> {
  module: string;
  title: string;
  children?: ReactNode;
}

export const ModuleItem = ({
  module,
  title,
  children,
  className,
  ...props
}: ModuleItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      {...props}
      className={cn('overflow-hidden rounded-2xl bg-background-400', className)}
    >
      <div className="flex items-center gap-6 p-8">
        <GripVertical size={32} className="text-gray-50" />

        <div className="flex-1">
          <strong className="block text-xs font-bold text-gray-50">
            {module}
          </strong>

          <p className="text-base">{title}</p>
        </div>

        <button
          type="button"
          aria-label="Editar módulo"
          className="text-gray-50"
        >
          <Pencil size={32} />
        </button>

        <button
          type="button"
          aria-label={isOpen ? 'Fechar módulo' : 'Abrir módulo'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((previous) => !previous)}
          className="text-gray-50"
        >
          {isOpen ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-background-300">{children}</div>
      )}
    </div>
  );
};
