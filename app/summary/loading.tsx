import Loader from '@/components/ui/Loader';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-slate-900">
      <Loader size="lg" />
    </div>
  );
}
