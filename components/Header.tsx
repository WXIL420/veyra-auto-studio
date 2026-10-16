"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";
import { buttonStyles } from "./ui";

export function Header() {
  const pathname = usePathname();
  // Menu state is tied to the pathname it was opened on, so navigating closes it.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenFor((cur) => ((typeof next === "function" ? next(cur === pathname) : next) ? pathname : null));
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const focusables = () =>
      Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []).filter(
        (el) => el.getClientRects().length > 0,
      );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenFor(null);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.getElementById("mobile-menu")?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (toggle && document.activeElement === document.body) toggle.focus();
    };
  }, [open]);

  const linkClass = (href: string) =>
    `relative py-2 font-display text-[15px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-bone ${
      pathname === href
        ? "text-bone after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-copper"
        : "text-silver"
    }`;

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-copper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Veyra Auto Studio home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={linkClass(l.href)}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden items-center gap-2 text-sm text-silver hover:text-bone xl:flex">
            <Phone aria-hidden className="h-4 w-4 text-copper-2" />
            {site.phone}
          </a>
          <Link href="/book" className={`${buttonStyles.primary} !min-h-10 !px-5 max-sm:hidden`}>
            Book
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center text-bone lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full h-[calc(100dvh-73px)] overflow-y-auto border-t border-line bg-ink px-5 pb-24 pt-4 lg:hidden"
        >
          <ul className="divide-y divide-line border-y border-line">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/book", label: "Book" }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={`block py-4 font-display text-2xl font-medium uppercase tracking-wide ${pathname === l.href ? "text-copper-2" : "text-bone"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.phoneHref} className="mt-6 flex items-center gap-3 text-silver">
            <Phone aria-hidden className="h-4 w-4 text-copper-2" /> {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
