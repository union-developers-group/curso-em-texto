import { Badge } from '@/components/shared/Badge';
import { BookOpen, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface CourseCardProps {
  level: string;
  title: string;
  author: string;
  description: string;
  categories: string[];
  duration: string;
  lessons: number;
  progress: number;
  featuredLabel?: string;
  className?: string;
}

export const CourseCard = ({
  level,
  title,
  author,
  description,
  categories,
  duration,
  lessons,
  progress,
  featuredLabel,
  className,
}: CourseCardProps) => {
  const progressValue = Math.min(Math.max(progress, 0), 100);

  return (
    <article
      className={cn(
        'flex w-full max-w-88 flex-col gap-4 rounded-lg border border-background-200 bg-background-400 p-4 text-gray-50 sm:p-5',
        className
      )}
      data-testid="course-card"
    >
      <div className="flex items-center justify-between gap-3">
        <Badge label={level} variant="outline" className="px-3 py-1 text-xs" />
        {featuredLabel ? (
          <Badge label={featuredLabel} variant="filled" className="text-xs" />
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg leading-7 font-medium text-gray-50">{title}</h3>
        <p className="text-sm text-gray-200">por {author}</p>
        <p className="text-sm leading-5 text-gray-200">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Categorias do curso">
        {categories.map((category, index) => (
          <Badge
            key={category + '-' + index}
            label={category}
            className="rounded-full bg-background-300 px-3 py-1 text-xs text-gray-50"
          />
        ))}
      </div>

      <dl className="flex items-center justify-between gap-4 text-sm text-gray-200">
        <div className="flex items-center gap-1.5">
          <Clock size={16} aria-hidden="true" />
          <dt className="sr-only">Duração</dt>
          <dd>{duration}</dd>
        </div>

        <div className="flex items-center gap-1.5">
          <BookOpen size={16} aria-hidden="true" />
          <dt className="sr-only">Aulas</dt>
          <dd>{lessons} aulas</dd>
        </div>
      </dl>

      <div className="flex flex-col gap-2">
        <div
          className="h-1.5 overflow-hidden rounded-full bg-background-300"
          role="progressbar"
          aria-label={`Progresso do curso ${title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressValue}
        >
          <div
            className="h-full rounded-full bg-gradient-primary"
            style={{ width: `${progressValue}%` }}
          />
        </div>

        <span className="self-end text-xs text-gray-200">
          {progressValue}% concluído
        </span>
      </div>
    </article>
  );
};
