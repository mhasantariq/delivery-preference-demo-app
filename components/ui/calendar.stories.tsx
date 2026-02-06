import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Calendar } from './calendar'

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>()
    return (
      <div className="border rounded-lg">
        <Calendar selected={selected} onSelect={setSelected} />
      </div>
    )
  },
}

export const WithSelectedDate: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date())
    return (
      <div className="border rounded-lg">
        <Calendar selected={selected} onSelect={setSelected} />
      </div>
    )
  },
}

export const DisablePastDates: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const isDateDisabled = (date: Date) => {
      const checkDate = new Date(date)
      checkDate.setHours(0, 0, 0, 0)
      return checkDate < today
    }
    
    return (
      <div className="border rounded-lg">
        <Calendar 
          selected={selected} 
          onSelect={setSelected}
          disabled={isDateDisabled}
        />
      </div>
    )
  },
}

export const InCard: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>()
    return (
      <div className="w-80 border rounded-lg bg-card p-4">
        <h3 className="text-lg font-semibold mb-4">Select Date</h3>
        <Calendar selected={selected} onSelect={setSelected} />
        {selected && (
          <div className="mt-4 text-sm text-muted-foreground">
            Selected: {selected.toLocaleDateString()}
          </div>
        )}
      </div>
    )
  },
}

export const InitialFocus: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>()
    return (
      <div className="border rounded-lg">
        <Calendar 
          selected={selected} 
          onSelect={setSelected}
          initialFocus
        />
      </div>
    )
  },
}
