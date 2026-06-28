import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { badgeMock, badgeMocks } from './Badge.mock';

import { Badge } from '.';

const meta = {
  title: 'Shared/Badge',
  component: Badge,
  args: { ...badgeMock },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: { ...badgeMocks[1] },
};

export const Filled: Story = {
  args: { ...badgeMocks[2] },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      {badgeMocks.map((mock) => (
        <Badge key={mock.variant} {...mock} />
      ))}
    </div>
  ),
};
