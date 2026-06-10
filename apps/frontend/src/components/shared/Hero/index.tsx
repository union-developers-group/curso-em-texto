import { Button } from '@/components/ui/Button';
import { BookOpen } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface HeroProps {
  className?: string;
}

export const Hero = ({ className }: HeroProps) => {
  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        'flex min-h-[33.75rem] w-full items-center justify-center bg-background-400 px-6 py-20 text-center sm:px-8 md:px-12 lg:px-20 xl:py-36',
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-[48rem] flex-col items-center gap-6">
        <h1
          id="hero-title"
          className="max-w-3xl text-3xl leading-9 font-bold tracking-normal text-balance text-gray-50 sm:text-4xl sm:leading-10 md:text-5xl md:leading-[3rem] lg:text-[3.5rem] lg:leading-[3.5rem] xl:text-[4rem] xl:leading-[4rem]"
        >
          Aprenda no seu próprio ritmo com cursos baseados em texto
        </h1>

        <p className="max-w-[32.245rem] text-center text-xl leading-7 font-normal tracking-normal text-gray-100">
          Uma plataforma para aprendizado sem distrações. Foque no que importa.
        </p>

        <Button icon={<BookOpen size={16} aria-hidden="true" />}>
          Explorar Cursos
        </Button>
      </div>
    </section>
  );
};
