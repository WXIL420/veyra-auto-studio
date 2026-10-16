import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-copper-2">Error 404</p>
      <h1 className="mt-4 text-6xl">Off the road.</h1>
      <p className="mx-auto mt-6 max-w-md text-silver">That page does not exist. Head back to the studio.</p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
