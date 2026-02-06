import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './select'

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-64">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  },
}

export const WithGroups: Story = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-64">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="carrot">Carrot</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="spinach">Spinach</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    )
  },
}

export const WithDefaultValue: Story = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState<string>('option2')
    return (
      <div className="w-64">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {},
  render: () => {
    return (
      <div className="w-64">
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Disabled select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  },
}

export const LongList: Story = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState<string>()
    const items = Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`)
    return (
      <div className="w-64">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select from long list" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item} value={item.toLowerCase().replace(' ', '-')}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  },
}

export const Interactive: Story = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-64 space-y-4">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
        {value && (
          <div className="text-sm text-muted-foreground p-4 bg-muted rounded-md">
            Selected: <strong>{value}</strong>
          </div>
        )}
      </div>
    )
  },
}
