import { useId } from "react";

/**
 * Original illustrative scenes drawn as SVG. They stand in for photography in
 * this portfolio demo and are not photographs of real work.
 */

export type ArtKind = "profile" | "wheel" | "hood" | "swirl" | "beads" | "cabin" | "seat";
export type ArtState = "before" | "after";

const INK = "#0D0F10";
const GRAPHITE = "#191C1E";
const SILVER = "#A8ADB0";
const BONE = "#F3F1EB";
const COPPER = "#C87343";

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const n = (v: number) => Math.round(v * 10) / 10;

/** Fine circular swirl marks, the signature of poor wash technique. */
function Swirls({ x, y, w, h, count, seed, opacity = 0.5 }: { x: number; y: number; w: number; h: number; count: number; seed: number; opacity?: number }) {
  const r = rng(seed);
  return (
    <g fill="none" stroke={SILVER} strokeLinecap="round" opacity={opacity}>
      {Array.from({ length: count }, (_, i) => {
        const cx = x + r() * w;
        const cy = y + r() * h;
        const rad = 14 + r() * 70;
        const a0 = r() * Math.PI * 2;
        const span = 1.1 + r() * 2.2;
        const x1 = cx + Math.cos(a0) * rad;
        const y1 = cy + Math.sin(a0) * rad;
        const x2 = cx + Math.cos(a0 + span) * rad;
        const y2 = cy + Math.sin(a0 + span) * rad;
        return (
          <path
            key={i}
            d={`M${n(x1)} ${n(y1)}A${n(rad)} ${n(rad)} 0 ${span > Math.PI ? 1 : 0} 1 ${n(x2)} ${n(y2)}`}
            strokeWidth={0.6 + r() * 0.9}
            strokeOpacity={0.25 + r() * 0.5}
          />
        );
      })}
    </g>
  );
}

function Specks({ x, y, w, h, count, seed, fill, max = 3.2 }: { x: number; y: number; w: number; h: number; count: number; seed: number; fill: string; max?: number }) {
  const r = rng(seed);
  return (
    <g fill={fill}>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx={n(x + r() * w)} cy={n(y + r() * h)} r={n(0.7 + r() * max)} opacity={0.25 + r() * 0.5} />
      ))}
    </g>
  );
}

const BODY = "M90 318L90 290C90 272 100 262 122 258L270 244C320 200 380 148 470 142C540 138 590 160 640 214L780 236C850 246 900 258 918 280C926 292 926 304 920 318Z";
const GLASS = "M296 242C338 204 394 168 468 162C530 160 568 176 606 214L624 238Z";

/** Side-on vehicle silhouette, 1000 x 400. Front faces right. */
export function Car({ state = "after", id, tone = "#3a4045" }: { state?: ArtState; id: string; tone?: string }) {
  const after = state === "after";
  const wheel = (cx: number) => (
    <g key={cx}>
      <circle cx={cx} cy={326} r={52} fill="#08090a" />
      <circle cx={cx} cy={326} r={36} fill={after ? SILVER : "#7b7d7c"} />
      <circle cx={cx} cy={326} r={30} fill="#121416" />
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d="M0 -4 L26 -9 L26 9 L0 4Z" fill={after ? BONE : "#8d8b86"} opacity={0.85} transform={`translate(${cx} 326) rotate(${a})`} />
      ))}
      <circle cx={cx} cy={326} r={7} fill={COPPER} />
    </g>
  );
  return (
    <g>
      <clipPath id={`${id}-body`}>
        <path d={BODY} transform="translate(0 34)" />
      </clipPath>
      <ellipse cx={500} cy={378} rx={440} ry={9} fill="#000" opacity={0.55} />
      <g transform="translate(0 34)">
        <path d={BODY} fill={tone} />
        <path d={GLASS} fill="#101214" />
        <path d="M330 240C372 206 420 180 468 176L458 240Z" fill={BONE} opacity={after ? 0.1 : 0.03} />
        <path d="M110 276H915" stroke={INK} strokeWidth={1.4} opacity={0.5} />
        <path d="M468 200V318M628 232V318" stroke={INK} strokeWidth={1.5} opacity={0.55} />
      </g>
      <g clipPath={`url(#${id}-body)`}>
        <circle cx={270} cy={326} r={60} fill="#08090a" />
        <circle cx={740} cy={326} r={60} fill="#08090a" />
        {after ? (
          <>
            <path d="M650 244 L790 262 L790 270 L664 252Z" fill={BONE} opacity={0.5} />
            <path d="M130 300 L560 292 L560 296 L130 304Z" fill={BONE} opacity={0.16} />
            <path d="M118 294 L900 276" stroke={COPPER} strokeWidth={1.6} opacity={0.85} />
          </>
        ) : (
          <>
            <rect x={80} y={170} width={860} height={220} fill="#6d675c" opacity={0.28} />
            <Specks x={90} y={250} w={830} h={100} count={120} seed={11} fill="#8a7f6c" />
          </>
        )}
      </g>
      {wheel(270)}
      {wheel(740)}
    </g>
  );
}

export function HeroCar() {
  const id = useId();
  return (
    <svg viewBox="40 90 940 300" className="h-full w-full" role="img" aria-label="Illustration of a dark performance coupe in profile with a copper reflection line along the body">
      <defs>
        <clipPath id={`${id}-sweep`}>
          <path d={BODY} transform="translate(0 34)" />
        </clipPath>
      </defs>
      <Car id={id} state="after" tone="#343a3e" />
      <g clipPath={`url(#${id}-sweep)`}>
        <rect className="sweep" x={0} y={150} width={90} height={260} fill={BONE} opacity={0.28} />
      </g>
    </svg>
  );
}

const SPOKES = [0, 72, 144, 216, 288];

function Scene({ kind, state, variant }: { kind: ArtKind; state: ArtState; variant: number }) {
  const id = useId();
  const after = state === "after";
  switch (kind) {
    case "profile":
      return (
        <g>
          <rect width={800} height={600} fill={GRAPHITE} />
          <rect y={402} width={800} height={198} fill="#14171a" />
          <path d="M0 402H800" stroke="#2c3134" />
          <g transform="translate(-30 72) scale(.88)">
            <Car id={id} state={state} tone={variant % 2 ? "#4a4f52" : "#343a3e"} />
          </g>
        </g>
      );
    case "wheel":
      return (
        <g>
          <rect width={800} height={600} fill={GRAPHITE} />
          <circle cx={400} cy={320} r={262} fill="#08090a" />
          <circle cx={400} cy={320} r={232} fill="none" stroke="#1e2124" strokeWidth={14} />
          <path d="M240 200 A210 210 0 0 1 400 110" fill="none" stroke={BONE} strokeWidth={5} strokeLinecap="round" opacity={after ? 0.4 : 0.08} />
          <circle cx={400} cy={320} r={190} fill={after ? SILVER : "#6f6a62"} />
          <circle cx={400} cy={320} r={170} fill="#101214" />
          <path d="M470 205 A135 135 0 0 1 535 330 L500 322 A100 100 0 0 0 456 236Z" fill={COPPER} opacity={0.9} />
          {SPOKES.map((a) => (
            <path key={a} d="M18 -22 L166 -46 L172 -14 L172 14 L166 46 L18 22Z" fill={after ? "#d9dad7" : "#8a8479"} transform={`translate(400 320) rotate(${a + 18})`} />
          ))}
          <circle cx={400} cy={320} r={52} fill={after ? BONE : "#8a8479"} />
          <circle cx={400} cy={320} r={30} fill={COPPER} />
          {SPOKES.map((a) => (
            <circle key={a} cx={400 + Math.cos(((a + 18) * Math.PI) / 180) * 42} cy={320 + Math.sin(((a + 18) * Math.PI) / 180) * 42} r={4} fill={INK} />
          ))}
          {after ? (
            <path d="M300 200 L520 150 L540 170 L318 224Z" fill={BONE} opacity={0.18} />
          ) : (
            <>
              <circle cx={400} cy={320} r={190} fill="#4a3d30" opacity={0.35} />
              <Specks x={220} y={140} w={360} h={360} count={160} seed={21 + variant} fill="#5b4a3a" max={4} />
            </>
          )}
        </g>
      );
    case "hood":
      return (
        <g>
          <rect width={800} height={600} fill={GRAPHITE} />
          <clipPath id={`${id}-p`}>
            <path d="M60 120 L740 70 L760 520 L40 540Z" />
          </clipPath>
          <path d="M60 120 L740 70 L760 520 L40 540Z" fill={variant % 2 ? "#4a4f52" : "#2b3034"} />
          <g clipPath={`url(#${id}-p)`}>
            {after ? (
              <>
                <path d="M0 180 L800 130 L800 214 L0 262Z" fill={BONE} opacity={0.5} />
                <path d="M0 290 L800 256 L800 276 L0 308Z" fill={BONE} opacity={0.22} />
                <path d="M0 400 L800 380 L800 470 L0 500Z" fill={SILVER} opacity={0.2} />
                <path d="M0 232 L800 186" stroke={COPPER} strokeWidth={2} opacity={0.9} />
              </>
            ) : (
              <>
                <rect width={800} height={600} fill="#8a8479" opacity={0.2} />
                <path d="M0 180 L800 130 L800 214 L0 262Z" fill={BONE} opacity={0.1} />
                <Swirls x={40} y={80} w={720} h={460} count={150} seed={31 + variant} opacity={0.55} />
                <Specks x={40} y={80} w={720} h={460} count={80} seed={7} fill="#8a7f6c" />
              </>
            )}
          </g>
          <path d="M60 120 L740 70 L760 520 L40 540Z" fill="none" stroke={INK} strokeWidth={4} />
        </g>
      );
    case "swirl":
      return (
        <g>
          <rect width={800} height={600} fill={GRAPHITE} />
          <clipPath id={`${id}-l`}>
            <path d="M40 60H800V540H40Z" />
          </clipPath>
          <rect x={40} y={60} width={720} height={480} fill="#2b3034" />
          <g clipPath={`url(#${id}-l)`}>
            {/* corrected half */}
            {after && (
              <>
                <path d="M0 150 L800 110 L800 200 L0 250Z" fill={BONE} opacity={0.5} />
                <path d="M0 330 L800 300 L800 318 L0 350Z" fill={BONE} opacity={0.2} />
              </>
            )}
            {!after && (
              <>
                <rect x={40} y={60} width={720} height={480} fill="#8a8479" opacity={0.18} />
                <path d="M0 150 L800 110 L800 200 L0 250Z" fill={BONE} opacity={0.1} />
                <Swirls x={40} y={60} w={720} h={480} count={200} seed={41 + variant} opacity={0.6} />
              </>
            )}
          </g>
          <rect x={40} y={60} width={720} height={480} fill="none" stroke={INK} strokeWidth={4} />
        </g>
      );
    case "beads": {
      const r = rng(51 + variant);
      return (
        <g>
          <rect width={800} height={600} fill={GRAPHITE} />
          <rect x={30} y={40} width={740} height={520} fill={variant % 2 ? "#3a4045" : "#262b2e"} />
          {after ? (
            <>
              <path d="M30 120 L770 80 L770 150 L30 200Z" fill={BONE} opacity={0.12} />
              {Array.from({ length: 70 }, (_, i) => {
                const cx = 50 + r() * 700;
                const cy = 60 + r() * 480;
                const rad = 6 + r() * 20;
                return (
                  <g key={i}>
                    <circle cx={n(cx)} cy={n(cy)} r={n(rad)} fill="#12161a" opacity={0.85} />
                    <circle cx={n(cx)} cy={n(cy)} r={n(rad)} fill="none" stroke={SILVER} strokeWidth={1.2} opacity={0.7} />
                    <circle cx={n(cx - rad * 0.3)} cy={n(cy - rad * 0.35)} r={n(rad * 0.28)} fill={BONE} opacity={0.9} />
                  </g>
                );
              })}
            </>
          ) : (
            <>
              <rect x={30} y={40} width={740} height={520} fill="#8a8479" opacity={0.12} />
              {Array.from({ length: 16 }, (_, i) => {
                const cx = 80 + r() * 640;
                const cy = 80 + r() * 440;
                return <ellipse key={i} cx={n(cx)} cy={n(cy)} rx={n(40 + r() * 80)} ry={n(16 + r() * 40)} fill={SILVER} opacity={0.12} transform={`rotate(${n(r() * 60 - 30)} ${n(cx)} ${n(cy)})`} />;
              })}
              <Specks x={30} y={40} w={740} h={520} count={90} seed={5} fill="#8a7f6c" />
            </>
          )}
          <rect x={30} y={40} width={740} height={520} fill="none" stroke={INK} strokeWidth={4} />
        </g>
      );
    }
    case "cabin":
      return (
        <g>
          <rect width={800} height={600} fill="#14171a" />
          <path d="M0 150 C200 110 600 110 800 150 V240 H0Z" fill="#202427" />
          <rect x={250} y={70} width={300} height={120} rx={26} fill={INK} />
          <circle cx={335} cy={130} r={42} fill="none" stroke={SILVER} strokeWidth={3} opacity={0.8} />
          <circle cx={465} cy={130} r={42} fill="none" stroke={SILVER} strokeWidth={3} opacity={0.8} />
          <path d="M335 130 L360 108M465 130 L440 112" stroke={COPPER} strokeWidth={4} strokeLinecap="round" />
          <rect x={40} y={170} width={150} height={20} rx={4} fill={INK} />
          <rect x={610} y={170} width={150} height={20} rx={4} fill={INK} />
          <circle cx={400} cy={430} r={190} fill="none" stroke="#08090a" strokeWidth={46} />
          <circle cx={400} cy={430} r={190} fill="none" stroke={COPPER} strokeWidth={1.6} strokeDasharray="7 6" />
          <path d="M210 430 H330 L360 470 H440 L470 430 H590 V470 H470 L440 520 H360 L330 470 H210Z" fill="#08090a" />
          <path d="M360 410 H440 L458 440 L400 466 L342 440Z" fill="#1a1d20" />
          <rect x={366} y={420} width={68} height={8} rx={2} fill={COPPER} opacity={0.9} />
          {after ? (
            <>
              <path d="M270 90 L520 80 L508 108 L262 124Z" fill={BONE} opacity={0.14} />
              <path d="M260 340 A190 190 0 0 1 400 242" fill="none" stroke={BONE} strokeWidth={4} opacity={0.35} strokeLinecap="round" />
            </>
          ) : (
            <>
              <rect width={800} height={600} fill="#8a8479" opacity={0.1} />
              <Specks x={0} y={60} w={800} h={540} count={220} seed={61 + variant} fill="#9a917f" max={2.6} />
              <path d="M270 90 L330 84 M300 150 L420 140 M480 100 L520 160" stroke="#b6ab97" strokeWidth={3} opacity={0.3} strokeLinecap="round" />
            </>
          )}
        </g>
      );
    case "seat": {
      const lines: React.ReactNode[] = [];
      for (let i = -8; i <= 14; i++) {
        lines.push(<path key={`a${i}`} d={`M${60 + i * 60} 60 L${60 + i * 60 + 520} 540`} />);
        lines.push(<path key={`b${i}`} d={`M${60 + i * 60 + 520} 60 L${60 + i * 60} 540`} />);
      }
      const r = rng(71 + variant);
      return (
        <g>
          <rect width={800} height={600} fill={GRAPHITE} />
          <clipPath id={`${id}-s`}>
            <rect x={50} y={50} width={700} height={500} rx={44} />
          </clipPath>
          <rect x={50} y={50} width={700} height={500} rx={44} fill={variant % 2 ? "#3b3a37" : "#2a2d30"} />
          <g clipPath={`url(#${id}-s)`}>
            <g stroke={COPPER} strokeWidth={1.8} strokeDasharray="6 5" opacity={0.8}>
              {lines}
            </g>
            {Array.from({ length: 140 }, (_, i) => (
              <circle key={i} cx={n(70 + r() * 660)} cy={n(70 + r() * 460)} r={1.6} fill={INK} opacity={0.7} />
            ))}
            {after ? (
              <>
                <ellipse cx={330} cy={220} rx={300} ry={120} fill={BONE} opacity={0.12} />
                <ellipse cx={560} cy={420} rx={170} ry={60} fill={BONE} opacity={0.07} />
              </>
            ) : (
              <>
                <rect x={50} y={50} width={700} height={500} fill="#8a8479" opacity={0.16} />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <ellipse key={i} cx={n(120 + r() * 560)} cy={n(110 + r() * 380)} rx={n(30 + r() * 70)} ry={n(14 + r() * 30)} fill="#0d0e0f" opacity={0.4} />
                ))}
                <path d="M100 300 C260 270 420 330 700 290M120 410 C300 380 460 440 690 400" fill="none" stroke="#0d0e0f" strokeWidth={3} opacity={0.35} />
              </>
            )}
          </g>
          <rect x={50} y={50} width={700} height={500} rx={44} fill="none" stroke={INK} strokeWidth={4} />
        </g>
      );
    }
  }
}

const labels: Record<ArtKind, string> = {
  profile: "side profile of a dark coupe",
  wheel: "close view of a five-spoke wheel with copper brake caliper",
  hood: "hood panel reflecting overhead light bars",
  swirl: "paint test panel",
  beads: "paint surface with water beads",
  cabin: "cockpit with steering wheel and instrument cluster",
  seat: "stitched leather seat panel",
};

export function Art({ kind, state = "after", variant = 0, label, className = "", pure = false }: { kind: ArtKind; state?: ArtState; variant?: number; label?: string; className?: string; pure?: boolean }) {
  if (kind === "swirl" && !pure) {
    return <SwirlSplit variant={variant} label={label} className={className} />;
  }
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} role="img" aria-label={label ?? `Illustration: ${labels[kind]}`}>
      <Scene kind={kind} state={state} variant={variant} />
    </svg>
  );
}

/** The "swirl" test panel shows a 50/50 split when used standalone. */
function SwirlSplit({ variant, label, className }: { variant: number; label?: string; className: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} role="img" aria-label={label ?? "Illustration: paint test panel"}>
      <defs>
        <clipPath id={`${id}-left`}>
          <path d="M0 0H470L370 600H0Z" />
        </clipPath>
        <clipPath id={`${id}-right`}>
          <path d="M470 0H800V600H370Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-left)`}>
        <Scene kind="swirl" state="before" variant={variant} />
      </g>
      <g clipPath={`url(#${id}-right)`}>
        <Scene kind="swirl" state="after" variant={variant} />
      </g>
      <path d="M470 0 L370 600" stroke={COPPER} strokeWidth={3} />
    </svg>
  );
}
