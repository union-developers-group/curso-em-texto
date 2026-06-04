import { ArrowRight, Github as GithubIcon } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'Button',
  component: Button,
  args: {
    children: 'Explorar Cursos',
    variant: 'primary',
    icon: undefined,
    iconPosition: 'right',
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    icon: <ArrowRight size={16} />,
  },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const WithIcon: Story = {
  args: {
    variant: 'secondary',
    iconPosition: 'left',
    icon: <GithubIcon size={16} />,
    children: 'Continuar com o GitHub',
  },
};
