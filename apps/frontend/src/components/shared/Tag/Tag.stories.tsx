import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tag } from '.';

import { tagMock, tagMocks } from './Tag.mock';

const meta = {
  title: 'Shared/Tag',
  component: Tag,
  args: {
    ...tagMock,
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: tagMocks[1],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      {tagMocks.map((mock) => (
        <Tag key={mock.variant} {...mock} />
      ))}
    </div>
  ),
};
