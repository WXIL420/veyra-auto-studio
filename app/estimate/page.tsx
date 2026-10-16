import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { Container, PageHero } from "@/components/ui";
import { EstimateBuilder } from "@/components/EstimateBuilder";

export const metadata: Metadata = pageMetadata({
  title: "Instant Detailing Estimate",
  description:
    "Build an instant estimate for your vehicle: choose size, service package, add-ons and condition, then continue to an appointment request.",
  path: "/estimate",
});

export default function EstimatePage() {
  return (
    <>
      <PageHero eyebrow="Estimate builder" title="Build your estimate.">
        Five quick steps. Pricing and timing update as you choose, and nothing is sent anywhere.
      </PageHero>
      <section className="py-14 sm:py-20">
        <Container>
          <Suspense fallback={<p className="text-silver">Loading estimate builder…</p>}>
            <EstimateBuilder />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
