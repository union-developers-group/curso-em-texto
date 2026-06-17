import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/shared/Footer';

describe('<Footer />', () => {
  it('should render the logo linking to the home page', () => {
    render(<Footer />);

    expect(
      screen.getByRole('link', { name: 'Curso em Texto' })
    ).toHaveAttribute('href', '/');
  });

  it('should render the navigation links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: 'Cursos' })).toHaveAttribute(
      'href',
      '/cursos'
    );
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute(
      'href',
      '/sobre'
    );
    expect(screen.getByRole('link', { name: 'Privacidade' })).toHaveAttribute(
      'href',
      '/privacidade'
    );
  });

  it('should render the copyright information with the current year', () => {
    render(<Footer />);

    const year = new Date().getFullYear();

    expect(
      screen.getByText(
        `© ${year} Curso em Texto. Todos os direitos reservados.`
      )
    ).toBeInTheDocument();
  });

  it('should accept a custom className', () => {
    render(<Footer className="custom-class" />);

    expect(screen.getByRole('contentinfo')).toHaveClass('custom-class');
  });
});
