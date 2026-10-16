import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Outfit } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Veyra Auto Studio — Premium Mobile Detailing, Scottsdale & Phoenix",
    template: "%s | Veyra Auto Studio",
  },
  description:
    "Premium mobile automotive detailing in Scottsdale and Phoenix, Arizona. Build an instant estimate and request an appointment. A fictional portfolio demonstration.",
  applicationName: site.name,
  keywords: ["mobile detailing Scottsdale", "ceramic coating Phoenix", "paint correction Arizona", "car detailing"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Veyra Auto Studio — Precision in every reflection.",
    description:
      "Premium mobile detailing in Scottsdale and Phoenix. Fictional portfolio demonstration — no real bookings.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veyra Auto Studio — Precision in every reflection.",
    description: "A fictional premium mobile detailing brand. Portfolio demonstration.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0D0F10",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Veyra Auto Studio (Fictional Demonstration)",
  alternateName: "Veyra Auto Studio",
  description:
    "FICTIONAL DEMONSTRATION: Veyra Auto Studio is an invented business created for a personal portfolio project. It is not a real company and takes no real bookings.",
  slogan: site.tagline,
  telephone: "+1-480-555-0148",
  email: site.email,
  priceRange: "$$$",
  address: { "@type": "PostalAddress", addressLocality: "Scottsdale", addressRegion: "AZ", addressCountry: "US" },
  areaServed: site.areas.map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${outfit.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AnnouncementBar />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
