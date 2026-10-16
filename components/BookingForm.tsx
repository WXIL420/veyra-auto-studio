"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AlertCircle, CalendarCheck, CheckCircle2, ChevronDown, ImagePlus, Info, X } from "lucide-react";
import { addons, getCondition, getService, getSize, services, timeWindows, vehicleSizes } from "@/lib/data";
import { calculate, money } from "@/lib/estimate";
import { site } from "@/lib/site";
import { buttonStyles } from "./ui";

type Photo = { id: string; name: string; size: number; url: string };

type Values = {
  name: string;
  email: string;
  phone: string;
  year: string;
  make: string;
  model: string;
  vehicleType: string;
  service: string;
  date: string;
  window: string;
  mode: "mobile" | "studio";
  address: string;
  city: string;
  notes: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Values | "photos", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_PHOTOS = 6;
const MAX_BYTES = 10 * 1024 * 1024;

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const noop = () => () => {};

function validate(v: Values, today: string): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!emailRe.test(v.email.trim())) e.email = "Enter a valid email, such as name@example.com.";
  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Enter a phone number.";
  else if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith("1")))) e.phone = "Enter a 10-digit phone number.";
  const yr = Number(v.year);
  if (!/^\d{4}$/.test(v.year) || yr < 1950 || yr > new Date().getFullYear() + 1) e.year = "Enter a 4-digit year, 1950 or later.";
  if (!v.make.trim()) e.make = "Enter the make.";
  if (!v.model.trim()) e.model = "Enter the model.";
  if (!v.vehicleType) e.vehicleType = "Choose a vehicle type.";
  if (!v.service) e.service = "Choose a service.";
  if (!v.date) e.date = "Choose a preferred date.";
  else if (today && v.date < today) e.date = "Choose today or a future date.";
  else if (new Date(`${v.date}T12:00:00`).getDay() === 0) e.date = "We are open Monday–Saturday. Choose another day.";
  if (!v.window) e.window = "Choose a time window.";
  if (v.mode === "mobile") {
    if (v.address.trim().length < 5) e.address = "Enter the street address where we would meet you.";
    if (!v.city) e.city = "Choose a service-area city.";
  }
  if (v.notes.length > 800) e.notes = "Keep notes under 800 characters.";
  if (!v.consent) e.consent = "Please acknowledge this to continue.";
  return e;
}

const inputBase = "block w-full border bg-ink px-4 py-3 text-bone placeholder:text-silver/50 min-h-12";

function Field({ id, label, error, hint, optional, children }: { id: string; label: string; error?: string; hint?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between font-display text-sm uppercase tracking-[0.2em] text-bone">
        {label}
        {optional && <span className="text-xs normal-case tracking-normal text-silver">Optional</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-2 text-sm text-silver">{hint}</p>}
      {error && (
        <p id={`${id}-err`} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
          <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function BookingForm() {
  const params = useSearchParams();
  const today = useSyncExternalStore(noop, todayStr, () => "");
  const uid = useId();

  const initialService = getService(params.get("service"))?.id ?? "";
  const initialSize = getSize(params.get("size"))?.id ?? "";
  const initialAddons = (params.get("addons") ?? "").split(",").filter((id) => addons.some((a) => a.id === id));
  const initialCondition = getCondition(params.get("condition"))?.id ?? null;

  const [v, setV] = useState<Values>({
    name: "", email: "", phone: "", year: "", make: "", model: "",
    vehicleType: initialSize, service: initialService,
    date: "", window: "", mode: "mobile", address: "", city: "", notes: "", consent: false,
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState<{ ref: string; values: Values; photoCount: number } | null>(null);
  const confirmRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<Photo[]>([]);

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);
  useEffect(() => {
    if (done) {
      window.scrollTo({ top: 0, behavior: "instant" });
      confirmRef.current?.focus({ preventScroll: true });
    }
  }, [done]);

  const errors = validate(v, today);
  const show = (k: keyof Values) => (touched[k] || submitAttempt ? errors[k] : undefined);
  const set = <K extends keyof Values>(k: K, val: Values[K]) => setV((c) => ({ ...c, [k]: val }));
  const bind = (k: keyof Values) => ({
    id: `${uid}-${k}`,
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    "aria-invalid": !!show(k),
    "aria-describedby": show(k) ? `${uid}-${k}-err` : undefined,
  });
  const cls = (k: keyof Values) => `${inputBase} ${show(k) ? "border-danger" : "border-line"}`;

  const est = calculate({
    serviceId: v.service || initialService,
    sizeId: v.vehicleType || initialSize,
    addonIds: initialAddons,
    conditionId: initialCondition,
  });

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next: Photo[] = [];
    let msg = "";
    for (const f of Array.from(list)) {
      if (!f.type.startsWith("image/")) msg = `“${f.name}” is not an image and was skipped.`;
      else if (f.size > MAX_BYTES) msg = `“${f.name}” is larger than 10 MB and was skipped.`;
      else if (photos.length + next.length >= MAX_PHOTOS) msg = `You can add up to ${MAX_PHOTOS} photos.`;
      else next.push({ id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 7)}`, name: f.name, size: f.size, url: URL.createObjectURL(f) });
    }
    setPhotoError(msg);
    if (next.length) setPhotos((p) => [...p, ...next]);
  };
  const removePhoto = (id: string) => {
    setPhotos((p) => {
      const gone = p.find((x) => x.id === id);
      if (gone) URL.revokeObjectURL(gone.url);
      return p.filter((x) => x.id !== id);
    });
  };

  const errorList = (Object.entries(errors) as [keyof Values, string][]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempt(true);
    if (errorList.length) {
      requestAnimationFrame(() => {
        const first = errorList[0][0];
        const el = document.getElementById(`${uid}-${first}`) as HTMLElement | null;
        el?.focus();
        el?.scrollIntoView({ block: "center", behavior: "smooth" });
      });
      return;
    }
    setDone({ ref: `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, values: v, photoCount: photos.length });
  };

  const reset = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setPhotos([]);
    setV((c) => ({ ...c, name: "", email: "", phone: "", year: "", make: "", model: "", date: "", window: "", address: "", city: "", notes: "", consent: false }));
    setTouched({});
    setSubmitAttempt(false);
    setDone(null);
  };

  if (done) {
    const d = done.values;
    const svc = getService(d.service);
    const dateLabel = new Date(`${d.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    return (
      <div className="mx-auto max-w-3xl">
        <div className="border border-sage/60 bg-sage/10 p-8 sm:p-12">
          <CheckCircle2 aria-hidden className="h-12 w-12 text-sage-2" strokeWidth={1.4} />
          <h2 ref={confirmRef} tabIndex={-1} className="mt-6 text-5xl outline-none sm:text-6xl">Request received, {d.name.trim().split(" ")[0]}.</h2>
          <p className="mt-5 text-lg leading-relaxed">
            This is a <strong className="font-semibold">portfolio demonstration</strong>. Nothing you entered was transmitted or stored, and no appointment has been made.
          </p>
          <p className="mt-3 leading-relaxed text-silver">
            At a real detailing business, this request would not be a booking yet. An appointment would still require confirmation from the business, once they had reviewed your vehicle details, confirmed the scope and price, and agreed a time.
          </p>
        </div>

        <div className="mt-6 border border-line bg-graphite">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-6 py-4">
            <h3 className="text-2xl">Request summary</h3>
            <p className="font-display text-sm tracking-[0.2em] text-silver">Demo reference {done.ref}</p>
          </div>
          <dl className="grid gap-x-8 gap-y-5 p-6 sm:grid-cols-2">
            <Summary label="Service" value={svc?.name ?? "—"} />
            <Summary label="Vehicle" value={`${d.year} ${d.make} ${d.model}`} />
            <Summary label="Requested time" value={`${dateLabel}, ${d.window}`} />
            <Summary label="Location" value={d.mode === "mobile" ? `Mobile — ${d.address}, ${d.city}, AZ` : "Appointment-only studio"} />
            <Summary label="Contact" value={`${d.email} · ${d.phone}`} />
            <Summary label="Photos attached" value={String(done.photoCount)} />
            {d.notes && <Summary label="Notes" value={d.notes} wide />}
            {est && <Summary label="Online estimate" value={`${money(est.total)}${est.high > est.total ? ` (up to ${money(est.high)} after inspection)` : ""}`} wide />}
          </dl>
        </div>

        <div className="mt-6 border border-line p-6 sm:p-8">
          <h3 className="text-2xl">What would happen next</h3>
          <ol className="mt-5 space-y-4">
            {["The business reviews your vehicle details and photos.", "They confirm scope, final price and an available time.", "You receive a confirmation, and a deposit may be requested for larger services.", "Appointment day: a walk-around, the work, then a final inspection."].map((t, i) => (
              <li key={t} className="flex gap-4">
                <span className="font-display text-xl text-copper">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-silver">{t}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={buttonStyles.primary}>Back to home</Link>
          <button type="button" onClick={reset} className={buttonStyles.secondary}>Start another request</button>
        </div>
      </div>
    );
  }

  const visibleErrors = submitAttempt ? errorList : [];

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start" aria-label="Appointment request">
      <div className="space-y-12">
        <div role="note" className="flex gap-4 border-2 border-copper bg-copper/10 p-5 sm:p-6">
          <Info aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-copper-2" />
          <p className="font-display text-xl font-semibold uppercase leading-snug tracking-wide sm:text-2xl">{site.demoNotice}</p>
        </div>

        {visibleErrors.length > 0 && (
          <div role="alert" className="border border-danger bg-danger/10 p-5">
            <p className="font-display text-xl uppercase tracking-wide">Please fix {visibleErrors.length} {visibleErrors.length === 1 ? "item" : "items"} before submitting</p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm">
              {visibleErrors.map(([k, msg]) => (
                <li key={k}>
                  <a href={`#${uid}-${k}`} onClick={(e) => { e.preventDefault(); document.getElementById(`${uid}-${k}`)?.focus(); }} className="underline underline-offset-2">{msg}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <fieldset className="space-y-6">
          <Legend n="01">Your details</Legend>
          <Field id={`${uid}-name`} label="Full name" error={show("name")}>
            <input {...bind("name")} className={cls("name")} autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} required />
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id={`${uid}-email`} label="Email" error={show("email")}>
              <input {...bind("email")} className={cls("email")} type="email" autoComplete="email" inputMode="email" value={v.email} onChange={(e) => set("email", e.target.value)} required />
            </Field>
            <Field id={`${uid}-phone`} label="Phone" error={show("phone")}>
              <input {...bind("phone")} className={cls("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="(480) 555-0100" value={v.phone} onChange={(e) => set("phone", e.target.value)} required />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-6">
          <Legend n="02">Your vehicle</Legend>
          <div className="grid gap-6 sm:grid-cols-[120px_1fr_1fr]">
            <Field id={`${uid}-year`} label="Year" error={show("year")}>
              <input {...bind("year")} className={cls("year")} inputMode="numeric" maxLength={4} placeholder="2022" value={v.year} onChange={(e) => set("year", e.target.value.replace(/\D/g, ""))} required />
            </Field>
            <Field id={`${uid}-make`} label="Make" error={show("make")}>
              <input {...bind("make")} className={cls("make")} value={v.make} onChange={(e) => set("make", e.target.value)} required />
            </Field>
            <Field id={`${uid}-model`} label="Model" error={show("model")}>
              <input {...bind("model")} className={cls("model")} value={v.model} onChange={(e) => set("model", e.target.value)} required />
            </Field>
          </div>
          <Field id={`${uid}-vehicleType`} label="Vehicle type" error={show("vehicleType")}>
            <Select {...bind("vehicleType")} className={cls("vehicleType")} value={v.vehicleType} onChange={(e) => set("vehicleType", e.target.value)}>
              <option value="">Select vehicle type</option>
              {vehicleSizes.map((s) => (
                <option key={s.id} value={s.id}>{s.label}{s.adjustment ? ` (+${money(s.adjustment)})` : ""}</option>
              ))}
            </Select>
          </Field>
        </fieldset>

        <fieldset className="space-y-6">
          <Legend n="03">Service and timing</Legend>
          <Field id={`${uid}-service`} label="Service" error={show("service")}>
            <Select {...bind("service")} className={cls("service")} value={v.service} onChange={(e) => set("service", e.target.value)}>
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.name} — from {money(s.price)}</option>
              ))}
            </Select>
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id={`${uid}-date`} label="Preferred date" error={show("date")} hint="Monday–Saturday.">
              <input {...bind("date")} className={cls("date")} type="date" min={today || undefined} value={v.date} onChange={(e) => set("date", e.target.value)} required />
            </Field>
            <Field id={`${uid}-window`} label="Preferred time window" error={show("window")}>
              <Select {...bind("window")} className={cls("window")} value={v.window} onChange={(e) => set("window", e.target.value)}>
                <option value="">Select a window</option>
                {timeWindows.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </Select>
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-6">
          <Legend n="04">Location</Legend>
          <div role="radiogroup" aria-label="Service type" className="grid gap-4 sm:grid-cols-2">
            {([
              ["mobile", "Mobile service", "We come to you in Scottsdale, Paradise Valley, Phoenix, Tempe or Fountain Hills."],
              ["studio", "Studio service", "Appointment-only studio visit. The location is shared on confirmation."],
            ] as const).map(([val, title, text]) => (
              <div key={val}>
                <input id={`${uid}-mode-${val}`} type="radio" name="mode" className="peer sr-only" checked={v.mode === val} onChange={() => set("mode", val)} />
                <label htmlFor={`${uid}-mode-${val}`} className="flex h-full cursor-pointer flex-col gap-1 border border-line bg-graphite p-5 hover:border-silver peer-checked:border-copper peer-checked:bg-graphite-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-copper-2">
                  <span className="font-display text-xl font-semibold uppercase tracking-wide">{title}</span>
                  <span className="text-sm text-silver">{text}</span>
                </label>
              </div>
            ))}
          </div>
          {v.mode === "mobile" ? (
            <div className="grid gap-6 sm:grid-cols-[1.6fr_1fr]">
              <Field id={`${uid}-address`} label="Service address" error={show("address")} hint="Where the vehicle will be. Water and power should be within reach.">
                <input {...bind("address")} className={cls("address")} autoComplete="street-address" placeholder="Street address" value={v.address} onChange={(e) => set("address", e.target.value)} required />
              </Field>
              <Field id={`${uid}-city`} label="City" error={show("city")}>
                <Select {...bind("city")} className={cls("city")} value={v.city} onChange={(e) => set("city", e.target.value)}>
                  <option value="">Select city</option>
                  {site.areas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </Select>
              </Field>
            </div>
          ) : (
            <p className="border border-line bg-graphite p-4 text-sm text-silver">No address needed. The studio address would be shared once the appointment is confirmed.</p>
          )}
        </fieldset>

        <fieldset className="space-y-6">
          <Legend n="05">Condition and photos</Legend>
          <Field id={`${uid}-notes`} label="Vehicle-condition notes" error={show("notes")} optional hint={`${v.notes.length}/800 characters. Mention pet hair, stains, swirls, odors or areas of concern.`}>
            <textarea {...bind("notes")} className={`${cls("notes")} min-h-32`} rows={5} value={v.notes} onChange={(e) => set("notes", e.target.value)} />
          </Field>

          <div>
            <p className="mb-2 flex items-baseline justify-between font-display text-sm uppercase tracking-[0.2em]">
              Photos
              <span className="text-xs normal-case tracking-normal text-silver">Optional · up to {MAX_PHOTOS} images, 10 MB each</span>
            </p>
            <label
              htmlFor={`${uid}-photos`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
              className={`flex cursor-pointer flex-col items-center gap-2 border-2 border-dashed px-6 py-10 text-center transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-copper-2 ${dragging ? "border-copper bg-copper/10" : "border-line hover:border-silver"}`}
            >
              <ImagePlus aria-hidden className="h-8 w-8 text-copper-2" strokeWidth={1.4} />
              <span className="font-display text-lg uppercase tracking-wide">Choose photos or drag them here</span>
              <span className="text-sm text-silver">Previewed in your browser only. Photos are never uploaded.</span>
              <input id={`${uid}-photos`} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            </label>
            {photoError && <p role="alert" className="mt-2 flex gap-1.5 text-sm text-danger"><AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />{photoError}</p>}
            {photos.length > 0 && (
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((p) => (
                  <li key={p.id} className="relative border border-line bg-graphite">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt={`Preview of ${p.name}`} className="aspect-[4/3] w-full object-cover" />
                    <p className="truncate px-2 py-1.5 text-xs text-silver">{p.name}</p>
                    <button type="button" onClick={() => removePhoto(p.id)} aria-label={`Remove ${p.name}`} className="absolute right-1.5 top-1.5 grid h-9 w-9 place-items-center bg-ink/90 hover:bg-copper hover:text-ink">
                      <X aria-hidden className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </fieldset>

        <div>
          <div className="flex gap-3">
            <input {...bind("consent")} type="checkbox" checked={v.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#C87343]" required />
            <label htmlFor={`${uid}-consent`} className="text-[15px] leading-relaxed">
              I understand this is a portfolio demonstration, that nothing I enter is transmitted or stored, and that a real appointment would require confirmation from the business.
            </label>
          </div>
          {show("consent") && <p id={`${uid}-consent-err`} className="mt-2 flex gap-1.5 text-sm text-danger"><AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />{show("consent")}</p>}
        </div>

        <button type="submit" className={`${buttonStyles.primary} w-full sm:w-auto`}>
          <CalendarCheck aria-hidden className="h-5 w-5" /> Submit appointment request
        </button>
      </div>

      <aside ref={summaryRef} aria-label="Your estimate" className="border border-line bg-graphite p-6 lg:sticky lg:top-28">
        <p className="font-display text-sm uppercase tracking-[0.24em] text-silver">Your estimate</p>
        {est ? (
          <>
            <p className="mt-2 font-display text-6xl font-semibold leading-none">{money(est.total)}</p>
            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <SideLine label={est.service.name} value={money(est.base)} />
              <SideLine label={est.size.label} value={est.adjustment ? `+${money(est.adjustment)}` : "$0"} />
              {est.selectedAddons.map((a) => <SideLine key={a.id} label={a.name} value={`+${money(a.price)}`} />)}
            </dl>
            <p className="mt-4 text-sm text-silver">{est.durationLabel}</p>
            <p className="mt-3 text-xs leading-relaxed text-silver">Final pricing depends on condition and is confirmed by the business.</p>
          </>
        ) : (
          <p className="mt-3 text-silver">Choose a service and vehicle type to see a starting estimate, or build a full one first.</p>
        )}
        <Link href="/estimate" className="mt-5 inline-block font-display text-sm font-semibold uppercase tracking-[0.14em] text-copper-2 hover:text-bone">
          {est ? "Edit estimate" : "Open estimate builder"}
        </Link>
      </aside>
    </form>
  );
}

function Legend({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <legend className="mb-6 flex w-full items-baseline gap-4 border-b border-line pb-3">
      <span className="font-display text-xl text-copper">{n}</span>
      <span className="font-display text-3xl uppercase tracking-wide">{children}</span>
    </legend>
  );
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, children, ...rest } = props;
  return (
    <div className="relative">
      <select {...rest} className={`${className} appearance-none pr-11`}>{children}</select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
    </div>
  );
}
function Summary({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="font-display text-xs uppercase tracking-[0.24em] text-silver">{label}</dt>
      <dd className="mt-1 break-words">{value}</dd>
    </div>
  );
}
function SideLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-silver">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
