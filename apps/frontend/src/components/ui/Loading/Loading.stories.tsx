import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Loading } from '@/components/ui/Loading';

const meta = {
  title: 'Components/UI/Loading',
  component: Loading,
  args: {
    size: 'md',
    color: '#10B77F',
  },
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const CustomColor: Story = {
  args: {
    color: '#3C83F6',
  },
};
