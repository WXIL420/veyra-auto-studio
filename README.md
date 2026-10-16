# Veyra Auto Studio

> **Fictional portfolio project.** Veyra Auto Studio is an invented premium mobile detailing business in Scottsdale and Phoenix, Arizona. It is not a real company. The phone number, email address, reviews and imagery are placeholders or original illustrations. No bookings, payments or customer data are collected, and no information entered on the site is transmitted or stored.

**Tagline:** Precision in every reflection.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, trust strip, featured packages, before/after slider, process, ceramic feature, sample reviews, service areas, CTA |
| `/services` | Five packages, inclusions, add-ons, vehicle-size pricing, comparison table |
| `/estimate` | Five-step estimate builder (size → package → add-ons → condition → result) |
| `/gallery` | Category filter, before/after slider, accessible lightbox (10 original illustrations) |
| `/about` | Brand principles: precision over volume, clear recommendations, respect for every vehicle |
| `/book` | Validated appointment-request form, photo-upload preview, confirmation view |
| `/faq` | Ten answers, native `<details>` accordions |
| `/contact` | Placeholder contact details and a demo message form |

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS v4
- Lucide icons
- Barlow Condensed (headings) and Outfit (body) via `next/font`
- All content is local TypeScript data in `lib/`. No database, CMS, payments or external services.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm start
```

## Project structure

```
app/            Routes, metadata, favicon (icon.svg), Open Graph image, sitemap, robots
components/     UI, Logo (SVG emblem and wordmark), Art (SVG illustrations), forms, gallery
lib/data.ts     Services, vehicle sizes, add-ons, conditions, FAQs, sample reviews
lib/estimate.ts Pure pricing and duration calculator
lib/gallery.ts  Gallery items and comparison pairs
public/         Standalone SVG emblem and wordmark
```

## How the estimate works

`estimate = package starting price + vehicle adjustment + selected add-ons`

- Vehicle adjustments: coupe/sedan $0, compact SUV $40, large SUV/truck $80, oversized/three-row $120.
- Condition does not change the headline total. It adds a *possible range* (0%, up to 10%, 20% or 30%) and extends the time estimate, because final pricing depends on the real condition of the vehicle.
- Full Paint Correction is labelled as quote-required.
- The estimate builder hands off to `/book` through URL query parameters (`service`, `size`, `addons`, `condition`). The booking page recalculates the estimate from these IDs, so it never trusts a passed-in total.

## Booking form

- Client-side validation: name, email, phone, vehicle year/make/model, vehicle type, service, date (not in the past, not Sunday), time window, consent. Errors show on blur and on submit, with an error summary and focus moved to the first invalid field.
- The address and city fields appear only for mobile service.
- Photo upload is interface-only: images are previewed using local object URLs, limited to 6 images of 10 MB each, and never uploaded.
- Submitting shows a confirmation view that explains a real appointment would still require business confirmation. Nothing is sent over the network.

## Honesty and content rules

- No invented years of experience, certifications, customer counts or real reviews.
- Reviews are labelled "Sample content".
- Gallery imagery is original SVG illustration and is labelled as such.
- LocalBusiness structured data (JSON-LD) names the business "Veyra Auto Studio (Fictional Demonstration)" and states in its description that it is invented.

## Accessibility and performance

Keyboard-operable navigation, estimate steps, gallery filters, native `<dialog>` lightbox (Esc, arrow keys, focus return), range-input-based comparison slider, visible focus states, skip link, `prefers-reduced-motion` support, and mostly static prerendered pages with no client-side data fetching.

## Deployment

Deployed to Vercel as a standalone project. No environment variables are required.
