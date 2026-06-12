import { render, screen } from '@testing-library/react';
import { HomeTemplate } from '@/templates/HomeTemplate';
import { vitest } from 'vitest';

vitest.mock('@/components/shared/Hero', () => ({
  Hero: () => <section aria-label="Hero" />,
}));

describe('<HomeTemplate />', () => {
  it('should render the Hero component', () => {
    render(<HomeTemplate />);

    expect(screen.getByRole('region', { name: 'Hero' })).toBeInTheDocument();
  });
});
