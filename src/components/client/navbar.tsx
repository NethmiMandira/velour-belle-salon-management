"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, LayoutDashboard, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    ["Home", "/#home"],
    ["About", "/#about"],
    ["Services", "/#services"],
    ["Team", "/#team"],
    ["Gallery", "/#gallery"],
    ["Reviews", "/#reviews"],
    ["Contact", "/#contact"],
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-brand-blush/60 bg-brand-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:px-8">
        <Link href="/#home" className="shrink-0 font-serif text-lg font-semibold tracking-wide text-brand-burgundy sm:text-xl">
          Velour Belle
        </Link>
        <nav className="hidden items-center gap-5 text-xs font-medium text-brand-charcoal/75 lg:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="transition-colors hover:text-brand-burgundy">{label}</Link>)}
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 rounded-xl border border-brand-blush bg-brand-blush/20 px-3 py-2 text-brand-burgundy transition-colors hover:border-brand-rose hover:bg-brand-blush/40"><LayoutDashboard className="h-3.5 w-3.5 text-brand-rose" /> Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/#book" className="inline-flex items-center gap-1.5 rounded-xl bg-brand-burgundy px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-rose sm:gap-2 sm:px-3.5 sm:text-xs">
            <CalendarDays className="h-4 w-4 text-brand-gold" /> <span>Book now</span>
          </Link>
          <button type="button" aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((current) => !current)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand-blush text-brand-rose lg:hidden">
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      {isMenuOpen && <div className="border-t border-brand-blush/60 bg-brand-ivory px-4 pb-4 pt-3 shadow-sm lg:hidden"><nav className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setIsMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-xs font-medium text-brand-charcoal/80 hover:bg-brand-blush/30 hover:text-brand-burgundy">{label}</Link>)}<Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="col-span-2 inline-flex items-center gap-2 rounded-xl bg-brand-burgundy px-3 py-2.5 text-xs font-semibold text-white sm:col-span-4"><LayoutDashboard className="h-4 w-4 text-brand-gold" /> Admin Dashboard</Link></nav></div>}
      </div>
    </header>
  );
}
