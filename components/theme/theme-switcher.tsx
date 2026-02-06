"use client"

import * as React from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10 rounded-xl"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[2]
  const CurrentIcon = currentTheme.icon

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-xl bg-background/80 border-border"
          aria-label="Toggle theme"
        >
          <CurrentIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1" align="end">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          const isActive = theme === themeOption.value
          return (
            <button
              key={themeOption.value}
              type="button"
              onClick={() => setTheme(themeOption.value)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors rounded-md",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent font-medium"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {themeOption.label}
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
