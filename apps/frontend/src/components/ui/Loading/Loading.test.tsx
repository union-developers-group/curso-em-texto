import { render, screen } from '@testing-library/react';
import { Loading } from '@/components/ui/Loading';

describe('<Loading />', () => {
  it('should render the loading status', () => {
    render(<Loading />);

    expect(
      screen.getByRole('status', { name: 'Carregando' })
    ).toBeInTheDocument();
  });

  it('should use the "md" size by default', () => {
    render(<Loading />);

    expect(screen.getByRole('status')).toHaveClass('h-10', 'w-10');
  });

  it('should apply the "sm" size classes', () => {
    render(<Loading size="sm" />);

    expect(screen.getByRole('status')).toHaveClass('h-6', 'w-6');
  });

  it('should apply the "lg" size classes', () => {
    render(<Loading size="lg" />);

    expect(screen.getByRole('status')).toHaveClass('h-14', 'w-14');
  });

  it('should apply the spinner color', () => {
    render(<Loading color="#10B77F" />);

    expect(screen.getByRole('status')).toHaveStyle({ color: '#10B77F' });
  });

  it('should merge the classes passed via className', () => {
    render(<Loading className="text-gray-50" />);

    expect(screen.getByRole('status')).toHaveClass('text-gray-50');
  });
});
