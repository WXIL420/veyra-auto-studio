"use client";

import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { Art, type ArtKind } from "./Art";

export function CompareSlider({
  kind,
  variant = 0,
  subject,
  className = "",
}: {
  kind: ArtKind;
  variant?: number;
  subject: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div
      className={`relative aspect-[4/3] w-full select-none overflow-hidden border border-line bg-graphite has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-copper-2 ${className}`}
    >
      <Art kind={kind} state="after" variant={variant} pure label={`After: ${subject}`} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Art kind={kind} state="before" variant={variant} pure label={`Before: ${subject}`} />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 bg-ink/85 px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-bone">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 bg-copper px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink">
        After
      </span>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-bone" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bone text-ink shadow-lg">
          <ChevronsLeftRight className="h-5 w-5" />
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Before and after comparison: ${subject}. Use arrow keys or drag to reveal.`}
        aria-valuetext={`${pos}% before`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 [touch-action:pan-y]"
      />
    </div>
  );
}
