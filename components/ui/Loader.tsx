'use client';

import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'size-5 border-2',
  md: 'size-8 border-2',
  lg: 'size-12 border-[3px]',
};

export default function Loader({ className, size = 'md' }: LoaderProps) {
  return (
    <div
      className={cn(
        'rounded-full border-muted border-t-primary animate-spin',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
