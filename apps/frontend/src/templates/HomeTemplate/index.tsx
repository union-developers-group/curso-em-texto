import { Footer } from '@/components/shared/Footer';
import { Hero } from '@/components/shared/Hero';
import { CTA } from '@/components/shared/CTA';
import { Fragment } from 'react';

export const HomeTemplate = () => {
  return (
    <Fragment>
      <main className="flex-1">
        <Hero />
        <CTA />
      </main>

      <Footer />
    </Fragment>
  );
};
