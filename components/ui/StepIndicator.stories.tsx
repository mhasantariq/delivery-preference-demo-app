import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import StepIndicator from './StepIndicator'

const meta = {
  title: 'UI/StepIndicator',
  component: StepIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 3 },
    },
    steps: {
      control: 'object',
    },
  },
} satisfies Meta<typeof StepIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Step1: Story = {
  args: {
    currentStep: 1,
    steps: ['Preferences', 'Summary'],
  },
}

export const Step2: Story = {
  args: {
    currentStep: 2,
    steps: ['Preferences', 'Summary'],
  },
}

export const ThreeSteps: Story = {
  args: {
    currentStep: 1,
    steps: ['Step 1', 'Step 2', 'Step 3'],
  },
}

export const Step2OfThree: Story = {
  args: {
    currentStep: 2,
    steps: ['Step 1', 'Step 2', 'Step 3'],
  },
}

export const Step3OfThree: Story = {
  args: {
    currentStep: 3,
    steps: ['Step 1', 'Step 2', 'Step 3'],
  },
}

export const FourSteps: Story = {
  args: {
    currentStep: 2,
    steps: ['Setup', 'Configure', 'Review', 'Complete'],
  },
}

export const Interactive: Story = {
  args: {
    currentStep: 1,
    steps: ['Preferences', 'Summary'],
  },
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1)
    return (
      <div className="w-full space-y-4">
        <StepIndicator currentStep={currentStep} steps={['Preferences', 'Summary']} />
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(2, currentStep + 1))}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Next
          </button>
        </div>
      </div>
    )
  },
}
