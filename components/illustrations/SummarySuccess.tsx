export default function SummarySuccess({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="60" cy="60" r="48" className="fill-green-100 dark:fill-green-900/30 stroke-green-300 dark:stroke-green-700" strokeWidth="2" />
      <circle cx="60" cy="60" r="36" className="fill-green-200/80 dark:fill-green-800/40" />
      <path d="M42 60 L55 73 L78 48" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="stroke-white dark:stroke-green-200" />
    </svg>
  );
}
