import { render, screen } from '@testing-library/react';
import { CTA } from '@/components/shared/CTA';

describe('<CTA />', () => {
  it('should render the default title', () => {
    render(<CTA />);

    expect(
      screen.getByRole('heading', {
        name: 'Pronto para começar a aprender?',
      })
    ).toBeInTheDocument();
  });

  it('should render the default description', () => {
    render(<CTA />);

    expect(
      screen.getByText(
        'Junte-se a milhares de aprendizes que preferem educação baseada em texto para um aprendizado mais profundo.'
      )
    ).toBeInTheDocument();
  });

  it('should render the link redirecting to the courses page', () => {
    render(<CTA />);

    const link = screen.getByRole('link', { name: 'Explorar Cursos' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/cursos');
  });

  it('should apply a custom className', () => {
    const { container } = render(<CTA className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
