'use client';

import type { CourseCardProps } from '@/components/shared/CourseCard';
import { CourseCard } from '@/components/shared/CourseCard';
import { buttonVariants } from '@/components/ui/Button';
import { Fragment, useSyncExternalStore } from 'react';
import { Footer } from '@/components/shared/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Hero } from '@/components/shared/Hero';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import Link from 'next/link';

const subscribeAuthChange = (callback: () => void) => {
  window.addEventListener('auth-change', callback);
  return () => window.removeEventListener('auth-change', callback);
};

interface HomeTemplateProps {
  courses: Omit<CourseCardProps, 'className'>[];
}

export const HomeTemplate = ({ courses }: HomeTemplateProps) => {
  const { isAuthenticated } = useAuth();

  const isLoggedIn = useSyncExternalStore(
    subscribeAuthChange,
    isAuthenticated,
    () => false
  );

  return (
    <Fragment>
      <main className="flex-1">
        <Hero />
        {isLoggedIn && (
          <section
            aria-labelledby="learning-journey-title"
            className="w-full bg-background-500 px-6 py-16 sm:px-8 md:px-12 lg:px-20 lg:py-24"
          >
            <div className="mx-auto flex w-full max-w-286 flex-col gap-10">
              <div className="flex items-center justify-between gap-6">
                <h2
                  id="learning-journey-title"
                  className="text-2xl leading-8 font-medium tracking-normal text-gray-50"
                >
                  Sua Jornada de Aprendizado
                </h2>

                <Link
                  href="/cursos"
                  className="shrink-0 text-sm font-medium text-gray-50 transition-colors hover:text-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-50"
                >
                  Ver todos os cursos
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {courses.map((course, index) => (
                  <CourseCard
                    key={`${course.title}-${index}`}
                    {...course}
                    className="max-w-none"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        <section
          aria-labelledby="cta-title"
          className="flex w-full items-center justify-center bg-gradient-primary px-6 py-20 text-center sm:px-8 md:px-12 lg:px-20"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6">
            <h2
              id="cta-title"
              className="max-w-3xl text-3xl leading-9 font-bold tracking-normal text-balance text-gray-50 sm:text-4xl sm:leading-10 md:text-[2.5rem] md:leading-12"
            >
              Pronto para começar a aprender?
            </h2>

            <p className="max-w-[32.245rem] text-center text-xl leading-7 font-normal tracking-normal text-gray-50">
              Junte-se a milhares de aprendizes que preferem educação baseada em
              texto para um aprendizado mais profundo.
            </p>

            <Link
              href="/cursos"
              className={cn(buttonVariants({ variant: 'secondary' }))}
            >
              Explorar Cursos
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </Fragment>
  );
};
