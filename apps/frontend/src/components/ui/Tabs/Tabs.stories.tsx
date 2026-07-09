import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs } from '@/components/ui/Tabs';

const tabs = [
  {
    value: 'details',
    label: 'Detalhes Gerais',
  },
  {
    value: 'modules',
    label: 'Módulos',
  },
  {
    value: 'content',
    label: 'Conteúdo',
  },
];

const meta = {
  title: 'Components/UI/Tabs',
  component: Tabs,
  decorators: [
    (Story) => (
      <div className="bg-background-500 p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    tabs,
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
