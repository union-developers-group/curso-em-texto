import { render, screen } from '@testing-library/react';

import { badgeMock } from './Badge.mock';

import { Badge } from '.';

describe('<Badge />', () => {
  it('should render the label', () => {
    render(<Badge {...badgeMock} />);

    const badge = screen.getByTestId('badge');

    expect(badge).toHaveTextContent(badgeMock.label);
  });

  it('should render with default variant by default', () => {
    render(<Badge label="Em destaque" />);

    const badge = screen.getByTestId('badge');

    expect(badge).toHaveClass('text-gray-50');
  });

  it('should render with outline variant', () => {
    render(<Badge variant="outline" label="Em destaque" />);

    const badge = screen.getByTestId('badge');

    expect(badge).toHaveClass('border');
    expect(badge).toHaveClass('border-gray-200');
    expect(badge).toHaveClass('text-gray-100');
  });

  it('should render with filled variant', () => {
    render(<Badge variant="filled" label="Em destaque" />);

    const badge = screen.getByTestId('badge');

    expect(badge).toHaveClass('bg-[#F59E0B]');
    expect(badge).toHaveClass('text-background-500');
  });

  it('should render with custom class', () => {
    render(<Badge className="custom-class" {...badgeMock} />);

    const badge = screen.getByTestId('badge');

    expect(badge).toHaveClass('custom-class');
  });

  it('should render as a span element', () => {
    render(<Badge {...badgeMock} />);

    const badge = screen.getByTestId('badge');

    expect(badge.tagName).toBe('SPAN');
  });
});
