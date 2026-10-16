import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero, ButtonLink, Container } from "@/components/ui";
import { GalleryView } from "@/components/GalleryView";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Explore exterior, interior, correction and coating illustrations with an interactive before-and-after slider. Original demo artwork for a fictional portfolio project.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="The details, up close.">
        Filter by category, open any image full screen and drag the slider to compare. Original illustrative artwork for
        this portfolio project.
      </PageHero>
      <GalleryView />
      <section className="border-t border-line bg-graphite py-20 text-center">
        <Container>
          <h2 className="text-4xl sm:text-5xl">Want a finish like this?</h2>
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
