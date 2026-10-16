export type ServiceId = "essential" | "signature" | "enhancement" | "ceramic" | "correction";

export type Service = {
  id: ServiceId;
  name: string;
  price: number;
  duration: string;
  /** Hour range used by the duration estimate. Null = scheduled individually. */
  hours: [number, number] | null;
  quote?: boolean;
  bestFor: string;
  summary: string;
  inclusions: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "essential",
    name: "Essential Detail",
    price: 179,
    duration: "Approximately 2 hours",
    hours: [2, 2],
    bestFor: "A well-kept daily driver that needs a reliable reset between larger services.",
    summary: "A careful hand wash and a clean cabin, done properly.",
    inclusions: [
      "Hand wash and dry",
      "Wheels and tires",
      "Interior vacuum",
      "Surface cleaning",
      "Interior and exterior glass",
      "Tire dressing",
    ],
  },
  {
    id: "signature",
    name: "Signature Detail",
    price: 299,
    duration: "Approximately 3–4 hours",
    hours: [3, 4],
    bestFor: "Vehicles that see regular use and need a deeper clean inside and a smoother, protected finish outside.",
    summary: "Our most balanced service for inside and out.",
    featured: true,
    inclusions: [
      "Everything in Essential",
      "Light paint decontamination",
      "Spray sealant",
      "Thorough interior cleaning",
      "Leather cleaning and conditioning",
      "Door jambs",
      "Trunk vacuum",
    ],
  },
  {
    id: "enhancement",
    name: "Paint Enhancement",
    price: 449,
    duration: "Approximately 5–6 hours",
    hours: [5, 6],
    bestFor: "Dull or lightly swirled paint on a vehicle you want to look noticeably sharper.",
    summary: "A single-stage polish that brings back depth and clarity.",
    inclusions: [
      "Exterior preparation",
      "Clay-bar treatment",
      "Machine polish",
      "Light swirl reduction",
      "Paint sealant",
      "Trim restoration",
    ],
  },
  {
    id: "ceramic",
    name: "Ceramic Protection",
    price: 799,
    duration: "Starting at one day",
    hours: null,
    bestFor: "Owners who want long-term gloss, easier washing and protection against Arizona sun and dust.",
    summary: "Prepared paint, sealed under a ceramic coating.",
    inclusions: [
      "Exterior preparation",
      "Paint decontamination",
      "Single-stage correction",
      "Ceramic coating",
      "Wheel-face coating",
      "Glass treatment",
    ],
  },
  {
    id: "correction",
    name: "Full Paint Correction",
    price: 1299,
    duration: "Quote required",
    hours: null,
    quote: true,
    bestFor: "Enthusiast and show vehicles, or paint with heavier defects that need a multi-stage approach.",
    summary: "Inspection-led correction finished with a ceramic coating.",
    inclusions: [
      "Multi-stage correction",
      "Defect reduction",
      "Paint inspection",
      "Ceramic coating",
      "Wheel-face coating",
      "Glass treatment",
      "Final indoor inspection",
    ],
  },
];

export const getService = (id: string | null | undefined) => services.find((s) => s.id === id);

export type VehicleSize = {
  id: "coupe-sedan" | "compact-suv" | "large-suv" | "oversized";
  label: string;
  examples: string;
  adjustment: number;
};

export const vehicleSizes: VehicleSize[] = [
  {
    id: "coupe-sedan",
    label: "Coupe / sedan",
    examples: "Two- and four-door cars, hatchbacks, sports cars",
    adjustment: 0,
  },
  {
    id: "compact-suv",
    label: "Compact SUV",
    examples: "Compact crossovers and small SUVs",
    adjustment: 40,
  },
  {
    id: "large-suv",
    label: "Large SUV / truck",
    examples: "Full-size SUVs, crew-cab and half-ton trucks",
    adjustment: 80,
  },
  {
    id: "oversized",
    label: "Oversized / three-row",
    examples: "Three-row SUVs, vans, long-bed and heavy-duty trucks",
    adjustment: 120,
  },
];

export const getSize = (id: string | null | undefined) => vehicleSizes.find((s) => s.id === id);

export type Addon = { id: string; name: string; price: number; minutes: number; note: string };

export const addons: Addon[] = [
  {
    id: "pet-hair",
    name: "Pet-hair removal",
    price: 45,
    minutes: 30,
    note: "Embedded hair lifted from carpet and seating.",
  },
  {
    id: "engine-bay",
    name: "Engine-bay detail",
    price: 60,
    minutes: 30,
    note: "Careful degrease, dress and wipe-down.",
  },
  { id: "headlight", name: "Headlight restoration", price: 90, minutes: 45, note: "Clears yellowed or hazy lenses." },
  { id: "odor", name: "Odor treatment", price: 75, minutes: 45, note: "Targeted treatment for lingering smells." },
  {
    id: "windshield",
    name: "Windshield coating",
    price: 65,
    minutes: 15,
    note: "Hydrophobic coat for better rain visibility.",
  },
  {
    id: "wheel-ceramic",
    name: "Wheel ceramic coating",
    price: 125,
    minutes: 60,
    note: "Easier brake-dust cleanup on all four wheels.",
  },
];

export type Condition = {
  id: "maintained" | "lived-in" | "heavy" | "recovery";
  label: string;
  description: string;
  /** Maximum possible uplift once the vehicle is inspected. */
  maxUplift: number;
  timeFactor: number;
};

export const conditions: Condition[] = [
  {
    id: "maintained",
    label: "Well maintained",
    description: "Washed regularly, interior kept tidy, no major marks.",
    maxUplift: 0,
    timeFactor: 1,
  },
  {
    id: "lived-in",
    label: "Lived in",
    description: "Everyday dirt, light dust, a few spills or light swirling.",
    maxUplift: 0.1,
    timeFactor: 1.1,
  },
  {
    id: "heavy",
    label: "Heavily soiled",
    description: "Heavy buildup, stains, pet hair, or road film and bugs.",
    maxUplift: 0.2,
    timeFactor: 1.25,
  },
  {
    id: "recovery",
    label: "Needs recovery",
    description: "Long neglected, heavy contamination, or visible paint damage.",
    maxUplift: 0.3,
    timeFactor: 1.4,
  },
];

export const getCondition = (id: string | null | undefined) => conditions.find((c) => c.id === id);

export const timeWindows = [
  "Morning (7:00–10:00 AM)",
  "Midday (10:00 AM–1:00 PM)",
  "Afternoon (1:00–4:00 PM)",
  "Late afternoon (4:00–6:00 PM)",
] as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What water and power do you need for mobile service?",
    a: "For mobile appointments we work from an outdoor water spigot and a standard household outlet within reach of the vehicle. If either is unavailable, note it in your request and we would plan an alternative, such as a waterless wash method or a studio appointment, before confirming.",
  },
  {
    q: "How long does an appointment take?",
    a: "Essential takes about 2 hours, Signature 3–4 hours and Paint Enhancement 5–6 hours. Ceramic Protection starts at one full day and Full Paint Correction is scheduled after a quote. Add-ons and heavier vehicle condition can extend these times, and the estimate builder reflects that.",
  },
  {
    q: "Can you work at an apartment or condo?",
    a: "Often, yes. We need permission to work on site, a shaded or covered space is ideal, and water and power must be reachable. Many communities restrict washing in common areas, so check with your property manager. Studio service is the simple alternative.",
  },
  {
    q: "What does a ceramic coating actually do?",
    a: "A ceramic coating is a thin, hard protective layer bonded to prepared paint. It adds gloss, repels water and dirt, and makes washing easier. It is not scratch-proof or maintenance-free, and it still needs regular, gentle washing. Coating work is done on paint that has been properly decontaminated and corrected first.",
  },
  {
    q: "What are the limits of paint correction?",
    a: "Correction removes a thin amount of clear coat to level defects, so there is a limit to what is safe. Deep scratches that catch a fingernail, rock chips, and clear-coat failure may be reduced but not erased. We measure and inspect before committing, and we recommend honestly when a defect is better left alone.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "Arizona heat, wind and the occasional monsoon storm affect outdoor work. Coatings and polishing need shade and controlled conditions, so we may suggest a covered location, an earlier start time, or a studio appointment. If we need to reschedule for weather, we would do so with notice rather than compromise the result.",
  },
  {
    q: "How accurate is the online estimate?",
    a: "The estimate builder gives a realistic starting figure based on your package, vehicle size and add-ons. Final pricing depends on the real condition of the vehicle, so we show a possible range. Full Paint Correction always requires a quote after inspection.",
  },
  {
    q: "How should I prepare for my appointment?",
    a: "Remove personal items, loose change and child seats, and let us know about any existing damage or special concerns. Make sure the vehicle is accessible, with water and power in reach for mobile visits. Please leave valuables out of the vehicle.",
  },
  {
    q: "Do you require a deposit?",
    a: "For larger services such as ceramic coating or paint correction, a deposit would typically be requested when an appointment is confirmed, to hold the date. This portfolio demonstration does not collect any payment or deposit.",
  },
  {
    q: "Which areas do you serve?",
    a: "Mobile service covers Scottsdale, Paradise Valley, Phoenix, Tempe and Fountain Hills. Appointment-only studio service is also available. If you are just outside these areas, include your location in your request and we would let you know what is possible.",
  },
];

export const steps = [
  {
    title: "Build an estimate",
    text: "Choose your vehicle size, package and add-ons. The calculator shows pricing and timing instantly.",
  },
  {
    title: "Request a time",
    text: "Send a preferred date, time window and location. Mobile or studio, whichever suits you.",
  },
  {
    title: "Confirm the scope",
    text: "We review your vehicle notes and photos, then confirm the scope, price and appointment.",
  },
  {
    title: "We arrive, equipped",
    text: "Our mobile setup arrives with the tools and products. Water and power access is all we ask for.",
  },
  {
    title: "Walk-around inspection",
    text: "We go over the finished vehicle with you, then explain how to keep it looking that way.",
  },
];
