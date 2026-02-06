import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import RadioGroupCustom, { RadioOption } from './radio-group-custom'
import { Store, Truck, Car } from 'lucide-react'

const meta = {
  title: 'UI/RadioGroupCustom',
  component: RadioGroupCustom,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
  },
} satisfies Meta<typeof RadioGroupCustom>

export default meta
type Story = StoryObj<typeof meta>

const deliveryOptions: RadioOption[] = [
  {
    value: 'IN_STORE',
    label: 'In Store Pickup',
    description: 'Pick up your order at our store location',
    icon: <Store />,
  },
  {
    value: 'DELIVERY',
    label: 'Home Delivery',
    description: 'We deliver directly to your address',
    icon: <Truck />,
  },
  {
    value: 'CURBSIDE',
    label: 'Curbside Pickup',
    description: 'Pick up from our parking lot',
    icon: <Car />,
  },
]

export const Default: Story = {
  args: {
    name: 'delivery',
    options: deliveryOptions,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-96">
        <RadioGroupCustom
          name="delivery"
          options={deliveryOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const WithLabel: Story = {
  args: {
    name: 'delivery',
    options: deliveryOptions,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-96">
        <RadioGroupCustom
          name="delivery"
          label="Select Delivery Method"
          options={deliveryOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const WithError: Story = {
  args: {
    name: 'delivery',
    options: deliveryOptions,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-96">
        <RadioGroupCustom
          name="delivery"
          label="Delivery Method"
          options={deliveryOptions}
          value={value}
          onChange={setValue}
          error="Please select a delivery method"
        />
      </div>
    )
  },
}

export const SimpleOptions: Story = {
  args: {
    name: 'simple',
    options: [],
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    const simpleOptions: RadioOption[] = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ]
    return (
      <div className="w-96">
        <RadioGroupCustom
          name="simple"
          label="Simple Options"
          options={simpleOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const WithSelectedValue: Story = {
  args: {
    name: 'delivery',
    options: deliveryOptions,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>('DELIVERY')
    return (
      <div className="w-96">
        <RadioGroupCustom
          name="delivery"
          label="Delivery Method"
          options={deliveryOptions}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  },
}

export const Interactive: Story = {
  args: {
    name: 'delivery',
    options: deliveryOptions,
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = React.useState<string>()
    return (
      <div className="w-96 space-y-4">
        <RadioGroupCustom
          name="delivery"
          label="Select Delivery Method"
          options={deliveryOptions}
          value={value}
          onChange={setValue}
        />
        {value && (
          <div className="text-sm text-muted-foreground p-4 bg-muted rounded-md">
            Selected: <strong>{value}</strong>
          </div>
        )}
      </div>
    )
  },
}
