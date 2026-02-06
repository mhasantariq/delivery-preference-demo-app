import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import TimePickerWidget from './time-picker-widget'
import DatePickerWidget from './date-picker-widget'

const meta = {
  title: 'UI/TimePickerWidget',
  component: TimePickerWidget,
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
  },
} satisfies Meta<typeof TimePickerWidget>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-80">
        <TimePickerWidget value={value} onChange={setValue} />
      </div>
    )
  },
}

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-80">
        <TimePickerWidget
          label="Select Time"
          value={value}
          onChange={setValue}
          placeholder="Choose a time"
        />
      </div>
    )
  },
}

export const WithError: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-80">
        <TimePickerWidget
          label="Pickup Time"
          value={value}
          onChange={setValue}
          error="Please select a time"
        />
      </div>
    )
  },
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('14:30')
    return (
      <div className="w-80">
        <TimePickerWidget
          label="Selected Time"
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-80 space-y-4">
        <TimePickerWidget
          label="Time Selection"
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

export const CombinedWithDate: Story = {
  render: () => {
    const [date, setDate] = React.useState<string>()
    const [time, setTime] = React.useState<string>()
    return (
      <div className="w-80 space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Date & Time</label>
          <div className="grid grid-cols-2 gap-2">
            <DatePickerWidget
              value={date}
              onChange={setDate}
              placeholder="Date"
            />
            <TimePickerWidget
              value={time}
              onChange={setTime}
              placeholder="Time"
            />
          </div>
        </div>
        {(date || time) && (
          <div className="text-sm text-muted-foreground">
            {date && time ? `${date} at ${time}` : date || time}
          </div>
        )}
      </div>
    )
  },
}
