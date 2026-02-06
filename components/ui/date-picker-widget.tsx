"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "./input"

interface DatePickerWidgetProps {
  value?: string
  onChange: (value: string) => void
  min?: string
  label?: string
  error?: string
  placeholder?: string
  id?: string
  inline?: boolean
}

export default function DatePickerWidget({
  value,
  onChange,
  min,
  label,
  error,
  placeholder = "Select date",
  id,
  inline = false,
}: DatePickerWidgetProps) {
  const [open, setOpen] = React.useState(false)
  const date = value ? new Date(value + "T12:00:00") : undefined
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const minDate = min ? new Date(min + "T00:00:00") : today
  minDate.setHours(0, 0, 0, 0)

  const formatDisplay = (val: string) => {
    if (!val) return ""
    const d = new Date(val + "T12:00:00")
    return format(d, "EEE, MMM d, yyyy")
  }

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return
    const y = selectedDate.getFullYear()
    const m = String(selectedDate.getMonth() + 1).padStart(2, "0")
    const d = String(selectedDate.getDate()).padStart(2, "0")
    onChange(`${y}-${m}-${d}`)
    if (!inline) {
      setOpen(false)
    }
  }

  const isDateDisabled = (dateToCheck: Date) => {
    const checkDate = new Date(dateToCheck)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate < minDate
  }

  const inputId = id || `date-${Math.random().toString(36).slice(2, 9)}`

  if (inline) {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1.5 block"
          >
            {label}
          </label>
        )}
        <div className={cn("rounded-md border bg-popover p-3", error && "border-destructive")}>
          <Calendar
            selected={date}
            onSelect={handleSelect}
            disabled={isDateDisabled}
            initialFocus
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1.5 block"
        >
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            variant="outline"
            type="button"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-destructive"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formatDisplay(value!) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0" 
          align="start"
          side="bottom"
          sideOffset={8}
          collisionPadding={40}
          avoidCollisions={true}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Calendar
            selected={date}
            onSelect={handleSelect}
            disabled={isDateDisabled}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="mt-1.5 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
