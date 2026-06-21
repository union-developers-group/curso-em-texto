import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from '@/components/ui/Input';

const meta = {
  title: 'Components/UI/Input',
  component: Input,
  decorators: [
    (Story) => (
      <div className="w-md bg-background-500 p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Label',
    placeholder: 'Value',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: { placeholder: 'Digite um valor' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Value' },
};

export const Error: Story = {
  args: {
    error: true,
    helperText: 'Este campo é obrigatório.',
  },
};
