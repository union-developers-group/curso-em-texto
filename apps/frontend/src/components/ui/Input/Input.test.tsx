import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from '@/components/ui/Input';
import { vi } from 'vitest';

describe('<Input />', () => {
  it('should associate the label with the field', () => {
    render(<Input label="Nome" placeholder="Seu nome" />);

    expect(screen.getByLabelText('Nome')).toHaveAttribute(
      'placeholder',
      'Seu nome'
    );
  });

  it('should call onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Input label="Nome" onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Ana' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should display the helper text and mark the field as invalid on error', () => {
    render(<Input label="Nome" error helperText="Nome é obrigatório." />);

    expect(screen.getByText('Nome é obrigatório.')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('should show the disabled state', () => {
    render(<Input label="Nome" disabled />);

    expect(screen.getByLabelText('Nome')).toBeDisabled();
  });
});
