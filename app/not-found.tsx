import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageTransition } from '@/components/animations/PageTransition';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <PageTransition className="w-full max-w-md">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
              <span className="text-4xl font-bold text-red-600 dark:text-red-400">404</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button
                variant="outline"
                className="w-full"
                icon={<ArrowLeft className="size-5" />}
              >
                Go Back
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button
                variant="default"
                className="w-full"
                icon={<Home className="size-5" />}
              >
                Home
              </Button>
            </Link>
          </div>
        </Card>
      </PageTransition>
    </div>
  );
}
