'use client';

import { useEffect } from 'react';
import { Home, RefreshCw, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageTransition } from '@/components/animations/PageTransition';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <PageTransition className="w-full max-w-md">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
              <AlertCircle className="size-10 text-red-600 dark:text-red-400" aria-hidden />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              We encountered an unexpected error. Please try again or return to the home page.
            </p>
            {isDev && error.message && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-left">
                <p className="text-xs font-semibold text-red-800 dark:text-red-300 mb-1">Error details (dev only):</p>
                <p className="text-xs text-red-700 dark:text-red-400 font-mono break-all">{error.message}</p>
                {error.digest && (
                  <p className="text-xs text-red-600 dark:text-red-500 mt-1">Digest: {error.digest}</p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={reset}
              variant="outline"
              className="flex-1"
              icon={<RefreshCw className="size-5" />}
            >
              Try Again
            </Button>
            <Link href="/" className="flex-1">
              <Button
                variant="default"
                className="w-full"
                icon={<Home className="size-5" />}
              >
                Go Home
              </Button>
            </Link>
          </div>
        </Card>
      </PageTransition>
    </div>
  );
}
