import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/shared/Hero';

describe('<Hero />', () => {
  it('should render the default title', () => {
    render(<Hero />);

    expect(
      screen.getByRole('heading', {
        name: 'Aprenda no seu próprio ritmo com cursos baseados em texto',
      })
    ).toBeInTheDocument();
  });

  it('should render the default description', () => {
    render(<Hero />);

    expect(
      screen.getByText(
        'Uma plataforma para aprendizado sem distrações. Foque no que importa.'
      )
    ).toBeInTheDocument();
  });

  it('should render the button with the default label', () => {
    render(<Hero />);

    expect(
      screen.getByRole('button', { name: 'Explorar Cursos' })
    ).toBeInTheDocument();
  });
});
