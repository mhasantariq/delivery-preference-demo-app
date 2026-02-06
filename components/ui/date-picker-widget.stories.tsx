import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import DatePickerWidget from './date-picker-widget'

const meta = {
  title: 'UI/DatePickerWidget',
  component: DatePickerWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    inline: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof DatePickerWidget>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-80">
        <DatePickerWidget value={value} onChange={setValue} />
      </div>
    )
  },
}

export const WithLabel: Story = {
  args: {
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-80">
        <DatePickerWidget
          label="Select Date"
          value={value}
          onChange={setValue}
          placeholder="Choose a date"
        />
      </div>
    )
  },
}

export const WithError: Story = {
  args: {
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-80">
        <DatePickerWidget
          label="Delivery Date"
          value={value}
          onChange={setValue}
          error="Please select a future date"
        />
      </div>
    )
  },
}

export const WithMinDate: Story = {
  args: {
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    const today = new Date().toISOString().split('T')[0]
    return (
      <div className="w-80">
        <DatePickerWidget
          label="Future Date Only"
          value={value}
          onChange={setValue}
          min={today}
        />
      </div>
    )
  },
}

export const Inline: Story = {
  args: {
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-80">
        <DatePickerWidget
          label="Inline Calendar"
          value={value}
          onChange={setValue}
          inline
        />
      </div>
    )
  },
}

export const Interactive: Story = {
  args: {
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-80 space-y-4">
        <DatePickerWidget
          label="Selected Date"
          value={value}
          onChange={setValue}
        />
        {value && (
          <div className="text-sm text-muted-foreground">
            Selected: {value}
          </div>
        )}
      </div>
    )
  },
}
