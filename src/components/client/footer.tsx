import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-brand-blush/60 bg-brand-burgundy py-8 text-brand-ivory">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm md:flex-row md:items-center md:justify-between md:px-8">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg text-brand-gold"><Sparkles className="h-4 w-4" />Velour Belle</Link>
        <p className="text-xs text-brand-ivory/65">Luxury beauty, thoughtfully delivered.</p>
      </div>
    </footer>
  );
}
