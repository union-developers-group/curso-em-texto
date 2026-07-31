import { render, screen } from '@testing-library/react';

import { tagMock } from './Tag.mock';

import { Tag } from '.';

describe('Tag', () => {
  it('should render the label', () => {
    render(<Tag {...tagMock} />);

    expect(screen.getByText(tagMock.label)).toBeInTheDocument();
  });

  it('should render as a button', () => {
    render(<Tag {...tagMock} />);

    expect(
      screen.getByRole('button', {
        name: tagMock.label,
      })
    ).toBeInTheDocument();
  });

  it('should render the close icon', () => {
    render(<Tag {...tagMock} />);

    const button = screen.getByRole('button');

    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('should apply primary variant styles', () => {
    render(<Tag {...tagMock} />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-gray-100');
    expect(button).toHaveClass('text-background-500');
  });

  it('should apply secondary variant styles', () => {
    render(<Tag label="Secondary" variant="secondary" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-gray-50');
    expect(button).toHaveClass('text-background-500');
  });

  it('should apply custom class', () => {
    render(<Tag {...tagMock} className="custom-class" />);

    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
