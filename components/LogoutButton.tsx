'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { usePreferenceStore } from '@/lib/store/preference-store';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { reset } = usePreferenceStore();

  const handleLogout = () => {
    logout();
    reset();
    router.push('/');
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            aria-label="Log out"
          >
            <LogOut className="size-4" />
            <span className="ml-1.5 hidden sm:inline">Log out</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sign out and return to home</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
