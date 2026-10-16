import type { Metadata } from "next";
import { Crosshair, MessageSquareText, HeartHandshake } from "lucide-react";
import { ButtonLink, Container, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { Art } from "@/components/Art";

export const metadata: Metadata = {
  title: "About",
  description:
    "Veyra Auto Studio is a fictional premium mobile detailing brand built around precision over volume, clear recommendations and respect for every vehicle.",
};

const principles = [
  {
    icon: Crosshair,
    title: "Precision over volume",
    text: "A small number of vehicles, each given the time it needs. We would rather book fewer appointments than rush the ones we take.",
  },
  {
    icon: MessageSquareText,
    title: "Clear recommendations",
    text: "We explain what your vehicle needs and what it does not. If a lighter service will serve you better, we say so, and if a defect is better left alone, we say that too.",
  },
  {
    icon: HeartHandshake,
    title: "Respect for every vehicle",
    text: "A well-kept daily driver gets the same care and attention as a weekend performance car. Every vehicle is someone's pride, and we treat it that way.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Veyra" title="Detailing without the rushed-shop experience.">
        Veyra Auto Studio is a premium mobile detailing brand for Scottsdale and Phoenix, built around doing fewer things properly.
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-px bg-line md:grid-cols-3 [&>div]:bg-ink">
          {principles.map(({ icon: Icon, title, text }) => (
            <div key={title} className="p-8 sm:p-10">
              <Icon aria-hidden className="h-9 w-9 text-copper-2" strokeWidth={1.4} />
              <h2 className="mt-8 text-3xl">{title}</h2>
              <p className="mt-4 leading-relaxed text-silver">{text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-y border-line bg-graphite py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="aspect-[4/3] overflow-hidden border border-line">
            <Art kind="hood" variant={1} label="Illustration: a hood panel reflecting overhead light" />
          </div>
          <div>
            <SectionHeading eyebrow="The approach" title="Slower on purpose.">
              Good detailing is mostly preparation and patience. Every service begins with an inspection, a clear scope and a conversation about what you want the vehicle to look like.
            </SectionHeading>
            <ul className="mt-8 space-y-4 text-silver">
              <li><span className="text-bone">Inspect first.</span> We look at the paint, glass and interior before recommending anything.</li>
              <li><span className="text-bone">Explain the scope.</span> You see what is included, how long it takes and what it costs, in writing.</li>
              <li><span className="text-bone">Work carefully.</span> Gentle methods first, stronger ones only when the vehicle truly needs them.</li>
              <li><span className="text-bone">Walk through it.</span> We review the finished vehicle together and explain how to maintain it.</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          <Eyebrow>About this project</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl">A fictional business, built as a portfolio piece.</h2>
          <p className="mt-5 leading-relaxed text-silver">
            Veyra Auto Studio is not a real company. This website is a personal portfolio project that shows how a premium service business could present its services, pricing and booking flow. The contact details are placeholders, the reviews are sample content, and the imagery is original illustration. No appointments, payments or customer information are collected.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services" arrow>See the services</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Contact details</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
