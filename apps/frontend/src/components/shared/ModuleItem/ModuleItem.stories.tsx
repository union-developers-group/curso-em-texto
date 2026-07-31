import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ModuleItem } from '.';
import { moduleItemMock } from './ModuleItem.mock';

const meta = {
  title: 'Shared/ModuleItem',
  component: ModuleItem,
  args: {
    ...moduleItemMock,
  },
} satisfies Meta<typeof ModuleItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Expanded: Story = {
  render: (args) => (
    <ModuleItem {...args}>
      <div className="p-6 text-gray-50">Conteúdo do módulo</div>
    </ModuleItem>
  ),
};
