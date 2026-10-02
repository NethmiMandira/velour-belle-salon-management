import Link from "next/link";
import { CalendarDays } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-blush/60 bg-brand-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        <Link href="/" className="font-serif text-xl font-semibold tracking-wide text-brand-burgundy">
          Velour Belle
        </Link>
        <nav className="hidden items-center gap-5 text-xs font-medium text-brand-charcoal/75 lg:flex">
          <Link href="/#home" className="transition-colors hover:text-brand-burgundy">Home</Link>
          <Link href="/#about" className="transition-colors hover:text-brand-burgundy">About</Link>
          <Link href="/#services" className="transition-colors hover:text-brand-burgundy">Services</Link>
          <Link href="/#team" className="transition-colors hover:text-brand-burgundy">Team</Link>
          <Link href="/#gallery" className="transition-colors hover:text-brand-burgundy">Gallery</Link>
          <Link href="/#reviews" className="transition-colors hover:text-brand-burgundy">Reviews</Link>
          <Link href="/#contact" className="transition-colors hover:text-brand-burgundy">Contact</Link>
        </nav>
        <Link href="/#book" className="inline-flex items-center gap-2 rounded-xl bg-brand-burgundy px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-rose">
          <CalendarDays className="h-4 w-4 text-brand-gold" /> Book now
        </Link>
      </div>
    </header>
  );
}
