"use client"

import * as React from "react"
import { Clock, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const INTERVAL = 15
const times: string[] = []
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += INTERVAL) {
    times.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
  }
}

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number)
  const am = h < 12
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, "0")} ${am ? "AM" : "PM"}`
}

interface TimePickerWidgetProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  error?: string
  placeholder?: string
  id?: string
}

export default function TimePickerWidget({
  value,
  onChange,
  label,
  error,
  placeholder = "Select time",
  id,
}: TimePickerWidgetProps) {
  const [open, setOpen] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (open && value && listRef.current) {
      const idx = times.indexOf(value)
      if (idx >= 0) {
        const el = listRef.current.querySelector(`[data-time-idx="${idx}"]`)
        el?.scrollIntoView({ block: "nearest" })
      }
    }
  }, [open, value])

  const inputId = id || `time-${Math.random().toString(36).slice(2, 9)}`

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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive"
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {value ? formatTime(value) : <span>{placeholder}</span>}
            <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", open && "rotate-180")} />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0 z-[100]" 
          align="start"
          side="bottom"
          sideOffset={8}
          collisionPadding={16}
          avoidCollisions={true}
        >
          <div ref={listRef} className="max-h-[240px] overflow-y-auto py-1">
            {times.map((t, idx) => (
              <button
                key={t}
                type="button"
                data-time-idx={idx}
                onClick={() => {
                  onChange(t)
                  setOpen(false)
                }}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  value === t && "bg-accent font-medium",
                  value !== t && "text-foreground"
                )}
              >
                {formatTime(t)}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <p className="mt-1.5 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
