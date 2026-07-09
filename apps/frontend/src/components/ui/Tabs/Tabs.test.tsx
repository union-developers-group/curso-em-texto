import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Tabs } from '@/components/ui/Tabs';

const tabs = [
  {
    value: 'details',
    label: 'Detalhes Gerais',
  },
  {
    value: 'modules',
    label: 'Módulos',
  },
  {
    value: 'content',
    label: 'Conteúdo',
  },
];

describe('Tabs', () => {
  it('should render all tabs', () => {
    render(<Tabs tabs={tabs} value="details" onChange={vi.fn()} />);

    expect(
      screen.getByRole('tab', { name: 'Detalhes Gerais' })
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Módulos' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Conteúdo' })).toBeInTheDocument();
  });

  it('should mark the active tab', () => {
    render(<Tabs tabs={tabs} value="modules" onChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: 'Módulos' })).toHaveAttribute(
      'aria-selected',
      'true'
    );

    expect(
      screen.getByRole('tab', { name: 'Detalhes Gerais' })
    ).toHaveAttribute('aria-selected', 'false');
  });

  it('should call onChange when clicking another tab', () => {
    const onChange = vi.fn();

    render(<Tabs tabs={tabs} value="details" onChange={onChange} />);

    fireEvent.click(screen.getByRole('tab', { name: 'Módulos' }));

    expect(onChange).toHaveBeenCalledWith('modules');
  });

  it('should render the tablist', () => {
    render(<Tabs tabs={tabs} value="details" onChange={vi.fn()} />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});
