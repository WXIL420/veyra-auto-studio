"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, RotateCcw, Info } from "lucide-react";
import { addons, conditions, getCondition, getService, getSize, services, vehicleSizes } from "@/lib/data";
import { calculate, money } from "@/lib/estimate";
import { buttonStyles } from "./ui";

const stepNames = ["Vehicle", "Package", "Add-ons", "Condition", "Estimate"] as const;

export function bookingHref(p: { serviceId: string | null; sizeId: string | null; addonIds: string[]; conditionId: string | null }) {
  const q = new URLSearchParams();
  if (p.serviceId) q.set("service", p.serviceId);
  if (p.sizeId) q.set("size", p.sizeId);
  if (p.addonIds.length) q.set("addons", p.addonIds.join(","));
  if (p.conditionId) q.set("condition", p.conditionId);
  return `/book?${q.toString()}`;
}

const choice =
  "relative flex h-full cursor-pointer flex-col gap-1 border border-line bg-graphite p-5 transition-colors hover:border-silver peer-checked:border-copper peer-checked:bg-graphite-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-copper-2";

export function EstimateBuilder() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [sizeId, setSizeId] = useState<string | null>(() => getSize(params.get("size"))?.id ?? null);
  const [serviceId, setServiceId] = useState<string | null>(() => getService(params.get("service"))?.id ?? null);
  const [addonIds, setAddonIds] = useState<string[]>(() => (params.get("addons") ?? "").split(",").filter((id) => addons.some((a) => a.id === id)));
  const [conditionId, setConditionId] = useState<string | null>(() => getCondition(params.get("condition"))?.id ?? null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const est = calculate({ serviceId, sizeId, addonIds, conditionId });
  const canNext = [!!sizeId, !!serviceId, true, !!conditionId][step] ?? false;
  const hint = ["Choose a vehicle size to continue.", "Choose a service package to continue.", "", "Choose a condition to continue."][step];

  const toggleAddon = (id: string) => setAddonIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const reset = () => {
    setSizeId(null);
    setServiceId(null);
    setAddonIds([]);
    setConditionId(null);
    setStep(0);
  };
  const svc = getService(serviceId);
  const sz = getSize(sizeId);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
      <div>
        <nav aria-label="Estimate progress">
          <ol className="grid grid-cols-5 gap-1.5">
            {stepNames.map((name, i) => {
              const done = i < step;
              const reachable = i <= step;
              return (
                <li key={name}>
                  <button
                    type="button"
                    disabled={!reachable}
                    onClick={() => setStep(i)}
                    aria-current={i === step ? "step" : undefined}
                    className={`w-full border-t-4 pb-1 pt-3 text-left transition-colors ${i === step ? "border-copper" : done ? "border-sage" : "border-line"} disabled:cursor-default`}
                  >
                    <span className="block font-display text-xs tracking-[0.2em] text-silver">Step {i + 1}</span>
                    <span className={`block font-display text-sm uppercase tracking-wider sm:text-lg ${i === step ? "text-bone" : "text-silver"}`}>{name}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-10 min-h-[420px]">
          {step === 0 && (
            <fieldset>
              <legend className="w-full">
                <h2 ref={headingRef} tabIndex={-1} className="text-4xl outline-none sm:text-5xl">What size is your vehicle?</h2>
                <span className="mt-3 block text-silver">Larger vehicles need more product and time.</span>
              </legend>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {vehicleSizes.map((v) => (
                  <div key={v.id}>
                    <input id={`size-${v.id}`} type="radio" name="size" className="peer sr-only" checked={sizeId === v.id} onChange={() => setSizeId(v.id)} />
                    <label htmlFor={`size-${v.id}`} className={choice}>
                      <span className="font-display text-2xl font-semibold uppercase tracking-wide">{v.label}</span>
                      <span className="text-sm text-silver">{v.examples}</span>
                      <span className="mt-3 font-display text-lg text-copper-2">{v.adjustment ? `+${money(v.adjustment)}` : "No adjustment"}</span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="w-full">
                <h2 ref={headingRef} tabIndex={-1} className="text-4xl outline-none sm:text-5xl">Choose a service package</h2>
                <span className="mt-3 block text-silver">Starting prices are for a coupe or sedan; your size adjustment is added.</span>
              </legend>
              <div className="mt-8 grid gap-4">
                {services.map((s) => (
                  <div key={s.id}>
                    <input id={`svc-${s.id}`} type="radio" name="service" className="peer sr-only" checked={serviceId === s.id} onChange={() => setServiceId(s.id)} />
                    <label htmlFor={`svc-${s.id}`} className={`${choice} sm:flex-row sm:items-center sm:justify-between sm:gap-6`}>
                      <span className="flex-1">
                        <span className="block font-display text-2xl font-semibold uppercase tracking-wide">{s.name}</span>
                        <span className="mt-1 block text-sm text-silver">{s.inclusions.slice(0, 4).join(" · ")}{s.inclusions.length > 4 ? " · …" : ""}</span>
                      </span>
                      <span className="mt-3 flex items-baseline justify-between gap-6 sm:mt-0 sm:block sm:text-right">
                        <span className="block font-display text-3xl font-semibold">From {money(s.price)}</span>
                        <span className="block text-sm text-silver">{s.duration}</span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="w-full">
                <h2 ref={headingRef} tabIndex={-1} className="text-4xl outline-none sm:text-5xl">Add anything extra?</h2>
                <span className="mt-3 block text-silver">Optional. Select as many as you like, or continue without.</span>
              </legend>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {addons.map((a) => (
                  <div key={a.id}>
                    <input id={`addon-${a.id}`} type="checkbox" className="peer sr-only" checked={addonIds.includes(a.id)} onChange={() => toggleAddon(a.id)} />
                    <label htmlFor={`addon-${a.id}`} className={choice}>
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-display text-xl font-semibold uppercase tracking-wide">{a.name}</span>
                        <span className={`grid h-6 w-6 shrink-0 place-items-center border ${addonIds.includes(a.id) ? "border-copper bg-copper text-ink" : "border-silver"}`}>
                          {addonIds.includes(a.id) && <Check aria-hidden className="h-4 w-4" />}
                        </span>
                      </span>
                      <span className="text-sm text-silver">{a.note}</span>
                      <span className="mt-2 font-display text-lg text-copper-2">+{money(a.price)}</span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="w-full">
                <h2 ref={headingRef} tabIndex={-1} className="text-4xl outline-none sm:text-5xl">How is the vehicle today?</h2>
                <span className="mt-3 block text-silver">Condition affects time and can affect the final price after inspection.</span>
              </legend>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {conditions.map((c) => (
                  <div key={c.id}>
                    <input id={`cond-${c.id}`} type="radio" name="condition" className="peer sr-only" checked={conditionId === c.id} onChange={() => setConditionId(c.id)} />
                    <label htmlFor={`cond-${c.id}`} className={choice}>
                      <span className="font-display text-2xl font-semibold uppercase tracking-wide">{c.label}</span>
                      <span className="text-sm text-silver">{c.description}</span>
                      <span className="mt-3 text-sm text-copper-2">{c.maxUplift ? `May add up to ${Math.round(c.maxUplift * 100)}% after inspection` : "No condition adjustment expected"}</span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          )}

          {step === 4 && est && (
            <section aria-labelledby="result-h">
              <h2 id="result-h" ref={headingRef} tabIndex={-1} className="text-4xl outline-none sm:text-5xl">Your estimate</h2>
              <p className="mt-3 text-silver">
                {est.service.name} for a {est.size.label.toLowerCase()}, in {est.condition.label.toLowerCase()} condition.
              </p>
              <div className="mt-8 border border-line bg-graphite">
                <dl className="divide-y divide-line">
                  <Row label={`${est.service.name} (starting price)`} value={money(est.base)} />
                  <Row label={`Vehicle adjustment — ${est.size.label}`} value={est.adjustment ? `+${money(est.adjustment)}` : "$0"} />
                  {est.selectedAddons.map((a) => (
                    <Row key={a.id} label={a.name} value={`+${money(a.price)}`} />
                  ))}
                  {!est.selectedAddons.length && <Row label="Add-ons" value="None" muted />}
                </dl>
                <div className="flex items-end justify-between gap-4 border-t-2 border-copper bg-ink p-6">
                  <div>
                    <p className="font-display text-sm uppercase tracking-[0.24em] text-silver">{est.quote ? "Starting estimate" : "Estimated total"}</p>
                    <p className="mt-1 font-display text-6xl font-semibold leading-none sm:text-7xl" aria-live="polite">{money(est.total)}</p>
                  </div>
                  {est.high > est.total && (
                    <p className="max-w-[11rem] text-right text-sm text-silver">
                      Possible range after inspection:
                      <span className="mt-1 block font-display text-xl text-bone">{money(est.total)}–{money(est.high)}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 border border-line p-5">
                <Clock aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-copper-2" />
                <div>
                  <p className="font-display text-sm uppercase tracking-[0.2em] text-silver">Appointment duration</p>
                  <p className="mt-1 text-lg">{est.durationLabel}</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 border border-sage/50 bg-sage/10 p-5 text-sm leading-relaxed">
                <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-sage-2" />
                <p>
                  <strong className="font-semibold text-bone">Final pricing depends on vehicle condition.</strong> This is an online estimate, not a quote.
                  {est.quote ? " Full Paint Correction requires a written quote after paint inspection." : " We confirm scope and price after reviewing your vehicle notes and photos."}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={bookingHref({ serviceId, sizeId, addonIds, conditionId })} className={buttonStyles.primary}>
                  Continue to booking <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <button type="button" onClick={() => setStep(3)} className={buttonStyles.secondary}>
                  <ArrowLeft aria-hidden className="h-4 w-4" /> Edit choices
                </button>
                <button type="button" onClick={reset} className={buttonStyles.secondary}>
                  <RotateCcw aria-hidden className="h-4 w-4" /> Start over
                </button>
              </div>
            </section>
          )}
        </div>

        {step < 4 && (
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0} className={`${buttonStyles.secondary} disabled:invisible`}>
              <ArrowLeft aria-hidden className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-4">
              {!canNext && <p className="hidden text-sm text-silver sm:block" role="status">{hint}</p>}
              <button type="button" onClick={() => setStep(step + 1)} disabled={!canNext} className={`${buttonStyles.primary} disabled:cursor-not-allowed disabled:opacity-40`}>
                {step === 3 ? "See estimate" : "Continue"} <ArrowRight aria-hidden className="h-4 w-4" />
              </button>
            </div>
            {!canNext && <p className="w-full text-sm text-silver sm:hidden" role="status">{hint}</p>}
          </div>
        )}
      </div>

      {/* Live summary */}
      <aside aria-label="Running estimate" className="border border-line bg-graphite p-6 lg:sticky lg:top-28">
        <p className="font-display text-sm uppercase tracking-[0.24em] text-silver">Running total</p>
        <p className="mt-2 font-display text-6xl font-semibold leading-none" aria-live="polite" aria-atomic="true">
          {est ? money(est.total) : svc || sz ? money((svc?.price ?? 0) + (sz?.adjustment ?? 0) + addons.filter((a) => addonIds.includes(a.id)).reduce((s, a) => s + a.price, 0)) : "$0"}
        </p>
        <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
          <Line label="Vehicle" value={sz ? `${sz.label}${sz.adjustment ? ` (+${money(sz.adjustment)})` : ""}` : "Not selected"} />
          <Line label="Package" value={svc ? `${svc.name} — ${money(svc.price)}` : "Not selected"} />
          <Line label="Add-ons" value={addonIds.length ? `${addonIds.length} selected (+${money(addons.filter((a) => addonIds.includes(a.id)).reduce((s, a) => s + a.price, 0))})` : "None"} />
          <Line label="Condition" value={getCondition(conditionId)?.label ?? "Not selected"} />
        </dl>
        <p className="mt-6 text-xs leading-relaxed text-silver">Estimates update instantly. Nothing you choose here is sent anywhere.</p>
      </aside>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <dt className={muted ? "text-silver" : ""}>{label}</dt>
      <dd className={`font-display text-xl font-semibold ${muted ? "text-silver" : ""}`}>{value}</dd>
    </div>
  );
}
function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-silver">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
