import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-silver">{site.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver/80">
            Premium mobile automotive detailing in Scottsdale and Phoenix, Arizona.
          </p>
        </div>
        <nav aria-label="Footer pages">
          <h2 className="font-display text-sm tracking-[0.24em] text-bone">Explore</h2>
          <ul className="mt-5 space-y-3 text-silver">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/book", label: "Book" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer services">
          <h2 className="font-display text-sm tracking-[0.24em] text-bone">Services</h2>
          <ul className="mt-5 space-y-3 text-silver">
            {services.map((s) => (
              <li key={s.id}>
                <Link href="/services" className="hover:text-bone">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-sm tracking-[0.24em] text-bone">Studio details</h2>
          <ul className="mt-5 space-y-3 text-silver">
            <li className="flex gap-3"><Phone aria-hidden className="mt-1 h-4 w-4 shrink-0 text-copper-2" /><a href={site.phoneHref} className="hover:text-bone">{site.phone}</a></li>
            <li className="flex gap-3"><Mail aria-hidden className="mt-1 h-4 w-4 shrink-0 text-copper-2" /><a href={`mailto:${site.email}`} className="break-all hover:text-bone">{site.email}</a></li>
            <li className="flex gap-3"><Clock aria-hidden className="mt-1 h-4 w-4 shrink-0 text-copper-2" />{site.hours}</li>
            <li className="flex gap-3"><MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-copper-2" />{site.areas.join(", ")}</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-sm text-silver/80 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Veyra Auto Studio — a fictional portfolio project.</p>
          <p>Phone, email and address details are placeholders. No real bookings, payments or reviews.</p>
        </Container>
      </div>
    </footer>
  );
}
