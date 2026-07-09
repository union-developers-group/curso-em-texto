import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from '@/components/ui/Select';

const options = [
  { label: 'Hello World', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];

const meta = {
  title: 'Components/UI/Select',
  component: Select,
  decorators: [
    (Story) => (
      <div className="w-md bg-background-500 p-6 pb-72">
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Label',
    placeholder: 'Value',
    options,
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: '1' },
};

export const Placeholder: Story = {
  args: { placeholder: 'Selecione uma opção' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '1' },
};

export const Error: Story = {
  args: {
    error: true,
    helperText: 'Este campo é obrigatório.',
  },
};
