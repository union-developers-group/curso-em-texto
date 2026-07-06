import {
  courseCardMock,
  courseCardMocks,
} from '@/components/shared/CourseCard/CourseCard.mock';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CourseCard } from '@/components/shared/CourseCard';

const meta = {
  title: 'Components/Shared/CourseCard',
  component: CourseCard,
  args: { ...courseCardMock },
} satisfies Meta<typeof CourseCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutFeaturedLabel: Story = {
  args: { ...courseCardMocks[1] },
};

export const EmptyProgress: Story = {
  args: { ...courseCardMocks[2] },
};

export const AllCards: Story = {
  render: () => (
    <div className="grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courseCardMocks.map((mock) => (
        <CourseCard key={mock.title} {...mock} />
      ))}
    </div>
  ),
};
