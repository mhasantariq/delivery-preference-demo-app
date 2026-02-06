'use client';

interface CalendarTimeCardProps {
  date: string;
  time: string;
  label?: string;
  className?: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function CalendarTimeCard({ date, time, label, className = '' }: CalendarTimeCardProps) {
  const dateObj = new Date(`${date}T${time}`);
  const day = dateObj.getDate();
  const month = MONTHS[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const min = minutes || '00';
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  const timeLabel = `${hour12}:${min} ${ampm}`;

  return (
    <div className={`inline-flex items-stretch gap-4 rounded-xl border border-border bg-card overflow-hidden ${className}`}>
      <div className="flex flex-col items-center justify-center min-w-[72px] py-3 px-4 bg-primary/10 border-r border-border">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          {month}
        </span>
        <span className="text-2xl font-bold tabular-nums leading-none mt-0.5">
          {day}
        </span>
        <span className="text-xs text-muted-foreground mt-1">{year}</span>
      </div>
      <div className="flex flex-col justify-center py-3 pr-4">
        {label && (
          <span className="text-xs text-muted-foreground mb-0.5">{label}</span>
        )}
        <span className="text-lg font-semibold tabular-nums">
          {timeLabel}
        </span>
        <span className="text-xs text-muted-foreground mt-0.5">
          {dateObj.toLocaleDateString('en-US', { weekday: 'long' })}
        </span>
      </div>
    </div>
  );
}
