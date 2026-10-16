import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ReceiptText,
  ShieldCheck,
  Droplets,
  Sun,
  Sparkles,
  FileText,
  Gauge,
  Hourglass,
} from "lucide-react";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { HeroCar, Art } from "@/components/Art";
import { ServiceCard } from "@/components/ServiceCard";
import { CompareSlider } from "@/components/CompareSlider";
import { services, steps } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    url: "/",
    type: "website",
    siteName: "Veyra Auto Studio",
    title: "Veyra Auto Studio — Precision in every reflection.",
    description:
      "Premium mobile detailing in Scottsdale and Phoenix. Fictional portfolio demonstration — no real bookings.",
  },
};

const trust = [
  { icon: MapPin, title: "Mobile service", text: "Five Phoenix-area cities" },
  { icon: Calendar, title: "Appointment only", text: "Mon–Sat, 7 AM–6 PM" },
  { icon: ReceiptText, title: "Clear estimates", text: "Itemized before you book" },
  { icon: ShieldCheck, title: "Honest scope", text: "Condition-based pricing" },
];

const principles = [
  {
    icon: FileText,
    title: "Written scope",
    text: "Every appointment begins with a clear description of the work, starting price and expected time.",
  },
  {
    icon: Gauge,
    title: "Condition-based pricing",
    text: "Vehicle size and condition affect the final scope. Recommendations are explained before additional work begins.",
  },
  {
    icon: Hourglass,
    title: "Time reserved for the vehicle",
    text: "Appointments are scheduled with enough time to complete the selected service properly instead of rushing vehicles through a queue.",
  },
];

export default function Home() {
  const featured = services.filter((s) => ["signature", "enhancement", "ceramic"].includes(s.id));
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line bg-ink">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_85%,rgba(200,115,67,0.14),transparent)]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-[14%] -z-10 h-px bg-line" />
        <Container className="pt-12 sm:pt-16 lg:pt-14">
          <div className="max-w-5xl">
            <Eyebrow className="rise">Scottsdale mobile detailing</Eyebrow>
            <h1 className="rise rise-2 mt-6 text-[clamp(3rem,7.4vw,6.25rem)] leading-[0.95]">
              A deeper finish.
              <br />
              <span className="text-copper-2">A cleaner standard.</span>
            </h1>
            <p className="rise rise-3 mt-7 max-w-xl text-lg leading-relaxed text-silver sm:text-xl">
              Precision detailing, paint correction and ceramic protection, brought to your driveway across Scottsdale
              and Phoenix.
            </p>
            <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/estimate" arrow>
                Build your estimate
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore services
              </ButtonLink>
            </div>
          </div>
          <div className="relative mt-8 sm:mt-0 lg:-mt-20">
            <div className="ml-auto aspect-[940/300] w-full lg:w-[88%]">
              <HeroCar />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust strip */}
      <section aria-label="Why Veyra" className="border-b border-line bg-graphite">
        <Container>
          <ul className="grid grid-cols-2 divide-x divide-line lg:grid-cols-4">
            {trust.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex flex-col gap-3 px-4 py-7 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
                <Icon aria-hidden className="h-7 w-7 shrink-0 text-copper-2" strokeWidth={1.5} />
                <div>
                  <p className="font-display text-lg font-semibold uppercase tracking-wider">{title}</p>
                  <p className="text-sm text-silver">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Featured packages */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Featured packages" title="Detailing, scoped to the vehicle.">
              Every package starts with a clear list of what is included and a transparent starting price.
            </SectionHeading>
            <ButtonLink href="/services" variant="secondary" arrow className="self-start">
              All five services
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featured.map((s) => (
              <ServiceCard key={s.id} service={s} compact />
            ))}
          </div>
        </Container>
      </section>

      {/* Before and after */}
      <section className="border-y border-line bg-graphite py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Before &amp; after" title="See the difference a correction makes.">
              Drag the handle, or use your arrow keys, to compare a neglected finish with a corrected one.
            </SectionHeading>
            <p className="mt-6 border-l-2 border-copper pl-4 text-sm leading-relaxed text-silver">
              Illustrative demo artwork created for this portfolio project — not photographs of completed customer work.
            </p>
            <div className="mt-8">
              <ButtonLink href="/gallery" variant="secondary" arrow>
                Open the gallery
              </ButtonLink>
            </div>
          </div>
          <CompareSlider kind="hood" variant={0} subject="hood panel paint correction" />
        </Container>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="How mobile service works" title="Five steps, no rushing.">
            From the first estimate to the final walk-around, you know what is happening and why.
          </SectionHeading>
          <ol className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5 [&>li]:bg-ink">
            {steps.map((s, i) => (
              <li key={s.title} className="p-7">
                <span className="font-display text-5xl font-semibold text-copper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-silver">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Ceramic feature */}
      <section className="border-y border-line bg-graphite">
        <Container className="grid items-stretch gap-0 lg:grid-cols-2">
          <div className="relative aspect-[4/3] border-line lg:aspect-auto lg:min-h-[520px] lg:border-r">
            <Art kind="beads" state="after" variant={1} label="Illustration: water beading on ceramic-coated paint" />
          </div>
          <div className="flex flex-col justify-center py-12 lg:py-16 lg:pl-16">
            <SectionHeading eyebrow="Ceramic protection" title="Built for the Arizona sun.">
              A ceramic coating bonds to prepared paint to add gloss, shed water and dust, and make every wash easier.
            </SectionHeading>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                { icon: Sun, t: "Heat-ready", d: "Prepared and applied with Arizona conditions in mind." },
                { icon: Droplets, t: "Easier washing", d: "Water and dirt release more readily." },
                { icon: Sparkles, t: "Prepared first", d: "Decontamination and correction come before coating." },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t}>
                  <Icon aria-hidden className="h-6 w-6 text-copper-2" strokeWidth={1.5} />
                  <p className="mt-3 font-display text-lg font-semibold uppercase tracking-wider">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-silver">{d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-silver">
              Ceramic Protection starts at $799 and takes a day or more. Coatings reduce maintenance but are not
              scratch-proof.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/estimate?service=ceramic" arrow>
                Estimate ceramic
              </ButtonLink>
              <ButtonLink href="/faq" variant="secondary">
                Read the FAQ
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="The Veyra standard" title="Why owners choose appointment-only care." />
          <ul className="mt-12 grid gap-px bg-line lg:grid-cols-3 [&>li]:bg-ink">
            {principles.map(({ icon: Icon, title, text }) => (
              <li key={title} className="p-8 sm:p-10">
                <Icon aria-hidden className="h-8 w-8 text-copper-2" strokeWidth={1.4} />
                <h3 className="mt-6 text-3xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-silver">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Service areas */}
      <section className="border-y border-line bg-graphite py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <SectionHeading eyebrow="Service areas" title="Scottsdale, Phoenix and nearby.">
            Mobile service covers five Valley cities. Studio service is available by appointment.
          </SectionHeading>
          <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 [&>li]:bg-graphite">
            {site.areas.map((a) => (
              <li key={a} className="flex items-center gap-3 p-6">
                <MapPin aria-hidden className="h-5 w-5 shrink-0 text-copper-2" strokeWidth={1.5} />
                <span className="font-display text-xl font-medium uppercase tracking-wide">{a}</span>
              </li>
            ))}
            <li className="flex items-center gap-3 p-6">
              <Clock aria-hidden className="h-5 w-5 shrink-0 text-copper-2" strokeWidth={1.5} />
              <span className="text-sm text-silver">Mon–Sat, 7 AM–6 PM</span>
            </li>
          </ul>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28">
        <Container className="text-center">
          <Eyebrow className="justify-center">Ready when you are</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-8xl">Precision in every reflection.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-silver">
            Build an estimate in under a minute, then send an appointment request. This demo never transmits what you
            enter.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/book" arrow>
              Request an appointment
            </ButtonLink>
            <ButtonLink href="/estimate" variant="secondary">
              Build an estimate
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-silver">
            Or{" "}
            <Link className="underline underline-offset-4 hover:text-bone" href="/contact">
              view contact details
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
