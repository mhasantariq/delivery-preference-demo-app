'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, LogIn, Info, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import ThemeSwitcher from '@/components/theme/theme-switcher';
import WelcomeAuth from '@/components/illustrations/WelcomeAuth';
import { PageTransition } from '@/components/animations/PageTransition';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const loginSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const MOCK_EMAIL = 'test@test.com';
const MOCK_PASSWORD = 'password123';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');

    if (data.email === MOCK_EMAIL && data.password === MOCK_PASSWORD) {
      login(data.email);
      await new Promise((r) => setTimeout(r, 700));
      router.push('/preference');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
      <PageTransition className="w-full max-w-md">
        <Card className="p-8">
        <div className="flex flex-col items-center mb-8">
          <WelcomeAuth className="w-28 h-auto text-blue-200 dark:text-blue-800/50 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Sign in to set your delivery preferences</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            {...register('email')}
            type="email"
            label="Email"
            placeholder="you@example.com"
            error={errors.email?.message}
            autoComplete="email"
            id="email"
            icon={<Mail />}
          />

          <div className="w-full">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none mb-2 block"
            >
              Password
            </label>
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                error={errors.password?.message}
                autoComplete="current-password"
                id="password"
                icon={<Lock />}
                className="pr-10"
                label=""
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={0}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <Info className="size-5 shrink-0 text-destructive mt-0.5" aria-hidden />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            className="w-full"
            loading={isSubmitting}
            icon={<LogIn className="size-5" />}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <TooltipProvider>
          <div className="mt-6 p-4 bg-muted border border-border rounded-lg flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="size-5 shrink-0 text-primary mt-0.5 cursor-help" aria-hidden />
              </TooltipTrigger>
              <TooltipContent>
                <p>Use these credentials to sign in</p>
              </TooltipContent>
            </Tooltip>
            <div>
              <p className="text-xs font-semibold mb-1">Demo credentials</p>
              <p className="text-xs text-muted-foreground">Email: {MOCK_EMAIL}</p>
              <p className="text-xs text-muted-foreground">Password: {MOCK_PASSWORD}</p>
            </div>
          </div>
        </TooltipProvider>
        </Card>
      </PageTransition>
    </div>
  );
}
