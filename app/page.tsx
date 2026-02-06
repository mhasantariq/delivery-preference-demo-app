'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ThemeSwitcher from '@/components/theme/theme-switcher';
import DeliveryHero from '@/components/illustrations/DeliveryHero';
import { PageTransition } from '@/components/animations/PageTransition';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/preference');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
      <PageTransition className="w-full max-w-md flex flex-col items-center gap-8">
        <DeliveryHero className="w-48 h-auto text-blue-300/60 dark:text-blue-800/30" />
        
        <Card className="w-full p-8 text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-4">
              <Package className="size-8 text-blue-600 dark:text-blue-400" aria-hidden />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Delivery Preference App
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
            Set how you want to receive your orders in a few simple steps.
          </p>
          <Button
            variant="default"
            onClick={() => router.push('/login')}
            className="w-full"
            icon={<ArrowRight className="size-5" />}
          >
            Get Started
          </Button>
        </Card>
      </PageTransition>
    </div>
  );
}
