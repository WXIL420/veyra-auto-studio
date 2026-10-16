import { Info } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="border-b border-line bg-ink text-[13px] text-silver">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-2 text-center sm:px-8">
        <Info aria-hidden className="h-3.5 w-3.5 shrink-0 text-copper-2" />
        <p>
          Fictional portfolio project — <span className="text-bone">no real bookings or payments are taken.</span>
          <span className="hidden sm:inline"> Mobile detailing across Scottsdale &amp; Phoenix, Mon–Sat.</span>
        </p>
      </div>
    </div>
  );
}
