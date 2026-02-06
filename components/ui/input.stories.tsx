import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'
import { Mail, Lock, Search } from 'lucide-react'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    error: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Email',
    icon: <Mail />,
    placeholder: 'Enter your email',
    type: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    icon: <Lock />,
    type: 'password',
    placeholder: 'Enter your password',
  },
}

export const SearchInput: Story = {
  args: {
    icon: <Search />,
    placeholder: 'Search...',
    type: 'search',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot type here',
    disabled: true,
    defaultValue: 'Disabled value',
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <Input label="Default" placeholder="Enter text" />
      <Input label="With Icon" icon={<Mail />} placeholder="Email" type="email" />
      <Input label="With Error" error="This field is required" placeholder="Required field" />
      <Input label="Disabled" disabled placeholder="Cannot edit" defaultValue="Disabled" />
    </div>
  ),
}
