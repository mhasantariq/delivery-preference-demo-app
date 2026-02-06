import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { Loader2, Mail, Download } from 'lucide-react'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Variants: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Mail />
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4">
      <Button icon={<Mail />}>Email</Button>
      <Button variant="outline" icon={<Download />}>
        Download
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4">
      <Button loading>Loading</Button>
      <Button variant="outline" loading>
        Processing
      </Button>
      <Button variant="destructive" loading>
        Deleting
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
      <Button variant="destructive" disabled>
        Disabled Destructive
      </Button>
    </div>
  ),
}

export const Interactive: Story = {
  args: {
    children: 'Click me',
    onClick: () => alert('Button clicked!'),
  },
}
