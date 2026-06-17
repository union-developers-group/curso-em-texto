import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Footer } from '@/components/shared/Footer';

const meta = {
  title: 'Components/Shared/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
