"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { Art } from "./Art";
import { CompareSlider } from "./CompareSlider";
import { categories, comparisons, gallery, type Category } from "@/lib/gallery";

export function GalleryView() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [compareId, setCompareId] = useState(comparisons[0].id);
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const items = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);
  const compare = comparisons.find((c) => c.id === compareId) ?? comparisons[0];
  const current = index !== null ? items[index] : null;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const step = (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length));

  return (
    <>
      {/* Comparison */}
      <section className="border-b border-line py-16 sm:py-24" aria-labelledby="compare-h">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[320px_1fr] lg:gap-16">
          <div>
            <h2 id="compare-h" className="text-4xl sm:text-5xl">
              Before &amp; after
            </h2>
            <p className="mt-4 text-silver">Drag the handle or use the arrow keys to compare.</p>
            <div role="group" aria-label="Choose comparison" className="mt-8 flex flex-wrap gap-2 lg:flex-col">
              {comparisons.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={compareId === c.id}
                  onClick={() => setCompareId(c.id)}
                  className={`min-h-11 border px-5 py-2 text-left font-display text-lg uppercase tracking-wider transition-colors ${compareId === c.id ? "border-copper bg-copper text-ink" : "border-line text-silver hover:border-silver hover:text-bone"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <CompareSlider key={compare.id} kind={compare.kind} variant={compare.variant} subject={compare.subject} />
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-24" aria-labelledby="grid-h">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="grid-h" className="text-4xl sm:text-5xl">
              The collection
            </h2>
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  className={`min-h-11 border px-5 font-display text-base uppercase tracking-[0.14em] transition-colors ${filter === c.id ? "border-copper bg-copper text-ink" : "border-line text-silver hover:border-silver hover:text-bone"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-silver" role="status">
            Showing {items.length} {items.length === 1 ? "image" : "images"}
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((g, i) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group relative block w-full overflow-hidden border border-line text-left"
                  aria-label={`Open ${g.title} in lightbox. ${g.caption}`}
                >
                  <span className="block aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <Art kind={g.kind} variant={g.variant} decorative />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-ink/90 p-4">
                    <span>
                      <span className="block font-display text-xs uppercase tracking-[0.24em] text-copper-2">
                        {g.category}
                      </span>
                      <span className="block font-display text-xl uppercase tracking-wide">{g.title}</span>
                    </span>
                    <Expand aria-hidden className="h-5 w-5 shrink-0 text-silver group-hover:text-bone" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-8 border-l-2 border-copper pl-4 text-sm leading-relaxed text-silver">
            All imagery is original illustrative artwork created for this fictional portfolio project. These are not
            photographs of real vehicles or completed customer work.
          </p>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        aria-label={current ? `${current.title}, image ${(index ?? 0) + 1} of ${items.length}` : "Image lightbox"}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[100dvh] w-full max-w-5xl bg-transparent p-0 text-bone backdrop:bg-ink/95"
      >
        {current && (
          <div className="relative flex max-h-[100dvh] flex-col bg-graphite p-3 sm:p-5">
            <div className="flex items-center justify-between pb-3">
              <p className="font-display text-sm uppercase tracking-[0.2em] text-silver">
                {current.category} · {(index ?? 0) + 1}/{items.length}
              </p>
              <button
                type="button"
                autoFocus
                onClick={() => setIndex(null)}
                className="grid h-11 w-11 place-items-center hover:text-copper-2"
                aria-label="Close lightbox"
              >
                <X aria-hidden />
              </button>
            </div>
            <div className="relative min-h-0">
              <div className="mx-auto aspect-[4/3] max-h-[68dvh] bg-ink">
                <Art kind={current.kind} variant={current.variant} label={`${current.title}. ${current.caption}`} />
              </div>
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous image"
                    className="absolute left-1 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-ink/80 hover:bg-copper hover:text-ink sm:-left-6"
                  >
                    <ChevronLeft aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next image"
                    className="absolute right-1 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-ink/80 hover:bg-copper hover:text-ink sm:-right-6"
                  >
                    <ChevronRight aria-hidden />
                  </button>
                </>
              )}
            </div>
            <div className="pt-4">
              <h3 className="text-2xl sm:text-3xl">{current.title}</h3>
              <p className="mt-2 text-silver">{current.caption}</p>
              <p className="mt-2 text-xs text-silver/70">Illustrative demo artwork — not a photograph of real work.</p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
