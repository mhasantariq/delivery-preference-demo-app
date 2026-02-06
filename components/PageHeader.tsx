'use client';

import { useState } from 'react';
import { Menu, X, LogOut, Sun, Moon, Monitor } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/lib/store/auth-store';
import { usePreferenceStore } from '@/lib/store/preference-store';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import ThemeSwitcher from '@/components/theme/theme-switcher';
import LogoutButton from '@/components/LogoutButton';

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
] as const;

export default function PageHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const logout = useAuthStore((state) => state.logout);
  const { reset } = usePreferenceStore();

  const handleLogout = () => {
    logout();
    reset();
    setOpen(false);
    router.push('/');
  };

  const currentTheme = themes.find((t) => t.value === theme) || themes[2];
  const CurrentThemeIcon = currentTheme.icon;

  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
      <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
        <LogoutButton />
        <ThemeSwitcher />
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden w-10 h-10 rounded-xl bg-background/80 border-border"
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="end">
          <div className="space-y-1">
            <button
              type="button"
              onClick={handleLogout}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors rounded-md',
                'hover:bg-destructive/10 hover:text-destructive text-destructive'
              )}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span>Log out</span>
            </button>
            <div className="border-t border-border my-1" />
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive = theme === themeOption.value;
              return (
                <button
                  key={themeOption.value}
                  type="button"
                  onClick={() => {
                    setTheme(themeOption.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors rounded-md',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-accent font-medium'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{themeOption.label}</span>
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
