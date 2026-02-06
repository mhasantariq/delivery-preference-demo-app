"use client"

import * as React from "react"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { cn } from "@/lib/utils"

export interface RadioOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface RadioGroupCustomProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange: (value: string) => void
  error?: string
  label?: string
}

const RadioGroupCustom = React.forwardRef<
  HTMLDivElement,
  RadioGroupCustomProps
>(({ name, options, value, onChange, error, label }, ref) => {
  return (
    <div className="w-full" ref={ref}>
      {label && (
        <label className="block text-sm font-medium mb-3">
          {label}
        </label>
      )}
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="space-y-3"
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-200",
              "hover:bg-accent",
              value === option.value
                ? "border-primary bg-accent"
                : "border-input",
              error && "border-destructive"
            )}
          >
            <RadioGroupItem value={option.value} id={`${name}-${option.value}`} className="mt-0.5 shrink-0" />
            {option.icon && (
              <span className="shrink-0 rounded-lg bg-muted p-2.5 [&>svg]:size-6 text-primary">
                {option.icon}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-base font-medium">
                {option.label}
              </div>
              {option.description && (
                <div className="mt-1 text-sm text-muted-foreground">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </RadioGroup>
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
})
RadioGroupCustom.displayName = "RadioGroupCustom"

export default RadioGroupCustom
