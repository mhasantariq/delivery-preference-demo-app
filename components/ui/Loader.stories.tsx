import type { Meta, StoryObj } from '@storybook/react'
import Loader from './Loader'

const meta = {
  title: 'UI/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const AllSizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loader size="sm" />
        <span className="text-sm text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="md" />
        <span className="text-sm text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="lg" />
        <span className="text-sm text-muted-foreground">Large</span>
      </div>
    </div>
  ),
}

export const InButton: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4">
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2">
        <Loader size="sm" />
        <span>Loading...</span>
      </button>
      <button className="px-4 py-2 border rounded-md flex items-center gap-2">
        <Loader size="sm" />
        <span>Processing</span>
      </button>
    </div>
  ),
}

export const Centered: Story = {
  args: {},
  render: () => (
    <div className="flex items-center justify-center w-64 h-32 border rounded-lg">
      <Loader size="md" />
    </div>
  ),
}
