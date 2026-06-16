import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Hero } from '@/components/shared/Hero';

const meta = {
  title: 'Components/Shared/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
