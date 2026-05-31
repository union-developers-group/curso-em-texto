import { ArrowRight, Github as GithubIcon } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GoogleIcon } from '@/components/icons/google-icon';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'Button',
  component: Button,
  args: {
    children: 'Explorar Cursos',
    variant: 'primary',
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

export const Github: Story = {
  args: {
    variant: 'secondary',
    iconPosition: 'left',
    icon: <GithubIcon size={16} />,
    children: 'Continuar com o GitHub',
  },
};

export const Google: Story = {
  args: {
    variant: 'secondary',
    iconPosition: 'left',
    icon: <GoogleIcon size={16} />,
    children: 'Continuar com o Google',
  },
};
