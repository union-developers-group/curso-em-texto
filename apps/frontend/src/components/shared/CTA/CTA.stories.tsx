import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CTA } from '@/components/shared/CTA';

const meta = {
  title: 'Components/Shared/CTA',
  component: CTA,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CTA>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
