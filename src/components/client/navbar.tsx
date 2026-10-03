"use client";

import { LayoutDashboard, Menu, X } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled || open ? "border-brand-blush/60 bg-brand-ivory/95 backdrop-blur-md" : "border-transparent bg-brand-ivory"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:px-8" aria-label="Main">
        <a href="#home" onClick={close} className={`${display.className} text-xl font-semibold tracking-tight text-brand-burgundy`}>
          Velour Belle
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-brand-charcoal/70 transition-colors hover:bg-brand-blush/30 hover:text-brand-burgundy"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden items-center gap-2 rounded-xl border-2 border-brand-burgundy/15 px-4 py-2 text-sm font-semibold text-brand-burgundy transition-all hover:border-brand-burgundy hover:bg-brand-burgundy hover:text-brand-ivory sm:inline-flex"
          >
            <LayoutDashboard className="h-4 w-4" />
            Admin
          </Link>
          <a
            href="#book"
            className="hidden rounded-xl bg-brand-burgundy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-rose sm:inline-flex"
          >
            Book now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-brand-burgundy/15 text-brand-burgundy lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile menu: full-width panel below the bar, scrolls if the screen is short */}
      {open && (
        <div id="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-brand-blush/60 bg-brand-ivory px-6 pb-8 pt-4 lg:hidden">
          <ul className="grid gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-brand-burgundy transition-colors hover:bg-brand-blush/30"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href="/admin"
              onClick={close}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-burgundy/15 px-4 py-3 text-sm font-semibold text-brand-burgundy"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
            <a
              href="#book"
              onClick={close}
              className="inline-flex items-center justify-center rounded-xl bg-brand-burgundy px-4 py-3 text-sm font-semibold text-white"
            >
              Book now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}