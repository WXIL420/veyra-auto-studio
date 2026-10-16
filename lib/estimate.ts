import {
  addons,
  getCondition,
  getService,
  getSize,
  type Addon,
  type Condition,
  type Service,
  type VehicleSize,
} from "./data";

export type EstimateInput = {
  serviceId?: string | null;
  sizeId?: string | null;
  addonIds?: string[];
  conditionId?: string | null;
};

export type Estimate = {
  service: Service;
  size: VehicleSize;
  selectedAddons: Addon[];
  condition: Condition;
  base: number;
  adjustment: number;
  addonsTotal: number;
  total: number;
  high: number;
  durationLabel: string;
  quote: boolean;
};

const fmtHours = (h: number) => {
  const r = Math.round(h * 2) / 2;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
};

export const money = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export function calculate(input: EstimateInput): Estimate | null {
  const service = getService(input.serviceId);
  const size = getSize(input.sizeId);
  if (!service || !size) return null;
  const condition = getCondition(input.conditionId) ?? getCondition("maintained")!;
  const selectedAddons = addons.filter((a) => input.addonIds?.includes(a.id));

  const base = service.price;
  const adjustment = size.adjustment;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const total = base + adjustment + addonsTotal;
  const high = Math.ceil((total * (1 + condition.maxUplift)) / 5) * 5;

  const extraHours = selectedAddons.reduce((s, a) => s + a.minutes, 0) / 60;
  let durationLabel: string;
  if (service.quote) {
    durationLabel = "Quote required — scheduled after paint inspection";
  } else if (!service.hours) {
    durationLabel = extraHours ? "Starting at one day (add-ons may extend this)" : "Starting at one day";
  } else {
    const lo = (service.hours[0] + extraHours) * condition.timeFactor;
    const hi = (service.hours[1] + extraHours) * condition.timeFactor;
    durationLabel =
      fmtHours(lo) === fmtHours(hi)
        ? `Approximately ${fmtHours(lo)} hours`
        : `Approximately ${fmtHours(lo)}–${fmtHours(hi)} hours`;
  }

  return {
    service,
    size,
    selectedAddons,
    condition,
    base,
    adjustment,
    addonsTotal,
    total,
    high,
    durationLabel,
    quote: !!service.quote,
  };
}
