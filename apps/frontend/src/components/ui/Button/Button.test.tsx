import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import { vi } from 'vitest';

describe('<Button />', () => {
  it('deve exibir o texto passado para o botão', () => {
    render(<Button>Explorar Cursos</Button>);

    expect(
      screen.getByRole('button', { name: 'Explorar Cursos' })
    ).toBeInTheDocument();
  });

  it('deve usar a variação "primary" por padrão', () => {
    render(<Button>Explorar Cursos</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-gradient-primary');
  });

  it('deve aplicar as classes da variação "secondary"', () => {
    render(<Button variant="secondary">Explorar Cursos</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-background-300');
  });

  it('deve chamar a função de clique quando o botão é clicado', () => {
    const aoClicar = vi.fn();

    render(<Button onClick={aoClicar}>Explorar Cursos</Button>);
    fireEvent.click(screen.getByRole('button'));

    expect(aoClicar).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar a função de clique quando está desabilitado', () => {
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

  it('deve exibir o ícone quando ele é passado', () => {
    render(
      <Button icon={<span data-testid="icone" />}>Explorar Cursos</Button>
    );

    expect(screen.getByTestId('icone')).toBeInTheDocument();
  });

  it('deve posicionar o ícone à direita do texto por padrão', () => {
    render(<Button icon={<span data-testid="icone" />}>Cursos</Button>);

    const botao = screen.getByRole('button');

    expect(botao.lastChild).toBe(screen.getByTestId('icone'));
  });

  it('deve posicionar o ícone à esquerda quando iconPosition é "left"', () => {
    render(
      <Button icon={<span data-testid="icone" />} iconPosition="left">
        Cursos
      </Button>
    );

    const botao = screen.getByRole('button');

    expect(botao.firstChild).toBe(screen.getByTestId('icone'));
  });

  it('deve ter classe de hover na variação "primary"', () => {
    render(<Button variant="primary">Explorar Cursos</Button>);

    expect(screen.getByRole('button')).toHaveClass('hover:brightness-95');
  });

  it('deve ter classe de hover na variação "secondary"', () => {
    render(<Button variant="secondary">Explorar Cursos</Button>);

    expect(screen.getByRole('button')).toHaveClass('hover:bg-background-200');
  });

  it('deve mesclar as classes passadas via className', () => {
    render(<Button className="w-full">Explorar Cursos</Button>);

    expect(screen.getByRole('button')).toHaveClass('w-full');
  });
});
