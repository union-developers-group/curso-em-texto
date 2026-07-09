import { fireEvent, render, screen } from '@testing-library/react';
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
    render(<Tabs tabs={tabs} />);

    expect(
      screen.getByRole('tab', { name: 'Detalhes Gerais' })
    ).toBeInTheDocument();

    expect(screen.getByRole('tab', { name: 'Módulos' })).toBeInTheDocument();

    expect(screen.getByRole('tab', { name: 'Conteúdo' })).toBeInTheDocument();
  });

  it('should mark the first tab as active by default', () => {
    render(<Tabs tabs={tabs} />);

    expect(
      screen.getByRole('tab', { name: 'Detalhes Gerais' })
    ).toHaveAttribute('aria-selected', 'true');

    expect(screen.getByRole('tab', { name: 'Módulos' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('should change active tab when clicking', () => {
    render(<Tabs tabs={tabs} />);

    fireEvent.click(
      screen.getByRole('tab', {
        name: 'Módulos',
      })
    );

    expect(
      screen.getByRole('tab', {
        name: 'Módulos',
      })
    ).toHaveAttribute('aria-selected', 'true');

    expect(
      screen.getByRole('tab', {
        name: 'Detalhes Gerais',
      })
    ).toHaveAttribute('aria-selected', 'false');
  });

  it('should render the tablist', () => {
    render(<Tabs tabs={tabs} />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('should navigate with ArrowRight', () => {
    render(<Tabs tabs={tabs} />);

    const firstTab = screen.getByRole('tab', {
      name: 'Detalhes Gerais',
    });

    firstTab.focus();

    fireEvent.keyDown(firstTab, {
      key: 'ArrowRight',
    });

    expect(
      screen.getByRole('tab', {
        name: 'Módulos',
      })
    ).toHaveAttribute('aria-selected', 'true');
  });

  it('should navigate with ArrowLeft', () => {
    render(<Tabs tabs={tabs} />);

    const firstTab = screen.getByRole('tab', {
      name: 'Detalhes Gerais',
    });

    firstTab.focus();

    fireEvent.keyDown(firstTab, {
      key: 'ArrowLeft',
    });

    expect(
      screen.getByRole('tab', {
        name: 'Conteúdo',
      })
    ).toHaveAttribute('aria-selected', 'true');
  });

  it('should navigate to first tab with Home', () => {
    render(<Tabs tabs={tabs} />);

    fireEvent.click(
      screen.getByRole('tab', {
        name: 'Conteúdo',
      })
    );

    const tab = screen.getByRole('tab', {
      name: 'Conteúdo',
    });

    tab.focus();

    fireEvent.keyDown(tab, {
      key: 'Home',
    });

    expect(
      screen.getByRole('tab', {
        name: 'Detalhes Gerais',
      })
    ).toHaveAttribute('aria-selected', 'true');
  });

  it('should navigate to last tab with End', () => {
    render(<Tabs tabs={tabs} />);

    const tab = screen.getByRole('tab', {
      name: 'Detalhes Gerais',
    });

    tab.focus();

    fireEvent.keyDown(tab, {
      key: 'End',
    });

    expect(
      screen.getByRole('tab', {
        name: 'Conteúdo',
      })
    ).toHaveAttribute('aria-selected', 'true');
  });
});
