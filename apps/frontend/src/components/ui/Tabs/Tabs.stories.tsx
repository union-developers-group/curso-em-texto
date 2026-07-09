import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
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
    value: 'details',
    onChange: () => {},
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('details');

    return <Tabs tabs={tabs} value={value} onChange={setValue} />;
  },
};
