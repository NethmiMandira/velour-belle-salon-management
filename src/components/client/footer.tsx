import Link from "next/link";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-brand-blush/60 bg-brand-burgundy pt-16 pb-12 text-brand-ivory">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Contact Info Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-gold">Contact Us</p>
          <h2 className={`${display.className} mt-2 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-ivory sm:text-5xl`}>
            Find us in Colombo 03.
          </h2>
          <p className="mt-4 text-sm text-brand-ivory/70">
            Open Tuesday to Sunday. Walk-ins are welcome when we have space, but booking ahead is the safest way to get your time.
          </p>
        </div>

        {/* Contact Tiles */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <ContactTile icon={<MapPin className="h-6 w-6" />} label="Visit">
            24 Rose Avenue
            <br />
            Colombo 03, Sri Lanka
          </ContactTile>
          <ContactTile icon={<Phone className="h-6 w-6" />} label="Call">
            +94 11 234 5678
          </ContactTile>
          <ContactTile icon={<Mail className="h-6 w-6" />} label="Email">
            hello@velourbelle.lk
          </ContactTile>
        </div>

        {/* Copyright Footer Strip */}
        <div className="mt-16 flex flex-col gap-4 border-t border-brand-ivory/10 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-lg text-brand-gold">
            Velour Belle
          </Link>
          <p className="text-xs text-brand-ivory/65">Luxury beauty, thoughtfully delivered.</p>
        </div>
      </div>
    </footer>
  );
}

function ContactTile({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="group rounded-3xl border border-brand-ivory/15 bg-brand-ivory/5 p-7 transition-colors hover:border-brand-gold hover:bg-brand-ivory/10">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-ivory/10 text-brand-gold">
        {icon}
      </span>
      <p className={`${display.className} mt-6 text-lg font-semibold text-brand-gold`}>{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-brand-ivory/80">{children}</p>
    </div>
  );
}