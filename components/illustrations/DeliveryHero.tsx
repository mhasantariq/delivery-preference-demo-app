export default function DeliveryHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect x="20" y="50" width="80" height="50" rx="6" className="fill-blue-100 dark:fill-blue-900/40 stroke-blue-200 dark:stroke-blue-800" strokeWidth="2" />
      <rect x="100" y="50" width="80" height="50" rx="6" className="fill-indigo-100 dark:fill-indigo-900/40 stroke-indigo-200 dark:stroke-indigo-800" strokeWidth="2" />
      <path d="M100 75 L140 75 L160 55 L180 55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stroke-blue-500 dark:stroke-blue-400" />
      <circle cx="45" cy="105" r="8" className="fill-gray-300 dark:fill-gray-600" />
      <circle cx="155" cy="105" r="8" className="fill-gray-300 dark:fill-gray-600" />
      <rect x="30" y="60" width="25" height="20" rx="2" className="fill-white dark:fill-gray-700" />
      <path d="M55 70 L75 70 M55 75 L70 75" strokeWidth="1.5" strokeLinecap="round" className="stroke-blue-400 dark:stroke-blue-500" />
    </svg>
  );
}
