import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { highlightCardMock, highlightCardMocks } from './HighlightCard.mock';

import { HighlightCard } from '.';

const meta = {
  title: 'Components/Shared/HighlightCard',
  component: HighlightCard,
  args: { ...highlightCardMock, size: 'md' },
} satisfies Meta<typeof HighlightCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <HighlightCard {...args} icon={highlightCardMock.icon} />,
};

export const Large: Story = {
  args: { size: 'lg' },
  render: (args) => <HighlightCard {...args} icon={highlightCardMock.icon} />,
};

export const WithMonitorIcon: Story = {
  args: { ...highlightCardMocks[1] },
  render: (args) => (
    <HighlightCard {...args} icon={highlightCardMocks[1].icon} />
  ),
};

export const WithSparklesIcon: Story = {
  args: { ...highlightCardMocks[2] },
  render: (args) => (
    <HighlightCard {...args} icon={highlightCardMocks[2].icon} />
  ),
};

export const AllCards: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {highlightCardMocks.map((mock) => (
        <HighlightCard key={mock.title} {...mock} />
      ))}
    </div>
  ),
};
