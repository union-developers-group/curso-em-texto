import { render, screen } from '@testing-library/react';
import { HomeTemplate } from '@/templates/HomeTemplate';
import { vitest } from 'vitest';

vitest.mock('@/components/shared/Hero', () => ({
  Hero: () => <section aria-label="Hero" />,
}));

vitest.mock('@/components/shared/CTA', () => ({
  CTA: () => <section aria-label="CTA" />,
}));

vitest.mock('@/components/shared/Footer', () => ({
  Footer: () => <footer aria-label="Footer" />,
}));

describe('<HomeTemplate />', () => {
  it('should render the Hero component', () => {
    render(<HomeTemplate />);

    expect(screen.getByRole('region', { name: 'Hero' })).toBeInTheDocument();
  });

  it('should render the CTA component', () => {
    render(<HomeTemplate />);

    expect(screen.getByRole('region', { name: 'CTA' })).toBeInTheDocument();
  });

  it('should render the Footer component', () => {
    render(<HomeTemplate />);

    expect(
      screen.getByRole('contentinfo', { name: 'Footer' })
    ).toBeInTheDocument();
  });
});
