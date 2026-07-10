import { courseCardMock } from '@/components/shared/CourseCard/CourseCard.mock';
import { render, screen, within } from '@testing-library/react';
import { CourseCard } from '@/components/shared/CourseCard';

const featuredLabel = 'Em destaque';

describe('<CourseCard />', () => {
  it('should render the course information', () => {
    render(<CourseCard {...courseCardMock} />);

    expect(
      screen.getByRole('heading', { level: 3, name: courseCardMock.title })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`por ${courseCardMock.author}`)
    ).toBeInTheDocument();
    expect(screen.getByText(courseCardMock.description)).toBeInTheDocument();
    expect(screen.getByText(courseCardMock.level)).toBeInTheDocument();
    expect(screen.getByText(featuredLabel)).toBeInTheDocument();
  });

  it('should render categories', () => {
    render(<CourseCard {...courseCardMock} />);

    const categories = screen.getByLabelText('Categorias do curso');

    courseCardMock.categories.forEach((category) => {
      expect(within(categories).getByText(category)).toBeInTheDocument();
    });
  });

  it('should render duration and lessons', () => {
    render(<CourseCard {...courseCardMock} />);

    expect(screen.getByText(courseCardMock.duration)).toBeInTheDocument();
    expect(
      screen.getByText(`${courseCardMock.lessons} aulas`)
    ).toBeInTheDocument();
  });

  it('should render an accessible progress bar', () => {
    render(<CourseCard {...courseCardMock} />);

    const progressbar = screen.getByRole('progressbar', {
      name: `Progresso do curso ${courseCardMock.title}`,
    });

    expect(progressbar).toHaveAttribute('aria-valuenow', '25');
    expect(screen.getByText('25% concluído')).toBeInTheDocument();
  });

  it('should not render featured label when it is not provided', () => {
    render(<CourseCard {...courseCardMock} featuredLabel={undefined} />);

    expect(screen.queryByText(featuredLabel)).not.toBeInTheDocument();
  });

  it('should clamp progress value between 0 and 100', () => {
    render(<CourseCard {...courseCardMock} progress={120} />);

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100'
    );
    expect(screen.getByText('100% concluído')).toBeInTheDocument();
  });

  it('should render with custom class', () => {
    render(<CourseCard {...courseCardMock} className="custom-class" />);

    expect(screen.getByRole('article')).toHaveClass('custom-class');
  });
});
