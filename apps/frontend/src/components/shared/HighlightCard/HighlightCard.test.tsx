import { render, screen } from '@testing-library/react';

import { highlightCardMock } from './HighlightCard.mock';

import { HighlightCard } from '.';

describe('<HighlightCard />', () => {
  it('should render the title', () => {
    render(<HighlightCard {...highlightCardMock} />);

    const title = screen.getByTestId('highlight-card-title');

    expect(title).toHaveTextContent(highlightCardMock.title);
  });

  it('should render the description', () => {
    render(<HighlightCard {...highlightCardMock} />);

    const description = screen.getByTestId('highlight-card-description');

    expect(description).toHaveTextContent(highlightCardMock.description);
  });

  it('should render the icon', () => {
    render(<HighlightCard {...highlightCardMock} />);

    const iconContainer = screen.getByTestId('highlight-card-icon');

    expect(iconContainer).toBeInTheDocument();
  });

  it('should render with md size by default', () => {
    render(<HighlightCard {...highlightCardMock} />);

    const card = screen.getByTestId('highlight-card');

    expect(card).toHaveClass('max-w-[21.3125rem]');
  });

  it('should render with lg size', () => {
    render(<HighlightCard size="lg" {...highlightCardMock} />);

    const card = screen.getByTestId('highlight-card');

    expect(card).toHaveClass('max-w-[27.5rem]');
  });

  it('should render with custom class', () => {
    render(<HighlightCard className="custom-class" {...highlightCardMock} />);

    const card = screen.getByTestId('highlight-card');

    expect(card).toHaveClass('custom-class');
  });

  it('should use semantic HTML elements', () => {
    render(<HighlightCard {...highlightCardMock} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();

    const heading = screen.getByRole('heading', {
      level: 3,
      name: highlightCardMock.title,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should hide icon from assistive technologies', () => {
    render(<HighlightCard {...highlightCardMock} />);

    const iconContainer = screen.getByTestId('highlight-card-icon');
    const svg = iconContainer.querySelector('svg');

    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
