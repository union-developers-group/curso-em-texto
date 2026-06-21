import { buttonVariants } from '@/components/ui/Button';
import { Footer } from '@/components/shared/Footer';
import { Hero } from '@/components/shared/Hero';
import { ArrowRight } from 'lucide-react';
import { Fragment } from 'react';
import { cn } from '@/utils/cn';
import Link from 'next/link';

export const HomeTemplate = () => {
  return (
    <Fragment>
      <main className="flex-1">
        <Hero />
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
