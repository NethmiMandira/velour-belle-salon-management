import Link from "next/link";
import { Clock3, Sparkles } from "lucide-react";

import type { Service } from "@/types/client";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-blush/60 bg-brand-ivory shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-32 items-center justify-center bg-brand-blush/25 text-brand-rose">
        <Sparkles className="h-9 w-9" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-rose">{service.tagline ?? service.category}</p>
            <h3 className="mt-1 font-serif text-xl text-brand-burgundy">{service.name}</h3>
          </div>
          {service.featured && <span className="rounded-full bg-brand-gold/25 px-2 py-1 text-[10px] font-semibold text-brand-burgundy">Featured</span>}
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-charcoal/70">{service.description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-brand-blush/50 pt-4 text-sm">
          <span className="font-semibold text-brand-burgundy">From ${service.price}</span>
          <span className="inline-flex items-center gap-1 text-xs text-brand-charcoal/60"><Clock3 className="h-3.5 w-3.5" />{service.duration} min</span>
        </div>
        <Link href="/appointments" className="mt-4 text-sm font-semibold text-brand-rose hover:text-brand-burgundy">Book this service</Link>
      </div>
    </article>
  );
}
