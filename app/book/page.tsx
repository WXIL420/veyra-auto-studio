import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { Container, PageHero } from "@/components/ui";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = pageMetadata({
  title: "Request an Appointment",
  description:
    "Send a mobile or studio detailing appointment request. Portfolio demonstration — information entered is not transmitted or stored.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageHero eyebrow="Book" title="Request an appointment.">
        Tell us about your vehicle and when suits you. This is a demonstration form, so nothing is sent.
      </PageHero>
      <section className="py-14 sm:py-20">
        <Container>
          <Suspense fallback={<p className="text-silver">Loading booking form…</p>}>
            <BookingForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
