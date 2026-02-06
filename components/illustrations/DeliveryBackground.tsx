'use client';

import Image from 'next/image';

export default function DeliveryBackground({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900" />
      <Image
        src="/delivery-background-light.svg"
        alt=""
        fill
        className="object-cover dark:hidden"
        priority
        aria-hidden
        sizes="100vw"
      />
      <Image
        src="/delivery-background-dark.svg"
        alt=""
        fill
        className="hidden dark:block object-cover"
        priority
        aria-hidden
        sizes="100vw"
      />
    </div>
  );
}
