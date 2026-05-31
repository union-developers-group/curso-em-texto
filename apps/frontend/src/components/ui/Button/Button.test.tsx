import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import { vi } from 'vitest';

describe('<Button />', () => {
  it('should display the text passed to the button', () => {
    render(<Button>Explorar Cursos</Button>);

    expect(
      screen.getByRole('button', { name: 'Explorar Cursos' })
    ).toBeInTheDocument();
  });

  it('should use the "primary" variant by default', () => {
    render(<Button>Explorar Cursos</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-gradient-primary');
  });

  it('should apply the "secondary" variant classes', () => {
    render(<Button variant="secondary">Explorar Cursos</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-background-300');
  });

  it('should call the click handler when the button is clicked', () => {
    const aoClicar = vi.fn();

    render(<Button onClick={aoClicar}>Explorar Cursos</Button>);
    fireEvent.click(screen.getByRole('button'));

    expect(aoClicar).toHaveBeenCalledTimes(1);
  });

  it('should not call the click handler when disabled', () => {
    const aoClicar = vi.fn();

    render(
      <Button disabled onClick={aoClicar}>
        Explorar Cursos
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(aoClicar).not.toHaveBeenCalled();
  });

  it('should display the icon when it is passed', () => {
    render(
      <Button icon={<span data-testid="icone" />}>Explorar Cursos</Button>
    );

    expect(screen.getByTestId('icone')).toBeInTheDocument();
  });

  it('should position the icon to the right of the text by default', () => {
    render(<Button icon={<span data-testid="icone" />}>Cursos</Button>);

    const botao = screen.getByRole('button');

    expect(botao.lastChild).toBe(screen.getByTestId('icone'));
  });

  it('should position the icon to the left when iconPosition is "left"', () => {
    render(
      <Button icon={<span data-testid="icone" />} iconPosition="left">
        Cursos
      </Button>
    );

    const botao = screen.getByRole('button');

    expect(botao.firstChild).toBe(screen.getByTestId('icone'));
  });

  it('should merge the classes passed via className', () => {
    render(<Button className="w-full">Explorar Cursos</Button>);

    expect(screen.getByRole('button')).toHaveClass('w-full');
  });
});
