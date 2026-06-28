import { fireEvent, render, screen } from '@testing-library/react';
import { Select } from '@/components/ui/Select';
import { vi } from 'vitest';

const options = [
  { label: 'React', value: '1' },
  { label: 'Vue', value: '2' },
];

const renderSelect = (props?: Partial<React.ComponentProps<typeof Select>>) =>
  render(<Select label="Curso" options={options} {...props} />);

describe('<Select />', () => {
  it('should associate the label with the trigger', () => {
    renderSelect();

    expect(screen.getByLabelText('Curso')).toBeInTheDocument();
  });

  it('should show the placeholder when there is no selected value', () => {
    renderSelect({ placeholder: 'Selecione' });

    expect(screen.getByText('Selecione')).toBeInTheDocument();
  });

  it('should open the listbox and display the options on click', () => {
    renderSelect();

    fireEvent.click(screen.getByLabelText('Curso'));

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'React' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument();
  });

  it('should call onChange with the value when selecting an option', () => {
    const handleChange = vi.fn();
    renderSelect({ onChange: handleChange });

    fireEvent.click(screen.getByLabelText('Curso'));
    fireEvent.click(screen.getByRole('option', { name: 'Vue' }));

    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('should display the selected option label and close the listbox', () => {
    renderSelect();

    fireEvent.click(screen.getByLabelText('Curso'));
    fireEvent.click(screen.getByRole('option', { name: 'Vue' }));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Curso')).toHaveTextContent('Vue');
  });

  it('should display the helper text and mark the field as invalid on error', () => {
    renderSelect({ error: true, helperText: 'Curso é obrigatório.' });

    expect(screen.getByText('Curso é obrigatório.')).toBeInTheDocument();
    expect(screen.getByLabelText('Curso')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('should show the disabled state', () => {
    renderSelect({ disabled: true });

    expect(screen.getByLabelText('Curso')).toBeDisabled();
  });
});
