export default function WelcomeAuth({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="80" cy="45" r="28" className="fill-blue-100 dark:fill-blue-900/50 stroke-blue-300 dark:stroke-blue-700" strokeWidth="2" />
      <circle cx="80" cy="45" r="18" className="fill-blue-200 dark:fill-blue-800/60" />
      <path d="M65 45 L78 55 L95 38" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stroke-white dark:stroke-blue-200" />
      <rect x="40" y="78" width="80" height="35" rx="6" className="fill-gray-100 dark:fill-gray-700 stroke-gray-200 dark:stroke-gray-600" strokeWidth="2" />
      <rect x="55" y="88" width="50" height="6" rx="2" className="fill-gray-200 dark:fill-gray-600" />
      <rect x="65" y="98" width="30" height="4" rx="2" className="fill-gray-200 dark:fill-gray-600" />
    </svg>
  );
}
