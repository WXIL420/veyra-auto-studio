/** Angular V emblem. The copper chevron is a hood crease catching light. */
export function Emblem({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d="M3 6h12l9 25 9-25h12L28 43h-8z" fill="#F3F1EB" />
      <path d="M12.5 15.5 24 20l11.5-4.5" fill="none" stroke="#C87343" strokeWidth="2.2" strokeLinejoin="miter" />
      <path d="M17 24.5 24 27l7-2.5" fill="none" stroke="#0D0F10" strokeWidth="1.6" strokeLinejoin="miter" />
    </svg>
  );
}

/** Hand-built angular letterforms: V E Y R A. */
export function Wordmark({ className = "h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="-3 -3 162 34"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
    >
      <path d="M0 0 10 28 20 0" />
      <path d="M52 2H34v24h18M34 14h14" />
      <path d="M68 0l10 14L88 0M78 14v14" />
      <path d="M104 28V1h14l5 5v7l-5 5h-14m10 0 9 10" />
      <path d="M136 28 146 0l10 28M139.500 19h13" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Emblem />
      <span className="flex flex-col gap-1.5">
        <Wordmark className="h-[18px] w-auto text-bone" />
        <span className="font-display text-[10px] font-medium uppercase leading-none tracking-[0.42em] text-silver">
          Auto Studio
        </span>
      </span>
    </span>
  );
}
