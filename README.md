# Veyra Auto Studio

> **Fictional portfolio project.** Veyra Auto Studio is an invented premium mobile detailing business in Scottsdale and Phoenix, Arizona. It is not a real company. The phone number, email address and imagery are placeholders or original illustrations. No bookings, payments or customer data are collected, and no information entered on the site is transmitted or stored.

**Tagline:** Precision in every reflection.

## Pages

| Route       | Purpose                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/`         | Hero, trust strip, featured packages, before/after slider, process, ceramic feature, appointment-only principles, service areas, CTA |
| `/services` | Five packages, inclusions, add-ons, vehicle-size pricing, comparison table                                                           |
| `/estimate` | Five-step estimate builder (size → package → add-ons → condition → result)                                                           |
| `/gallery`  | Category filter, before/after slider, accessible lightbox (10 original illustrations)                                                |
| `/about`    | Brand principles: precision over volume, clear recommendations, respect for every vehicle                                            |
| `/book`     | Validated appointment-request form, photo-upload preview, confirmation view                                                          |
| `/faq`      | Ten answers, native `<details>` accordions                                                                                           |
| `/contact`  | Placeholder contact details and a demo message form                                                                                  |

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS v4
- Lucide icons
- Barlow Condensed (headings) and Outfit (body) via `next/font`
- All content is local TypeScript data in `lib/`. No database, CMS, payments or external services.

## Imagery and licensing

All imagery is original SVG illustration generated in code (`components/Art.tsx`, `components/Logo.tsx`), so there are no third-party image licenses to attribute.

I looked for licensed photography to add alongside the illustrations (Wikimedia Commons categories and searches for paint correction, ceramic-coating beading, detailed interiors and wheel finishing). Nothing suitable was found: the relevant results were photos of real detailing businesses, generic car-wash snapshots or unrelated archival images, and none shared consistent lighting or treatment. Rather than mix mismatched stock photography into the design, the illustrations were kept. If photography is added later, record each image's source, author and license here and ship it locally as optimized WebP or AVIF.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run format       # Prettier
npm run lint
npm run typecheck
npm run build
npm run validate     # format:check + lint + typecheck + build
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
- Condition does not change the headline total. It adds a _possible range_ (0%, up to 10%, 20% or 30%) and extends the time estimate, because final pricing depends on the real condition of the vehicle.
- Full Paint Correction is labelled as quote-required.
- The estimate builder hands off to `/book` through URL query parameters (`service`, `size`, `addons`, `condition`). The booking page recalculates the estimate from these IDs, so it never trusts a passed-in total.

## Booking form

- Client-side validation: name, email, phone, vehicle year/make/model, vehicle type, service, date (not in the past, not Sunday), time window, consent. Errors show on blur and on submit, with an error summary and focus moved to the first invalid field.
- The address and city fields appear only for mobile service.
- Photo upload is interface-only: images are previewed using local object URLs, limited to 6 images of 10 MB each, and never uploaded.
- Submitting shows a confirmation view that explains a real appointment would still require business confirmation. Nothing is sent over the network.

## Honesty and content rules

- No invented years of experience, certifications, customer counts or real reviews.
- There are no reviews, testimonials, star ratings, awards, certifications, years-in-business claims or customer counts. The homepage presents service principles instead.
- Gallery imagery is original SVG illustration and is labelled as such.
- LocalBusiness structured data (JSON-LD) names the business "Veyra Auto Studio (Fictional Demonstration)" and states in its description that it is invented.

## Accessibility and performance

Keyboard-operable navigation (the mobile menu traps focus, closes on Esc and returns focus to its toggle), estimate steps, gallery filters, native `<dialog>` lightbox (Esc, arrow keys, focus return), range-input-based comparison slider, visible focus states, skip link, `prefers-reduced-motion` support, and mostly static prerendered pages with no client-side data fetching.

## SEO

Unique title and description per page, canonical URLs, Open Graph and Twitter metadata with a generated share image, `icon.svg` favicon, sitemap, robots and a custom 404. Structured data is a single LocalBusiness block that states it is a fictional demonstration and contains no ratings or reviews. Canonical and Open Graph URLs resolve from `VERCEL_PROJECT_PRODUCTION_URL` on Vercel and fall back to `http://localhost:3000`.

## Estimate state

The estimate builder mirrors its selections and current step into the URL query string (`service`, `size`, `addons`, `condition`, `step`) so refresh and back/forward restore the same state. Unknown values are ignored and the step is clamped to what the selections allow.

## Deployment

Deployed to Vercel as a standalone project. No environment variables are required.
