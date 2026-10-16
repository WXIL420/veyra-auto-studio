import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about water and power, appointment length, apartments, ceramic coatings, paint correction limits, weather, estimates, preparation, deposits and service areas.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Straight answers.">
        What to expect before, during and after an appointment.
      </PageHero>
      <section className="py-16 sm:py-24">
        <Container className="max-w-4xl">
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => (
              <details key={f.q} className="group py-1" name="faq" open={i === 0}>
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-4 font-display text-xl font-medium uppercase tracking-wide hover:text-copper-2 sm:text-2xl">
                  {f.q}
                  <Plus aria-hidden className="h-5 w-5 shrink-0 text-copper-2 transition-transform group-open:rotate-45" />
                </summary>
                <p className="max-w-3xl pb-6 leading-relaxed text-silver">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 border border-line bg-graphite p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl">Still have a question?</h2>
              <p className="mt-2 text-silver">Send a message or start an appointment request.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="secondary">Contact</ButtonLink>
              <ButtonLink href="/book" arrow>Book</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
