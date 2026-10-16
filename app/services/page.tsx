import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Check, Minus, Clock, Target } from "lucide-react";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { addons, services, vehicleSizes } from "@/lib/data";
import { money } from "@/lib/estimate";

export const metadata: Metadata = pageMetadata({
  title: "Detailing Services & Pricing",
  description:
    "Five detailing packages from $179: Essential, Signature, Paint Enhancement, Ceramic Protection and Full Paint Correction, with add-ons and vehicle-size pricing.",
  path: "/services",
});

type Cell = boolean | string;
const rows: { label: string; v: Cell[] }[] = [
  { label: "Starting price", v: services.map((s) => `From ${money(s.price)}`) },
  { label: "Appointment time", v: ["≈ 2 hrs", "≈ 3–4 hrs", "≈ 5–6 hrs", "From one day", "Quote required"] },
  { label: "Hand wash, wheels and tires", v: [true, true, false, false, false] },
  { label: "Interior and exterior glass", v: [true, true, false, "Glass treatment", "Glass treatment"] },
  { label: "Interior cleaning", v: ["Vacuum and surfaces", "Thorough", false, false, false] },
  { label: "Leather cleaning and conditioning", v: [false, true, false, false, false] },
  { label: "Door jambs and trunk vacuum", v: [false, true, false, false, false] },
  { label: "Paint decontamination", v: [false, "Light", "Clay-bar", true, false] },
  { label: "Paint correction", v: [false, false, "Light swirl reduction", "Single-stage", "Multi-stage"] },
  { label: "Paint protection", v: [false, "Spray sealant", "Paint sealant", "Ceramic coating", "Ceramic coating"] },
  { label: "Wheel-face coating", v: [false, false, false, true, true] },
  { label: "Trim restoration", v: [false, false, true, false, false] },
  { label: "Paint inspection and final indoor inspection", v: [false, false, false, false, true] },
];

function CellView({ value }: { value: Cell }) {
  if (value === true)
    return (
      <>
        <Check aria-hidden className="mx-auto h-5 w-5 text-sage-2" />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <Minus aria-hidden className="mx-auto h-4 w-4 text-line" />
        <span className="sr-only">Not listed</span>
      </>
    );
  return <span className="text-bone">{value}</span>;
}

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Five levels of care, priced openly.">
        Every package lists exactly what is included. Starting prices apply to a coupe or sedan in good condition;
        vehicle size, add-ons and condition are shown in the estimate builder.
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="space-y-6">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className={`grid scroll-mt-28 gap-10 border bg-graphite p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr_auto] lg:gap-14 ${s.featured ? "border-copper" : "border-line"}`}
            >
              <div>
                <p className="font-display text-sm tracking-[0.3em] text-copper-2">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-4xl sm:text-5xl">{s.name}</h2>
                <p className="mt-4 font-display text-5xl font-semibold">
                  <span className="mr-2 text-base font-medium uppercase tracking-[0.2em] text-silver">From</span>
                  {money(s.price)}
                </p>
                <p className="mt-3 flex items-center gap-2 text-silver">
                  <Clock aria-hidden className="h-4 w-4 text-copper-2" />
                  {s.duration}
                </p>
                <div className="mt-6 border-t border-line pt-6">
                  <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-bone">
                    <Target aria-hidden className="h-4 w-4 text-copper-2" /> Best use case
                  </p>
                  <p className="mt-2 leading-relaxed text-silver">{s.bestFor}</p>
                </div>
              </div>
              <div>
                <h3 className="font-display text-sm tracking-[0.2em] text-bone">What&rsquo;s included</h3>
                <ul className="mt-4 space-y-3">
                  {s.inclusions.map((inc) => (
                    <li key={inc} className="flex gap-3">
                      <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sage-2" />
                      {inc}
                    </li>
                  ))}
                </ul>
                {s.quote && (
                  <p className="mt-5 text-sm text-silver">
                    Pricing is confirmed by written quote after a paint inspection.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3 lg:justify-end">
                <ButtonLink href={`/book?service=${s.id}`} arrow>
                  Book {s.name.split(" ")[0]}
                </ButtonLink>
                <ButtonLink href={`/estimate?service=${s.id}`} variant="secondary">
                  Build estimate
                </ButtonLink>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="border-y border-line bg-graphite py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Compare" title="Which service fits?" />
          <div
            className="relative mt-12 overflow-x-auto border border-line"
            tabIndex={0}
            role="region"
            aria-label="Service comparison table, scrolls horizontally on small screens"
          >
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <caption className="sr-only">Comparison of the five Veyra Auto Studio detailing services</caption>
              <thead>
                <tr className="border-b border-line bg-ink">
                  <th
                    scope="col"
                    className="sticky left-0 bg-ink p-4 font-display text-sm uppercase tracking-[0.2em] text-silver"
                  >
                    Feature
                  </th>
                  {services.map((s) => (
                    <th
                      key={s.id}
                      scope="col"
                      className="p-4 text-center font-display text-lg uppercase tracking-wide text-bone"
                    >
                      {s.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-line last:border-0">
                    <th scope="row" className="sticky left-0 bg-graphite p-4 font-normal text-silver">
                      {r.label}
                    </th>
                    {r.v.map((c, i) => (
                      <td key={i} className="p-4 text-center text-silver">
                        <CellView value={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-silver">
            The table summarizes each package&rsquo;s listed inclusions. A dash means the item is not listed for that
            package.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Add-ons" title="Tailor the visit." />
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {addons.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-6 py-5">
                  <div>
                    <p className="font-display text-xl font-semibold uppercase tracking-wide">{a.name}</p>
                    <p className="mt-1 text-sm text-silver">{a.note}</p>
                  </div>
                  <p className="font-display text-2xl font-semibold text-copper-2">+{money(a.price)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Vehicle size" title="Larger vehicles, more time." />
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {vehicleSizes.map((v) => (
                <li key={v.id} className="flex items-start justify-between gap-6 py-5">
                  <div>
                    <p className="font-display text-xl font-semibold uppercase tracking-wide">{v.label}</p>
                    <p className="mt-1 text-sm text-silver">{v.examples}</p>
                  </div>
                  <p className="font-display text-2xl font-semibold text-copper-2">
                    {v.adjustment ? `+${money(v.adjustment)}` : "$0"}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-silver">
              Final pricing depends on vehicle condition. Heavily soiled interiors and damaged paint can add time.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-graphite py-20 text-center">
        <Container>
          <h2 className="text-4xl sm:text-5xl">Not sure which service?</h2>
          <p className="mx-auto mt-4 max-w-lg text-silver">
            Build an estimate, or describe your vehicle in an appointment request.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/estimate" arrow>
              Build an estimate
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary">
              Request an appointment
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
