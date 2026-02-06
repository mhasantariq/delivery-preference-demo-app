import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card'
import { Button } from './button'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area. You can put any content here.</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  args: {},
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card includes a footer section</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content of the card.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  args: {},
  render: () => (
    <Card className="w-96">
      <CardContent className="pt-6">
        <p>Simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
}

export const MultipleCards: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>First card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for card 1</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Second card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for card 2</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Third card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for card 3</p>
        </CardContent>
      </Card>
    </div>
  ),
}
