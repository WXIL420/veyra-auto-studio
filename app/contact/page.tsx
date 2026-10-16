import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Clock, Mail, MapPin, Phone, Truck } from "lucide-react";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact details, hours and service areas for Veyra Auto Studio, a fictional mobile detailing business serving Scottsdale and Phoenix.",
  path: "/contact",
});

export default function ContactPage() {
  const details = [
    { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: "Hours", value: site.hours },
    { icon: MapPin, label: "Service area", value: site.areas.join(", ") },
    { icon: Truck, label: "Service type", value: "Mobile service and appointment-only studio service" },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to the studio.">
        Questions about a service, your vehicle or scheduling. Contact details below are placeholders for this fictional
        demo.
      </PageHero>
      <section className="py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-5 py-6">
                  <Icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-copper-2" strokeWidth={1.6} />
                  <div className="min-w-0">
                    <p className="font-display text-sm uppercase tracking-[0.24em] text-silver">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 inline-flex min-h-11 items-center break-words text-xl hover:text-copper-2"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-xl">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 border border-line bg-graphite p-7">
              <h2 className="text-2xl">Ready to schedule?</h2>
              <p className="mt-2 text-silver">
                Skip the message and send an appointment request with your preferred date.
              </p>
              <div className="mt-5">
                <ButtonLink href="/book" arrow>
                  Request an appointment
                </ButtonLink>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-4xl">Send a message</h2>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
