import Link from "next/link";
import { Check, Clock } from "lucide-react";
import type { Service } from "@/lib/data";
import { money } from "@/lib/estimate";

export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  return (
    <article
      className={`relative flex h-full flex-col border bg-graphite p-7 ${service.featured ? "border-copper" : "border-line"}`}
    >
      {service.featured && (
        <span className="absolute -top-3 left-7 bg-copper px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink">
          Most balanced
        </span>
      )}
      <h3 className="text-3xl">{service.name}</h3>
      <p className="mt-3 text-silver">{service.summary}</p>
      <p className="mt-6 font-display text-5xl font-semibold text-bone">
        <span className="mr-2 text-base font-medium uppercase tracking-[0.2em] text-silver">From</span>
        {money(service.price)}
      </p>
      <p className="mt-2 flex items-center gap-2 text-sm text-silver">
        <Clock aria-hidden className="h-4 w-4 text-copper-2" />
        {service.duration}
      </p>
      <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-[15px] text-bone/90">
        {(compact ? service.inclusions.slice(0, 4) : service.inclusions).map((i) => (
          <li key={i} className="flex gap-3">
            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-sage-2" />
            {i}
          </li>
        ))}
        {compact && service.inclusions.length > 4 && <li className="pl-7 text-silver">+ {service.inclusions.length - 4} more</li>}
      </ul>
      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8 font-display text-[15px] font-semibold uppercase tracking-[0.12em]">
        <Link href={`/estimate?service=${service.id}`} className="text-copper-2 hover:text-bone">
          Build estimate
        </Link>
        <Link href={`/book?service=${service.id}`} className="text-bone hover:text-copper-2">
          Request booking
        </Link>
      </div>
    </article>
  );
}
