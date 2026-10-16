export const site = {
  name: "Veyra Auto Studio",
  tagline: "Precision in every reflection.",
  phone: "(480) 555-0148",
  phoneHref: "tel:+14805550148",
  email: "book@veyraauto.example",
  hours: "Monday–Saturday, 7:00 AM–6:00 PM",
  areas: ["Scottsdale", "Paradise Valley", "Phoenix", "Tempe", "Fountain Hills"],
  demoNotice: "Portfolio demonstration — information entered here is not transmitted or stored.",
  description:
    "Veyra Auto Studio is a fictional premium mobile detailing company in Scottsdale and Phoenix, Arizona, created as a personal portfolio project.",
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/estimate", label: "Estimate" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
