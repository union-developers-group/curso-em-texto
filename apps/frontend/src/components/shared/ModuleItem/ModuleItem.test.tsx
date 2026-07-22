import { fireEvent, render, screen } from '@testing-library/react';
import { ModuleItem } from '.';
import { moduleItemMock } from './ModuleItem.mock';

describe('ModuleItem', () => {
  it('should render the module', () => {
    render(<ModuleItem {...moduleItemMock} />);

    expect(screen.getByText(moduleItemMock.module)).toBeInTheDocument();
  });

  it('should render the title', () => {
    render(<ModuleItem {...moduleItemMock} />);

    expect(screen.getByText(moduleItemMock.title)).toBeInTheDocument();
  });

  it('should render the edit button', () => {
    render(<ModuleItem {...moduleItemMock} />);

    expect(
      screen.getByRole('button', {
        name: 'Editar módulo',
      })
    ).toBeInTheDocument();
  });

  it('should render the expand button', () => {
    render(<ModuleItem {...moduleItemMock} />);

    expect(
      screen.getByRole('button', {
        name: 'Abrir módulo',
      })
    ).toBeInTheDocument();
  });

  it('should not render children by default', () => {
    render(
      <ModuleItem {...moduleItemMock}>
        <p>Conteúdo do módulo</p>
      </ModuleItem>
    );

    expect(screen.queryByText('Conteúdo do módulo')).not.toBeInTheDocument();
  });

  it('should expand when clicking the button', () => {
    render(
      <ModuleItem {...moduleItemMock}>
        <p>Conteúdo do módulo</p>
      </ModuleItem>
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Abrir módulo',
      })
    );

    expect(screen.getByText('Conteúdo do módulo')).toBeInTheDocument();
  });

  it('should collapse when clicking the button again', () => {
    render(
      <ModuleItem {...moduleItemMock}>
        <p>Conteúdo do módulo</p>
      </ModuleItem>
    );

    const button = screen.getByRole('button', {
      name: 'Abrir módulo',
    });

    fireEvent.click(button);

    expect(screen.getByText('Conteúdo do módulo')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Fechar módulo',
      })
    );

    expect(screen.queryByText('Conteúdo do módulo')).not.toBeInTheDocument();
  });
});
