import { Footer } from '@/components/shared/Footer';
import { Hero } from '@/components/shared/Hero';
import { Fragment } from 'react';

export const HomeTemplate = () => {
  return (
    <Fragment>
      <main className="flex-1">
        <Hero />
      </main>

      <Footer />
    </Fragment>
  );
};
