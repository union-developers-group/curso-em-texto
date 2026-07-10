import { render, screen } from '@testing-library/react';
import { HomeTemplate } from '@/templates/HomeTemplate';
import { useAuth } from '@/contexts/AuthContext';
import { vitest, vi } from 'vitest';

vitest.mock('@/components/shared/Hero', () => ({
  Hero: () => <section aria-label="Hero" />,
}));

vitest.mock('@/components/shared/Footer', () => ({
  Footer: () => <footer aria-label="Footer" />,
}));

vitest.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

const mockAuth = (isAuthenticated: boolean) => {
  mockedUseAuth.mockReturnValue({
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: () => isAuthenticated,
  });
};

describe('<HomeTemplate />', () => {
  beforeEach(() => {
    mockAuth(false);
  });

  it('should render the Hero component', () => {
    render(<HomeTemplate />);

    expect(screen.getByRole('region', { name: 'Hero' })).toBeInTheDocument();
  });

  it('should render the CTA section', () => {
    render(<HomeTemplate />);

    expect(
      screen.getByRole('heading', {
        name: 'Pronto para começar a aprender?',
      })
    ).toBeInTheDocument();
  });

  it('should not render the learning journey section when user is not authenticated', () => {
    render(<HomeTemplate />);

    expect(
      screen.queryByRole('heading', {
        name: 'Sua Jornada de Aprendizado',
      })
    ).not.toBeInTheDocument();
  });

  it('should render the learning journey section when user is authenticated', () => {
    mockAuth(true);

    render(<HomeTemplate />);

    expect(
      screen.getByRole('heading', {
        name: 'Sua Jornada de Aprendizado',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Ver todos os cursos' })
    ).toHaveAttribute('href', '/cursos');
    expect(screen.getAllByTestId('course-card')).toHaveLength(3);
  });

  it('should render the Footer component', () => {
    render(<HomeTemplate />);

    expect(
      screen.getByRole('contentinfo', { name: 'Footer' })
    ).toBeInTheDocument();
  });
});
