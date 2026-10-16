import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 px-6 font-display text-[15px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]";
export const buttonStyles = {
  primary: `${base} bg-copper text-ink hover:bg-copper-2`,
  secondary: `${base} bg-bone/10 text-bone hover:bg-bone/20 shadow-[inset_0_0_0_1px_rgba(243,241,235,.35)]`,
  light: `${base} bg-bone text-ink hover:bg-white`,
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonStyles[variant]} ${className}`}>
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-display text-sm font-medium uppercase tracking-[0.28em] text-copper-2 ${className}`}>
      <span aria-hidden className="h-px w-8 bg-copper" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {children && <p className="mt-5 text-lg leading-relaxed text-silver">{children}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative border-b border-line bg-graphite">
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-line/60 lg:block" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
        {children && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver">{children}</p>}
      </Container>
    </section>
  );
}

export function DemoNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm leading-relaxed text-silver ${className}`}>
      Fictional business created for a personal portfolio project. No real bookings, payments or customer data.
    </p>
  );
}
